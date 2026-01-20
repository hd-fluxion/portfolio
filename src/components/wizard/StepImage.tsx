import { useEffect, useState } from "react";
import { generateImages } from "../../utils/mockApi";
import type { WizardState } from "./Wizard";

type Props = {
  state: WizardState;
  onNext: (images: string[]) => void;
};

export default function StepImage({ state, onNext }: Props) {
  const [loading, setLoading] = useState(state.images.length === 0);
  const [images, setImages] = useState(state.images);

  useEffect(() => {
    if (images.length > 0) return;
    setLoading(true);
    generateImages(state.article).then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, [images.length, state.article]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 4
        </p>
        <h2 className="mt-3 text-xl font-semibold text-slate-600">画像生成</h2>
      </div>
      {loading ? (
        <div className="flex items-center gap-3 text-sm text-white/70">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          画像を生成中...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/30"
            >
              <img src={src} alt={`画像 ${index + 1}`} />
              <p className="px-3 py-2 text-xs text-white/60">
                章 {index + 1}
              </p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => onNext(images)}
        disabled={loading}
        className="rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base disabled:opacity-40"
      >
        編集画面へ
      </button>
    </div>
  );
}
