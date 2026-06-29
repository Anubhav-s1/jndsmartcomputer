"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email or password is incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-[var(--radius-card)] border px-4 py-3"
            style={{ borderColor: "var(--color-line)" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-[var(--radius-card)] border px-4 py-3"
            style={{ borderColor: "var(--color-line)" }}
          />
        </div>
        {error && <p className="text-sm" style={{ color: "var(--color-accent-dark)" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="text-xs mt-6" style={{ color: "var(--color-ink-soft)" }}>
        Admin accounts are created in the Supabase dashboard under
        Authentication → Users. There&apos;s no public sign-up.
      </p>
    </div>
  );
}
