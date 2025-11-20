import { useEffect, useState } from "react";
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

  useEffect(() => {
    function startHandler() {
      const end = Date.now() + minutesToMs(WORK_MIN);
      setMode("work");
      setEndAt(end);
    }
    window.addEventListener("autopomo:start", startHandler as EventListener);
    return () =>
      window.removeEventListener(
        "autopomo:start",
        startHandler as EventListener
      );
  }, []);

  useEffect(() => {
    let raf = 0;
    function tick() {
      if (!endAt) return;
      const now = Date.now();
      const rem = Math.max(0, endAt - now);
      setRemainingMs(rem);
      if (rem <= 0) {
        if (mode === "work") {
          decrementCurrentTask();
          setCompletedPomos((c) => c + 1);
          const nextIsLong = (completedPomos + 1) % 4 === 0;
          const dur = nextIsLong
            ? minutesToMs(LONG_MIN)
            : minutesToMs(SHORT_MIN);
          setMode(nextIsLong ? "long_break" : "short_break");
          setEndAt(Date.now() + dur);
        } else {
          const tasks = readTasks();
          const hasRemaining = tasks.some((t) => t.remaining > 0);
          if (hasRemaining) {
            setMode("work");
            setEndAt(Date.now() + minutesToMs(WORK_MIN));
          } else {
            setMode("idle");
            setEndAt(null);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [endAt, mode, completedPomos]);

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
      </div>
      <div className="text-3xl font-mono my-2">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
}
