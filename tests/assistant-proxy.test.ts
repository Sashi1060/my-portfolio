// Tests for the /api/assistant route handlers. Run with: npm test
// Uses Node's built-in test runner (Node 24 runs TypeScript directly), so no extra packages.

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, beforeEach, describe, test } from "node:test";

import { handleChat, handleContact, handleInfo, readConfig, visitorIp } from "../lib/assistant/server.ts";
import { POST as chatRoute } from "../app/api/assistant/chat/route.ts";

const KEY = "test-secret-key-do-not-leak-1234567890";
const ENV = { CHARACTER_SERVICE_URL: "http://service.test/", CHARACTER_SERVICE_API_KEY: KEY };
const SESSION = "0b8c1a2e-1111-4a5b-9c3d-123456789abc";

type Call = { url: string; init: RequestInit; headers: Headers; body: Record<string, unknown> | null };

/** A fake character service: records each call and answers with the given response. */
function fakeService(respond: () => Response | Promise<Response>) {
  const calls: Call[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    calls.push({
      url: String(input),
      init,
      headers: new Headers(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return respond();
  }) as typeof fetch;
  return { calls, fetchImpl };
}

function browserRequest(path: string, body?: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`http://portfolio.test${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}

const ok = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  () => Response.json(data, { status, headers });

const chatReply = { reply: "Hello!", emotion: "happy", intent: "greeting", needsContactForm: false };

/** Everything the browser receives: status line, all headers, body. */
async function everythingSent(response: Response): Promise<string> {
  const headers = [...response.headers.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
  return `${response.status}\n${headers}\n${await response.text()}`;
}

describe("configuration", () => {
  test("missing URL or key gives null", () => {
    assert.equal(readConfig({}), null);
    assert.equal(readConfig({ CHARACTER_SERVICE_URL: "http://x" }), null);
    assert.equal(readConfig({ CHARACTER_SERVICE_API_KEY: "k" }), null);
  });

  test("trailing slash is removed", () => {
    assert.equal(readConfig(ENV)?.baseUrl, "http://service.test");
  });

  test("missing config returns 503 with fallback, without calling the service", async () => {
    const { calls, fetchImpl } = fakeService(ok(chatReply));
    const response = await handleChat(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }), {}, fetchImpl);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error.fallback, true);
    assert.equal(calls.length, 0);
  });
});

describe("the API key never reaches the browser", () => {
  const upstreams: Array<[string, () => Response]> = [
    ["200", ok(chatReply)],
    ["200 with extra fields", ok({ ...chatReply, debug: KEY, apiKey: KEY })],
    ["422", ok({ error: { code: "message_too_long", message: "Please keep your message under 1000 characters." } }, 422)],
    ["429", ok({ error: { code: "rate_limited", message: "x" } }, 429, { "Retry-After": "12" })],
    ["401 echoing the key", ok({ error: { code: "invalid_api_key", message: `bad key ${KEY}` } }, 401, { "X-API-Key": KEY })],
    ["503", ok({ error: { code: "budget_exhausted", message: "x" } }, 503)],
    ["500", () => new Response(`internal error ${KEY}`, { status: 500 })],
  ];

  for (const [name, respond] of upstreams) {
    test(`upstream ${name}`, async () => {
      const { calls, fetchImpl } = fakeService(respond);
      const response = await handleChat(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }), ENV, fetchImpl);
      assert.equal(calls[0].headers.get("x-api-key"), KEY, "the key is sent to the service");
      assert.ok(!(await everythingSent(response)).includes(KEY), "the key must not appear in the browser response");
    });
  }

  test("unknown fields from the service are not passed on", async () => {
    const { fetchImpl } = fakeService(ok({ ...chatReply, internal: "secret" }));
    const response = await handleChat(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }), ENV, fetchImpl);
    assert.deepEqual(await response.json(), chatReply);
  });

  test("no browser-side code reads the key or imports the server module", () => {
    const root = join(import.meta.dirname, "..");
    const browserDirs = ["app", "components", "lib"];
    const offenders: string[] = [];
    for (const dir of browserDirs) {
      for (const entry of readdirSync(join(root, dir), { recursive: true }) as string[]) {
        const path = join(root, dir, entry);
        const rel = relative(root, path).replaceAll("\\", "/");
        if (!/\.(ts|tsx)$/.test(rel) || rel.startsWith("app/api/") || rel === "lib/assistant/server.ts") continue;
        const source = readFileSync(path, "utf8");
        if (source.includes("CHARACTER_SERVICE_API_KEY") || /assistant\/server/.test(source)) offenders.push(rel);
      }
    }
    assert.deepEqual(offenders, []);
  });

  test("the key is never in a NEXT_PUBLIC_ variable", () => {
    const source = readFileSync(join(import.meta.dirname, "..", "lib", "assistant", "server.ts"), "utf8");
    assert.ok(!/NEXT_PUBLIC_[A-Z_]*KEY/.test(source));
  });
});

describe("visitor IP", () => {
  test("taken from x-real-ip, then the first x-forwarded-for entry", () => {
    assert.equal(visitorIp(new Headers({ "x-real-ip": "203.0.113.7", "x-forwarded-for": "198.51.100.1" })), "203.0.113.7");
    assert.equal(visitorIp(new Headers({ "x-forwarded-for": "198.51.100.1, 10.0.0.1" })), "198.51.100.1");
    assert.equal(visitorIp(new Headers({ "x-forwarded-for": "2001:db8::1" })), "2001:db8::1");
  });

  test("invalid values are ignored", () => {
    assert.equal(visitorIp(new Headers({ "x-real-ip": "not-an-ip", "x-forwarded-for": "<script>" })), null);
    assert.equal(visitorIp(new Headers()), null);
  });

  test("forwarded to the service as X-Visitor-IP", async () => {
    const { calls, fetchImpl } = fakeService(ok(chatReply));
    await handleChat(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }, { "x-real-ip": "203.0.113.7" }), ENV, fetchImpl);
    assert.equal(calls[0].headers.get("x-visitor-ip"), "203.0.113.7");
  });

  test("an IP in the request body is ignored and not forwarded", async () => {
    const { calls, fetchImpl } = fakeService(ok(chatReply));
    const body = { sessionId: SESSION, message: "hi", visitorIp: "1.2.3.4", ip: "1.2.3.4", "X-Visitor-IP": "1.2.3.4" };
    await handleChat(browserRequest("/api/assistant/chat", body), ENV, fetchImpl);
    assert.equal(calls[0].headers.get("x-visitor-ip"), null);
    assert.deepEqual(calls[0].body, { sessionId: SESSION, message: "hi" });
  });

  test("a browser can't set X-Visitor-IP or X-API-Key on the forwarded request", async () => {
    const { calls, fetchImpl } = fakeService(ok(chatReply));
    const headers = { "X-Visitor-IP": "1.2.3.4", "X-API-Key": "attacker-key" };
    await handleChat(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }, headers), ENV, fetchImpl);
    assert.equal(calls[0].headers.get("x-visitor-ip"), null);
    assert.equal(calls[0].headers.get("x-api-key"), KEY);
  });
});

describe("error mapping", () => {
  const send = (respond: () => Response | Promise<Response>) => {
    const { fetchImpl } = fakeService(respond);
    return handleChat(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }), ENV, fetchImpl);
  };

  test("200 passes the reply through", async () => {
    const response = await send(ok(chatReply));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
  });

  test("429 keeps Retry-After", async () => {
    const response = await send(ok({ error: { code: "rate_limited" } }, 429, { "Retry-After": "17" }));
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("retry-after"), "17");
    const body = await response.json();
    assert.equal(body.error.code, "rate_limited");
    assert.equal(body.error.retryAfter, 17);
  });

  test("429 without Retry-After defaults to 30 seconds", async () => {
    const body = await (await send(ok({}, 429))).json();
    assert.equal(body.error.retryAfter, 30);
  });

  test("422 passes the service's message", async () => {
    const response = await send(ok({ error: { code: "message_too_long", message: "Please keep your message under 1000 characters." } }, 422));
    assert.equal(response.status, 422);
    assert.deepEqual((await response.json()).error, {
      code: "message_too_long",
      message: "Please keep your message under 1000 characters.",
    });
  });

  test("503 (LLM down or budget used up) becomes 503 with fallback", async () => {
    const response = await send(ok({ error: { code: "budget_exhausted", message: "x" } }, 503));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error.fallback, true);
  });

  for (const status of [401, 403, 404, 500]) {
    test(`${status} becomes 502 with fallback`, async () => {
      const response = await send(ok({ error: { code: "x", message: "x" } }, status));
      assert.equal(response.status, 502);
      assert.deepEqual(Object.keys((await response.json()).error).sort(), ["code", "fallback", "message"]);
    });
  }

  test("network error becomes 502 with fallback", async () => {
    const response = await send(() => {
      throw new TypeError("fetch failed");
    });
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.fallback, true);
  });

  test("timeout becomes 502 with fallback", async () => {
    const { fetchImpl } = fakeService(() => Response.json(chatReply));
    const slow = (async (input: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
        setTimeout(() => resolve(fetchImpl(input, init)), 5_000).unref();
      })) as typeof fetch;
    const response = await handleChat(
      browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }),
      { ...ENV, CHARACTER_SERVICE_TIMEOUT_MS: "50" },
      slow,
    );
    assert.equal(response.status, 502);
  });

  test("a non-JSON success body becomes 502 with fallback", async () => {
    const response = await send(() => new Response("<html>proxy error</html>", { status: 200 }));
    assert.equal(response.status, 502);
  });
});

describe("request validation (before calling the service)", () => {
  const cases: Array<[string, unknown]> = [
    ["not JSON", "not json"],
    ["an array", [1, 2]],
    ["missing message", { sessionId: SESSION }],
    ["empty message", { sessionId: SESSION, message: "   " }],
    ["bad session id", { sessionId: "bad id!", message: "hi" }],
    ["message over 4000 chars", { sessionId: SESSION, message: "x".repeat(4001) }],
    ["body over 16 KB", { sessionId: SESSION, message: "hi", pad: "x".repeat(20_000) }],
  ];
  for (const [name, body] of cases) {
    test(name, async () => {
      const { calls, fetchImpl } = fakeService(ok(chatReply));
      const response = await handleChat(browserRequest("/api/assistant/chat", body), ENV, fetchImpl);
      assert.equal(response.status, 400);
      assert.equal(calls.length, 0);
    });
  }
});

describe("info and contact", () => {
  test("info is a GET to the character with only public fields", async () => {
    const info = { id: "portfolio-contact", displayName: "Portfolio Assistant", greeting: "Hi!", features: { contactForm: true } };
    const { calls, fetchImpl } = fakeService(ok({ ...info, extra: 1 }));
    const response = await handleInfo(browserRequest("/api/assistant"), ENV, fetchImpl);
    assert.equal(calls[0].url, "http://service.test/v1/characters/portfolio-contact");
    assert.equal(calls[0].init.method, "GET");
    assert.deepEqual(await response.json(), info);
  });

  test("contact forwards exactly the five fields, honeypot included", async () => {
    const { calls, fetchImpl } = fakeService(ok({ status: "received" }, 202));
    const body = { sessionId: SESSION, name: "Ada", email: "ada@example.com", message: "Hello", honeypot: "bot", role: "admin" };
    const response = await handleContact(browserRequest("/api/assistant/contact", body), ENV, fetchImpl);
    assert.equal(response.status, 202);
    assert.equal(calls[0].url, "http://service.test/v1/characters/portfolio-contact/contact");
    assert.deepEqual(calls[0].body, { sessionId: SESSION, name: "Ada", email: "ada@example.com", message: "Hello", honeypot: "bot" });
  });

  test("contact with missing fields is 400 without calling the service", async () => {
    const { calls, fetchImpl } = fakeService(ok({ status: "received" }, 202));
    const response = await handleContact(browserRequest("/api/assistant/contact", { sessionId: SESSION, name: "Ada" }), ENV, fetchImpl);
    assert.equal(response.status, 400);
    assert.equal(calls.length, 0);
  });
});

describe("route module", () => {
  const saved = { ...process.env };
  const realFetch = globalThis.fetch;
  let calls: Call[] = [];

  beforeEach(() => {
    Object.assign(process.env, ENV);
    const service = fakeService(ok(chatReply));
    calls = service.calls;
    globalThis.fetch = service.fetchImpl;
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
    for (const key of Object.keys(ENV)) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });

  test("POST /api/assistant/chat uses env config and global fetch", async () => {
    const response = await chatRoute(browserRequest("/api/assistant/chat", { sessionId: SESSION, message: "hi" }, { "x-forwarded-for": "198.51.100.9" }));
    assert.equal(response.status, 200);
    assert.equal(calls[0].url, "http://service.test/v1/characters/portfolio-contact/chat");
    assert.equal(calls[0].headers.get("x-visitor-ip"), "198.51.100.9");
  });
});
