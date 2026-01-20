import Link from "next/link";

export default function Hero() {
  return (
    <section className="section-pad relative overflow-hidden bg-hero-glow">
      <div className="absolute inset-0 bg-grid-faint bg-[length:48px_48px] opacity-40" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p className="chip">AI × BUSINESS AUTOMATION</p>
          <h1 className="font-display text-4xl text-text md:text-6xl">
            <span className="text-accent">業務に寄り添うAI×自動化で、</span>
            <br />
            相談から実装まで一気通貫。
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            ヒアリングから設計・開発・運用まで対応。品質とスピードの両立で、
            現場に根付くDXを実現します。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/60 hover:text-white"
            >
              事例を見る
            </Link>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "設計から運用まで",
              text: "要件整理・技術選定・運用設計まで伴走。",
            },
            {
              title: "AI×業務効率化",
              text: "LLMや自動化で工数削減と品質向上。",
            },
            {
              title: "実装の再現性",
              text: "保守性とスケールを意識した構成。",
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg text-white/50">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
