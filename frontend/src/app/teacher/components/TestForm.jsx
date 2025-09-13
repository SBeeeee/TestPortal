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
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded-lg space-y-3"
    >
      <h2 className="text-lg font-bold">Create New Test</h2>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        name="duration"
        placeholder="Duration (mins)"
        value={formData.duration}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* 🔹 New field for assigned students */}
      <input
        name="assignedTo"
        placeholder="Assign to (comma-separated student emails)"
        value={formData.assignedTo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
