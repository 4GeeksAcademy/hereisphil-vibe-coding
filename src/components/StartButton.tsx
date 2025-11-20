export default function StartButton() {
  function onStart() {
    window.dispatchEvent(new CustomEvent("autopomo:start"));
  }

  return (
    <div>
      <button
        onClick={onStart}
        className="w-full bg-green-600 text-white px-4 py-3 rounded font-semibold"
      >
        Start Flow
      </button>
    </div>
  );
}
