export const profile = {
  name: "H.D @ Fluxionworks",
  location: "熊本県熊本市在住",
  born: "1988年 北海道生まれ",
  philosophy: "お客様ファーストで仕事をします。",
  summary:
    "H.D @ Fluxionworks として、AIを活用した業務効率化・DXツールの開発を行っています。車載組み込みソフトウェアで培った品質志向の開発経験を活かし、Web・AI領域でも「実務で使える」設計を重視しています。",
  timeline: [
    { year: "2014", text: "電気電子情報工学専攻 修士課程 卒業" },
    { year: "2014-2020", text: "車載用組み込みSW開発（C / C# / C++）" },
    { year: "2020-", text: "フリーランスでWEB開発開始（React / PHP / 自動化）" },
  ],
};

export const projects = [
  {
    period: "2020-2021",
    title: "Instagram インタラクション解析ツール",
    overview:
      "Instagram APIのデータをスプレッドシートに集約し、投稿履歴・フォロワー・反応指標を可視化。GAS Webアプリで運用し、投稿施策の影響を分析可能にしました。",
    tech: ["GAS", "Python", "JavaScript", "HTML", "CSS", "jQuery"],
    outcome: [
      "運用担当の集計作業を削減（手作業→自動集計）",
      "投稿の改善サイクルを回せるダッシュボード化",
    ],
    diagram: "/diagrams/instagram-analytics.svg",
  },
  {
    period: "2021-2022",
    title: "見積管理ツール（見積→請求まで一括）",
    overview:
      "見積から請求書発行までを一元管理。スプレッドシートで帳票生成・管理し、GAS Webアプリで要望に合わせた業務フローを実装しました。",
    tech: ["GAS", "JavaScript", "HTML", "CSS", "jQuery"],
    outcome: ["帳票作成・転記を削減", "見積〜請求の進捗を見える化"],
    diagram: "/diagrams/quote-billing.svg",
  },
  {
    period: "2022-2023",
    title: "在庫管理ツール（Web一元管理）",
    overview:
      "Excel運用をWebアプリへ移行し、在庫可視化と発注管理を実装。業務の属人化を減らし、ミスを抑える運用に改善しました。",
    tech: ["React", "Node.js", "MySQL", "PHP", "JavaScript"],
    outcome: ["在庫の見える化", "発注タイミングの標準化"],
    diagram: "/diagrams/inventory.svg",
  },
  {
    period: "2023-2024",
    title: "Dify 自動投稿ツール（WordPress連携）",
    overview:
      "Difyを活用し、LLMで記事作成を自動化。WordPressと連携して投稿業務を効率化しました。",
    tech: ["Dify", "MySQL", "PHP"],
    outcome: ["記事作成フローの自動化", "運用工数の削減"],
    diagram: "/diagrams/dify-wp.svg",
    link: "https://fluxionworks.com/blog/",
  },
  {
    period: "2024-2025",
    title: "n8n × SNS 自動投稿ツール（X/Instagram/Threads）",
    overview:
      "n8nと自作OAuth2マネージャで複数SNSの自動投稿を実装。投稿忘れ防止と作業効率化を実現しました。",
    tech: ["n8n", "MySQL", "PHP"],
    outcome: ["投稿業務の自動化", "運用の再現性向上"],
    diagram: "/diagrams/n8n-sns.svg",
  },
];

export const skillGroups = [
  {
    name: "Frontend",
    items: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "UI設計", level: 4 },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "PHP", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "REST API設計", level: 4 },
      { name: "DB設計", level: 4 },
    ],
  },
  {
    name: "AI / Automation",
    items: [
      { name: "LLM API(OpenAI等)", level: 4 },
      { name: "n8n", level: 4 },
      { name: "GAS", level: 5 },
      { name: "PoC/技術検証", level: 4 },
    ],
  },
  {
    name: "Infra / Quality",
    items: [
      { name: "Git/GitHub", level: 4 },
      { name: "Docker", level: 3 },
      { name: "Cloud基礎(AWS/GCP)", level: 3 },
      { name: "セキュリティ基礎", level: 3 },
    ],
  },
  {
    name: "Hiring Fit",
    items: [
      { name: "Architecture", level: 4 },
      { name: "Security", level: 3 },
      { name: "Python", level: 4 },
      { name: "Go", level: 3 },
      { name: "Vue", level: 3 },
      { name: "Cloud", level: 3 },
    ],
  },
];
