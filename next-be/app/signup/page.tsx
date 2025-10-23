"use client";
import { useState } from "react";
import { API_URL } from "@/lib/api";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const res = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setMessage(data?.user ? "Sign Up Success 🎉" : data.error);
  };

  return (
    <div className="flex flex-col justify-items-center items-center justify-center p-10 w-md">
      <input
        type="text"
        placeholder="Your Name"
        className="input input-ghost mb-4"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="input input-ghost mb-4"
        placeholder="Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-ghost mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="btn btn-md btn-info text-black w-3/4"
      >
        Sign Up
      </button>
      <p className="mt-2">{message}</p>
    </div>
  );
}
