import { useEffect, useMemo, useState } from "react";
import SEOAssistantPanel from "./SEOAssistantPanel";

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
  imagePosition: string;
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
    imagePosition: "after-h2",
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
    imagePosition: "after-h2",
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
    imagePosition: "after-h2",
  },
];

type Props = {
  sessionId: string;
  draft?: {
    title: string;
    sections: Section[];
    images: string[];
    meta: string;
    keyword: string;
  };
  historyOpen: boolean;
  onCloseHistory: () => void;
};

export default function Editor({
  sessionId,
  draft,
  historyOpen,
  onCloseHistory,
}: Props) {
  const [history, setHistory] = useState<string[]>([
    "初期生成: AI×業務効率化",
    "構成修正: SEO寄り",
    "記事生成: 2000文字",
  ]);
  const [selected, setSelected] = useState<{
    sectionId: string;
    h3Id?: string;
    isImage?: boolean;
  }>({
    sectionId: draft?.sections[0]?.id ?? initialSections[0].id,
  });
  const [sections, setSections] = useState<Section[]>(
    draft?.sections ?? initialSections
  );
  const [title, setTitle] = useState(draft?.title ?? "AI×業務効率化の進め方");
  const [meta, setMeta] = useState(
    draft?.meta ?? "AI×業務効率化を成果につなげる方法を解説"
  );
  const [customInstruction, setCustomInstruction] = useState("");
  const [customCss, setCustomCss] = useState(
    `.fw-toc { background: #eef2ff; padding: 12px; border-radius: 10px; }
.fw-toc-title { font-weight: 600; margin-bottom: 8px; }
.fw-toc-list { margin: 0; padding-left: 18px; }
.fw-toc-item { margin-bottom: 4px; }
.fw-quote { border-left: 4px solid #7aa7ff; padding-left: 12px; color: #475569; }
.fw-highlight { background: #ffe9b8; padding: 2px 6px; border-radius: 6px; }
.fw-underline { text-decoration: underline; text-decoration-color: #7aa7ff; }`
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState("");
  const [previewCategory, setPreviewCategory] = useState("AI/Automation");
  const [previewStatus, setPreviewStatus] = useState("Draft");
  const [status, setStatus] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragH3, setDragH3] = useState<{ sectionId: string; index: number } | null>(
    null
  );
  const [dragOverH3, setDragOverH3] = useState<{
    sectionId: string;
    index: number;
  } | null>(null);
  const [imageDragSectionId, setImageDragSectionId] = useState<string | null>(
    null
  );
  const [imageDragOver, setImageDragOver] = useState<{
    sectionId: string;
    position: string;
  } | null>(null);

  useEffect(() => {
    if (!draft) return;
    const normalized = draft.sections.map((section) => ({
      ...section,
      imagePosition:
        section.imagePosition === "top"
          ? "after-h2"
          : section.imagePosition === "middle"
          ? "after-h2"
          : section.imagePosition === "bottom"
          ? "after-all"
          : section.imagePosition || "after-h2",
    }));
    setSections(normalized);
    setTitle(draft.title);
    setMeta(draft.meta);
    setSelected({ sectionId: draft.sections[0]?.id ?? initialSections[0].id });
  }, [draft]);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selected.sectionId),
    [sections, selected.sectionId]
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

  const updateImagePosition = (sectionId: string, position: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, imagePosition: position } : section
      )
    );
  };

  const addSectionAt = (index: number) => {
    setSections((prev) => {
      const next = [...prev];
      next.splice(index, 0, {
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
        imagePosition: "before-h2",
      });
      return next;
    });
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
    setDragOverIndex(null);
  };

  const onDragStartH3 = (sectionId: string, index: number) => {
    setDragH3({ sectionId, index });
  };

  const onDropH3 = (sectionId: string, index: number) => {
    if (!dragH3) return;
    if (dragH3.sectionId !== sectionId) {
      setDragH3(null);
      setDragOverH3(null);
      return;
    }
    if (dragH3.index === index) {
      setDragH3(null);
      setDragOverH3(null);
      return;
    }
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        const next = [...section.h3];
        const [moved] = next.splice(dragH3.index, 1);
        next.splice(index, 0, moved);
        return { ...section, h3: next };
      })
    );
    setDragH3(null);
    setDragOverH3(null);
  };

  const renderImageBlock = (section: Section) => {
    const h3Id = section.imagePosition.startsWith("after-h3:")
      ? section.imagePosition.replace("after-h3:", "")
      : undefined;
    return (
      <div
        draggable
        onDragStart={(event) => {
          event.stopPropagation();
          event.dataTransfer.setData("image-section-id", section.id);
          setImageDragSectionId(section.id);
        }}
        onMouseDown={() =>
          setSelected({ sectionId: section.id, h3Id, isImage: true })
        }
        onDragEnd={() => {
          setImageDragSectionId(null);
          setImageDragOver(null);
        }}
        data-image-drag
        className="grid gap-3 rounded-lg border border-white/10 bg-black/30 p-3 md:grid-cols-[160px_1fr]"
      >
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
        </div>
      </div>
    );
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
      const htmlBody = previewHtml;
      const response = await fetch(`${API_BASE_URL}/api/wp-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          meta,
          sections,
          html: htmlBody,
          css: customCss,
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

  const tocItems = sections
    .map(
      (section, index) =>
        `<li class="fw-toc-item">#${index + 1} ${section.title}</li>`
    )
    .join("");

  const previewHtml = [
    `<div class="fw-toc">`,
    `<div class="fw-toc-title">Table of Contents</div>`,
    `<ol class="fw-toc-list">${tocItems}</ol>`,
    `</div>`,
    `<h1 class="fw-title">${title}</h1>`,
    `<p class="fw-meta">${meta}</p>`,
    ...sections.flatMap((section) => [
      section.imagePosition === "before-h2"
        ? `<img class="fw-image" src="${section.imageUrl}" alt="${section.title}" />`
        : "",
      `<h2 class="fw-h2">${section.title}</h2>`,
      `<p><span class="fw-highlight">${section.body.split("\n")[0] ?? ""}</span>${section.body.includes("\n") ? `<br/>${section.body.split("\n").slice(1).join("<br/>")}` : ""}</p>`,
      section.imagePosition === "after-h2"
        ? `<img class="fw-image" src="${section.imageUrl}" alt="${section.title}" />`
        : "",
      ...section.h3.flatMap((h3) => [
        `<h3 class="fw-h3">${h3.title}</h3>`,
        `<p><span class="fw-highlight">${h3.body.split("\n")[0] ?? ""}</span>${h3.body.includes("\n") ? `<br/>${h3.body.split("\n").slice(1).join("<br/>")}` : ""}</p>`,
        section.imagePosition === `after-h3:${h3.id}`
          ? `<img class="fw-image" src="${section.imageUrl}" alt="${section.title}" />`
          : "",
      ]),
      section.imagePosition === "after-all"
        ? `<img class="fw-image" src="${section.imageUrl}" alt="${section.title}" />`
        : "",
    ]),
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="relative grid gap-6 lg:grid-cols-[1fr_280px]">
      <section className="rounded-2xl border border-white/10 bg-panel p-6">
        <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Title (H1)
          </p>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-lg"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              記事エディタ
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPreviewOpen(true);
              }}
              className="rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base"
            >
              WordPress投稿
            </button>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs text-white/60">メタディスクリプション</span>
            <textarea
              value={meta}
              onChange={(event) => setMeta(event.target.value)}
              rows={2}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2"
            />
          </label>
          {sections.map((section, index) => (
            <div key={`${section.id}-wrap`} className="space-y-3">
              {index > 0 && (
                <button
                  onClick={() => addSectionAt(index)}
                  className="w-full rounded-full border border-dashed border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                >
                  ここに H2 を追加
                </button>
              )}
            <div
              key={section.id}
              draggable
              onDragStart={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("[data-image-drag]")) {
                  event.preventDefault();
                  return;
                }
                onDragStart(index);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOverIndex(index);
              }}
              onDrop={() => onDrop(index)}
              onMouseDown={() => setSelected({ sectionId: section.id })}
              className={
                section.id === selected.sectionId && !selected.h3Id
                  ? "space-y-3 rounded-xl border border-accent/60 bg-black/20 p-4 shadow-[0_0_0_1px_rgba(122,167,255,0.4)]"
                  : "space-y-3 rounded-xl border border-white/10 bg-black/20 p-4"
              }
            >
              {dragOverIndex === index &&
                dragIndex !== index &&
                imageDragSectionId === null && (
                  <div className="flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/10 px-3 py-1 text-xs text-accent">
                    <span className="text-base">＋</span>
                    ここに移動
                  </div>
                )}
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  const id = event.dataTransfer.getData("image-section-id");
                  if (id === section.id) {
                    updateImagePosition(section.id, "before-h2");
                  }
                  setDragOverIndex(null);
                  setDragOverH3(null);
                  setImageDragOver(null);
                  setImageDragSectionId(null);
                }}
                onDragEnter={() =>
                  setImageDragOver({
                    sectionId: section.id,
                    position: "before-h2",
                  })
                }
                className="rounded-lg border border-dashed border-white/10 p-2"
              >
                {imageDragSectionId === section.id &&
                  imageDragOver?.sectionId === section.id &&
                  imageDragOver.position === "before-h2" && (
                    <div className="mb-2 flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/10 px-2 py-1 text-xs text-accent">
                      <span className="text-base">＋</span>
                      ここに移動
                    </div>
                  )}
                {section.imagePosition === "before-h2" &&
                  renderImageBlock(section)}
              </div>
              <div className="flex items-center justify-between">
                <input
                  value={section.title}
                  onFocus={() => setSelected({ sectionId: section.id })}
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
                onFocus={() => setSelected({ sectionId: section.id })}
                onChange={(event) =>
                  updateSection(section.id, event.target.value)
                }
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              />
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  const id = event.dataTransfer.getData("image-section-id");
                  if (id === section.id) {
                    updateImagePosition(section.id, "after-h2");
                  }
                  setDragOverIndex(null);
                  setDragOverH3(null);
                  setImageDragOver(null);
                  setImageDragSectionId(null);
                }}
                onDragEnter={() =>
                  setImageDragOver({
                    sectionId: section.id,
                    position: "after-h2",
                  })
                }
                className="rounded-lg border border-dashed border-white/10 p-2"
              >
                {imageDragSectionId === section.id &&
                  imageDragOver?.sectionId === section.id &&
                  imageDragOver.position === "after-h2" && (
                    <div className="mb-2 flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/10 px-2 py-1 text-xs text-accent">
                      <span className="text-base">＋</span>
                      ここに移動
                    </div>
                  )}
                {section.imagePosition === "after-h2" &&
                  renderImageBlock(section)}
              </div>
              <div className="grid gap-2">
                {section.h3.map((item, h3Index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => onDragStartH3(section.id, h3Index)}
                      onDragOver={(event) => {
                        event.preventDefault();
                        setDragOverH3({ sectionId: section.id, index: h3Index });
                      }}
                      onDrop={() => onDropH3(section.id, h3Index)}
                      onMouseDown={() =>
                        setSelected({ sectionId: section.id, h3Id: item.id })
                      }
                      className="rounded-lg border border-white/10 bg-black/30 p-3"
                    >
                    {dragOverH3 &&
                      dragOverH3.sectionId === section.id &&
                      dragOverH3.index === h3Index &&
                      imageDragSectionId === null && (
                        <div className="mb-2 flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/10 px-2 py-1 text-[10px] text-accent">
                          <span className="text-xs">＋</span>
                          ここに移動
                        </div>
                      )}
                    <div className="flex items-center justify-between">
                      <input
                        value={item.title}
                        onFocus={() =>
                          setSelected({ sectionId: section.id, h3Id: item.id })
                        }
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
                      onFocus={() =>
                        setSelected({ sectionId: section.id, h3Id: item.id })
                      }
                      onChange={(event) =>
                        updateH3(section.id, item.id, event.target.value)
                      }
                      rows={3}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                    />
                    <div
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        const id = event.dataTransfer.getData("image-section-id");
                        if (id === section.id) {
                          updateImagePosition(section.id, `after-h3:${item.id}`);
                        }
                        setDragOverIndex(null);
                        setDragOverH3(null);
                        setImageDragOver(null);
                        setImageDragSectionId(null);
                      }}
                      onDragEnter={() =>
                        setImageDragOver({
                          sectionId: section.id,
                          position: `after-h3:${item.id}`,
                        })
                      }
                      className="mt-2 rounded-lg border border-dashed border-white/10 p-2"
                    >
                      {imageDragSectionId === section.id &&
                        imageDragOver?.sectionId === section.id &&
                        imageDragOver.position === `after-h3:${item.id}` && (
                          <div className="mb-2 flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/10 px-2 py-1 text-[10px] text-accent">
                            <span className="text-xs">＋</span>
                            ここに移動
                          </div>
                        )}
                      {section.imagePosition === `after-h3:${item.id}` &&
                        renderImageBlock(section)}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addH3(section.id)}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                >
                  H3 を追加
                </button>
              </div>
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  const id = event.dataTransfer.getData("image-section-id");
                  if (id === section.id) {
                    updateImagePosition(section.id, "after-all");
                  }
                  setDragOverIndex(null);
                  setDragOverH3(null);
                  setImageDragOver(null);
                  setImageDragSectionId(null);
                }}
                onDragEnter={() =>
                  setImageDragOver({
                    sectionId: section.id,
                    position: "after-all",
                  })
                }
                className="rounded-lg border border-dashed border-white/10 p-2"
              >
                {imageDragSectionId === section.id &&
                  imageDragOver?.sectionId === section.id &&
                  imageDragOver.position === "after-all" && (
                    <div className="mb-2 flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/10 px-2 py-1 text-xs text-accent">
                      <span className="text-base">＋</span>
                      ここに移動
                    </div>
                  )}
                {section.imagePosition === "after-all" &&
                  renderImageBlock(section)}
              </div>
              <p className="text-xs text-white/50">章 {index + 1}</p>
            </div>
            </div>
          ))}
          <button
            onClick={() => addSectionAt(sections.length)}
            className="w-full rounded-full border border-dashed border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            最後に H2 を追加
          </button>
        </div>
        {status && (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70">
            {status}
          </div>
        )}
      </section>
      <aside className="sticky top-6 h-[calc(100vh-3rem)] overflow-auto rounded-2xl border border-white/10 bg-panel p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          AI補正
        </p>
        <p className="mt-3 text-sm text-white/70">
          選択中:{" "}
          {selected.isImage && selectedSection
            ? (() => {
                const h3Id = selectedSection.imagePosition.startsWith("after-h3:")
                  ? selectedSection.imagePosition.replace("after-h3:", "")
                  : undefined;
                const h3Title = h3Id
                  ? selectedSection.h3.find((item) => item.id === h3Id)?.title
                  : undefined;
                return h3Title
                  ? `H3: ${h3Title} : 画像`
                  : `H2: ${selectedSection.title} : 画像`;
              })()
            : selected.h3Id
            ? `H3: ${
                selectedSection?.h3.find((item) => item.id === selected.h3Id)
                  ?.title ?? ""
              }`
            : selectedSection
            ? `H2: ${selectedSection.title}`
            : ""}
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
        <div className="mt-6">
          <SEOAssistantPanel
            keyword={draft?.keyword ?? title}
            title={title}
            metaDescription={meta}
            headings={[
              { level: "H1", text: title },
              ...sections.map((section) => ({
                level: "H2" as const,
                text: section.title,
              })),
              ...sections.flatMap((section) =>
                section.h3.map((item) => ({
                  level: "H3" as const,
                  text: item.title,
                }))
              ),
            ]}
            articleContent={sections
              .map((section) =>
                [section.body, ...section.h3.map((item) => item.body)].join("\n")
              )
              .join("\n\n")}
          />
        </div>
      </aside>
      {historyOpen && (
        <div className="absolute right-4 top-4 z-10 w-72 rounded-2xl border border-white/10 bg-panel p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              履歴
            </p>
            <button
              onClick={onCloseHistory}
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
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Custom CSS
            </p>
            <textarea
              value={customCss}
              onChange={(event) => setCustomCss(event.target.value)}
              rows={6}
              placeholder="WordPressに反映するCSSを入力"
              className="mt-3 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
            />
            <p className="mt-2 text-[10px] text-white/50">
              使用クラス例: .fw-toc / .fw-quote / .fw-highlight / .fw-underline
            </p>
          </div>
        </div>
      )}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Preview
                </p>
                <h3 className="text-lg font-semibold text-slate-800">
                  WordPress Layout Check
                </h3>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
              <div className="max-h-[70vh] overflow-auto bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 text-slate-700">
                <style>{`
                  .fw-title { font-size: 28px; font-weight: 700; margin-bottom: 12px; }
                  .fw-meta { font-size: 14px; color: #6b7280; margin-bottom: 20px; }
                  .fw-h2 { font-size: 20px; font-weight: 600; margin: 24px 0 10px; }
                  .fw-h3 { font-size: 16px; font-weight: 600; margin: 16px 0 8px; }
                  .fw-image { width: 100%; border-radius: 16px; margin: 16px 0; }
                  ${customCss}
                `}</style>
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
              <div className="border-l border-slate-200 bg-white p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Category
                    </label>
                    <input
                      value={previewCategory}
                      onChange={(event) => setPreviewCategory(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Status
                    </label>
                    <input
                      value={previewStatus}
                      onChange={(event) => setPreviewStatus(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="w-full rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    >
                      下書き
                    </button>
                    <button
                      onClick={postToWp}
                      className="w-full rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                    >
                      投稿
                    </button>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Final Notes
                    </label>
                    <textarea
                      value={previewNote}
                      onChange={(event) => setPreviewNote(event.target.value)}
                      rows={6}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder="最終修正の指示を入力"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
