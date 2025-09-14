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
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No test selected</h3>
        <p className="text-gray-500">Select a test from the list above to view details</p>
      </div>
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className=" bg-opacity-20 p-3 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedTest.title}</h2>
              <p className="text-indigo-100 mt-1">{selectedTest.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-white">
            <div className=" bg-opacity-20 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{selectedTest.duration} min</span>
              </div>
            </div>
            <div className=" bg-opacity-20 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{selectedTest.questions?.length || 0} questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Questions Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Questions Management
          </h3>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Question</span>
          </button>
        </div>

        {/* Questions List */}
        {selectedTest.questions?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-600 mb-2">No questions added yet</h4>
            <p className="text-gray-500 mb-4">Start building your test by adding questions</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Add Your First Question
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedTest.questions?.map((q, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={q._id || q.id}
                  className="border-2 border-gray-200 rounded-xl bg-white hover:border-indigo-300 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {/* Question Header */}
                  <div
                    className="p-5 flex justify-between items-center cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-indigo-100 text-indigo-600 font-bold text-sm px-3 py-1 rounded-full">
                        Q{index + 1}
                      </div>
                      <p className="text-gray-800 font-semibold text-lg flex-1">
                        {q.text}
                      </p>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {q.marks} mark{q.marks !== 1 ? 's' : ''}
                        </span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {q.subject || 'General'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </div>
                  </div>

                  {/* Dropdown Content */}
                  {isOpen && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      {/* Options */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          Answer Options:
                        </h5>
                        <div className="grid gap-3">
                          {q.options?.map((opt, i) => (
                            <div
                              key={i}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                opt === q.correctOption
                                  ? "border-green-400 bg-green-50 shadow-md"
                                  : "border-gray-200 bg-white"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                {opt === q.correctOption && (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                                <span className={`font-semibold ${
                                  opt === q.correctOption ? "text-green-700" : "text-gray-600"
                                }`}>
                                  {String.fromCharCode(65 + i)}.
                                </span>
                                <span className={`${
                                  opt === q.correctOption ? "text-green-800 font-medium" : "text-gray-700"
                                }`}>
                                  {opt}
                                </span>
                                {opt === q.correctOption && (
                                  <span className="ml-auto bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Correct Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
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