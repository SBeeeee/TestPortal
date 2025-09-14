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
          setShowSummary(true);
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
          setShowSummary(true);
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
      setShowSummary(true);
    } catch (err) {
      console.error("Submit failed:", err);
      setShowSummary(true);
    }
  };

  if (loading) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading test...</p>
        </div>
      </PrivateRoute>
    );
  }

  if (!test) {
    return (
      <PrivateRoute roles={["student"]}>
        <div className="min-h-screen flex items-center justify-center">
          <p>Test not found.</p>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute roles={["student"]}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TestHeader title={test.title} timeLeft={timeLeft} onSubmit={handleSubmit} />

        <div className="flex flex-1">
          <div className="flex-1 p-6">
            {test.questions?.length > 0 ? (
              <QuestionCard
                question={test.questions[currentIndex]}
                index={currentIndex}
                selected={answers[test.questions[currentIndex]?._id]}
                onSelect={handleAnswer}
              />
            ) : (
              <div className="text-center text-gray-500">No questions available</div>
            )}

            <div className="mt-6 flex justify-between">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Previous
              </button>
              <button
                disabled={currentIndex === test.questions.length - 1}
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>

          <div className="w-64 border-l bg-white p-4">
            <QuestionNavigator
              questions={test.questions}
              answers={answers}
              currentIndex={currentIndex}
              onJump={setCurrentIndex}
            />
          </div>
        </div>

        {showSummary && (
          <SummaryModal
            test={test}
            result={result}
            answers={answers}
            onClose={() => router.push("/students")}
          />
        )}
      </div>
    </PrivateRoute>
  );
}
