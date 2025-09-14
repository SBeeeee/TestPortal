"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "../api";
import { setUser, setLoading } from "@/store/user/slice";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await loginUser(form);
      if (res?.success) {
        localStorage.setItem("token", res.token);
        dispatch(setUser(res.data));
        router.push(res.data.role === "teacher" ? "/teacher" : "/students");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Loader />
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 space-y-5 border border-white/30"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
        <p className="text-center text-gray-600 text-sm">Login to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition transform shadow-lg"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </>
  );
}
