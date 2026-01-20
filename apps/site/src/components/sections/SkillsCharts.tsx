type Props = {
  radarData: { name: string; level: number }[];
  barData: { name: string; value: number }[];
};

export default function SkillsCharts({ radarData, barData }: Props) {
  const maxValue = 5;
  const size = 240;
  const center = size / 2;
  const radius = size * 0.38;
  const steps = 4;
  const count = radarData.length;
  const angleStep = (Math.PI * 2) / Math.max(count, 1);

  const levelToPoint = (level: number, index: number) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const r = (level / maxValue) * radius;
    return [
      center + Math.cos(angle) * r,
      center + Math.sin(angle) * r,
    ] as const;
  };

  const polygonPoints = radarData
    .map((item, index) => levelToPoint(item.level, index).join(","))
    .join(" ");

  return (
    <div className="grid gap-6">
      <div className="glass relative h-72 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Radar Overview
        </p>
        <div className="mt-4 flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="text-white/70"
          >
            {Array.from({ length: steps }, (_, step) => {
              const r = radius * ((step + 1) / steps);
              const ringPoints = radarData
                .map((_, index) => {
                  const angle = -Math.PI / 2 + angleStep * index;
                  const x = center + Math.cos(angle) * r;
                  const y = center + Math.sin(angle) * r;
                  return `${x},${y}`;
                })
                .join(" ");
              return (
                <polygon
                  key={`ring-${r}`}
                  points={ringPoints}
                  fill="none"
                  stroke="rgba(148,163,184,0.2)"
                  strokeWidth="1"
                />
              );
            })}
            {radarData.map((_, index) => {
              const angle = -Math.PI / 2 + angleStep * index;
              const x = center + Math.cos(angle) * radius;
              const y = center + Math.sin(angle) * radius;
              return (
                <line
                  key={`axis-${index}`}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(148,163,184,0.35)"
                  strokeWidth="1"
                />
              );
            })}
            <polygon
              points={polygonPoints}
              fill="rgba(56,189,248,0.35)"
              stroke="rgba(56,189,248,0.9)"
              strokeWidth="2"
            />
            {radarData.map((item, index) => {
              const [x, y] = levelToPoint(item.level, index);
              return (
                <circle
                  key={`dot-${item.name}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="rgba(56,189,248,0.9)"
                />
              );
            })}
            {radarData.map((item, index) => {
              const angle = -Math.PI / 2 + angleStep * index;
              const labelRadius = radius + 18;
              const x = center + Math.cos(angle) * labelRadius;
              const y = center + Math.sin(angle) * labelRadius;
              const anchor =
                Math.abs(Math.cos(angle)) < 0.3
                  ? "middle"
                  : Math.cos(angle) > 0
                  ? "start"
                  : "end";
              const dy =
                Math.abs(Math.sin(angle)) < 0.2
                  ? 4
                  : Math.sin(angle) > 0
                  ? 10
                  : -4;
              return (
                <text
                  key={`label-${item.name}`}
                  x={x}
                  y={y}
                  textAnchor={anchor}
                  fontSize="10"
                  fill="rgba(47,50,66,0.8)"
                  dy={dy}
                >
                  {item.name}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="glass h-72 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Strength by Domain
        </p>
        <div className="mt-6 space-y-3">
          {barData.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{item.name}</span>
                <span>{item.value.toFixed(1)} / 5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-300/60">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${(item.value / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
