import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white";

  return (
    <Link
      href={href}
      className={`${styles} px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:scale-105`}
    >
      {children}
    </Link>
  );
}