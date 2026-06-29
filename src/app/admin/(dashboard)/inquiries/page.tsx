import { createClient } from "@/lib/supabase/server";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const [{ data: inquiries }, { data: quotes }] = await Promise.all([
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    supabase.from("quotation_requests").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Inquiries &amp; Quote Requests</h1>

      <h2 className="font-semibold mb-4">Quote requests ({quotes?.length ?? 0})</h2>
      <div className="space-y-3 mb-12">
        {quotes?.map((q) => (
          <div key={q.id} className="rounded-[var(--radius-card)] border p-4" style={{ borderColor: "var(--color-line)" }}>
            <div className="flex justify-between mb-1">
              <p className="font-medium">{q.customer_name} · {q.customer_phone}</p>
              <span className="text-xs font-mono" style={{ color: "var(--color-ink-soft)" }}>
                {new Date(q.created_at).toLocaleDateString("en-IN")}
              </span>
            </div>
            <p className="text-sm mb-1" style={{ color: "var(--color-accent-dark)" }}>
              {q.category.replace("_", " ")} · {q.budget_range || "no budget given"}
            </p>
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>{q.requirements}</p>
          </div>
        ))}
        {!quotes?.length && <p style={{ color: "var(--color-ink-soft)" }}>No quote requests yet.</p>}
      </div>

      <h2 className="font-semibold mb-4">General inquiries ({inquiries?.length ?? 0})</h2>
      <div className="space-y-3">
        {inquiries?.map((i) => (
          <div key={i.id} className="rounded-[var(--radius-card)] border p-4" style={{ borderColor: "var(--color-line)" }}>
            <div className="flex justify-between mb-1">
              <p className="font-medium">{i.customer_name} · {i.customer_phone}</p>
              <span className="text-xs font-mono" style={{ color: "var(--color-ink-soft)" }}>
                {new Date(i.created_at).toLocaleDateString("en-IN")}
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>{i.message}</p>
          </div>
        ))}
        {!inquiries?.length && <p style={{ color: "var(--color-ink-soft)" }}>No inquiries yet.</p>}
      </div>
    </div>
  );
}
