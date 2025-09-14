export default function TestHeader({ title, timeLeft, onSubmit }) {
    const formatTime = (sec) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    };
  
    return (
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center gap-6">
          <span className="font-mono">⏱ {formatTime(timeLeft)}</span>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Submit
          </button>
        </div>
      </header>
    );
  }
  