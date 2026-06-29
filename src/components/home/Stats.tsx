export default function Stats() {
  const stats = [
    {
      number: "10+",
      title: "Years Experience",
    },
    {
      number: "5000+",
      title: "Laptops Repaired",
    },
    {
      number: "2500+",
      title: "Happy Customers",
    },
    {
      number: "1000+",
      title: "CCTV Installations",
    },
  ];

  return (
    <section className="bg-blue-600 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10 text-center">

          {stats.map((item, index) => (

            <div key={index}>

              <h2 className="text-5xl font-extrabold text-white">
                {item.number}
              </h2>

              <p className="text-blue-100 mt-4 text-lg">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}