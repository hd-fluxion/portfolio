export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <p className="chip">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl text-sand md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
        {description}
      </p>
    </div>
  );
}
