import React, { useState } from "react";
import { addTask } from "../lib/taskStore";

export default function TaskInput() {
  const [title, setTitle] = useState("");
  const [pomos, setPomos] = useState(1);

  function onAdd(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim(), Math.max(1, Math.floor(pomos)));
    setTitle("");
    setPomos(1);
  }

  return (
    <form onSubmit={onAdd} className="flex gap-2 mb-3">
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Add task (e.g. Write report)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-20 border rounded px-3 py-2"
        type="number"
        min={1}
        value={pomos}
        onChange={(e) => setPomos(Number(e.target.value))}
      />
      <button className="bg-sky-600 text-white px-3 py-2 rounded" type="submit">
        Add
      </button>
    </form>
  );
}
