"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number | null;
  category: string;
  stock_quantity: number;
  is_published: boolean;
  image: string | null;
};

export default function BulkActionsBar({
  products,
  toggleProductPublished,
  deleteProduct,
}: {
  products: Product[];
  toggleProductPublished: (id: string, current: boolean) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === products.length ? new Set() : new Set(products.map((p) => p.id))
    );
  }

  function bulkAction(action: "publish" | "unpublish" | "delete") {
    if (selected.size === 0) return;
    if (action === "delete" && !confirm(`Delete ${selected.size} product(s)? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      for (const id of selected) {
        if (action === "publish") await toggleProductPublished(id, false);
        else if (action === "unpublish") await toggleProductPublished(id, true);
        else await deleteProduct(id);
      }
      setSelected(new Set());
    });
  }

  return (
    <div>
      {selected.size > 0 && (
        <div
          className="flex items-center gap-3 mb-4 p-3 rounded-[var(--radius-card)]"
          style={{ background: "#F1EEE5" }}
        >
          <span className="text-sm font-medium">{selected.size} selected</span>
          <button
            disabled={isPending}
            onClick={() => bulkAction("publish")}
            className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] text-white disabled:opacity-50"
            style={{ background: "var(--color-success)" }}
          >
            Publish
          </button>
          <button
            disabled={isPending}
            onClick={() => bulkAction("unpublish")}
            className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] disabled:opacity-50"
            style={{ background: "var(--color-line)" }}
          >
            Unpublish
          </button>
          <button
            disabled={isPending}
            onClick={() => bulkAction("delete")}
            className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] text-white disabled:opacity-50"
            style={{ background: "var(--color-accent-dark)" }}
          >
            Delete
          </button>
        </div>
      )}

      {products.length > 0 && (
        <label className="flex items-center gap-2 text-xs mb-3" style={{ color: "var(--color-ink-soft)" }}>
          <input
            type="checkbox"
            checked={selected.size === products.length}
            onChange={toggleAll}
          />
          Select all
        </label>
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-[var(--radius-card)] border p-4 flex items-center justify-between gap-4"
            style={{ borderColor: "var(--color-line)" }}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selected.has(p.id)}
                onChange={() => toggleOne(p.id)}
              />
              <div
                className="w-14 h-14 rounded-[var(--radius-card)] overflow-hidden shrink-0"
                style={{ background: "#F1EEE5" }}
              >
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm font-mono" style={{ color: "var(--color-ink-soft)" }}>
                  ₹{p.price} · {p.category} · stock: {p.stock_quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)] border"
                style={{ borderColor: "var(--color-line)" }}
              >
                Edit
              </Link>
              <button
                onClick={() => toggleProductPublished(p.id, p.is_published)}
                className="text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-pill)]"
                style={{
                  background: p.is_published ? "var(--color-success)" : "var(--color-line)",
                  color: p.is_published ? "white" : "var(--color-ink)",
                }}
              >
                {p.is_published ? "Published" : "Draft"}
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${p.name}"? This cannot be undone.`)) {
                    deleteProduct(p.id);
                  }
                }}
                className="text-xs font-semibold"
                style={{ color: "var(--color-accent-dark)" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: "var(--color-ink-soft)" }}>
            No products match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
