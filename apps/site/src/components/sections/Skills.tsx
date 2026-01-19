import SectionHeader from "@/components/ui/SectionHeader";
import StarRating from "@/components/ui/StarRating";
import { skillGroups } from "@/data/profile";
import SkillsCharts from "@/components/sections/SkillsCharts";

const radarLabels = [
  "React",
  "Next.js",
  "PHP",
  "Node.js",
  "LLM API(OpenAI等)",
  "Architecture",
  "TypeScript",
  "GAS",
  "DB設計",
];

const radarData = skillGroups
  .flatMap((group) => group.items)
  .filter((item) => radarLabels.includes(item.name))
  .map((item) => ({ name: item.name, level: item.level }));

const barData = skillGroups.map((group) => ({
  name: group.name,
  value:
    group.items.reduce((sum, item) => sum + item.level, 0) /
    group.items.length,
}));


export default function Skills() {
  return (
    <section id="skills" className="section-pad bg-haze">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Skills"
          title="採用・案件ニーズに合わせた技術スタック"
          description="フロントからバックエンド、AI活用まで一貫対応。必要な領域を柔軟に組み合わせます。"
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.name} className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg text-sand">
                  {group.name}
                </h3>
                <div className="mt-4 space-y-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-white/80">
                        {item.name}
                      </span>
                      <StarRating level={item.level} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <SkillsCharts radarData={radarData} barData={barData} />
        </div>
      </div>
    </section>
  );
}
