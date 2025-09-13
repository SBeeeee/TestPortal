"use client"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TestList from "./TestList";
import TestForm from "./TestForm";
import TestDetail from "./TestDetail";
import StudentList from "./StudentList";
import { createTestAPI, getAllTestsAPI } from "../api/test.api";
import { setTests } from "@/store/test/slice";

export default function DashboardLayout() {
  const [section, setSection] = useState("tests");
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  // ✅ Refresh tests from API
  const fetchTests = async () => {
    try {
      const response = await getAllTestsAPI();
      const tests = response.data?.data || [];
      dispatch(setTests(tests));
    } catch (err) {
      console.error("Failed to fetch tests:", err);
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    fetchTests();
  }, []);

  // ✅ Handle test creation
  const handleCreateTest = async (formData) => {
    try {
      const res = await createTestAPI(formData);

      if (res.success) {
        alert(res.message || "Test created successfully ✅");
        await fetchTests(); // refresh list after creation
      }
      setShowForm(false);
    } catch (err) {
      alert(err.error || "Failed to create test ❌");
      console.error("Create Test Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Teacher Dashboard</h1>
        <nav className="space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              section === "tests" ? "bg-gray-600" : ""
            }`}
            onClick={() => setSection("tests")}
          >
            Tests
          </button>
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              section === "students" ? "bg-gray-600" : ""
            }`}
            onClick={() => setSection("students")}
          >
            Students
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {section === "tests" && (
          <>
            {showForm ? (
              <TestForm
                onSubmit={handleCreateTest}  // ✅ Use our function
                onCancel={() => setShowForm(false)}
              />
            ) : (
              <>
                <TestList onCreate={() => setShowForm(true)} />
                <div className="mt-6">
                  <TestDetail />
                </div>
              </>
            )}
          </>
        )}

        {section === "students" && <StudentList />}
      </div>
    </div>
  );
}
