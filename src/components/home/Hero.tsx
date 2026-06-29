export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <span className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
            Trusted Computer Store in Dehradun
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
            Repair.
            <br />
            Upgrade.
            <br />
            Secure.
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Laptop Sales, Laptop Repair, CCTV Installation,
            Desktop Repair, Networking and Computer Accessories.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="tel:7017570265"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919286260212"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/hero.png"
            alt="JND Smart Computers"
            className="max-w-md w-full"
          />
        </div>

      </div>
    </section>
  );
}