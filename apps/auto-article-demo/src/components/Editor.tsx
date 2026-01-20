import { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

type H3Block = {
  id: string;
  title: string;
  body: string;
};

type Section = {
  id: string;
  title: string;
  body: string;
  h3: H3Block[];
  imageUrl: string;
  imagePosition: "top" | "middle" | "bottom";
};

const initialSections: Section[] = [
  {
    id: "s1",
    title: "導入：AI活用の背景",
    body: "業務効率化の第一歩は、現状把握と小さな自動化から始まります。",
    h3: [
      {
        id: "s1-h3-1",
        title: "課題の可視化",
        body: "現状のボトルネックを共有し、改善余地を明確にします。",
      },
      {
        id: "s1-h3-2",
        title: "小さな自動化",
        body: "まずは部分最適で効果を確認し、成功体験を積み重ねます。",
      },
    ],
    imageUrl: "https://placehold.co/600x400?text=Article+Image",
    imagePosition: "top",
  },
  {
    id: "s2",
    title: "主要な施策",
    body: "LLM、ワークフロー自動化、ダッシュボード化を組み合わせます。",
    h3: [
      {
        id: "s2-h3-1",
        title: "LLM活用",
        body: "要約やドラフト作成を自動化し、品質とスピードを両立します。",
      },
      {
        id: "s2-h3-2",
        title: "運用自動化",
        body: "データ連携や通知を自動化し、作業負荷を削減します。",
      },
    ],
    imageUrl: "https://placehold.co/600x400?text=Article+Image",
    imagePosition: "middle",
  },
  {
    id: "s3",
    title: "成果の出し方",
    body: "短期で成果を出すためにKPIと運用フローを設計します。",
    h3: [
      {
        id: "s3-h3-1",
        title: "KPI設計",
        body: "効果が測れる指標を先に決めて改善サイクルを回します。",
      },
    ],
    imageUrl: "https://placehold.co/600x400?text=Article+Image",
    imagePosition: "bottom",
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
  const [sections, setSections] = useState<Section[]>(
    draft?.sections ?? initialSections
  );
  const [title, setTitle] = useState(draft?.title ?? "AI×業務効率化の進め方");
  const [meta, setMeta] = useState(
    draft?.meta ?? "AI×業務効率化を成果につなげる方法を解説"
  );
  const [customInstruction, setCustomInstruction] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!draft) return;
    setSections(draft.sections);
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

  const updateSectionTitle = (id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, title: value } : section
      )
    );
  };

  const updateH3 = (sectionId: string, h3Id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              h3: section.h3.map((item) =>
                item.id === h3Id ? { ...item, body: value } : item
              ),
            }
          : section
      )
    );
  };

  const updateH3Title = (sectionId: string, h3Id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              h3: section.h3.map((item) =>
                item.id === h3Id ? { ...item, title: value } : item
              ),
            }
          : section
      )
    );
  };

  const updateImageForSection = (sectionId: string, url: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, imageUrl: url } : section
      )
    );
  };

  const updateImagePosition = (
    sectionId: string,
    position: "top" | "middle" | "bottom"
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, imagePosition: position } : section
      )
    );
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: `s${prev.length + 1}`,
        title: "新しい章",
        body: "概要を入力してください。",
        h3: [
          {
            id: `s${prev.length + 1}-h3-1`,
            title: "小見出し",
            body: "本文を入力してください。",
          },
        ],
        imageUrl: "https://placehold.co/600x400?text=Article+Image",
        imagePosition: "top",
      },
    ]);
  };

  const addH3 = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              h3: [
                ...section.h3,
                {
                  id: `${sectionId}-h3-${section.h3.length + 1}`,
                  title: "小見出し",
                  body: "本文を入力してください。",
                },
              ],
            }
          : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const removeH3 = (sectionId: string, h3Id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, h3: section.h3.filter((item) => item.id !== h3Id) }
          : section
      )
    );
  };

  const onDragStart = (index: number) => {
    setDragIndex(index);
  };

  const onDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    setSections((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(null);
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
          instruction: customInstruction,
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

  const applyCustomInstruction = () => {
    if (!customInstruction.trim() || !selectedSection) return;
    refine(customInstruction);
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
          images: sections.map((section) => section.imageUrl),
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
        <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr]">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              目次
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {sections.map((section, index) => (
                <li
                  key={section.id}
                  draggable
                  onDragStart={() => onDragStart(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => onDrop(index)}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                >
                  <button
                    onClick={() => setSelected(section.id)}
                    className={
                      section.id === selected ? "text-accent" : "text-white/60"
                    }
                  >
                    {section.title}
                  </button>
                  <p className="mt-2 text-xs text-white/50">
                    Image: {section.imagePosition}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xs text-white/50">
              画像差替: 章ごとに差し替え可能
            </div>
            <button
              onClick={addSection}
              className="mt-4 w-full rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
            >
              H2 を追加
            </button>
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
              <div
                key={section.id}
                className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-center justify-between">
                  <input
                    value={section.title}
                    onChange={(event) =>
                      updateSectionTitle(section.id, event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => removeSection(section.id)}
                    className="ml-3 text-xs text-white/50"
                  >
                    削除
                  </button>
                </div>
                <textarea
                  value={section.body}
                  onChange={(event) =>
                    updateSection(section.id, event.target.value)
                  }
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
                />
                <div className="grid gap-2">
                  {section.h3.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-white/10 bg-black/30 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          value={item.title}
                          onChange={(event) =>
                            updateH3Title(section.id, item.id, event.target.value)
                          }
                          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                        />
                        <button
                          onClick={() => removeH3(section.id, item.id)}
                          className="ml-3 text-xs text-white/50"
                        >
                          削除
                        </button>
                      </div>
                      <textarea
                        value={item.body}
                        onChange={(event) =>
                          updateH3(section.id, item.id, event.target.value)
                        }
                        rows={3}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addH3(section.id)}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                  >
                    H3 を追加
                  </button>
                </div>
                <div className="grid gap-3 rounded-lg border border-white/10 bg-black/30 p-3 md:grid-cols-[160px_1fr]">
                  <img
                    src={section.imageUrl}
                    alt={`${section.title} 画像`}
                    className="h-24 w-full rounded-md object-cover"
                  />
                  <div>
                    <p className="text-xs text-white/60">画像URL（差し替え）</p>
                    <input
                      value={section.imageUrl}
                      onChange={(event) =>
                        updateImageForSection(section.id, event.target.value)
                      }
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                    />
                    <div className="mt-2">
                      <label className="text-xs text-white/60">
                        画像位置
                      </label>
                      <select
                        value={section.imagePosition}
                        onChange={(event) =>
                          updateImagePosition(
                            section.id,
                            event.target.value as "top" | "middle" | "bottom"
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                      >
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50">
                  章 {index + 1}
                </p>
              </div>
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
        <div className="mt-4 space-y-3">
          <textarea
            value={customInstruction}
            onChange={(event) => setCustomInstruction(event.target.value)}
            rows={3}
            placeholder="例: 丁寧なトーンで短くまとめてください"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
          />
          <button
            onClick={applyCustomInstruction}
            className="w-full rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base"
          >
            AI修正
          </button>
        </div>
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
