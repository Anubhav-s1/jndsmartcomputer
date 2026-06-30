"use client";

import { useTransition } from "react";

export default function StatusPill({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (status: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={value}
      disabled={isPending}
      onChange={(e) => startTransition(() => onChange(e.target.value))}
      className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] border disabled:opacity-50"
      style={{ borderColor: "var(--color-line)" }}
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}
