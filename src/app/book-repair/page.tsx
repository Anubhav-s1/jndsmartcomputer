"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookRepairPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [pickupRequired, setPickupRequired] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      customer_name: form.get("customer_name"),
      customer_phone: form.get("customer_phone"),
      customer_email: form.get("customer_email"),
      device_type: form.get("device_type"),
      device_brand: form.get("device_brand"),
      device_model: form.get("device_model"),
      issue_description: form.get("issue_description"),
      pickup_required: form.get("pickup_required") === "on",
      pickup_address: form.get("pickup_address"),
    };

    try {
      const res = await fetch("/api/book-repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't submit your request.");
        return;
      }
      setTrackingCode(data.tracking_code);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (trackingCode) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Booking received</h1>
        <p className="mb-8" style={{ color: "var(--color-ink-soft)" }}>
          Save this code — you&apos;ll use it to track your repair&apos;s status.
        </p>
        <div className="claim-ticket inline-block text-left mb-8">
          <p className="text-xs opacity-60 mb-1 uppercase tracking-wider">Claim Ticket</p>
          <p className="text-3xl font-semibold">{trackingCode}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href={`/track`}
            className="rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Go to Tracking Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p
        className="font-mono text-xs uppercase tracking-widest mb-3"
        style={{ color: "var(--color-accent-dark)" }}
      >
        Pick &amp; Drop Service
      </p>
      <h1 className="text-3xl font-bold mb-3">Book a repair</h1>
      <p className="mb-8" style={{ color: "var(--color-ink-soft)" }}>
        Tell us what&apos;s wrong with your device. We&apos;ll give you a claim
        code right away so you can track progress — bring it in, or request
        pickup below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Your name" name="customer_name" required />
          <Field label="Phone number" name="customer_phone" type="tel" required />
        </div>
        <Field label="Email (optional)" name="customer_email" type="email" />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Device type" name="device_type" placeholder="Laptop, Desktop, CCTV…" required />
          <Field label="Brand" name="device_brand" placeholder="Dell, HP, Lenovo…" />
        </div>
        <Field label="Model (optional)" name="device_model" />

        <div>
          <label className="block text-sm font-medium mb-1.5">What&apos;s wrong?</label>
          <textarea
            name="issue_description"
            required
            rows={4}
            placeholder="e.g. Won't turn on, screen is cracked, running very slow…"
            className="w-full rounded-[var(--radius-card)] border px-4 py-3"
            style={{ borderColor: "var(--color-line)" }}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="pickup_required"
            checked={pickupRequired}
            onChange={(e) => setPickupRequired(e.target.checked)}
          />
          I need you to pick this up — I can&apos;t bring it in
        </label>

        {pickupRequired && (
          <Field label="Pickup address" name="pickup_address" required />
        )}

        {error && <p className="text-sm" style={{ color: "var(--color-accent-dark)" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          {loading ? "Submitting…" : "Book Repair & Get Claim Code"}
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[var(--radius-card)] border px-4 py-3"
        style={{ borderColor: "var(--color-line)" }}
      />
    </div>
  );
}
