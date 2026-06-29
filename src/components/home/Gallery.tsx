import Image from "next/image";

const images = [
  "/gallery/laptop1.jpg",
  "/gallery/laptop2.jpg",
  "/gallery/repair1.jpg",
  "/gallery/cctv1.jpg",
  "/gallery/shop.jpg",
  "/gallery/customer.jpg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Our Gallery
          </h2>

          <p className="text-gray-400 mt-4">
            A glimpse of our laptop collection, repair work and CCTV installations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((img, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-800 hover:border-blue-500 transition duration-300 group"
            >

              <Image
                src={img}
                alt="JND Smart Computers"
                width={500}
                height={350}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}