"use client";
import { useDispatch, useSelector } from "react-redux";
import { updateTest } from "@/store/test/slice";
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import QuestionFormModal from "./QuestionFormModal";
import { createQuestionAPI } from "../api/question.api";

export default function TestDetail() {
  const { selectedTest } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedTest)
    return (
      <p className="p-6 text-gray-500 text-center">
        👆 Select a test to view details.
      </p>
    );

  // ✅ Handle new question creation
  const handleCreateQuestion = async (formData) => {
    try {
      const payload = { ...formData, testId: selectedTest._id };
      const res = await createQuestionAPI(payload);

      if (res.success) {
        alert("✅ Question added");
        const updated = {
          ...selectedTest,
          questions: [...(selectedTest.questions || []), res.data.data],
        };
        dispatch(updateTest(updated));
      }
    } catch (err) {
      console.error("Create Question Error:", err);
      alert(err.error || "❌ Failed to create question");
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      {/* Test Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{selectedTest.title}</h2>
        <p className="text-gray-600 mt-1">{selectedTest.description}</p>
        <div className="mt-2 text-sm text-gray-500 flex gap-4">
          <span>⏱ {selectedTest.duration} min</span>
          <span>📝 {selectedTest.questions?.length || 0} questions</span>
        </div>
      </div>

      {/* Questions */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-700 mb-3">Questions</h3>
        {selectedTest.questions?.length === 0 ? (
          <p className="text-gray-500 text-sm">No questions added yet.</p>
        ) : (
          <ul className="space-y-3">
            {selectedTest.questions?.map((q, index) => {
              const isOpen = openIndex === index;
              return (
                <li
                  key={q._id || q.id}
                  className="border rounded-lg bg-gray-50 hover:bg-white shadow-sm transition"
                >
                  {/* Question Header */}
                  <div
                    className="p-3 flex justify-between items-center cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <p className="text-gray-800 font-medium">
                      {index + 1}. {q.text}
                    </p>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  {/* Dropdown Content */}
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
                      {/* Options */}
                      <div>
                        <p className="font-medium text-gray-600 mb-1">Options:</p>
                        <ul className="space-y-1">
                          {q.options?.map((opt, i) => (
                            <li
                              key={i}
                              className={`p-2 rounded border ${
                                opt === q.correctOption
                                  ? "border-green-500 bg-green-50 text-green-700 flex items-center gap-2"
                                  : "border-gray-200"
                              }`}
                            >
                              {opt === q.correctOption && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              {opt}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Meta Info */}
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>📘 Subject: {q.subject || "N/A"}</span>
                        <span>⭐ Marks: {q.marks}</span>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Add Question */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
          >
            ➕ Add Question
          </button>
        </div>
      </div>

      {/* Modal */}
      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateQuestion}
      />
    </div>
  );
}
