type Props = {
  onNext: () => void;
};

export default function StepStart({ onNext }: Props) {
  return (
    <div className="space-y-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 0
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-800">
          AI オート記事作成ツール
        </h2>
      </div>
      <p className="text-sm text-white/70">
        キーワードと条件を入力すると、構成〜本文〜画像まで自動で生成します。
        実務で使える流れを体験してください。
      </p>
      <button
        onClick={onNext}
        className="rounded-full bg-accent px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base"
      >
        開始する
      </button>
    </div>
  );
}
