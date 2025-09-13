export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 items-center justify-center text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            Exam Portal
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Join as a <span className="font-bold">Student</span> to take tests or as a{" "}
            <span className="font-bold">Teacher</span> to create them.
          </p>
          <img
            src="https://img.freepik.com/free-vector/online-exam-concept-illustration_114360-7929.jpg"
            alt="Exam Illustration"
            className="mt-10 max-w-sm mx-auto rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
