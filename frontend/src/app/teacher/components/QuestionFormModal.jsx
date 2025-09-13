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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">➕ Add Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question Text */}
          <input
            type="text"
            placeholder="Question text"
            value={form.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          {/* Subject */}
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          {/* Options */}
          {form.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          ))}

          {/* Correct Option */}
          <select
            value={form.correctOption}
            onChange={(e) => handleChange("correctOption", e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select correct option</option>
            {form.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt || `Option ${i + 1}`}
              </option>
            ))}
          </select>

          {/* Marks */}
          <input
            type="number"
            min="1"
            value={form.marks}
            onChange={(e) => handleChange("marks", e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Marks"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
