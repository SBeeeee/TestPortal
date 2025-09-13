"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          ExamPortal
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-indigo-600 transition">
            Home
          </Link>
          <Link href="/auth/login?role=student" className="text-gray-700 hover:text-indigo-600 transition">
            Student Login
          </Link>
          <Link href="/auth/login?role=teacher" className="text-gray-700 hover:text-indigo-600 transition">
            Teacher Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
