type Props = {
  onComplete: () => void;
  onReset: () => void;
};

export default function StepComplete({ onComplete, onReset }: Props) {
  return (
    <div className="space-y-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 5
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-800">
          準備完了
        </h2>
      </div>
      <p className="text-sm text-white/70">
        記事と画像が揃いました。編集画面で最終調整を行います。
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onComplete}
          className="rounded-full bg-accent px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base"
        >
          編集画面へ
        </button>
        <button
          onClick={onReset}
          className="rounded-full border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
}
