import { createClient } from "@/lib/supabase/server";
import { updateInquiryStatus, updateQuoteStatus, setQuoteAmount } from "./actions";
import StatusPill from "./StatusPill";
import Link from "next/link";

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const { q, tab } = await searchParams;
  const supabase = await createClient();

  let quoteQuery = supabase.from("quotation_requests").select("*").order("created_at", { ascending: false });
  let inquiryQuery = supabase.from("inquiries").select("*").order("created_at", { ascending: false });

  if (q) {
    quoteQuery = quoteQuery.or(`customer_name.ilike.%${q}%,customer_phone.ilike.%${q}%`);
    inquiryQuery = inquiryQuery.or(`customer_name.ilike.%${q}%,customer_phone.ilike.%${q}%`);
  }

  const [{ data: quotes }, { data: inquiries }] = await Promise.all([quoteQuery, inquiryQuery]);

  const showQuotes = tab !== "inquiries";
  const showInquiries = tab !== "quotes";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inquiries &amp; Quote Requests</h1>

      <form className="flex flex-wrap gap-3 mb-8">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name or phone…"
          className="flex-1 min-w-[220px] rounded-[var(--radius-card)] border px-4 py-2.5 text-sm"
          style={{ borderColor: "var(--color-line)" }}
        />
        <select name="tab" defaultValue={tab ?? ""} className="rounded-[var(--radius-card)] border px-4 py-2.5 text-sm" style={{ borderColor: "var(--color-line)" }}>
          <option value="">Both</option>
          <option value="quotes">Quotes only</option>
          <option value="inquiries">Inquiries only</option>
        </select>
        <button type="submit" className="rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--color-primary)" }}>
          Filter
        </button>
        {(q || tab) && (
          <Link href="/admin/inquiries" className="rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold border" style={{ borderColor: "var(--color-line)" }}>
            Clear
          </Link>
        )}
      </form>

      {showQuotes && (
        <>
          <h2 className="font-semibold mb-4">Quote requests ({quotes?.length ?? 0})</h2>
          <div className="space-y-3 mb-12">
            {quotes?.map((qr) => (
              <div key={qr.id} className="rounded-[var(--radius-card)] border p-4" style={{ borderColor: "var(--color-line)" }}>
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{qr.customer_name} · {qr.customer_phone}</p>
                  <span className="text-xs font-mono" style={{ color: "var(--color-ink-soft)" }}>
                    {new Date(qr.created_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <p className="text-sm mb-1" style={{ color: "var(--color-accent-dark)" }}>
                  {qr.category.replace("_", " ")} · {qr.budget_range || "no budget given"}
                </p>
                <p className="text-sm mb-3" style={{ color: "var(--color-ink-soft)" }}>{qr.requirements}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill
                    value={qr.status}
                    options={["new", "quoted", "closed"]}
                    onChange={updateQuoteStatus.bind(null, qr.id)}
                  />
                  <form action={setQuoteAmount.bind(null, qr.id)} className="flex items-center gap-2">
                    <input
                      name="quoted_amount"
                      type="number"
                      defaultValue={qr.quoted_amount ?? ""}
                      placeholder="Quote ₹"
                      className="w-28 rounded-[var(--radius-card)] border px-3 py-1.5 text-sm"
                      style={{ borderColor: "var(--color-line)" }}
                    />
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] text-white" style={{ background: "var(--color-accent)" }}>
                      Save
                    </button>
                  </form>
                </div>
              </div>
            ))}
            {!quotes?.length && <p style={{ color: "var(--color-ink-soft)" }}>No quote requests match.</p>}
          </div>
        </>
      )}

      {showInquiries && (
        <>
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
                <p className="text-sm mb-3" style={{ color: "var(--color-ink-soft)" }}>{i.message}</p>
                <StatusPill
                  value={i.status}
                  options={["new", "contacted", "closed"]}
                  onChange={updateInquiryStatus.bind(null, i.id)}
                />
              </div>
            ))}
            {!inquiries?.length && <p style={{ color: "var(--color-ink-soft)" }}>No inquiries match.</p>}
          </div>
        </>
      )}
    </div>
  );
}
