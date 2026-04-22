# Web Studio — Oleh Kalchenko

Портфолио-сайт веб-студии Олега Кальченко. Hand-drawn дизайн, админ-панель с загрузкой контента в репо.

- Фреймворк: React Router v7 (SSR) + Vite
- Деплой: Vercel (Fluid compute, через `@vercel/react-router`)
- Хранилище контента: GitHub API (Octokit) — `content_data/news/*.json`, `content_data/portfolio/*.json`, `public/uploads/*`
- Защита `/admin`: простой пароль (`ADMIN_PASSWORD`) + подписанная cookie (`AUTH_SECRET`)

## Структура

```
apps/web/
├── src/
│   ├── app/             # страницы и API-роуты (файловая маршрутизация)
│   │   ├── page.jsx     # /
│   │   ├── about/       # /about
│   │   ├── contact/     # /contact
│   │   ├── news/        # /news, /news/:slug
│   │   ├── portfolio/   # /portfolio
│   │   ├── admin/       # /admin, /admin/login
│   │   ├── api/         # /api/news, /api/portfolio, /api/upload, /api/auth/*
│   │   ├── root.tsx
│   │   └── routes.ts
│   ├── components/      # hand-drawn компоненты (Header, Footer, HandDrawn*, Polaroid*, …)
│   ├── context/         # LanguageContext (RU/EN/DE)
│   └── utils/           # githubStorage, auth, i18n, useUpload
├── content_data/        # локальный JSON-контент (fallback для dev)
├── public/              # статика, включая public/uploads/
├── react-router.config.ts
├── vite.config.ts
├── tailwind.config.cjs
└── package.json
```

## Запуск локально

```sh
cd apps/web
npm install
cp .env.example .env
# Отредактировать .env
npm run dev
```

Откройте http://localhost:4000

## Деплой на Vercel

Проект собирается из подпапки `apps/web`:

1. В **Settings → General**:
   - **Root Directory**: `apps/web`
   - **Framework Preset**: `React Router`
   - **Node.js Version**: `22.x`
2. В **Settings → Environment Variables** (Production + Preview):

   | Key | Value |
   |---|---|
   | `ADMIN_PASSWORD` | пароль к `/admin` |
   | `AUTH_SECRET` | `openssl rand -hex 32` |
   | `GITHUB_TOKEN` | fine-grained PAT (Contents: Read/Write) |
   | `GITHUB_REPO_OWNER` | `Tor2024` |
   | `GITHUB_REPO_NAME` | `Web-Studio-Oleg-Kalchenko-1` |
   | `GITHUB_REPO_BRANCH` | `main` |

3. Деплой.

Сохранения через `/admin` идут в репо как коммиты — после коммита Vercel автоматически пересобирает сайт (20–60 сек).

## Админка

`/admin` закрыт паролем. Через форму можно создавать/редактировать/удалять записи в `news/` и `portfolio/` и прикладывать картинки.
