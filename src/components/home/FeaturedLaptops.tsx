"use client";

import { useMemo, useState } from "react";
import { laptops } from "@/data/laptops";
import LaptopCard from "@/components/ui/LaptopCard";
import SearchBar from "@/components/ui/SearchBar";
import BrandFilter from "@/components/ui/BrandFilter";
import SectionTitle from "@/components/ui/SectionTitle";

export default function FeaturedLaptops() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const brands = useMemo(() => {
    return [...new Set(laptops.map((item) => item.brand))];
  }, []);

  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      const matchesSearch =
        laptop.brand.toLowerCase().includes(search.toLowerCase()) ||
        laptop.model.toLowerCase().includes(search.toLowerCase());

      const matchesBrand =
        selectedBrand === "All" ||
        laptop.brand === selectedBrand;

      return matchesSearch && matchesBrand;
    });
  }, [search, selectedBrand]);

  return (
    <section
      id="laptops"
      className="bg-slate-950 py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionTitle
          badge="Best Deals"
          title="Featured"
          highlight="Laptops"
          subtitle="Browse our latest refurbished and brand-new laptops with warranty, free accessories and expert support."
        />

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <BrandFilter
          brands={brands}
          selected={selectedBrand}
          onChange={setSelectedBrand}
        />

        <div className="mb-8 text-gray-400 text-lg">
          Showing{" "}
          <span className="text-blue-500 font-bold">
            {filteredLaptops.length}
          </span>{" "}
          Laptop
          {filteredLaptops.length !== 1 ? "s" : ""}
        </div>

        {filteredLaptops.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">

            <h3 className="text-3xl font-bold text-white">
              No Laptop Found
            </h3>

            <p className="mt-4 text-gray-400">
              Try searching with another brand or model.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}