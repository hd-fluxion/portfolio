export default function StarRating({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < level ? "text-amber-300" : "text-white/20"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
