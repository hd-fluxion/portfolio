import { useMemo, useState } from "react";

type Heading = {
  level: "H1" | "H2" | "H3";
  text: string;
};

type Props = {
  keyword: string;
  title: string;
  metaDescription: string;
  headings: Heading[];
  articleContent: string;
};

type IntentResult = {
  intent: "Informational" | "Commercial" | "Transactional";
  audience: "Beginner" | "Intermediate" | "Professional";
  goal: string;
};

type Issue = {
  id: string;
  label: string;
};

const intentGoalMap: Record<IntentResult["intent"], string> = {
  Informational: "Explain basics and use cases",
  Commercial: "Help compare options and benefits",
  Transactional: "Encourage action or purchase",
};

const suggestionMap: Record<string, string> = {
  "title-length": "Refine title length to 50–65 characters for better SERP fit.",
  "meta-length": "Expand meta description to 110–160 characters.",
  "keyword-h1": "Include the primary keyword in the H1 title.",
  "heading-balance": "Add more H2 or H3 headings to balance structure.",
  "missing-faq": "Add FAQ section to improve content coverage.",
  "paragraph-balance": "Balance paragraph length to improve readability.",
};

const scoreColor = (score: number) => {
  if (score < 60) return "text-rose-500";
  if (score < 80) return "text-amber-500";
  return "text-emerald-500";
};

export default function SEOAssistantPanel({
  keyword,
  title,
  metaDescription,
  headings,
  articleContent,
}: Props) {
  const [open, setOpen] = useState({
    intent: true,
    score: true,
    issues: true,
    suggestions: true,
  });

  const intent = useMemo<IntentResult>(() => {
    const lower = keyword.toLowerCase();
    let intentType: IntentResult["intent"] = "Informational";
    if (/(compare|vs|best|review)/.test(lower)) intentType = "Commercial";
    if (/(buy|pricing|price|download|purchase)/.test(lower)) {
      intentType = "Transactional";
    }

    let audience: IntentResult["audience"] = "Intermediate";
    if (/(beginner|intro|basics)/.test(lower)) audience = "Beginner";
    if (/(advanced|professional|enterprise)/.test(lower)) {
      audience = "Professional";
    }

    return {
      intent: intentType,
      audience,
      goal: intentGoalMap[intentType],
    };
  }, [keyword]);

  const { score, issues } = useMemo(() => {
    const issues: Issue[] = [];
    const titleLength = title.trim().length;
    const metaLength = metaDescription.trim().length;

    if (titleLength < 50 || titleLength > 65) {
      issues.push({ id: "title-length", label: "Title length out of range" });
    }

    if (metaLength < 110 || metaLength > 160) {
      issues.push({
        id: "meta-length",
        label: "Meta description length not optimal",
      });
    }

    if (!title.toLowerCase().includes(keyword.toLowerCase())) {
      issues.push({ id: "keyword-h1", label: "Keyword missing in H1" });
    }

    const h2Count = headings.filter((h) => h.level === "H2").length;
    const h3Count = headings.filter((h) => h.level === "H3").length;
    if (h2Count < 2 || h3Count < 2) {
      issues.push({
        id: "heading-balance",
        label: "Heading structure is unbalanced",
      });
    }

    if (!headings.some((h) => /faq/i.test(h.text))) {
      issues.push({ id: "missing-faq", label: "FAQ section missing" });
    }

    const paragraphs = articleContent
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const avgLength =
      paragraphs.reduce((sum, p) => sum + p.length, 0) /
      Math.max(paragraphs.length, 1);
    if (avgLength < 60 || avgLength > 200) {
      issues.push({
        id: "paragraph-balance",
        label: "Paragraph length needs balancing",
      });
    }

    const score = Math.max(40, 100 - issues.length * 10);
    return { score, issues };
  }, [title, metaDescription, keyword, headings, articleContent]);

  const suggestions = issues.map((issue) => ({
    id: issue.id,
    text: suggestionMap[issue.id] ?? "Review this section for improvements.",
  }));

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-[0_12px_30px_rgba(120,120,180,0.1)]">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">
        SEO Assistant
      </p>
      <div className="mt-4 space-y-4 text-sm">
        <section>
          <button
            onClick={() => setOpen((prev) => ({ ...prev, intent: !prev.intent }))}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              Intent
            </span>
            <span className="text-xs text-white/50">{open.intent ? "−" : "+"}</span>
          </button>
          {open.intent && (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
              <p className="text-sm text-text">Intent: {intent.intent}</p>
              <p className="mt-2 text-xs text-white/60">
                Target: {intent.audience}
              </p>
              <p className="mt-1 text-xs text-white/60">Goal: {intent.goal}</p>
            </div>
          )}
        </section>

        <section>
          <button
            onClick={() => setOpen((prev) => ({ ...prev, score: !prev.score }))}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              SEO Score
            </span>
            <span className="text-xs text-white/50">{open.score ? "−" : "+"}</span>
          </button>
          {open.score && (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
              <div className={`text-3xl font-semibold ${scoreColor(score)}`}>
                {score}
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                <div
                  className={`h-2 rounded-full ${
                    score < 60
                      ? "bg-rose-400"
                      : score < 80
                      ? "bg-amber-400"
                      : "bg-emerald-400"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )}
        </section>

        <section>
          <button
            onClick={() => setOpen((prev) => ({ ...prev, issues: !prev.issues }))}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              Issues
            </span>
            <span className="text-xs text-white/50">{open.issues ? "−" : "+"}</span>
          </button>
          {open.issues && (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
              {issues.length === 0 ? (
                <p className="text-xs text-white/60">No major issues found</p>
              ) : (
                <ul className="space-y-2 text-xs text-white/70">
                  {issues.map((issue) => (
                    <li key={issue.id} className="flex items-start gap-2">
                      <span>⚠</span>
                      <span>{issue.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        <section>
          <button
            onClick={() =>
              setOpen((prev) => ({ ...prev, suggestions: !prev.suggestions }))
            }
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">
              Suggestions
            </span>
            <span className="text-xs text-white/50">
              {open.suggestions ? "−" : "+"}
            </span>
          </button>
          {open.suggestions && (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
              <ul className="space-y-2 text-xs text-white/70">
                {suggestions.length === 0 ? (
                  <li>No suggestions right now.</li>
                ) : (
                  suggestions.map((item) => <li key={item.id}>• {item.text}</li>)
                )}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
