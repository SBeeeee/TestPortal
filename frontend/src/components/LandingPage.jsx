"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">
          Welcome to Exam Portal
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern platform for Students to take tests and Teachers to manage them.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login?role=student"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Login as Student
          </Link>
          <Link
            href="/auth/login?role=teacher"
            className="px-6 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300 transition"
          >
            Login as Teacher
          </Link>
        </div>
      </div>
    </main>
  );
}
