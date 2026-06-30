import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

// Same numbers as FloatingContactButtons.tsx — keep these in sync.
const WHATSAPP_NUMBER = "919286260212";
const CALL_NUMBER = "+917017570265";
const DISPLAY_PHONE = "+91 70175 70265";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I have a question about your computers/repairs."
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p
        className="font-mono text-xs uppercase tracking-widest mb-3"
        style={{ color: "var(--color-accent-dark)" }}
      >
        Get In Touch
      </p>
      <h1 className="text-3xl font-bold mb-3">Contact us</h1>
      <p className="mb-10" style={{ color: "var(--color-ink-soft)" }}>
        Call or WhatsApp us directly for the fastest response, or use the
        forms below for repairs and quotes.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        <a
          href={`tel:${CALL_NUMBER}`}
          className="rounded-[var(--radius-card)] border p-6 flex items-center gap-4 hover:shadow-sm transition-shadow"
          style={{ borderColor: "var(--color-line)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "var(--color-primary)" }}
          >
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold">Call us</p>
            <p className="text-sm font-mono" style={{ color: "var(--color-ink-soft)" }}>
              {DISPLAY_PHONE}
            </p>
          </div>
        </a>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[var(--radius-card)] border p-6 flex items-center gap-4 hover:shadow-sm transition-shadow"
          style={{ borderColor: "var(--color-line)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#25D366" }}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold">WhatsApp us</p>
            <p className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
              Usually replies within minutes
            </p>
          </div>
        </a>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-12 text-sm" style={{ color: "var(--color-ink-soft)" }}>
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-accent-dark)" }} />
          <div>
            <p className="font-semibold" style={{ color: "var(--color-ink)" }}>Hours</p>
            <p>Mon–Sat, 10:00 AM – 8:00 PM</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-accent-dark)" }} />
          <div>
            <p className="font-semibold" style={{ color: "var(--color-ink)" }}>Visit us</p>
            <p>Update this with your real shop address</p>
          </div>
        </div>
      </div>

      <div
        className="rounded-[var(--radius-card)] p-8 flex flex-wrap items-center justify-between gap-6"
        style={{ background: "var(--color-primary)" }}
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Have a device that needs repair?
          </h2>
          <p className="text-white/80 text-sm">
            Book it in directly and get a tracking code right away.
          </p>
        </div>
        <Link
          href="/book-repair"
          className="rounded-[var(--radius-card)] px-6 py-3 font-semibold whitespace-nowrap"
          style={{ background: "var(--color-accent)", color: "white" }}
        >
          Book a Repair
        </Link>
      </div>
    </div>
  );
}
