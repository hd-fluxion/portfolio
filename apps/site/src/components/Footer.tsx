export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-white/60 md:flex-row md:px-12">
        <p>© 2025 H.D. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>AI × 業務効率化 / 自動化 / Web開発</p>
          <a
            href="https://fluxionworks.com/"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 hover:text-white"
          >
            運営サイト
          </a>
        </div>
      </div>
    </footer>
  );
}
