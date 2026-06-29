import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const categoryLabels: Record<string, string> = {
  laptop_new: "New Laptops",
  laptop_used: "Used Laptops",
  desktop: "Desktops",
  pc_components: "PC Components",
  cctv: "CCTV",
  accessory: "Accessories",
  other: "Other",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data: products } = await query;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">
        {category ? categoryLabels[category] ?? "Products" : "All Products"}
      </h1>
      <p className="mb-10" style={{ color: "var(--color-ink-soft)" }}>
        {products?.length ?? 0} item{products?.length === 1 ? "" : "s"} available
      </p>

      {!products?.length && (
        <div
          className="rounded-[var(--radius-card)] border p-10 text-center"
          style={{ borderColor: "var(--color-line)", color: "var(--color-ink-soft)" }}
        >
          Nothing listed here yet. Check back soon, or{" "}
          <Link href="/quote" className="underline" style={{ color: "var(--color-primary)" }}>
            ask us directly
          </Link>{" "}
          for what you need.
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="rounded-[var(--radius-card)] border overflow-hidden block hover:shadow-sm transition-shadow"
            style={{ borderColor: "var(--color-line)", background: "var(--color-card)" }}
          >
            <div
              className="aspect-[4/3] flex items-center justify-center text-sm"
              style={{ background: "#F1EEE5", color: "var(--color-ink-soft)" }}
            >
              {p.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                "No image yet"
              )}
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--color-accent-dark)" }}>
                {p.condition}
              </p>
              <h3 className="font-semibold mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-mono font-semibold">₹{p.price}</span>
                {p.compare_at_price && (
                  <span
                    className="font-mono text-sm line-through"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    ₹{p.compare_at_price}
                  </span>
                )}
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: p.stock_quantity > 0 ? "var(--color-success)" : "var(--color-accent-dark)" }}
              >
                {p.stock_quantity > 0 ? "In stock" : "Out of stock"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
