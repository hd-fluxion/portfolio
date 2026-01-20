type Props = {
  keyword: string;
  genre: string;
  length: number;
  onChange: (payload: { keyword: string; genre: string; length: number }) => void;
  onNext: () => void;
  onBack: () => void;
};

const genres = ["SEO", "DX", "AI", "ビジネス"];
const lengths = [1000, 2000, 3000];

export default function StepInput({
  keyword,
  genre,
  length,
  onChange,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Step 1
        </p>
        <h2 className="mt-3 text-xl font-semibold text-slate-600">
          記事条件入力
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-xs text-white/60">キーワード</span>
          <input
            data-input="keyword"
            value={keyword}
            onChange={(event) =>
              onChange({ keyword: event.target.value, genre, length })
            }
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs text-white/60">ジャンル</span>
          <select
            data-input="genre"
            value={genre}
            onChange={(event) =>
              onChange({
                keyword,
                genre: event.target.value,
                length,
              })
            }
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-white/60">文字数</span>
          <select
            data-input="length"
            value={length}
            onChange={(event) =>
              onChange({
                keyword,
                genre,
                length: Number(event.target.value),
              })
            }
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          >
            {lengths.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onNext}
          className="rounded-full bg-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-base"
        >
          構成を作成
        </button>
        <button
          onClick={onBack}
          className="rounded-full border border-white/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          戻る
        </button>
      </div>
    </div>
  );
}
