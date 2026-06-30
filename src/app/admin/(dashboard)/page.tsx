import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    products,
    openOrders,
    newInquiries,
    newQuotes,
    completedThisMonth,
    quotedThisMonth,
  ] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("repair_orders").select("id", { count: "exact", head: true }).not("status", "in", "(completed,cancelled)"),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("quotation_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("repair_orders")
      .select("final_cost, estimated_cost")
      .eq("status", "completed")
      .gte("updated_at", startOfMonth.toISOString()),
    supabase
      .from("quotation_requests")
      .select("quoted_amount")
      .not("quoted_amount", "is", null)
      .gte("created_at", startOfMonth.toISOString()),
  ]);

  const repairRevenue = (completedThisMonth.data ?? []).reduce(
    (sum, o) => sum + Number(o.final_cost ?? o.estimated_cost ?? 0),
    0
  );
  const quotedValue = (quotedThisMonth.data ?? []).reduce(
    (sum, q) => sum + Number(q.quoted_amount ?? 0),
    0
  );

  const stats = [
    { label: "Products listed", value: products.count ?? 0 },
    { label: "Open repair orders", value: openOrders.count ?? 0 },
    { label: "New inquiries", value: newInquiries.count ?? 0 },
    { label: "New quote requests", value: newQuotes.count ?? 0 },
  ];

  const revenueStats = [
    { label: "Repair revenue this month", value: `₹${repairRevenue.toLocaleString("en-IN")}` },
    { label: "Quoted value this month", value: `₹${quotedValue.toLocaleString("en-IN")}` },
    { label: "Completed repairs this month", value: completedThisMonth.data?.length ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-[var(--radius-card)] border p-5"
            style={{ borderColor: "var(--color-line)" }}
          >
            <p className="text-3xl font-bold font-mono">{s.value}</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-ink-soft)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: "var(--color-accent-dark)" }}>
        This month
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {revenueStats.map((s) => (
          <div
            key={s.label}
            className="rounded-[var(--radius-card)] border p-5"
            style={{ borderColor: "var(--color-line)", background: "var(--color-card)" }}
          >
            <p className="text-2xl font-bold font-mono">{s.value}</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-ink-soft)" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs mt-4" style={{ color: "var(--color-ink-soft)" }}>
        Repair revenue counts orders marked &quot;completed&quot; this month, using the final cost
        if set, otherwise the estimate. Quoted value is the sum of quotes you&apos;ve entered
        this month, regardless of whether the customer has accepted yet.
      </p>
    </div>
  );
}
