"use client";

// Floating AI assistant, bottom right on every page. Nothing heavy loads until a visitor opens it:
// the chat (and its first call to the assistant) and the 3D avatar (three.js + the model) are
// both fetched on first open, and stay mounted afterwards so the conversation survives
// navigation between pages.

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { X } from "lucide-react";

import type { AssistantEmotion } from "@/lib/assistant/types";
import { OPEN_ASSISTANT_EVENT } from "@/lib/assistant/events";
import { MOOD_HOLD_MS, chooseAvatarMode, talkDurationMs, type AvatarMode, type AvatarMood } from "@/lib/avatar/behaviour";
import type { AvatarStatus } from "@/components/assistant/AvatarStage";

const MODEL_URL = "/avatar/buu.vrm";
const PORTRAIT_URL = "/avatar/buu-portrait-512.webp";
const FACE_URL = "/avatar/buu-face-160.webp";

const AssistantChat = dynamic(() => import("@/components/assistant/AssistantChat"), {
  ssr: false,
  loading: () => <p className="px-4 py-4 text-sm text-[var(--ink-soft)]">Connecting to the assistant…</p>,
});

type StageProps = {
  modelUrl: string;
  mood: AvatarMood;
  thinking: boolean;
  talkUntil: number;
  active: boolean;
  onStatus: (status: AvatarStatus, progress?: number) => void;
};

function detectAvatarMode(): AvatarMode {
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webgl = false;
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return chooseAvatarMode({ webgl, reducedMotion, saveData: Boolean(connection?.saveData) });
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [mode, setMode] = useState<AvatarMode | null>(null);
  const [Stage, setStage] = useState<ComponentType<StageProps> | null>(null);
  const [status, setStatus] = useState<AvatarStatus>("loading");
  const [progress, setProgress] = useState(0);
  const [mood, setMood] = useState<AvatarMood>("neutral");
  const [thinking, setThinking] = useState(false);
  const [talkUntil, setTalkUntil] = useState(0);
  const moodTimer = useRef<number | undefined>(undefined);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => {
    setOpen(true);
    setEverOpened(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Other pages can open the widget.
  useEffect(() => {
    window.addEventListener(OPEN_ASSISTANT_EVENT, show);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, show);
  }, [show]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

  // First open: decide 3D or still image.
  useEffect(() => {
    if (everOpened && !mode) setMode(detectAvatarMode());
  }, [everOpened, mode]);

  // Load three.js and the avatar code only for 3D.
  useEffect(() => {
    if (mode !== "3d") return;
    let cancelled = false;
    import("@/components/assistant/AvatarStage")
      .then((module) => {
        if (!cancelled) setStage(() => module.default);
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);

  useEffect(() => () => window.clearTimeout(moodTimer.current), []);

  const onStatus = useCallback((next: AvatarStatus, value?: number) => {
    setStatus(next);
    if (value !== undefined) setProgress(value);
  }, []);

  const onAssistantMessage = useCallback((message: { text: string; emotion: AssistantEmotion }) => {
    const duration = talkDurationMs(message.text);
    setMood(message.emotion);
    setTalkUntil(Date.now() + duration);
    window.clearTimeout(moodTimer.current);
    moodTimer.current = window.setTimeout(() => setMood("neutral"), duration + MOOD_HOLD_MS);
  }, []);

  const showStill = mode !== "3d" || status !== "ready";

  return (
    <>
      {everOpened && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-widget-title"
          className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} flex-col overflow-hidden bg-[var(--card-bg)] sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(40rem,calc(100dvh-8rem))] sm:w-[24rem] sm:rounded-[20px] sm:border sm:border-[var(--line)] sm:shadow-[0_24px_60px_rgb(23_40_73/18%)]`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] bg-white/80 px-4 py-3">
            <div className="min-w-0">
              <h2 id="assistant-widget-title" className="field-label text-[var(--ink)]">
                Portfolio Assistant
              </h2>
              <p className="mt-0.5 text-xs text-[var(--ink-soft)]">Ask about Sashank&apos;s work, or leave a message.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="chip border-[var(--accent)] text-[var(--accent)]">AI</span>
              <button
                type="button"
                onClick={hide}
                aria-label="Close the assistant"
                className="rounded-lg p-1.5 text-[var(--ink-soft)] transition hover:bg-[var(--bg)] hover:text-[var(--ink)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Avatar: decorative, so hidden from screen readers. */}
          <div
            aria-hidden="true"
            className="relative h-44 shrink-0 overflow-hidden sm:h-52"
            style={{
              background:
                "radial-gradient(ellipse at 50% 35%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%), var(--gradient-paper)",
            }}
          >
            {mode === "3d" && Stage && status !== "failed" && (
              <div className={`absolute inset-0 transition-opacity duration-500 ${status === "ready" ? "opacity-100" : "opacity-0"}`}>
                <Stage
                  modelUrl={MODEL_URL}
                  mood={mood}
                  thinking={thinking}
                  talkUntil={talkUntil}
                  active={open}
                  onStatus={onStatus}
                />
              </div>
            )}
            {showStill && (
              <Image
                src={PORTRAIT_URL}
                alt=""
                width={512}
                height={512}
                priority={false}
                className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover shadow-md sm:h-40 sm:w-40"
              />
            )}
            {mode === "3d" && status === "loading" && (
              <div className="absolute inset-x-6 bottom-3 h-1 overflow-hidden rounded-full bg-white/70">
                <div className="h-full bg-[var(--accent)] transition-[width]" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
            )}
          </div>

          <div className="min-h-0 flex-1 bg-[var(--card-bg)]">
            <AssistantChat onSendingChange={setThinking} onAssistantMessage={onAssistantMessage} />
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={open ? hide : show}
        aria-expanded={open}
        aria-label={open ? "Close the AI assistant" : "Chat with the AI assistant"}
        className={`fixed bottom-5 right-5 z-50 h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-[0_10px_30px_rgb(23_40_73/25%)] ring-2 ring-[var(--accent)] transition hover:scale-105 ${
          open ? "hidden sm:block" : ""
        }`}
      >
        {open ? (
          <span className="flex h-full w-full items-center justify-center bg-[var(--accent)] text-white">
            <X className="h-6 w-6" aria-hidden="true" />
          </span>
        ) : (
          <Image src={FACE_URL} alt="" width={160} height={160} className="h-full w-full object-cover" />
        )}
      </button>
    </>
  );
}
