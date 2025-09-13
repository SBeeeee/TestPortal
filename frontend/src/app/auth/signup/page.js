"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUser } from "../api";
import { setUser, setLoading } from "@/store/user/slice";
import Loader from "@/components/Loader";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await registerUser(form);
      if (res?.success) {
        localStorage.setItem("token", res.token);
        dispatch(setUser(res.data));
        router.push(res.data.role === "teacher" ? "/teacher" : "/student");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed");
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
        <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>
        <p className="text-center text-gray-600 text-sm">Join the portal to get started</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
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
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition transform shadow-lg"
        >
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </>
  );
}
