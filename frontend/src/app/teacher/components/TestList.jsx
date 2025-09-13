"use client";
import { useDispatch, useSelector } from "react-redux";
import { setTests, setSelectedTest } from "@/store/test/slice";
import { useEffect } from "react";
import { getAllTestsAPI } from "../api/test.api";

export default function TestList({ onCreate }) {
  const { tests } = useSelector((state) => state.test);
  const dispatch = useDispatch();

  
  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">📚 All Tests</h2>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
        >
          + New Test
        </button>
      </div>

      {/* Tests List */}
      {tests.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No tests created yet.</p>
      ) : (
        <div className="grid gap-4">
          {tests.map((test) => (
            <div
              key={test._id}
              onClick={() => dispatch(setSelectedTest(test))}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-gray-50 hover:bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {test.title}
              </h3>
              <p className="text-sm text-gray-600">{test.description}</p>
              <div className="mt-2 flex items-center text-xs text-gray-500 gap-4">
                <span>⏱ {test.duration} min</span>
                <span>📝 {test.questions?.length || 0} questions</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
