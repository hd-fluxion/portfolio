import { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

type Section = {
  id: string;
  title: string;
  body: string;
};

const initialSections: Section[] = [
  {
    id: "s1",
    title: "導入：AI活用の背景",
    body: "業務効率化の第一歩は、現状把握と小さな自動化から始まります。",
  },
  {
    id: "s2",
    title: "主要な施策",
    body: "LLM、ワークフロー自動化、ダッシュボード化を組み合わせます。",
  },
  {
    id: "s3",
    title: "成果の出し方",
    body: "短期で成果を出すためにKPIと運用フローを設計します。",
  },
];

type Props = {
  sessionId: string;
  draft?: {
    title: string;
    sections: Section[];
    images: string[];
    meta: string;
  };
};

export default function Editor({ sessionId, draft }: Props) {
  const [history, setHistory] = useState<string[]>([
    "初期生成: AI×業務効率化",
    "構成修正: SEO寄り",
    "記事生成: 2000文字",
  ]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selected, setSelected] = useState(
    draft?.sections[0]?.id ?? initialSections[0].id
  );
  const [sections, setSections] = useState(
    draft?.sections ?? initialSections
  );
  const [images, setImages] = useState<string[]>(
    draft?.images ??
      initialSections.map(() => "https://placehold.co/600x400?text=Article+Image")
  );
  const [title, setTitle] = useState(draft?.title ?? "AI×業務効率化の進め方");
  const [meta, setMeta] = useState(
    draft?.meta ?? "AI×業務効率化を成果につなげる方法を解説"
  );
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!draft) return;
    setSections(draft.sections);
    setImages(
      draft.images.length > 0
        ? draft.images
        : draft.sections.map(
            () => "https://placehold.co/600x400?text=Article+Image"
          )
    );
    setTitle(draft.title);
    setMeta(draft.meta);
    setSelected(draft.sections[0]?.id ?? initialSections[0].id);
  }, [draft]);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selected),
    [sections, selected]
  );

  const updateSection = (id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, body: value } : section
      )
    );
  };

  const updateImage = (index: number, url: string) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  const refine = async (mode: string) => {
    if (!selectedSection) return;
    setStatus("AI補正中...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/refine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: selectedSection.body,
          mode,
          sessionId,
        }),
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      updateSection(selectedSection.id, data.data?.text ?? selectedSection.body);
      setStatus("補正が完了しました");
    } catch (error) {
      updateSection(
        selectedSection.id,
        `${selectedSection.body}\n\n[${mode}] の指示で調整済み（モック）`
      );
      setStatus("モック補正を適用しました");
    }
  };

  const postToWp = async () => {
    setStatus("WordPressへ投稿中...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/wp-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          meta,
          sections,
          images,
          sessionId,
        }),
      });
      if (!response.ok) throw new Error("API error");
      setStatus("投稿リクエスト完了（デモ）");
    } catch (error) {
      setStatus("モック投稿として処理しました");
    }
  };

  const addHistory = (label: string) => {
    setHistory((prev) => [label, ...prev].slice(0, 10));
  };

  return (
    <div className="relative grid gap-6 lg:grid-cols-[1fr_260px]">
      <section className="rounded-2xl border border-white/10 bg-panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              記事エディタ
            </p>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHistoryOpen((prev) => !prev)}
              className="rounded-full border border-white/20 px-3 py-2 text-white/70"
              aria-label="履歴メニュー"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              </svg>
            </button>
            <button
              onClick={postToWp}
              className="rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base"
            >
              WordPress投稿
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              目次
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setSelected(section.id)}
                    className={
                      section.id === selected ? "text-accent" : "text-white/60"
                    }
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xs text-white/50">
              画像差替: 章ごとに差し替え可能
            </div>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs text-white/60">
                メタディスクリプション
              </span>
              <textarea
                value={meta}
                onChange={(event) => setMeta(event.target.value)}
                rows={2}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2"
              />
            </label>
            {sections.map((section, index) => (
              <label key={section.id} className="block">
                <span className="text-xs text-white/60">{section.title}</span>
                <textarea
                  value={section.body}
                  onChange={(event) =>
                    updateSection(section.id, event.target.value)
                  }
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2"
                />
                <div className="mt-3 grid gap-3 rounded-lg border border-white/10 bg-black/30 p-3 md:grid-cols-[160px_1fr]">
                  <img
                    src={images[index]}
                    alt={`${section.title} 画像`}
                    className="h-24 w-full rounded-md object-cover"
                  />
                  <div>
                    <p className="text-xs text-white/60">画像URL（差し替え）</p>
                    <input
                      value={images[index] ?? ""}
                      onChange={(event) =>
                        updateImage(index, event.target.value)
                      }
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
        {status && (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70">
            {status}
          </div>
        )}
      </section>
      <aside className="rounded-2xl border border-white/10 bg-panel p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          AI補正
        </p>
        <p className="mt-3 text-sm text-white/70">
          選択中: {selectedSection?.title}
        </p>
        <div className="mt-4 grid gap-2">
          {["言い換え", "短く", "SEO向け", "丁寧", "箇条書き化"].map((mode) => (
            <button
              key={mode}
              onClick={() => refine(mode)}
              className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/60">
          選択箇所の補正をAPI経由で実行します。
        </div>
      </aside>
      {historyOpen && (
        <div className="absolute right-4 top-4 z-10 w-72 rounded-2xl border border-white/10 bg-panel p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              履歴
            </p>
            <button
              onClick={() => setHistoryOpen(false)}
              className="text-xs text-white/50"
            >
              閉じる
            </button>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {history.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white/70"
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => addHistory("手動編集を保存")}
            className="mt-4 w-full rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            履歴に追加
          </button>
        </div>
      )}
    </div>
  );
}
