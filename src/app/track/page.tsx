"use client";

import { useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  received: "Received",
  diagnosing: "Diagnosing",
  awaiting_approval: "Awaiting Your Approval",
  in_repair: "In Repair",
  awaiting_parts: "Awaiting Parts",
  ready_for_pickup: "Ready for Pickup",
  out_for_delivery: "Out for Delivery",
  completed: "Completed",
  cancelled: "Cancelled",
};

type Order = {
  tracking_code: string;
  customer_name: string;
  device_type: string;
  device_brand: string | null;
  device_model: string | null;
  status: string;
  estimated_cost: number | null;
  final_cost: number | null;
  created_at: string;
};

type HistoryItem = { status: string; note: string | null; created_at: string };

export default function TrackPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't find that order.");
        return;
      }

      setOrder(data.order);
      setHistory(data.history);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p
        className="font-mono text-xs uppercase tracking-widest mb-3"
        style={{ color: "var(--color-accent-dark)" }}
      >
        Pick &amp; Drop Service
      </p>
      <h1 className="text-3xl font-bold mb-3">Track your repair</h1>
      <p className="mb-8" style={{ color: "var(--color-ink-soft)" }}>
        Enter the claim code we gave you when you dropped off your device.
        It looks like <span className="font-mono">JND-7F3K9</span>.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="JND-XXXXX"
          className="flex-1 rounded-[var(--radius-card)] border px-4 py-3 font-mono uppercase"
          style={{ borderColor: "var(--color-line)" }}
          aria-label="Tracking code"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white disabled:opacity-50"
          style={{ background: "var(--color-primary)" }}
        >
          {loading ? "Looking up…" : "Track"}
        </button>
      </form>

      {error && (
        <p className="text-sm mb-8" style={{ color: "var(--color-accent-dark)" }}>
          {error}
        </p>
      )}

      {order && (
        <div>
          <div className="claim-ticket mb-8">
            <p className="text-xs opacity-60 mb-1 uppercase tracking-wider">Claim Ticket</p>
            <p className="text-2xl font-semibold mb-3">{order.tracking_code}</p>
            <div className="flex justify-between text-sm opacity-80 border-t border-white/15 pt-3">
              <span>
                {order.device_brand} {order.device_model || order.device_type}
              </span>
              <span style={{ color: "var(--color-accent)" }}>
                {STATUS_LABELS[order.status] ?? order.status}
              </span>
            </div>
          </div>

          {(order.estimated_cost || order.final_cost) && (
            <div className="mb-8 text-sm" style={{ color: "var(--color-ink-soft)" }}>
              {order.final_cost
                ? <>Final cost: <span className="font-mono">₹{order.final_cost}</span></>
                : <>Estimated cost: <span className="font-mono">₹{order.estimated_cost}</span></>}
            </div>
          )}

          <h2 className="font-semibold mb-4">Status history</h2>
          <ol className="space-y-4 border-l pl-5" style={{ borderColor: "var(--color-line)" }}>
            {history.map((h, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                <p className="font-medium text-sm">
                  {STATUS_LABELS[h.status] ?? h.status}
                </p>
                {h.note && (
                  <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                    {h.note}
                  </p>
                )}
                <p className="text-xs font-mono mt-1" style={{ color: "var(--color-ink-soft)" }}>
                  {new Date(h.created_at).toLocaleString("en-IN")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
