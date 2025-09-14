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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Professional Sidebar */}
      <div className="w-72 bg-gradient-to-b  from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
        <div className="p-6">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-500 p-2 rounded-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">EduPortal</h1>
              <p className="text-slate-300 text-sm">Teacher Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                section === "tests" 
                ? "bg-blue-600 text-white shadow-lg transform scale-105" 
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
              onClick={() => setSection("tests")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Tests Management</span>
            </button>

            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                section === "students" 
                ? "bg-blue-600 text-white shadow-lg transform scale-105" 
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
              onClick={() => setSection("students")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>Students</span>
            </button>
          </nav>

          {/* Stats Cards */}
          <div className="mt-8 space-y-3">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Tests</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <div className="bg-green-500 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-white">248</p>
                </div>
                <div className="bg-blue-500 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {section === "tests" ? "Test Management" : "Student Management"}
          </h2>
          <p className="text-gray-600">
            {section === "tests" 
              ? "Create, edit and manage your tests" 
              : "View and manage student information"
            }
          </p>
        </div>

        {/* Content */}
        {section === "tests" && (
          <>
            {showForm ? (
              <TestForm
                onSubmit={handleCreateTest}
                onCancel={() => setShowForm(false)}
              />
            ) : (
              <div className="space-y-8">
                <TestList onCreate={() => setShowForm(true)} />
                <TestDetail />
              </div>
            )}
          </>
        )}

        {section === "students" && <StudentList />}
      </div>
    </div>
  );
}