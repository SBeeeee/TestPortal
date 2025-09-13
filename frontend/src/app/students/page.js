"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestsAPI } from "../teacher/api/test.api";
import { setTests } from "@/store/test/slice";
import PrivateRoute from "@/utils/Private";

export default function StudentDashboard() {
  const { tests } = useSelector((state) => state.test);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // ✅ Fetch tests assigned to student
  const fetchTests = async () => {
    try {
      const res = await getAllTestsAPI();
      const testList = res.data?.data || [];
      dispatch(setTests(testList));
    } catch (err) {
      console.error("Error fetching student tests:", err);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <PrivateRoute roles={["student"]}>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            👋 Welcome, {user?.name || "Student"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here are the tests assigned to you. Best of luck!
          </p>
        </div>

        {/* Test List */}
        {tests.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No tests assigned yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700">
                    {test.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {test.description}
                  </p>
                  <div className="mt-4 text-sm text-gray-500 flex gap-6">
                    <span>⏱ {test.duration} min</span>
                    <span>📝 {test.questions?.length || 0} Qs</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    Not Attempted
                  </span>
                  <button
                    onClick={() =>
                      (window.location.href = `/student/tests/${test._id}`)
                    }
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
