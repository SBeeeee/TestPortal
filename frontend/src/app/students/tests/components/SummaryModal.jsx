export default function SummaryModal({ test, answers, onClose }) {
    const attempted = Object.keys(answers).length;
    const total = test.questions.length;
  
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Test Summary</h2>
          <p>Attempted: {attempted} / {total}</p>
          <p>Unattempted: {total - attempted}</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
  