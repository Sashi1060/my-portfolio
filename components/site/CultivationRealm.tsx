"use client";

import { useState, type CSSProperties } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

/** Deterministic decorative scenery; no downloaded assets or render loop. */
export default function CultivationRealm() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className={`cultivation-realm${paused ? " realm-paused" : ""}`} aria-hidden="true">
        <div className="realm-aurora realm-aurora-one" />
        <div className="realm-aurora realm-aurora-two" />
        <div className="realm-moon" />
        <svg className="realm-mountains" viewBox="0 0 1440 650" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountain-jade" x2="0" y2="1">
              <stop stopColor="#306a75" stopOpacity=".7" />
              <stop offset="1" stopColor="#071d29" />
            </linearGradient>
          </defs>
          <path fill="#163848" opacity=".65" d="M0 430 110 290 170 340 280 125 340 265 420 220 520 410 670 300 770 370 910 160 980 250 1080 80 1160 295 1240 230 1370 350 1440 240V650H0Z" />
          <path fill="url(#mountain-jade)" d="M0 550 120 410 205 460 310 280 370 390 450 340 590 540 710 430 820 490 970 330 1050 410 1160 245 1240 410 1330 350 1440 460V650H0Z" />
          <path fill="#071922" d="M0 590 170 520 290 575 430 460 560 570 740 510 890 590 1030 485 1150 550 1290 470 1440 540V650H0Z" />
        </svg>
        <div className="realm-mist realm-mist-one" />
        <div className="realm-mist realm-mist-two" />
        <div className="realm-seal">
          <div className="seal-orbit seal-orbit-outer" />
          <div className="seal-orbit seal-orbit-inner" />
          <div className="seal-diamond" />
          <div className="seal-core" />
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} className="seal-star" style={{ "--angle": `${i * 45}deg` } as CSSProperties} />
          ))}
        </div>
        {Array.from({ length: 32 }, (_, i) => (
          <i key={i} className="realm-mote" style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 23 + 7) % 100}%`,
            "--drift": `${(i % 2 ? 1 : -1) * (30 + i * 2)}px`,
            animationDelay: `${-i * 1.3}s`,
            animationDuration: `${12 + i % 9}s`,
          } as CSSProperties} />
        ))}
      </div>
      <button
        type="button"
        className="realm-motion-control"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        aria-label={paused ? "Resume ambient animations" : "Pause ambient animations"}
      >
        <Sparkles size={13} aria-hidden="true" />
        <span>Celestial realm</span>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
      </button>
    </>
  );
}
