export type Task = {
  id: string;
  title: string;
  remaining: number;
  original: number;
};

const STORAGE_KEY = "autopomo:tasks";

export function readTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch (e) {
    console.error("readTasks", e);
    return [];
  }
}

function notifyTasksChanged() {
  window.dispatchEvent(new CustomEvent("autopomo:tasks-changed"));
}

export function writeTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  notifyTasksChanged();
}

export function addTask(title: string, pomos: number) {
  const tasks = readTasks();
  const t: Task = {
    id: crypto.randomUUID(),
    title,
    remaining: pomos,
    original: pomos,
  };
  tasks.push(t);
  writeTasks(tasks);
}

export function updateTask(id: string, patch: Partial<Task>) {
  const tasks = readTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return;
  tasks[idx] = { ...tasks[idx], ...patch };
  writeTasks(tasks);
}

export function removeTask(id: string) {
  const tasks = readTasks().filter((t) => t.id !== id);
  writeTasks(tasks);
}

export function decrementCurrentTask() {
  const tasks = readTasks();
  if (tasks.length === 0) return;
  // find first task with remaining > 0
  const idx = tasks.findIndex((t) => t.remaining > 0);
  if (idx === -1) return;
  tasks[idx].remaining = Math.max(0, tasks[idx].remaining - 1);
  writeTasks(tasks);
}
