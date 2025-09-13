"use client";
import { useSelector } from "react-redux";

export default function Loader() {
  const loading = useSelector((state) => state.user.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
