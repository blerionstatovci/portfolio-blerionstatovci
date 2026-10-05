import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

type LockState = "locked" | "dragging" | "unlocking" | "unlocked";

export function LockScreen({
  time,
  reducedMotion,
  onUnlocked,
}: {
  time: Date;
  reducedMotion: boolean;
  onUnlocked: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LockState>("locked");
  const [progress, setProgress] = useState(0);
  const pointerId = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);

  const complete = () => {
    if (state === "unlocking" || state === "unlocked") return;
    setProgress(1);
    setState("unlocking");
    finishTimer.current = window.setTimeout(() => {
      setState("unlocked");
      onUnlocked();
    }, reducedMotion ? 80 : 650);
  };

  useEffect(() => () => {
    if (finishTimer.current) window.clearTimeout(finishTimer.current);
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (pointerId.current !== event.pointerId || !trackRef.current || state !== "dragging") return;
      const rect = trackRef.current.getBoundingClientRect();
      const handle = 56;
      setProgress(
        Math.min(1, Math.max(0, (event.clientX - rect.left - handle / 2) / (rect.width - handle))),
      );
    };

    const up = (event: PointerEvent) => {
      if (pointerId.current !== event.pointerId) return;
      pointerId.current = null;
      if (progress >= 0.87) {
        setProgress(1);
        setState("unlocking");
        finishTimer.current = window.setTimeout(() => {
          setState("unlocked");
          onUnlocked();
        }, reducedMotion ? 80 : 650);
      } else {
        setProgress(0);
        setState("locked");
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [state, progress, reducedMotion, onUnlocked]);

  const start = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (state !== "locked") return;
    pointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setState("dragging");
  };

  const label =
    state === "unlocking"
      ? "UNLOCKING..."
      : progress >= 0.5
        ? "ALMOST THERE"
        : state === "dragging"
          ? "KEEP GOING →"
          : "SWIPE TO UNLOCK";

  const handleKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      complete();
    }
  };

  return (
    <motion.div
      className={`lock-screen ${state === "unlocking" ? "is-unlocking" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
    >
      <div className="lock-content">
        <div className="lock-time">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="lock-date">
          {time.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" })}
        </div>
        <div className="lock-profile">
          <span className="lock-avatar">BS</span>
          <strong>{profile.name}</strong>
          <span>{profile.roleTitle}</span>
        </div>
      </div>
      <div className="swipe-area">
        <div
          ref={trackRef}
          className={`swipe-track ${state === "dragging" ? "is-dragging" : ""}`}
          style={{ "--swipe-progress": progress } as React.CSSProperties}
          onClick={() => {
            if (state === "locked") complete();
          }}
          role="presentation"
        >
          <div className="swipe-progress" />
          <span className={`swipe-label ${state === "locked" ? "is-shimmering" : ""}`}>
            {state === "unlocking" ? <Check size={14} /> : null}
            {label}
          </span>
          <button
            className="swipe-handle"
            style={{ transform: `translateX(calc(${progress} * (100% - 56px)))` }}
            onPointerDown={start}
            onKeyDown={handleKey}
            aria-label="Swipe to unlock"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            role="slider"
          >
            <span>{state === "unlocking" ? <Check size={18} /> : <ArrowRight size={18} />}</span>
          </button>
          <span className="swipe-end">
            <LockKeyhole size={14} />
          </span>
        </div>
        <small className="lock-hint">Drag the handle to enter your workspace</small>
      </div>
      <div className="lock-footer">
        <span>
          <LockKeyhole size={12} /> BLERION OS
        </span>
        <span>SECURE SESSION</span>
      </div>
    </motion.div>
  );
}
