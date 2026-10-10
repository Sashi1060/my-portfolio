"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";

import { submitToFormsubmit } from "@/lib/formsubmit";
import {
  MAX_MESSAGE_CHARS,
  SESSION_STORAGE_KEY,
  type AssistantError,
  type AssistantInfo,
  type AssistantReply,
} from "@/lib/assistant/types";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  offerContactForm?: boolean;
};

type Notice = { kind: "rate" | "unavailable" | "network" | "invalid"; text: string };

const FALLBACK_TEXT = "The assistant is unavailable right now. You can still reach Sashank with the contact form below.";
const NETWORK_TEXT = "Couldn't reach the assistant. Check your connection, or use the contact form below.";

function newId(): string {
  return crypto.randomUUID();
}

/** One id per browser tab, kept in sessionStorage so a reload continues the conversation. */
function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing && /^[A-Za-z0-9_-]{8,64}$/.test(existing)) return existing;
    const created = crypto.randomUUID();
    sessionStorage.setItem(SESSION_STORAGE_KEY, created);
    return created;
  } catch {
    // Storage blocked (e.g. some private modes): use an id for this page view only.
    return crypto.randomUUID();
  }
}

async function readError(response: Response): Promise<AssistantError["error"] | null> {
  try {
    const body = (await response.json()) as AssistantError;
    return body.error ?? null;
  } catch {
    return null;
  }
}

export default function AssistantChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [info, setInfo] = useState<AssistantInfo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [retryUntil, setRetryUntil] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  // Session id and greeting.
  useEffect(() => {
    setSessionId(getSessionId());
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/assistant", { cache: "no-store" });
        if (!response.ok) throw new Error(String(response.status));
        const data = (await response.json()) as AssistantInfo;
        if (cancelled) return;
        setInfo(data);
        setMessages([{ id: newId(), role: "assistant", text: data.greeting }]);
      } catch (error) {
        if (cancelled) return;
        const offline = error instanceof TypeError;
        setNotice({ kind: offline ? "network" : "unavailable", text: offline ? NETWORK_TEXT : FALLBACK_TEXT });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Countdown after a 429.
  useEffect(() => {
    if (!retryUntil) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((retryUntil - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        setRetryUntil(null);
        setNotice((current) => (current?.kind === "rate" ? null : current));
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [retryUntil]);

  // Keep the newest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, notice]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || !sessionId || sending || retryUntil) return;

    setMessages((current) => [...current, { id: newId(), role: "user", text }]);
    setInput("");
    setSending(true);
    setNotice(null);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
      });

      if (response.ok) {
        const data = (await response.json()) as AssistantReply;
        setMessages((current) => [
          ...current,
          { id: newId(), role: "assistant", text: data.reply, offerContactForm: data.needsContactForm },
        ]);
        return;
      }

      const error = await readError(response);
      if (response.status === 429) {
        const wait = error?.retryAfter ?? (Number(response.headers.get("Retry-After")) || 30);
        setRetryUntil(Date.now() + wait * 1000);
        setNotice({ kind: "rate", text: "You're sending messages quickly." });
      } else if (response.status === 422 || response.status === 400) {
        setNotice({ kind: "invalid", text: error?.message ?? "Please check your message and try again." });
      } else {
        setNotice({ kind: "unavailable", text: FALLBACK_TEXT });
      }
    } catch {
      setNotice({ kind: "network", text: NETWORK_TEXT });
    } finally {
      setSending(false);
    }
  }, [input, sessionId, sending, retryUntil]);

  const latestFormId = [...messages].reverse().find((m) => m.offerContactForm)?.id;
  const blocked = !sessionId || sending || Boolean(retryUntil) || !info;

  return (
    <section className="soft-card p-6" aria-labelledby="assistant-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="assistant-title" className="field-label flex items-center gap-2 text-[var(--ink)]">
            <Bot className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            {info?.displayName ?? "Portfolio Assistant"}
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Ask about Sashank&apos;s work, projects or background, or leave a message.
          </p>
        </div>
        <span className="chip border-[var(--accent)] text-[var(--accent)]">AI assistant</span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AI assistant"
        className="mt-5 max-h-[26rem] min-h-[8rem] space-y-3 overflow-y-auto rounded border border-[var(--line)] bg-white p-4"
      >
        {messages.length === 0 && !notice && <p className="text-sm text-[var(--ink-soft)]">Connecting to the assistant…</p>}

        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className="max-w-[85%]">
              <p className="mb-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                {message.role === "user" ? "You" : "AI assistant"}
              </p>
              <p
                className={`whitespace-pre-wrap rounded border px-3.5 py-2.5 text-sm leading-6 text-[var(--ink)] ${
                  message.role === "user" ? "border-[var(--accent)] bg-[var(--bg)]" : "border-[var(--line)] bg-[var(--card-bg)]"
                }`}
              >
                {message.text}
              </p>
              {message.id === latestFormId && sessionId && <ContactInChat sessionId={sessionId} />}
            </div>
          </div>
        ))}

        {sending && <p className="text-sm text-[var(--ink-soft)]">The assistant is thinking…</p>}

        {notice && (
          <p role="status" className="rounded border border-[var(--line)] bg-[var(--card-bg)] px-3.5 py-2.5 text-sm text-[var(--ink)]">
            {notice.kind === "rate" ? `${notice.text} Please wait ${secondsLeft} second${secondsLeft === 1 ? "" : "s"}.` : notice.text}
            {(notice.kind === "unavailable" || notice.kind === "network") && (
              <>
                {" "}
                <a href="#contact-form" className="font-semibold text-[var(--accent)] underline">
                  Go to the contact form
                </a>
              </>
            )}
          </p>
        )}
      </div>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          void send();
        }}
      >
        <div className="flex-1">
          <label htmlFor="assistant-input" className="sr-only">
            Your message to the AI assistant
          </label>
          <textarea
            id="assistant-input"
            rows={2}
            maxLength={MAX_MESSAGE_CHARS}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send();
              }
            }}
            placeholder="Ask a question…"
            className="field resize-none"
            disabled={!info}
          />
          <p className="mt-1 text-right font-mono text-[0.65rem] text-[var(--ink-soft)]">
            {input.length}/{MAX_MESSAGE_CHARS}
          </p>
        </div>
        <button type="submit" disabled={blocked || !input.trim()} className="btn-primary disabled:cursor-not-allowed disabled:opacity-50 sm:mb-5">
          {sending ? "Sending…" : "Send"}
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <p className="text-xs leading-5 text-[var(--ink-soft)]">
        Replies are written by an AI using information from this site and may be incomplete. Please don&apos;t share
        sensitive personal information.
      </p>
    </section>
  );
}

type ContactState = { kind: "idle" | "sending" | "sent" | "error"; text?: string };

/** Name / email / message form shown inside the chat when the assistant offers to pass a message on. */
function ContactInChat({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<ContactState>({ kind: "idle" });

  if (state.kind === "sent") {
    return (
      <p role="status" className="mt-2 rounded border border-[var(--accent)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--ink)]">
        {state.text}
      </p>
    );
  }

  const submit = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      honeypot: String(data.get("website") ?? ""),
    };
    setState({ kind: "sending" });

    let useFallback = false;
    try {
      const response = await fetch("/api/assistant/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...fields }),
      });
      if (response.ok) {
        setState({ kind: "sent", text: "Thanks! Your message is on its way to Sashank." });
        return;
      }
      const error = await readError(response);
      if (response.status === 429) {
        setState({ kind: "error", text: `Too many messages. Please try again in ${error?.retryAfter ?? 60} seconds.` });
        return;
      }
      if (response.status === 422 || response.status === 400) {
        setState({ kind: "error", text: error?.message ?? "Please check your name, email and message." });
        return;
      }
      useFallback = true;
    } catch {
      useFallback = true;
    }

    if (useFallback) {
      // Service unreachable or unavailable: send through the original contact form service.
      if (fields.honeypot) {
        setState({ kind: "sent", text: "Thanks! Your message is on its way to Sashank." });
        return;
      }
      const ok = await submitToFormsubmit({
        name: fields.name,
        email: fields.email,
        subject: "Message from the portfolio assistant",
        message: fields.message,
        _captcha: "false",
        _template: "table",
      });
      setState(
        ok
          ? { kind: "sent", text: "Thanks! Your message is on its way to Sashank." }
          : { kind: "error", text: "Sorry, the message couldn't be sent. Please use the contact form below." },
      );
    }
  };

  return (
    <form
      className="relative mt-2 space-y-3 rounded border border-[var(--line)] bg-white p-3.5"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(event.currentTarget);
      }}
    >
      <p className="field-label text-[var(--ink)]">Leave a message</p>
      {/* Honeypot: hidden from people, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="assistant-contact-website">Website</label>
        <input id="assistant-contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="assistant-contact-name" className="field-label mb-1.5 block">
          Name
        </label>
        <input id="assistant-contact-name" name="name" required maxLength={100} className="field" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="assistant-contact-email" className="field-label mb-1.5 block">
          Email
        </label>
        <input id="assistant-contact-email" name="email" type="email" required className="field" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="assistant-contact-message" className="field-label mb-1.5 block">
          Message
        </label>
        <textarea id="assistant-contact-message" name="message" required rows={3} maxLength={4000} className="field resize-none" />
      </div>
      {state.kind === "error" && <p role="alert" className="text-sm text-red-600">{state.text}</p>}
      <button type="submit" disabled={state.kind === "sending"} className="btn-secondary w-full disabled:opacity-50">
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
