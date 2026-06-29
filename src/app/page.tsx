import Link from "next/link";

const categories = [
  { key: "laptop_new", label: "New Laptops", desc: "Latest models, full warranty" },
  { key: "laptop_used", label: "Used Laptops", desc: "Inspected, graded, guaranteed" },
  { key: "pc_components", label: "PC Builds", desc: "Custom gaming & work rigs" },
  { key: "cctv", label: "CCTV Systems", desc: "Home & shop surveillance" },
  { key: "accessory", label: "Accessories", desc: "Bags, mice, RAM, storage" },
  { key: "desktop", label: "Desktops", desc: "Ready-built office & home PCs" },
];

const steps = [
  { n: "01", title: "Drop off or request pickup", desc: "Bring your device in, or ask us to collect it from your address." },
  { n: "02", title: "Get your claim ticket", desc: "We hand you a short tracking code — keep it, that's all you need." },
  { n: "03", title: "Track it anytime", desc: "Enter the code on our Track Repair page to see exactly where things stand." },
  { n: "04", title: "Pickup or delivery", desc: "Once it's ready, collect it or we drop it back to you." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-accent-dark)" }}
          >
            Repairs · Sales · Custom Builds
          </p>
          <h1
            className="text-5xl leading-[1.05] font-bold mb-6"
            style={{ color: "var(--color-ink)" }}
          >
            Your laptop's problem,
            <br />
            tracked from drop-off
            <br />
            to delivery.
          </h1>
          <p className="text-lg mb-8 max-w-md" style={{ color: "var(--color-ink-soft)" }}>
            Hand us your device, get a claim code, and watch its repair
            status update in real time — no calling to ask &quot;is it done yet?&quot;
          </p>
          <div className="flex gap-4">
            <Link
              href="/book-repair"
              className="rounded-[var(--radius-card)] px-6 py-3 text-white font-semibold"
              style={{ background: "var(--color-primary)" }}
            >
              Book a Repair
            </Link>
            <Link
              href="/track"
              className="rounded-[var(--radius-card)] px-6 py-3 font-semibold border"
              style={{ borderColor: "var(--color-line)", color: "var(--color-ink)" }}
            >
              Track My Order
            </Link>
          </div>
        </div>

        {/* Signature claim-ticket visual */}
        <div className="flex justify-center">
          <div className="claim-ticket w-full max-w-sm">
            <p className="text-xs opacity-60 mb-1 uppercase tracking-wider">Claim Ticket</p>
            <p className="text-3xl font-semibold mb-4">JND-7F3K9</p>
            <div className="flex justify-between text-xs opacity-80 border-t border-white/15 pt-3">
              <span>Dell Inspiron 15</span>
              <span style={{ color: "var(--color-accent)" }}>In Repair</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t" style={{ borderColor: "var(--color-line)" }}>
        <h2 className="text-2xl font-bold mb-10">How the pick &amp; drop service works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.n}>
              <p className="font-mono text-sm mb-3" style={{ color: "var(--color-accent-dark)" }}>
                {step.n}
              </p>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t" style={{ borderColor: "var(--color-line)" }}>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-2xl font-bold">Shop by category</h2>
          <Link href="/products" className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
            View all products →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/products?category=${c.key}`}
              className="rounded-[var(--radius-card)] border p-6 hover:shadow-sm transition-shadow"
              style={{ borderColor: "var(--color-line)", background: "var(--color-card)" }}
            >
              <h3 className="font-semibold mb-1">{c.label}</h3>
              <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote CTA */}
      <section
        className="mx-auto max-w-6xl px-6 py-16 mb-8 rounded-[var(--radius-card)]"
        style={{ background: "var(--color-primary)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-6 px-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Not sure what you need?
            </h2>
            <p className="text-white/80 max-w-md">
              Tell us your budget and use case — PC build, secondhand laptop,
              CCTV, or any accessory — and we&apos;ll send a quote.
            </p>
          </div>
          <Link
            href="/quote"
            className="rounded-[var(--radius-card)] px-6 py-3 font-semibold whitespace-nowrap"
            style={{ background: "var(--color-accent)", color: "white" }}
          >
            Request a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
