export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      review:
        "Excellent laptop repair service. My laptop was repaired within one day. Highly recommended!",
    },
    {
      name: "Priya Verma",
      review:
        "Purchased a Dell laptop from JND Smart Computers. Great price and excellent customer support.",
    },
    {
      name: "Amit Singh",
      review:
        "Professional CCTV installation at my office. Clean wiring and timely service.",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            What Our Customers Say
          </h2>

          <p className="text-gray-400 mt-4">
            Trusted by hundreds of satisfied customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition duration-300"
            >
              <div className="text-yellow-400 text-2xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-300 italic">
                "{review.review}"
              </p>

              <h3 className="mt-6 text-xl font-bold">
                {review.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}