import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "JND Smart Computers — Repairs, Builds & Sales",
  description:
    "Laptop & desktop repair, pick & drop service, secondhand laptops, custom PC builds, CCTV and accessories.",
};

const nav = [
  { href: "/products", label: "Shop" },
  { href: "/track", label: "Track Repair" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
      >
        <header className="border-b" style={{ borderColor: "var(--color-line)" }}>
          <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-baseline gap-2">
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
              >
                JND
              </span>
              <span className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                Smart Computers
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-ink)" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/book-repair"
                className="rounded-[var(--radius-pill)] px-4 py-2 text-white text-sm font-semibold"
                style={{ background: "var(--color-accent)" }}
              >
                Drop Off a Device
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer
          className="border-t mt-24"
          style={{ borderColor: "var(--color-line)" }}
        >
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap justify-between gap-6 text-sm" style={{ color: "var(--color-ink-soft)" }}>
            <div>
              <p className="font-semibold" style={{ color: "var(--color-ink)" }}>
                JND Smart Computers
              </p>
              <p>Repairs · Builds · Sales · CCTV</p>
            </div>
            <div className="flex gap-8">
              <Link href="/book-repair">Book a repair</Link>
              <Link href="/track">Track a repair</Link>
              <Link href="/quote">Request a quote</Link>
              <Link href="/products">Browse products</Link>
              <Link href="/contact">Contact us</Link>
            </div>
          </div>
        </footer>

        <FloatingContactButtons />
      </body>
    </html>
  );
}
