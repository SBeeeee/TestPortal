"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  startResultAPI,
  saveAnswerAPI,
  submitResultAPI,
  reportViolationAPI,
} from "@/app/students/api/result.api";
import { getTestByIdAPI } from "@/app/students/api/test.api";
import TestHeader from "../components/TestHeader";
import QuestionCard from "../components/QuestionCard";
import QuestionNavigator from "../components/QuestionNavigator";
import SummaryModal from "../components/SummaryModal";
import PrivateRoute from "@/utils/Private";

export default function TestPortal() {
  const { testid } = useParams();
  const router = useRouter();

  const [test, setTest] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Start Test with proper error handling
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("➡️ Fetching test:", testid);
        
        // Validate testid format (MongoDB ObjectId should be 24 characters)
        if (!testid || typeof testid !== 'string' || testid.length !== 24) {
          throw new Error("Invalid test ID format");
        }

        const testRes = await getTestByIdAPI(testid);
        console.log("✅ Test response:", testRes);

        if (!testRes) {
          throw new Error("Test not found");
        }

        setTest(testRes);

        console.log("➡️ Starting result for test:", testid);
        const resultRes = await startResultAPI(testid);
        console.log("✅ Result response:", resultRes);

        if (!resultRes.resultId) {
          throw new Error("Failed to create test result");
        }

        setResultId(resultRes.resultId);

        console.log("⏱ Duration:", testRes.duration);
        const durationInSeconds = (testRes.duration || 60) * 60; // Default 60 minutes
        setTimeLeft(durationInSeconds);
        
        setLoading(false);
      } catch (err) {
        console.error("❌ Error starting test:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to load test";
        setError(errorMessage);
        setLoading(false);
        
        // Redirect to dashboard after 3 seconds if there's an error
        setTimeout(() => {
          router.push("/students");
        }, 3000);
      }
    };

    if (testid) {
      init();
    }
  }, [testid, router]);

  // ✅ Countdown Timer with auto-submit
  useEffect(() => {
    if (!resultId || timeLeft <= 0 || showSummary) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, resultId, showSummary]);

  // ✅ Save Answer with error handling
  const handleAnswer = async (qId, option) => {
    if (!resultId || !qId) return;

    try {
      setAnswers((prev) => ({ ...prev, [qId]: option }));
      console.log("➡️ Saving answer:", { qId, option });
      
      await saveAnswerAPI(resultId, {
        question: qId,
        selectedOption: option,
        timeSpent: 5,
      });
    } catch (err) {
      console.error("❌ Error saving answer:", err);
      // Don't show error to user for auto-save failures, just log it
    }
  };

  // ✅ Submit with error handling
  const handleSubmit = async () => {
    if (!resultId || showSummary) return;

    try {
      console.log("➡️ Submitting result:", resultId);
      await submitResultAPI(resultId);
      setShowSummary(true);
    } catch (err) {
      console.error("❌ Error submitting test:", err);
      // Still show summary even if submission fails
      setShowSummary(true);
    }
  };

  // ✅ Anti-Cheating with proper checks
  useEffect(() => {
    const handleBlur = async () => {
      // Only report violation if we have a valid resultId and test is in progress
      if (!resultId || showSummary) return;

      try {
        console.warn("⚠️ Tab switch detected → reporting violation");
        await reportViolationAPI(resultId);
      } catch (err) {
        console.error("❌ Error reporting violation:", err);
        // Don't block user experience for violation reporting failures
      }
    };

    // Only add listener if test is active
    if (resultId && !showSummary) {
      window.addEventListener("blur", handleBlur);
      return () => window.removeEventListener("blur", handleBlur);
    }
  }, [resultId, showSummary]);

  // Handle loading state
  if (loading) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading test...</p>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  // Handle error state
  if (error) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Test</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  // Handle case where test is still null after loading
  if (!test) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Test not found.</p>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute roles={["student"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TestHeader 
          title={test.title} 
          timeLeft={timeLeft} 
          onSubmit={handleSubmit} 
        />

        <div className="flex flex-1">
          {/* Question Area */}
          <div className="flex-1 p-6">
            {test.questions && test.questions.length > 0 ? (
              <QuestionCard
                question={test.questions[currentIndex]}
                index={currentIndex}
                selected={answers[test.questions[currentIndex]?._id]}
                onSelect={handleAnswer}
              />
            ) : (
              <div className="text-center text-gray-500">
                No questions available for this test.
              </div>
            )}

            {test.questions && test.questions.length > 0 && (
              <div className="mt-6 flex justify-between">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  disabled={currentIndex === test.questions.length - 1}
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Navigator */}
          {test.questions && test.questions.length > 0 && (
            <div className="w-64 border-l bg-white p-4">
              <QuestionNavigator
                questions={test.questions}
                answers={answers}
                currentIndex={currentIndex}
                onJump={setCurrentIndex}
              />
            </div>
          )}
        </div>

        {showSummary && (
          <SummaryModal
            test={test}
            answers={answers}
            onClose={() => router.push("/students/dashboard")}
          />
        )}
      </div>
    </PrivateRoute>
  );
}