import { useState } from "react";
import WizardPage from "./pages/WizardPage";
import Editor from "./components/Editor";

type DraftSection = {
  id: string;
  title: string;
  body: string;
};

type DraftData = {
  title: string;
  sections: DraftSection[];
  images: string[];
  meta: string;
};

export default function App() {
  const [mode, setMode] = useState<"wizard" | "editor">("wizard");
  const [sessionId] = useState(() =>
    Math.random().toString(36).slice(2, 10)
  );
  const [draft, setDraft] = useState<DraftData | null>(null);

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-panel/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Auto Article Demo
            </p>
            <h1 className="text-lg font-semibold">記事生成フロー UI</h1>
          </div>
          <button
            onClick={() =>
              setMode((prev) => (prev === "wizard" ? "editor" : "wizard"))
            }
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            {mode === "wizard" ? "編集画面へ" : "対話フローへ"}
          </button>
        </div>
      </header>
      <main className="w-full px-6 pt-8 pb-20">
        {mode === "wizard" ? (
          <WizardPage
            onComplete={(payload) => {
              const sections = payload.article.sections.map((section, index) => ({
                id: `s${index + 1}`,
                title: section.h2,
                body: section.body,
              }));
              setDraft({
                title: payload.article.title || "AI×業務効率化の進め方",
                sections,
                images:
                  payload.images.length > 0
                    ? payload.images
                    : sections.map(
                        () =>
                          "https://placehold.co/600x400?text=Article+Image"
                      ),
                meta: `${payload.keyword}の要点をわかりやすく整理し、実務で使える形にまとめます。`,
              });
              setMode("editor");
            }}
          />
        ) : (
          <Editor sessionId={sessionId} draft={draft ?? undefined} />
        )}
      </main>
    </div>
  );
}
