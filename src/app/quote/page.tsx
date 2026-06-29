"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const categories = [
  { value: "pc_build", label: "Custom PC Build" },
  { value: "used_laptop", label: "Secondhand Laptop" },
  { value: "new_laptop", label: "New Laptop" },
  { value: "cctv", label: "CCTV System" },
  { value: "accessory", label: "Accessory" },
  { value: "other", label: "Something Else" },
];

const budgets = [
  "Under ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹50,000",
  "₹50,000 – ₹80,000",
  "Above ₹80,000",
  "Not sure yet",
];

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      customer_name: form.get("customer_name"),
      customer_phone: form.get("customer_phone"),
      customer_email: form.get("customer_email"),
      category: form.get("category"),
      budget_range: form.get("budget_range"),
      requirements: form.get("requirements"),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError("Couldn't submit your request. Try again in a moment.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-3">Request received</h1>
        <p style={{ color: "var(--color-ink-soft)" }}>
          We&apos;ll reach out on the phone number you gave us, usually within
          a few hours, with a price estimate.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p
        className="font-mono text-xs uppercase tracking-widest mb-3"
        style={{ color: "var(--color-accent-dark)" }}
      >
        Free, No Obligation
      </p>
      <h1 className="text-3xl font-bold mb-3">Get a quote</h1>
      <p className="mb-8" style={{ color: "var(--color-ink-soft)" }}>
        Tell us what you&apos;re looking for — a PC build, a secondhand
        laptop, CCTV, or anything else — and we&apos;ll get back to you with
        a price.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Your name" name="customer_name" required />
          <Field label="Phone number" name="customer_phone" type="tel" required />
        </div>
        <Field label="Email (optional)" name="customer_email" type="email" />

        <div>
          <label className="block text-sm font-medium mb-1.5">What do you need?</label>
          <select
            name="category"
            required
            className="w-full rounded-[var(--radius-card)] border px-4 py-3"
            style={{ borderColor: "var(--color-line)" }}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Budget (optional)</label>
          <select
            name="budget_range"
            className="w-full rounded-[var(--radius-card)] border px-4 py-3"
            style={{ borderColor: "var(--color-line)" }}
          >
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Tell us more</label>
          <textarea
            name="requirements"
            required
            rows={4}
            placeholder="What will you use it for? Any brand preference? Anything specific you need?"
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
          {loading ? "Sending…" : "Request Quote"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-[var(--radius-card)] border px-4 py-3"
        style={{ borderColor: "var(--color-line)" }}
      />
    </div>
  );
}
