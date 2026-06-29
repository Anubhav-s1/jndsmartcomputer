import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { laptops } from "@/data/laptops";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LaptopDetails({ params }: Props) {
  const { id } = await params;

  const laptop = laptops.find((item) => item.id === Number(id));

  if (!laptop) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

          <div>
            <Image
              src={laptop.image}
              alt={laptop.model}
              width={700}
              height={500}
              className="rounded-3xl border border-slate-800"
            />
          </div>

          <div>
            {laptop.featured && (
              <span className="bg-green-600 px-4 py-2 rounded-full text-sm">
                ⭐ Featured Laptop
              </span>
            )}

            <h1 className="text-5xl font-bold mt-6">
              {laptop.brand}
            </h1>

            <h2 className="text-2xl text-blue-400 mt-2">
              {laptop.model}
            </h2>

            <div className="mt-8 space-y-4 text-lg">
              <p>💻 Processor: {laptop.processor}</p>
              <p>🧠 RAM: {laptop.ram}</p>
              <p>💾 Storage: {laptop.storage}</p>
              <p>🖥️ Display: {laptop.display}</p>
              <p>🎮 Graphics: {laptop.graphics}</p>
            </div>

            <h3 className="mt-10 text-3xl font-bold text-blue-500">
              ₹{laptop.price.toLocaleString()}
            </h3>

            <div className="mt-10 bg-slate-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">
                🎁 FREE Accessories
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>✔ Laptop Bag</li>
                <li>✔ Wireless Mouse</li>
                <li>✔ Keyboard</li>
                <li>✔ Cleaning Kit</li>
                <li>✔ Keyguard</li>
              </ul>
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href={`https://wa.me/919286260212?text=Hi, I'm interested in the ${laptop.brand} ${laptop.model}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold"
              >
                Buy on WhatsApp
              </a>

              <a
                href="tel:7017570265"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
              >
                Call Now
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}