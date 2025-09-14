export default function QuestionNavigator({ questions, answers, currentIndex, onJump }) {
    return (
      <div>
        <h3 className="font-semibold mb-4">Questions</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, i) => (
            <button
              key={q._id}
              onClick={() => onJump(i)}
              className={`w-10 h-10 rounded-full text-sm 
                ${i === currentIndex ? "bg-indigo-600 text-white" : answers[q._id] ? "bg-green-200" : "bg-gray-200"}
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
  