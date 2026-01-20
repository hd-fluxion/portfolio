import { useEffect, useState } from "react";
import { generateKeywordInsights } from "../../utils/mockApi";
import type { WizardState } from "./Wizard";

type Props = {
  state: WizardState;
  onNext: (
    insights: WizardState["insights"],
    selected: WizardState["selectedInsight"]
  ) => void;
  onBack: () => void;
};

export default function StepKeywordInsights({ state, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(state.insights.length === 0);
  const [insights, setInsights] = useState(state.insights);
  const [selected, setSelected] = useState(
    state.selectedInsight ?? state.insights[0]
  );

  useEffect(() => {
    if (insights.length > 0) return;
    setLoading(true);
    generateKeywordInsights(state.keyword).then((data) => {
      setInsights(data);
      setSelected(data[0]);
      setLoading(false);
    });
  }, [insights.length, state.keyword]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 2
        </p>
        <h2 className="mt-3 text-xl font-semibold text-slate-600">
          SEOキーワードの候補
        </h2>
      </div>
      {loading ? (
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          検索意図を分析中...
        </div>
      ) : (
        <div className="space-y-3">
          {insights.map((item) => (
            <button
              key={item.keyword}
              onClick={() => setSelected(item)}
              className={
                selected?.keyword === item.keyword
                  ? "w-full rounded-xl border border-accent/60 bg-accent/10 p-4 text-left"
                  : "w-full rounded-xl border border-white/10 bg-black/30 p-4 text-left"
              }
            >
              <p className="text-sm text-text">{item.keyword}</p>
              <p className="mt-2 text-xs text-white/60">
                Intent: {item.intent}
              </p>
              <p className="mt-1 text-xs text-white/60">
                Audience: {item.audience}
              </p>
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNext(insights, selected)}
          disabled={loading || !selected}
          className="rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base disabled:opacity-40"
        >
          このキーワードで進める
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
