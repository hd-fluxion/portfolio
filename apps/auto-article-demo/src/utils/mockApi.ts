export type ArticleSection = {
  h2: string;
  h3: string[];
  body: string;
};

export type ArticleData = {
  title: string;
  sections: ArticleSection[];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const makeSentence = (base: string, count: number) => {
  const fragments = [
    "現場の課題を整理しながら",
    "KPIと運用フローを合わせて",
    "再現性のあるプロセスを設計し",
    "少ない工数で価値を最大化し",
    "チームの納得感を保ちつつ",
  ];
  return Array.from({ length: count })
    .map(() => `${pick(fragments)}${base}。`)
    .join("");
};

export async function generateOutline(
  keyword: string,
  genre: string
): Promise<string[]> {
  await delay(700);
  const h2Count = 3 + Math.floor(Math.random() * 3);
  const outline: string[] = ["目次"];
  for (let i = 1; i <= h2Count; i += 1) {
    const h2 = `H2: ${keyword} ${genre}の視点 ${i}`;
    outline.push(h2);
    const h3Count = 2 + Math.floor(Math.random() * 2);
    for (let j = 1; j <= h3Count; j += 1) {
      outline.push(`H3: 具体策 ${i}-${j}`);
    }
  }
  return outline;
}

export async function generateArticle(
  outline: string[],
  length: number
): Promise<ArticleData> {
  await delay(1200);
  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;
  outline.forEach((line) => {
    if (line.startsWith("H2:")) {
      if (current) sections.push(current);
      current = { h2: line.replace("H2:", "").trim(), h3: [], body: "" };
    } else if (line.startsWith("H3:")) {
      current?.h3.push(line.replace("H3:", "").trim());
    }
  });
  if (current) sections.push(current);

  const bodyLength = Math.max(100, Math.min(200, Math.floor(length / 20)));
  const filled = sections.map((section) => {
    const paragraphs = section.h3.length || 2;
    const body = Array.from({ length: paragraphs })
      .map(() => makeSentence(section.h2, Math.floor(bodyLength / 20)))
      .join("\n\n");
    return { ...section, body };
  });

  return {
    title: `AI×${outline[1]?.replace("H2:", "").trim() ?? "業務改善"}`,
    sections: filled,
  };
}

export async function generateImages(article: ArticleData): Promise<string[]> {
  await delay(600);
  const url = "https://placehold.co/600x400?text=Article+Image";
  return article.sections.map(() => url);
}
