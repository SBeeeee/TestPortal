"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  startResultAPI,
  saveAnswerAPI,
  submitResultAPI,
  reportViolationAPI,
  getResultByIdAPI,
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
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Init test + result
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const testData = await getTestByIdAPI(testid);
        setTest(testData);

        const { resultId, result: resultData } = await startResultAPI(testid);

        // if backend already marked submitted
        if (resultData.status === "submitted") {
          alert("⚠️ Test already submitted (violations/time).");
          router.push(`/students/tests/${testid}/summary`);
          setResult(resultData);
          setLoading(false);
          return;
        }

        setResult(resultData);

        // restore answers
        const restored = {};
        if (resultData.answers?.length) {
          resultData.answers.forEach((a) => {
            restored[a.question?._id || a.question] = a.selectedOption;
          });
        }
        setAnswers(restored);

        // calc time left
        const startTime = new Date(resultData.startTime).getTime();
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const totalDuration = (testData.duration || 60) * 60;
        setTimeLeft(Math.max(0, totalDuration - elapsed));

        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/students");
      }
    };

    if (testid) init();
  }, [testid, router]);

  // ✅ Autosave every 10s (bulk save all answers)
  useEffect(() => {
    if (!result?._id) return;
    const interval = setInterval(async () => {
      try {
        if (Object.keys(answers).length === 0) return;
        await saveAnswerAPI(result._id, { answers, timeSpent: 10 });
        console.log("💾 Autosaved all answers");
      } catch (err) {
        console.error("Autosave failed:", err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [result, answers]);

  // ✅ Countdown timer
  useEffect(() => {
    if (!result?._id || showSummary) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft, result, showSummary]);

  // ✅ Tab violation
  useEffect(() => {
    const handleViolation = async () => {
      if (!result?._id || showSummary) return;
      try {
        await reportViolationAPI(result._id);
        const updated = await getResultByIdAPI(result._id);

        if (updated.status === "submitted") {
          alert("❌ Test auto-submitted after 3 violations!");
          setResult(updated);
          router.push(`/students/tests/${testid}/summary`);
        } else {
          setResult(updated);
          alert("⚠️ Violation recorded!");
        }
      } catch (err) {
        console.error("Violation error:", err);
      }
    };

    window.addEventListener("blur", handleViolation);
    return () => window.removeEventListener("blur", handleViolation);
  }, [result, showSummary]);

  // ✅ Answer selection
  const handleAnswer = async (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    try {
      await saveAnswerAPI(result._id, {
        question: qId,
        selectedOption: option,
        timeSpent: 5,
      });
    } catch (err) {
      console.error("Save answer failed:", err);
    }
  };

  // ✅ Submit test
  const handleSubmit = async () => {
    if (!result?._id || showSummary || result.status === "submitted") return;
    try {
      const submitted = await submitResultAPI(result._id);
      setResult(submitted.data || submitted); // backend wraps in data sometimes
      router.push(`/students/tests/${testid}/summary`);
    } catch (err) {
      console.error("Submit failed:", err);
      router.push(`/students/tests/${testid}/summary`);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-lg font-medium text-gray-700">Loading test...</p>
            </div>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  if (!test) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Test Not Found</h2>
            <p className="text-gray-600">The requested test could not be loaded.</p>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  const currentQuestion = test.questions?.[currentIndex];
  const totalQuestions = test.questions?.length || 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <PrivateRoute roles={["student"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Professional Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{test.title}</h1>
                  <p className="text-sm text-gray-500">
                    Question {currentIndex + 1} of {totalQuestions} • {answeredCount} answered
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {/* Timer */}
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  timeLeft <= 300 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono font-bold text-lg">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 max-w-7xl mx-auto">
          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {/* Question Card */}
            {currentQuestion ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <h2 className="text-lg font-semibold">
                      Question {currentIndex + 1}
                    </h2>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      {currentQuestion.marks || 1} mark{(currentQuestion.marks || 1) !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Question Text */}
                  <div className="mb-6">
                    <p className="text-lg text-gray-800 leading-relaxed font-medium">
                      {currentQuestion.text}
                    </p>
                    {currentQuestion.image && (
                      <img
                        src={currentQuestion.image}
                        alt="Question"
                        className="mt-4 max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, idx) => {
                      const isSelected = answers[currentQuestion._id] === option;
                      return (
                        <label
                          key={idx}
                          className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion._id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswer(currentQuestion._id, option)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className={`text-base ${isSelected ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                            <span className="font-semibold mr-2">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-medium text-gray-600">No questions available</h3>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSummary(true)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                >
                  Review All
                </button>
              </div>

              <button
                disabled={currentIndex === totalQuestions - 1}
                onClick={() => setCurrentIndex((i) => i + 1)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentIndex === totalQuestions - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-sm'
                }`}
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-white p-6">
            <div className="sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Question Navigator
              </h3>

              {/* Progress Stats */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{answeredCount}/{totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {test.questions?.map((question, index) => {
                  const isAnswered = answers.hasOwnProperty(question._id);
                  const isCurrent = index === currentIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>

              {/* Violations Warning */}
              {result?.violations > 0 && (
                <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-700 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 19.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>
                      {result.violations}/3 Violations
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                    Test will auto-submit after 3 violations
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      
       
      </div>
    </PrivateRoute>
  );
}