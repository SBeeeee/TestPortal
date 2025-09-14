"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestsAPI } from "../teacher/api/test.api";
import { getStudentResultsAPI } from "../students/api/result.api";
import { setTests } from "@/store/test/slice";
import PrivateRoute from "@/utils/Private";
import dayjs from "dayjs";

export default function StudentDashboard() {
  const { tests } = useSelector((state) => state.test);
  const { user } = useSelector((state) => state.user);
  const [results, setResults] = useState({});
  const dispatch = useDispatch();

  // Fetch tests
  const fetchTests = async () => {
    try {
      const res = await getAllTestsAPI();
      const testList = res.data?.data || [];
      dispatch(setTests(testList));
    } catch (err) {
      console.error("Error fetching tests:", err);
    }
  };

  // Fetch student results
  const fetchResults = async () => {
    try {
      const res = await getStudentResultsAPI();
      const map = {};
      res.forEach((r) => {
        map[r.test._id] = r;
      });
      setResults(map);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };

  useEffect(() => {
    fetchTests();
    fetchResults();
  }, []);

  const getAction = (test) => {
    const result = results[test._id];
    if (!result) {
      return { label: "Attempt Test", status: "not_attempted", disabled: false };
    }
    if (result.status === "in-progress") {
      return { label: "Continue Test", status: "in_progress", disabled: false, resultId: result._id };
    }
    if (result.status === "submitted") {
      return {
        label: `Score: ${result.score}/${result.totalMarks} (${result.percentage}%)`,
        status: "submitted",
        disabled: true,
      };
    }
    return { label: "Attempt Test", status: "not_attempted", disabled: false };
  };

  return (
    <PrivateRoute roles={["student"]}>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            👋 Welcome, {user?.name || "Student"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here are your tests. Continue where you left off or check your results.
          </p>
        </div>

        {/* Test List */}
        {tests.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No tests assigned yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              const action = getAction(test);

              return (
                <div
                  key={test._id}
                  className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-indigo-700">{test.title}</h2>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{test.description}</p>

                    <div className="mt-3 text-gray-500 text-sm flex flex-col gap-1">
                      <span>👤 Teacher: {test.createdBy?.name || "N/A"}</span>
                      <span>📝 Questions: {test.questions?.length || 0}</span>
                      <span>⏱ Duration: {test.duration} min</span>
                      <span>📅 Created: {dayjs(test.createdAt).format("DD MMM YYYY")}</span>
                     
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        action.status === "submitted"
                          ? "bg-green-100 text-green-800"
                          : action.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {action.status.replace("_", " ")}
                    </span>

                    {/* Action Button */}
                    <button
                      disabled={action.disabled}
                      onClick={() => {
                        if (!action.disabled) {
                          window.location.href =
                            action.status === "in_progress"
                              ? `/students/tests/${test._id}?resultId=${action.resultId}`
                              : `/students/tests/${test._id}`;
                        }
                      }}
                      className={`px-4 py-2 rounded-lg shadow transition ${
                        action.disabled
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {action.label}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
