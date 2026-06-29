type SectionTitleProps = {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
};

export default function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      {badge && (
        <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-5xl font-bold text-white">
        {title}{" "}
        {highlight && (
          <span className="text-blue-500">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-5 text-lg text-gray-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}