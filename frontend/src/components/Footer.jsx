"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} ExamPortal. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}
