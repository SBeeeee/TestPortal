"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PrivateRoute from "@/utils/Private";
import { getTestByIdAPI } from "@/app/students/api/test.api";
import { getStudentResultsAPI } from "@/app/students/api/result.api";
import dayjs from "dayjs";

export default function TestSummary() {
  const { testid } = useParams();
  const [test, setTest] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const testRes = await getTestByIdAPI(testid);
      setTest(testRes);

      const resultsRes = await getStudentResultsAPI();
      const r = resultsRes.find((res) => res.test._id === testid);
      if (r) setResult(r);
    } catch (err) {
      console.error("❌ Error fetching test summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [testid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading test summary...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Test not found.</p>
      </div>
    );
  }

  // ✅ Calculate attempted/unattempted
  const attemptedCount =
    result?.answers?.filter((a) => a.selectedOption)?.length || 0;
  const totalQuestions = test.questions?.length || 0;
  const unattemptedCount = totalQuestions - attemptedCount;

  return (
    <PrivateRoute roles={["student"]}>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Test Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{test.title}</h1>
          <p className="text-gray-600 mt-1">{test.description}</p>
          <div className="mt-3 text-gray-500 text-sm flex flex-col gap-1">
            <span>👤 Teacher: {test.createdBy?.name || "N/A"}</span>
            <span>📝 Questions: {test.questions?.length || 0}</span>
            <span>⏱ Duration: {test.duration} min</span>
            <span>
              📅 Created: {dayjs(test.createdAt).format("DD MMM YYYY")}
            </span>
          </div>
        </div>

        {/* Result Info */}
        {result ? (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Your Result
            </h2>
            <div className="space-y-1 text-gray-800">
              <p>📊 <b>Score:</b> {result.score}/{result.totalMarks} ({result.percentage}%)</p>
              <p>📌 <b>Status:</b> {result.status.replace("_", " ")}</p>
              <p>✅ <b>Attempted:</b> {attemptedCount}/{totalQuestions}</p>
              <p>❌ <b>Unattempted:</b> {unattemptedCount}</p>
              <p>⚠️ <b>Violations:</b> {result.violations}</p>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-gray-500">
            You have not attempted this test yet.
          </div>
        )}

        {/* Question-wise details */}
        <div className="grid gap-6">
          {test.questions?.map((q, idx) => {
            const ans = result?.answers?.find((a) => a.question === q._id);

            return (
              <div
                key={q._id}
                className="bg-white p-5 rounded-2xl shadow border border-gray-200"
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  Q{idx + 1}: {q.question}
                </h3>

                <ul className="space-y-2">
                  {q.options.map((opt, i) => {
                    const isSelected = ans?.selectedOption === opt;
                    const isCorrectAnswer = q.correctAnswer === opt;

                    return (
                      <li
                        key={i}
                        className={`
                          px-3 py-2 rounded-lg border 
                          ${
                            isCorrectAnswer
                              ? "bg-green-50 border-green-300 text-green-800 font-semibold"
                              : isSelected
                              ? "bg-red-50 border-red-300 text-red-700"
                              : "bg-gray-50 border-gray-200 text-gray-700"
                          }
                        `}
                      >
                        {opt}
                        {isCorrectAnswer && (
                          <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                            Correct
                          </span>
                        )}
                        {isSelected && !isCorrectAnswer && (
                          <span className="ml-2 text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                            Your Choice
                          </span>
                        )}
                        {isSelected && isCorrectAnswer && (
                          <span className="ml-2 text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full">
                            You got it 🎉
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-3 text-sm text-gray-500">
                  {ans?.timeSpent
                    ? `⏱ Time spent: ${ans.timeSpent} sec`
                    : "⏱ Not attempted"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PrivateRoute>
  );
}
