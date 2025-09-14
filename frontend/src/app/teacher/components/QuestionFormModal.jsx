"use client";
import { useState } from "react";

export default function QuestionFormModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    text: "",
    subject: "",
    options: ["", "", "", ""],
    correctOption: "",
    marks: 1,
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (i, value) => {
    const updated = [...form.options];
    updated[i] = value;
    setForm((prev) => ({ ...prev, options: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
    setForm({
      text: "",
      subject: "",
      options: ["", "", "", ""],
      correctOption: "",
      marks: 1,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New Question</h2>
                <p className="text-green-100 text-sm">Create a multiple choice question</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Question Text
              </label>
              <textarea
                value={form.text}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-xl text-gray-800 focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
                rows="4"
                placeholder="Enter your question here..."
                required
              />
            </div>

            {/* Subject & Marks Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl text-gray-800 focus:border-green-500 focus:outline-none transition-colors duration-200"
                  placeholder="e.g. Mathematics, Science"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Marks
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.marks}
                  onChange={(e) => handleChange("marks", parseInt(e.target.value))}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl text-gray-800 focus:border-green-500 focus:outline-none transition-colors duration-200"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Answer Options
              </label>
              <div className="space-y-3">
                {form.options.map((opt, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="bg-gray-100 text-gray-600 font-bold text-sm px-3 py-2 rounded-lg min-w-[40px] text-center">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      className="flex-1 border-2 border-gray-200 p-3 rounded-xl text-gray-800 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Correct Option */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Correct Answer
              </label>
              <select
                value={form.correctOption}
                onChange={(e) => handleChange("correctOption", e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded-xl text-gray-800 focus:border-green-500 focus:outline-none transition-colors duration-200"
                required
              >
                <option value="">Select the correct answer</option>
                {form.options.map((opt, i) => (
                  <option key={i} value={opt} disabled={!opt.trim()}>
                    {opt.trim() ? `${String.fromCharCode(65 + i)}. ${opt}` : `Option ${String.fromCharCode(65 + i)} (empty)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}