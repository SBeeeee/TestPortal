"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuth } from "./checkAuth";

export default function PrivateRoute({ children, roles = [] }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
        return;
      }

      let currentUser = user;
      if (!currentUser || Object.keys(currentUser).length === 0) {
        currentUser = await checkAuth(dispatch);
        if (!currentUser) {
          router.replace("/auth/login");
          return;
        }
      }

      // ✅ Role check
      if (roles.length > 0 && !roles.includes(currentUser.role)) {
        setUnauthorized(true);
        setChecking(false); // 👈 ensure we stop loading
        return;
      }

      setChecking(false);
    };

    verifyAuth();
  }, []);

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        Checking authentication...
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">
          🚫 Access Denied
        </h1>
      </div>
    );
  }

  return children;
}
