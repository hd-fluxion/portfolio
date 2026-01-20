import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  "キーワード/ジャンル/文字数ヒアリング",
  "構成作成 → 修正",
  "記事生成（H3まで） → 修正",
  "画像生成",
  "編集画面で仕上げ → WordPress投稿",
];

export default function Work() {
  return (
    <section id="work" className="section-pad bg-haze">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Work"
          title="AI記事作成ツール（デモUI）"
          description="チャット型の対話フローと編集画面で、記事生成〜編集〜投稿までの流れを体験できます。"
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl text-white/50">デモの流れ</h3>
            <ol className="mt-4 space-y-3 text-sm text-white/70">
              {steps.map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="text-accent">●</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="https://hd-fluxion.github.io/portfolio/demo/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink"
              >
                デモを開く
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                相談する
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">
              ※ デモはポートフォリオのGitHub Pages上で公開しています。
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl text-white/50">ポイント</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>フロントにAPIキーを置かず、PHP API経由で安全に連携</li>
              <li>編集画面は履歴/記事/AI補正を3カラムで管理</li>
              <li>WordPress投稿まで想定した実運用フロー</li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
              API: /api/generate-outline /api/generate-article /api/refine
              /api/generate-image /api/wp-post
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
