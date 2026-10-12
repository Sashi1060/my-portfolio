// Shapes shared by the browser chat component and the /api/assistant route handlers.
// Nothing secret belongs in this file: it is bundled for the browser.

export type AssistantEmotion = "neutral" | "happy" | "thinking" | "apologetic";
export type AssistantIntent = "greeting" | "answer" | "out_of_scope" | "contact_request" | "unknown";

export type AssistantInfo = {
  id: string;
  displayName: string;
  greeting: string;
  features: { contactForm: boolean };
};

/** A page of this site the assistant wants to open: "auto" = go now, "offer" = show a button. */
export type AssistantNavigation = {
  path: string;
  label: string;
  mode: "auto" | "offer";
};

export type AssistantReply = {
  reply: string;
  emotion: AssistantEmotion;
  intent: AssistantIntent;
  needsContactForm: boolean;
  navigation: AssistantNavigation | null;
};

export type AssistantErrorCode = "invalid_request" | "message_too_long" | "rate_limited" | "quota_exceeded" | "unavailable";

export type AssistantError = {
  error: {
    code: AssistantErrorCode;
    message: string;
    // Seconds to wait (rate_limited and quota_exceeded).
    retryAfter?: number;
    // True when the visitor should use the regular contact form instead.
    fallback?: boolean;
  };
};

export const MAX_MESSAGE_CHARS = 1000;

// A plain page path on this site: "/", "/projects", "/projects/orion-ai-desktop". Nothing else
// (no other sites, no "//host", no query strings) may ever be navigated to.
const SITE_PATH_RE = /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/;

export function isSitePath(value: unknown): value is string {
  return typeof value === "string" && value.length <= 120 && SITE_PATH_RE.test(value);
}

/** Keep a navigation object only if every field is valid; anything else becomes null. */
export function cleanNavigation(value: unknown): AssistantNavigation | null {
  if (!value || typeof value !== "object") return null;
  const { path, label, mode } = value as Record<string, unknown>;
  if (!isSitePath(path) || typeof label !== "string" || !label.trim() || (mode !== "auto" && mode !== "offer")) return null;
  return { path, label: label.trim().slice(0, 60), mode };
}
export const SESSION_STORAGE_KEY = "portfolio-assistant-session";
