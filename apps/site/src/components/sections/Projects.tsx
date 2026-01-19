import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/profile";

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Projects"
          title="成果につながるプロジェクト実績"
          description="定量的な効果や業務改善の成果を重視し、実務で使える形に落とし込みます。"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{project.period}</span>
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="text-accent hover:text-white"
                  >
                    参考リンク
                  </Link>
                )}
              </div>
              <h3 className="mt-3 font-display text-xl text-sand">
                {project.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">
                {project.overview}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/70">
                {project.outcome.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4">
                <Image
                  src={project.diagram}
                  alt={`${project.title} 構成図`}
                  width={640}
                  height={360}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
