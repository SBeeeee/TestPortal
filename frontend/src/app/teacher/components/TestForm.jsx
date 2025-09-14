"use client";
import { useState } from "react";

export default function TestForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    assignedTo: "", // 🔹 Added (comma-separated student emails/IDs)
    questions: [],  // 🔹 Optional (can start empty)
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 🔹 Convert assignedTo string to array
    const payload = {
      ...formData,
      assignedTo: formData.assignedTo
        ? formData.assignedTo.split(",").map(s => s.trim())
        : [],
    };

    onSubmit(payload); // 🔹 Now matches backend
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create New Test</h2>
            <p className="text-blue-100 text-sm">Set up your test details and configuration</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Test Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Test Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 p-4 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              placeholder="Enter test title (e.g., Mathematics Quiz Chapter 5)"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border-2 border-gray-200 p-4 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
              placeholder="Provide a brief description of the test, topics covered, and any special instructions..."
              required
            />
          </div>

          {/* Duration and Assignment Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Duration (minutes)
              </label>
              <input
                name="duration"
                type="number"
                min="1"
                max="300"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-4 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                placeholder="60"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Recommended: 1-2 minutes per question</p>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Assign to Students
              </label>
              <input
                name="assignedTo"
                type="text"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-4 rounded-xl text-gray-800 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                placeholder="student1@email.com, student2@email.com, student3@email.com"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter student email addresses separated by commas (leave empty to assign later)
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You can add questions after creating the test</span>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Test
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}