import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Contact"
          title="お問い合わせ・ご相談"
          description="SNSから気軽にご連絡いただけます。まずは状況を伺い、最適な進め方をご提案します。"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Email
            </p>
            <a
              href="mailto:info@fluxionworks.com"
              className="mt-3 block text-sm text-white/80 hover:text-white"
            >
              info@fluxionworks.com
            </a>
            <p className="mt-2 text-xs text-white/50">受付中</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              SNS
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a
                href="https://x.com/fluxionwor25406"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M18.9 2H21l-6.3 7.2L22 22h-6.8l-4.8-6.2L4.9 22H3l6.8-7.8L2 2h6.9l4.3 5.6L18.9 2zm-2.3 18h1.9L7.5 4H5.5l11.1 16z" />
                </svg>
                <span>X: @fluxionwor25406</span>
              </a>
              <a
                href="https://www.instagram.com/FluxionWorks/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zm4.6-3.8a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
                </svg>
                <span>Instagram: @FluxionWorks</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-white/50">最新の発信はこちら</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Form
            </p>
            <a
              href="https://fluxionworks.com/contact/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-sm text-white/80 hover:text-white"
            >
              fluxionworks.com/contact/
            </a>
            <p className="mt-2 text-xs text-white/50">フォームから相談する</p>
          </div>
        </div>
      </div>
    </section>
  );
}
