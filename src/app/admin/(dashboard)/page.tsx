import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [products, openOrders, newInquiries, newQuotes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("repair_orders").select("id", { count: "exact", head: true }).not("status", "in", "(completed,cancelled)"),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("quotation_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const stats = [
    { label: "Products listed", value: products.count ?? 0 },
    { label: "Open repair orders", value: openOrders.count ?? 0 },
    { label: "New inquiries", value: newInquiries.count ?? 0 },
    { label: "New quote requests", value: newQuotes.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  );
}
