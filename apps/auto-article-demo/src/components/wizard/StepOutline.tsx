import { useEffect, useState } from "react";
import { generateOutline } from "../../utils/mockApi";
import type { WizardState } from "./Wizard";

type Props = {
  state: WizardState;
  onNext: (outline: string[]) => void;
  onBack: () => void;
};

export default function StepOutline({ state, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(state.outline.length === 0);
  const [outline, setOutline] = useState<string[]>(state.outline);

  useEffect(() => {
    if (outline.length > 0) return;
    setLoading(true);
    generateOutline(state.keyword, state.genre).then((data) => {
      setOutline(data);
      setLoading(false);
    });
  }, [outline.length, state.keyword, state.genre]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 2
        </p>
        <h2 className="mt-3 text-xl font-semibold text-slate-600">
          記事構成の作成
        </h2>
      </div>
      {loading ? (
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          構成を作成中...
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Title
          </p>
          <p className="mt-2 text-base text-text">
            {state.keyword} × {state.genre} 自動化ガイド
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
            目次
          </p>
          <ul className="mt-3 space-y-2">
            {outline.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNext(outline)}
          disabled={loading}
          className="rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base disabled:opacity-40"
        >
          この構成で進める（OK）
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
