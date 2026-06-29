export default function Services() {
  const services = [
    {
      title: "Laptop Repair",
      icon: "💻",
      desc: "Chip level repairing, motherboard repair, screen replacement and upgrades.",
    },
    {
      title: "Laptop Sales",
      icon: "🛒",
      desc: "Refurbished and brand new laptops with warranty.",
    },
    {
      title: "CCTV Installation",
      icon: "📹",
      desc: "Home, office and commercial CCTV installation.",
    },
    {
      title: "Printer Repair",
      icon: "🖨️",
      desc: "All printer brands servicing and maintenance.",
    },
    {
      title: "Networking",
      icon: "🌐",
      desc: "WiFi setup, LAN networking and router configuration.",
    },
    {
      title: "Data Recovery",
      icon: "💾",
      desc: "Recover deleted files and damaged hard drives.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-slate-900 py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-4">
          Our <span className="text-blue-500">Services</span>
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Everything you need for laptops, computers and CCTV solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 hover:-translate-y-2 hover:bg-slate-700 transition duration-300 shadow-lg"
            >
              <div className="text-5xl mb-5">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {service.desc}
              </p>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}