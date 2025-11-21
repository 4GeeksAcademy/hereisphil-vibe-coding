import { useEffect, useState } from "react";

export default function StartButton() {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    const onStart = () => setSessionActive(true);
    const onEnd = () => setSessionActive(false);
    window.addEventListener("autopomo:session-started", onStart);
    window.addEventListener("autopomo:session-ended", onEnd);
    return () => {
      window.removeEventListener("autopomo:session-started", onStart);
      window.removeEventListener("autopomo:session-ended", onEnd);
    };
  }, []);

  function onStart() {
    window.dispatchEvent(new CustomEvent("autopomo:start"));
  }

  return (
    <div>
      <button
        onClick={onStart}
        disabled={sessionActive}
        className={
          sessionActive
            ? "w-full bg-gray-400 text-white px-4 py-3 rounded font-semibold cursor-not-allowed"
            : "w-full bg-green-600 text-white px-4 py-3 rounded font-semibold cursor-pointer hover:bg-green-700 transition"
        }
      >
        {sessionActive ? "Session Running..." : "Start Flow"}
      </button>
    </div>
  );
}
