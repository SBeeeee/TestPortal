export default function QuestionCard({ question, index, selected, onSelect }) {
    if (!question) return null;
    return (
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="font-semibold text-gray-800 mb-4">
          Q{index + 1}. {question.text}
        </h2>
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={`q-${question._id}`}
                value={opt}
                checked={selected === opt}
                onChange={() => onSelect(question._id, opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
  