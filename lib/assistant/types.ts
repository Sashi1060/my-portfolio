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

export type AssistantReply = {
  reply: string;
  emotion: AssistantEmotion;
  intent: AssistantIntent;
  needsContactForm: boolean;
};

export type AssistantErrorCode = "invalid_request" | "message_too_long" | "rate_limited" | "unavailable";

export type AssistantError = {
  error: {
    code: AssistantErrorCode;
    message: string;
    // Seconds to wait (rate_limited only).
    retryAfter?: number;
    // True when the visitor should use the regular contact form instead.
    fallback?: boolean;
  };
};

export const MAX_MESSAGE_CHARS = 1000;
export const SESSION_STORAGE_KEY = "portfolio-assistant-session";
