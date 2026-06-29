"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploadField() {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError("Upload failed: " + uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setPreviewUrl(data.publicUrl);
    } catch {
      setError("Couldn't upload the image. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Product photo</label>

      {previewUrl && (
        <div
          className="w-32 h-32 rounded-[var(--radius-card)] overflow-hidden mb-3 border"
          style={{ borderColor: "var(--color-line)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full text-sm rounded-[var(--radius-card)] border px-4 py-2.5"
        style={{ borderColor: "var(--color-line)" }}
      />

      {uploading && (
        <p className="text-xs mt-1.5" style={{ color: "var(--color-ink-soft)" }}>
          Uploading…
        </p>
      )}
      {error && (
        <p className="text-xs mt-1.5" style={{ color: "var(--color-accent-dark)" }}>
          {error}
        </p>
      )}

      {/* This hidden field is what actually gets submitted with the form */}
      <input type="hidden" name="image_url" value={previewUrl ?? ""} />
    </div>
  );
}
