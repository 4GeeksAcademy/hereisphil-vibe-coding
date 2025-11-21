import { useEffect, useState } from "react";
import { audioManager } from "../lib/audioManager";
import { decrementCurrentTask, readTasks } from "../lib/taskStore";

type Mode = "idle" | "work" | "short_break" | "long_break";

const WORK_MIN = 25;
const SHORT_MIN = 5;
const LONG_MIN = 15;

function minutesToMs(m: number) {
  return m * 60 * 1000;
}

export default function Timer() {
  const [mode, setMode] = useState<Mode>("idle");
  const [endAt, setEndAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [completedPomos, setCompletedPomos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pausedAt, setPausedAt] = useState<number | null>(null);

  function handlePause() {
    if (paused || !endAt) return;
    setPaused(true);
    setPausedAt(Date.now());
    audioManager.stopTicking();
  }

  function handleResume() {
    if (!paused || !endAt || !pausedAt) return;
    const elapsed = Date.now() - pausedAt;
    setEndAt(endAt + elapsed);
    setPaused(false);
    setPausedAt(null);
    if (mode === "work") {
      audioManager.startTicking();
    }
  }

  function handleStop() {
    setMode("idle");
    setEndAt(null);
    setPaused(false);
    setPausedAt(null);
    setCompletedPomos(0);
    audioManager.stopTicking();
    window.dispatchEvent(new CustomEvent("autopomo:session-ended"));
  }

  useEffect(() => {
    function startHandler() {
      const end = Date.now() + minutesToMs(WORK_MIN);
      setMode("work");
      setEndAt(end);
      setPaused(false);
      audioManager.playBeginTask();
      audioManager.startTicking();
      window.dispatchEvent(new CustomEvent("autopomo:session-started"));
    }
    window.addEventListener("autopomo:start", startHandler as EventListener);
    return () =>
      window.removeEventListener(
        "autopomo:start",
        startHandler as EventListener
      );
  }, []);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.code === "Space" && mode !== "idle") {
        e.preventDefault();
        if (paused) {
          handleResume();
        } else {
          handlePause();
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [paused, mode]);

  useEffect(() => {
    let raf = 0;
    function tick() {
      if (!endAt || paused) return;
      const now = Date.now();
      const rem = Math.max(0, endAt - now);
      setRemainingMs(rem);
      if (rem <= 0) {
        if (mode === "work") {
          audioManager.stopTicking();
          decrementCurrentTask();
          setCompletedPomos((c) => c + 1);
          const nextIsLong = (completedPomos + 1) % 4 === 0;
          const dur = nextIsLong
            ? minutesToMs(LONG_MIN)
            : minutesToMs(SHORT_MIN);
          setMode(nextIsLong ? "long_break" : "short_break");
          setEndAt(Date.now() + dur);
          audioManager.playBreakStart();
        } else {
          const tasks = readTasks();
          const hasRemaining = tasks.some((t) => t.remaining > 0);
          if (hasRemaining) {
            setMode("work");
            setEndAt(Date.now() + minutesToMs(WORK_MIN));
            audioManager.playBeginTask();
            audioManager.startTicking();
          } else {
            setMode("idle");
            setEndAt(null);
            audioManager.stopTicking();
            window.dispatchEvent(new CustomEvent("autopomo:session-ended"));
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [endAt, mode, completedPomos, paused]);

  if (mode === "idle") return null;

  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="text-sm text-slate-500">
        {mode === "work"
          ? "Working"
          : mode === "short_break"
          ? "Short break"
          : "Long break"}
        {paused && " (Paused)"}
      </div>
      <div className="text-3xl font-mono my-2">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className="flex gap-2 mt-3">
        {!paused ? (
          <button
            onClick={handlePause}
            className="flex-1 text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={handleResume}
            className="flex-1 text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Resume
          </button>
        )}
        <button
          onClick={handleStop}
          className="flex-1 text-sm px-3 py-1 border rounded hover:bg-red-50 text-red-600"
        >
          Stop
        </button>
      </div>
      <div className="text-xs text-slate-400 mt-2">
        Press Space to pause/resume
      </div>
    </div>
  );
}
