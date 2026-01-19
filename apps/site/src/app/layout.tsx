import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
});

const body = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Hiroyuki Dazai | AI×業務効率化のフルスタック開発",
  description:
    "AI×業務効率化の設計から実装まで。業務フローに寄り添い、成果につながるシステムをつくります。",
  openGraph: {
    title: "Hiroyuki Dazai | AI×業務効率化のフルスタック開発",
    description:
      "AI×業務効率化の設計から実装まで。業務フローに寄り添い、成果につながるシステムをつくります。",
    type: "website",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiroyuki Dazai | AI×業務効率化のフルスタック開発",
    description:
      "AI×業務効率化の設計から実装まで。業務フローに寄り添い、成果につながるシステムをつくります。",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${display.variable} ${body.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
