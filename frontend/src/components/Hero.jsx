"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
          Welcome to Exam Portal
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern platform where <span className="font-semibold">Students</span> take tests and{" "}
          <span className="font-semibold">Teachers</span> manage them with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/login?role=student"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Login as Student
          </Link>
          <Link
            href="/auth/login?role=teacher"
            className="px-8 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300 transition"
          >
            Login as Teacher
          </Link>
        </div>
      </div>
    </section>
  );
}
