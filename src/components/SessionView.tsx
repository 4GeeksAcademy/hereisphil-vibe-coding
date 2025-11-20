import { useEffect, useState } from "react";
import type { Task } from "../lib/taskStore";
import { readTasks } from "../lib/taskStore";
import Timer from "./Timer";

export default function SessionView() {
  const [current, setCurrent] = useState<Task | null>(
    () => readTasks().find((x) => x.remaining > 0) ?? null
  );

  useEffect(() => {
    const onStorage = () =>
      setCurrent(readTasks().find((x) => x.remaining > 0) ?? null);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div>
      <Timer />
      {current ? (
        <div className="mt-3 p-3 border rounded bg-white">
          <div className="font-medium">{current.title}</div>
          <div className="text-sm text-slate-500">
            Remaining: {current.remaining} / {current.original}
          </div>
        </div>
      ) : (
        <div className="mt-3 text-sm text-slate-500">
          No active task. Add tasks and press Start Flow.
        </div>
      )}
    </div>
  );
}
