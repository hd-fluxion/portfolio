import { profile } from "@/data/profile";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="About"
          title="価値ある成果にこだわる開発姿勢"
          description="開発の品質と成果を重視し、要件整理から実装まで丁寧に伴走します。"
        />
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <p className="text-lg text-sand">{profile.name}</p>
            <p className="mt-2 text-sm text-white/70">
              {profile.born} / {profile.location}
            </p>
            <p className="mt-6 text-sm text-white/80 md:text-base">
              {profile.summary}
            </p>
            <p className="mt-4 text-sm text-white/70">
              理念：{profile.philosophy}
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-white/60">Career</p>
            <ul className="mt-4 space-y-4 text-sm">
              {profile.timeline.map((item) => (
                <li key={item.year} className="flex gap-4">
                  <span className="text-sand">{item.year}</span>
                  <span className="text-white/70">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
