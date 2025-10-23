"use client";
import { useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setMessage("Login success 🚀");
      setLoading(false);
      router.push("/dashboard");
    } else {
      setMessage(data.error || "Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold mb-4">Hello there</h1>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && (
            <div
              className={`alert ${
                message.includes("success") ? "alert-success" : "alert-error"
              } py-2 mb-3`}
            >
              <span>{message}</span>
            </div>
          )}

          <div className="card-actions justify-center">
            <button
              onClick={handleSignin}
              disabled={loading}
              className={`btn btn-success w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          <div className="w-full my-4 items-center justify-center justify-items-center flex">
            <a href="/signup">don&apos;t have an account?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
