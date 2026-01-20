# Portfolio Monorepo

シンプルでモダンな1ページポートフォリオと、代表作デモ、PHP API をまとめたモノレポです。

## 1. セットアップ

```bash
# ルートで .env を作成
cp .env.example .env

# 依存関係のインストール
npm install
```

## 2. apps/site (Next.js) 起動

```bash
cd apps/site
npm run dev
```

- http://localhost:3000

## 3. apps/auto-article-demo (Vite) 起動

```bash
cd apps/auto-article-demo
npm run dev
```

- http://localhost:5173

## 4. backend/php-api 起動

```bash
# ルート直下で
php -S localhost:8000 -t backend/php-api/public
```

- http://localhost:8000/api/...

## 5. 構成図の差し替え

- 作業用の図は `docs/diagrams` に配置しています。
- サイト表示用は `apps/site/public/diagrams` に配置されます。
- どちらも差し替え可能です。`apps/site/src/data/profile.ts` の `diagram` パスが表示対象です。

## 6. デモモードとAPIキー

- OpenAI等のキーはフロントに置かず、PHP APIでのみ保持します。
- `.env` はGitHubにコミットしないでください。
- `DEMO_MODE=true` の場合はダミー応答で動作します。

## 7. GitHub Pages (サイト + デモ)

- ポートフォリオ: `https://hd-fluxion.github.io/portfolio/`
- デモアプリ: `https://hd-fluxion.github.io/portfolio/demo/`

### デモ版の機能制限

- SEOチェッカーとWordPressプレビューを非表示にする場合は以下の環境変数を使います。

```bash
VITE_DEMO_LIMITED=true
```

- 正式版に戻す場合は `VITE_DEMO_LIMITED=false` にしてください。
