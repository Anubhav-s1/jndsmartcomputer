import Image from "next/image";
import Link from "next/link";
import { Laptop } from "@/data/laptops";

type LaptopCardProps = {
  laptop: Laptop;
};

export default function LaptopCard({ laptop }: LaptopCardProps) {
  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Featured Badge */}
      {laptop.featured && (
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-2 font-semibold">
          ⭐ Featured Laptop
        </div>
      )}

      {/* Laptop Image */}
      <div className="overflow-hidden">
        <Image
          src={laptop.image}
          alt={laptop.model}
          width={500}
          height={350}
          className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Brand */}
        <h3 className="text-2xl font-bold text-white">
          {laptop.brand}
        </h3>

        {/* Model */}
        <p className="text-blue-400 font-medium mb-4">
          {laptop.model}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">

          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs text-white">
            {laptop.condition}
          </span>

          <span className="bg-green-600 px-3 py-1 rounded-full text-xs text-white">
            {laptop.warranty}
          </span>

        </div>

        {/* Specifications */}
        <ul className="space-y-2 text-gray-300 text-sm">

          <li>💻 {laptop.processor}</li>

          <li>🧠 {laptop.ram}</li>

          <li>💾 {laptop.storage}</li>

          <li>🖥 {laptop.display}</li>

          <li>🎮 {laptop.graphics}</li>

        </ul>

        {/* Price */}
        <div className="mt-6">

          <span className="text-3xl font-bold text-blue-500">
            ₹{laptop.price.toLocaleString()}
          </span>

        </div>

        {/* Stock */}
        <div className="mt-3">

          {laptop.stock <= 2 ? (
            <span className="text-red-400 font-semibold">
              🔥 Only {laptop.stock} Left
            </span>
          ) : (
            <span className="text-green-400 font-semibold">
              ✅ In Stock
            </span>
          )}

        </div>

        {/* Exchange */}
        {laptop.exchange && (
          <div className="mt-3 text-yellow-400 font-medium">
            🔄 Laptop Exchange Available
          </div>
        )}

        {/* Free Accessories */}
        <div className="mt-6 bg-slate-800 rounded-xl p-4">

          <h4 className="text-white font-semibold mb-3">
            🎁 FREE Accessories
          </h4>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">

            {laptop.accessories.map((item, index) => (
              <div key={index}>
                ✔ {item}
              </div>
            ))}

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          <a
            href={`https://wa.me/919286260212?text=Hi, I'm interested in the ${laptop.brand} ${laptop.model}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-center py-3 rounded-xl font-semibold text-white transition"
          >
            WhatsApp
          </a>

          <Link
            href={`/laptops/${laptop.id}`}
            className="border border-blue-500 hover:bg-blue-500 text-center py-3 rounded-xl font-semibold text-white transition"
          >
            Details
          </Link>

        </div>

      </div>

    </div>
  );
}