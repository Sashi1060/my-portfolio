// Server-only proxy between the browser and the AI character service.
//
// The character API key is read from CHARACTER_SERVICE_API_KEY (no NEXT_PUBLIC_ prefix), so
// Next.js never includes it in browser bundles. Only the /api/assistant route handlers may
// import this file; the browser talks to those routes, never to the service directly.

import { isIP } from "node:net";

import type { AssistantError, AssistantErrorCode } from "./types.ts";

export const CHARACTER_ID = "portfolio-contact";
const MAX_BODY_CHARS = 16_000;
const SESSION_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

export type ServiceConfig = {
  baseUrl: string;
  apiKey: string;
  timeoutMs: number;
};

type Env = Record<string, string | undefined>;
type FetchLike = typeof fetch;

/** Read the service URL and key. Returns null when either is missing. */
export function readConfig(env: Env = process.env): ServiceConfig | null {
  const baseUrl = env.CHARACTER_SERVICE_URL?.trim().replace(/\/+$/, "");
  const apiKey = env.CHARACTER_SERVICE_API_KEY?.trim();
  if (!baseUrl || !apiKey) return null;
  const timeoutMs = Number(env.CHARACTER_SERVICE_TIMEOUT_MS) || 25_000;
  return { baseUrl, apiKey, timeoutMs };
}

/**
 * The visitor's IP, from headers the hosting platform sets.
 *
 * On Vercel, x-real-ip and x-forwarded-for are written by Vercel itself and client-supplied
 * values are overwritten (https://vercel.com/docs/headers/request-headers), so they can be
 * trusted here. The request body is never used for this.
 */
export function visitorIp(headers: Headers): string | null {
  const candidates = [headers.get("x-real-ip"), headers.get("x-forwarded-for")?.split(",")[0]];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (value && isIP(value)) return value;
  }
  return null;
}

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}

function errorResponse(status: number, code: AssistantErrorCode, message: string, extra: Partial<AssistantError["error"]> = {}, headers: Record<string, string> = {}): Response {
  const body: AssistantError = { error: { code, message, ...extra } };
  return json(body, status, headers);
}

const unavailable = (status = 502) =>
  errorResponse(status, "unavailable", "The assistant is unavailable right now.", { fallback: true });

/** Parse a small JSON object from the browser; null if too big, not JSON or not an object. */
async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) return null;
  try {
    const value: unknown = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function str(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function pick<T extends Record<string, unknown>>(source: unknown, keys: (keyof T)[]): T | null {
  if (!source || typeof source !== "object") return null;
  const out: Record<string, unknown> = {};
  for (const key of keys) {
    if (!(key in source)) return null;
    out[key as string] = (source as Record<string, unknown>)[key as string];
  }
  return out as T;
}

/** Call the service. Returns null on network errors and timeouts. */
async function callService(
  config: ServiceConfig,
  path: string,
  request: Request,
  body: Record<string, unknown> | null,
  fetchImpl: FetchLike,
): Promise<Response | null> {
  const headers: Record<string, string> = { Accept: "application/json", "X-API-Key": config.apiKey };
  if (body) headers["Content-Type"] = "application/json";
  const ip = visitorIp(request.headers);
  if (ip) headers["X-Visitor-IP"] = ip;

  try {
    return await fetchImpl(`${config.baseUrl}/v1/characters/${CHARACTER_ID}${path}`, {
      method: body ? "POST" : "GET",
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(config.timeoutMs),
    });
  } catch (error) {
    console.error("[assistant] service unreachable:", error instanceof Error ? error.name : "unknown");
    return null;
  }
}

/** Turn the service's response into one for the browser, exposing only known-safe fields. */
async function mapResponse(upstream: Response | null, okFields: string[]): Promise<Response> {
  if (!upstream) return unavailable();

  let payload: unknown = null;
  try {
    payload = await upstream.json();
  } catch {
    payload = null;
  }

  if (upstream.ok) {
    const data = pick(payload, okFields);
    return data ? json(data, upstream.status) : unavailable();
  }

  const upstreamError = (payload as { error?: { code?: unknown; message?: unknown } } | null)?.error;

  switch (upstream.status) {
    case 422: {
      const code = upstreamError?.code === "message_too_long" ? "message_too_long" : "invalid_request";
      const message = str(upstreamError?.message) ?? "Please check your message and try again.";
      return errorResponse(422, code, message);
    }
    case 429: {
      const retryAfter = Math.max(1, Number.parseInt(upstream.headers.get("retry-after") ?? "", 10) || 30);
      return errorResponse(
        429,
        "rate_limited",
        "You're sending messages quickly. Please wait a moment.",
        { retryAfter },
        { "Retry-After": String(retryAfter) },
      );
    }
    case 503:
      // LLM down, email down, or the daily budget is used up.
      return unavailable(503);
    default:
      // 401/403/404/5xx mean misconfiguration or a service fault. Log the status only.
      console.error(`[assistant] service returned HTTP ${upstream.status}`);
      return unavailable();
  }
}

function configOrUnavailable(env: Env): ServiceConfig | Response {
  const config = readConfig(env);
  if (!config) {
    console.error("[assistant] CHARACTER_SERVICE_URL or CHARACTER_SERVICE_API_KEY is not set");
    return unavailable(503);
  }
  return config;
}

/** GET /api/assistant: public info (display name, greeting, features). */
export async function handleInfo(request: Request, env: Env = process.env, fetchImpl: FetchLike = fetch): Promise<Response> {
  const config = configOrUnavailable(env);
  if (config instanceof Response) return config;
  const upstream = await callService(config, "", request, null, fetchImpl);
  return mapResponse(upstream, ["id", "displayName", "greeting", "features"]);
}

/** POST /api/assistant/chat: { sessionId, message } */
export async function handleChat(request: Request, env: Env = process.env, fetchImpl: FetchLike = fetch): Promise<Response> {
  const body = await readBody(request);
  const sessionId = str(body?.sessionId);
  const message = str(body?.message);
  if (!sessionId || !SESSION_ID_RE.test(sessionId) || !message?.trim() || message.length > 4000) {
    return errorResponse(400, "invalid_request", "The request is invalid.");
  }

  const config = configOrUnavailable(env);
  if (config instanceof Response) return config;
  // Only these fields are forwarded; anything else in the body is dropped.
  const upstream = await callService(config, "/chat", request, { sessionId, message }, fetchImpl);
  return mapResponse(upstream, ["reply", "emotion", "intent", "needsContactForm"]);
}

/** POST /api/assistant/contact: { sessionId, name, email, message, honeypot } */
export async function handleContact(request: Request, env: Env = process.env, fetchImpl: FetchLike = fetch): Promise<Response> {
  const body = await readBody(request);
  const fields = {
    sessionId: str(body?.sessionId),
    name: str(body?.name),
    email: str(body?.email),
    message: str(body?.message),
    honeypot: str(body?.honeypot) ?? "",
  };
  if (!fields.sessionId || !SESSION_ID_RE.test(fields.sessionId) || !fields.name || !fields.email || !fields.message) {
    return errorResponse(400, "invalid_request", "Please fill in your name, email and message.");
  }

  const config = configOrUnavailable(env);
  if (config instanceof Response) return config;
  const upstream = await callService(config, "/contact", request, fields, fetchImpl);
  return mapResponse(upstream, ["status"]);
}
