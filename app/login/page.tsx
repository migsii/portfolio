"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Email, Step 2: OTP Code
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Send the 6-digit code via Resend API
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/portfolio/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStep(2);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Validate the OTP Code and set the HttpOnly cookie
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/portfolio/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin"); // Redirect directly to dashboard on success!
        router.refresh();
      } else {
        setError(data.error || "Invalid or expired code.");
      }
    } catch {
      setError("Failed to verify code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-brand-card border border-zinc-800 rounded-xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Admin Portal
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {step === 1
              ? "Enter your admin email to receive an access code."
              : "Enter the 6-digit verification code sent to your inbox."}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label
                htmlFor="email-input"
                className="block text-xs font-semibold text-brand-muted uppercase mb-2"
              >
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-sm py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label
                htmlFor="code-input"
                className="block text-xs font-semibold text-brand-muted uppercase mb-2"
              >
                6-Digit Secure Code
              </label>
              <input
                id="code-input"
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} // Numbers only
                placeholder="123456"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-center text-lg font-mono tracking-[0.5em] focus:outline-none focus:border-brand-accent text-zinc-100 placeholder:text-zinc-700"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 border border-zinc-800 hover:bg-zinc-900 text-brand-muted text-sm py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-brand-accent text-zinc-950 font-semibold text-sm py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
