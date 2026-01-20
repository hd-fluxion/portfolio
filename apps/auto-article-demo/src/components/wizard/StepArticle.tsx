import { useEffect, useState } from "react";
import { generateArticle } from "../../utils/mockApi";
import type { WizardState } from "./Wizard";
import type { ArticleData } from "../../utils/mockApi";

type Props = {
  state: WizardState;
  onNext: (article: ArticleData) => void;
  onBack: () => void;
};

export default function StepArticle({ state, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(state.article.sections.length === 0);
  const [article, setArticle] = useState(state.article);

  useEffect(() => {
    if (article.sections.length > 0) return;
    setLoading(true);
    generateArticle(state.outline, state.length).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [article.sections.length, state.length, state.outline]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 3
        </p>
        <h2 className="mt-3 text-xl font-semibold text-slate-600">記事生成</h2>
      </div>
      {loading ? (
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          本文を生成中...
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            {article.title}
          </p>
          <div className="mt-3 space-y-4">
            {article.sections.map((section) => (
              <div key={section.h2}>
                <p className="text-sm font-semibold text-white">{section.h2}</p>
                <ul className="mt-2 space-y-1 text-xs text-white/60">
                  {section.h3.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-white/70">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNext(article)}
          disabled={loading}
          className="rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base disabled:opacity-40"
        >
          この記事でOK
        </button>
        <button
          onClick={onBack}
          className="rounded-full border border-white/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          修正する
        </button>
      </div>
    </div>
  );
}
