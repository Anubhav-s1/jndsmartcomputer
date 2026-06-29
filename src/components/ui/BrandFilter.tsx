"use client";

type BrandFilterProps = {
  brands: string[];
  selected: string;
  onChange: (brand: string) => void;
};

export default function BrandFilter({
  brands,
  selected,
  onChange,
}: BrandFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onChange("All")}
        className={`px-5 py-2 rounded-full transition ${
          selected === "All"
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-gray-300 hover:bg-slate-700"
        }`}
      >
        All
      </button>

      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => onChange(brand)}
          className={`px-5 py-2 rounded-full transition ${
            selected === brand
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}