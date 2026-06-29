import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

const conditionLabels: Record<string, string> = {
  new: "Brand New",
  refurbished: "Refurbished",
  used: "Used",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!product) notFound();

  const specs = (product.specs as Record<string, string>) ?? {};

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/products"
        className="text-sm font-medium mb-8 inline-block"
        style={{ color: "var(--color-primary)" }}
      >
        ← Back to all products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div
          className="aspect-[4/3] rounded-[var(--radius-card)] flex items-center justify-center overflow-hidden"
          style={{ background: "#F1EEE5" }}
        >
          {product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span style={{ color: "var(--color-ink-soft)" }}>No image yet</span>
          )}
        </div>

        {/* Details */}
        <div>
          <p
            className="text-xs uppercase tracking-widest font-mono mb-2"
            style={{ color: "var(--color-accent-dark)" }}
          >
            {conditionLabels[product.condition] ?? product.condition}
          </p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {product.brand && (
            <p className="mb-6" style={{ color: "var(--color-ink-soft)" }}>
              {product.brand}
            </p>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-mono font-semibold">₹{product.price}</span>
            {product.compare_at_price && (
              <span
                className="font-mono text-lg line-through"
                style={{ color: "var(--color-ink-soft)" }}
              >
                ₹{product.compare_at_price}
              </span>
            )}
          </div>

          <p
            className="text-sm font-medium mb-8"
            style={{
              color:
                product.stock_quantity > 0
                  ? "var(--color-success)"
                  : "var(--color-accent-dark)",
            }}
          >
            {product.stock_quantity > 0
              ? `In stock — ${product.stock_quantity} available`
              : "Currently out of stock"}
          </p>

          {product.description && (
            <p className="mb-8" style={{ color: "var(--color-ink-soft)" }}>
              {product.description}
            </p>
          )}

          {Object.keys(specs).length > 0 && (
            <div
              className="rounded-[var(--radius-card)] border p-5 mb-8"
              style={{ borderColor: "var(--color-line)" }}
            >
              <h2 className="font-semibold mb-3 text-sm">Specifications</h2>
              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt style={{ color: "var(--color-ink-soft)" }} className="capitalize">
                      {key.replace(/_/g, " ")}
                    </dt>
                    <dd className="font-mono">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <Link
            href={`/quote?product=${encodeURIComponent(product.name)}`}
            className="inline-block rounded-[var(--radius-card)] px-6 py-3 font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Ask About This Product
          </Link>
        </div>
      </div>
    </div>
  );
}
