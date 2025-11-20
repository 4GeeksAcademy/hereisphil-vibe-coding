import { useEffect, useState } from "react";
import type { Task } from "../lib/taskStore";
import { readTasks, removeTask, updateTask } from "../lib/taskStore";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => readTasks());

  useEffect(() => {
    const onStorage = () => setTasks(readTasks());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function onRemove(id: string) {
    removeTask(id);
    setTasks(readTasks());
  }

  function onReset(id: string) {
    updateTask(id, {
      remaining: tasks.find((t) => t.id === id)?.original ?? 1,
    });
    setTasks(readTasks());
  }

  if (tasks.length === 0)
    return <div className="text-sm text-slate-500">No tasks yet</div>;

  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li
          key={t.id}
          className="flex items-center justify-between border rounded p-2"
        >
          <div>
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-slate-500">
              {t.remaining} / {t.original} pomodoros
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onReset(t.id)}
              className="text-xs px-2 py-1 border rounded"
            >
              Reset
            </button>
            <button
              onClick={() => onRemove(t.id)}
              className="text-xs px-2 py-1 border rounded"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
