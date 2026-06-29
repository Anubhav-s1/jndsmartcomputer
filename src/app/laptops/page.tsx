import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LaptopCard from "@/components/ui/LaptopCard";
import { getLaptops } from "@/lib/laptops";

export default async function LaptopsPage() {
  const laptops = await getLaptops();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold">
              Our <span className="text-blue-500">Laptops</span>
            </h1>

            <p className="text-gray-400 mt-4">
              Quality refurbished and brand-new laptops with warranty.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {laptops.map((laptop: any) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
              />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}