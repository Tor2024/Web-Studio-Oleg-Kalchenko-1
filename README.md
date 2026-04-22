# Web Studio — Oleh Kalchenko

Сайт-портфолио веб-студии. React Router v7 (SSR) + Vite + TypeScript + Tailwind CSS.

Страницы: главная, о нас, контакты, новости, портфолио, админ-панель (`/admin`).
Интернационализация: EN / RU / DE (на основе `src/context/LanguageContext.jsx`).

## Требования

- Node.js 20+
- npm 10+

## Локальная разработка

```bash
cd apps/web
cp .env.example .env   # при необходимости
npm install
npm run dev
```

Открыть: <http://localhost:4000>.

## Переменные окружения

См. [`apps/web/.env.example`](apps/web/.env.example).

| Переменная          | Обязательна | Назначение                                                                 |
| ------------------- | ----------- | -------------------------------------------------------------------------- |
| `ADMIN_PASSWORD`    | да          | Пароль на вход в `/admin`                                                  |
| `AUTH_SECRET`       | да          | HMAC-ключ для admin-сессии. `openssl rand -hex 32`                         |
| `GITHUB_TOKEN`      | на проде    | Fine-grained PAT, Contents: Read and write. Без него админка пишет в файлы |
| `GITHUB_REPO_OWNER` | нет         | Дефолт `Tor2024`                                                           |
| `GITHUB_REPO_NAME`  | нет         | Дефолт `Web-Studio-Oleg-Kalchenko-1`                                       |
| `GITHUB_REPO_BRANCH`| нет         | Дефолт `master`                                                            |

## Скрипты

- `npm run dev` — dev-сервер
- `npm run build` — production build (`./build/`)
- `npm run start` — запуск собранного SSR-сервера
- `npm run typecheck` — генерация типов роутов + `tsc --noEmit`

## Структура

```
apps/web/
  src/
    app/             — роуты (файловая маршрутизация, см. src/app/routes.ts)
      api/           — API-роуты (news, portfolio, upload)
      admin/         — админ-панель
      {page,layout,root}.{jsx,tsx}
    components/      — React-компоненты
    context/         — React Context (язык)
    utils/           — утилиты (i18n, загрузка файлов, хранилище)
    entry.client.tsx — client entry
  content_data/      — JSON-файлы контента (новости, портфолио)
  public/            — статические ассеты
```

## Деплой на Vercel

Этот монорепо-проект деплоится через официальный [`@vercel/react-router`](https://vercel.com/docs/frameworks/frontend/react-router) пресет (React Router v7 SSR на Vercel Fluid compute).

**Настройки проекта в Vercel (`Settings → General`):**

- **Framework Preset**: `React Router` (или `Other` — пресет подцепится автоматически из `react-router.config.ts` по наличию `process.env.VERCEL`).
- **Root Directory**: `apps/web`
- **Build Command**: по умолчанию (`react-router build`).
- **Output Directory**: по умолчанию.
- **Install Command**: по умолчанию (`npm install`).
- **Node.js Version**: 20.x.

**Environment variables (`Settings → Environment Variables`, все на Preview + Production):**

```
ADMIN_PASSWORD=<пароль>
AUTH_SECRET=<openssl rand -hex 32>
GITHUB_TOKEN=<fine-grained PAT>
```

Автоматический деплой при push в `master` → Production; любой другой бранч / PR → Preview.

Правка контента в `/admin` коммитит JSON в репо (через `GITHUB_TOKEN`) и автоматически триггерит новый деплой. Публикация изменений занимает ~30–60 секунд.

## Контакты

Олег Кальченко — [Telegram](https://t.me/oleh_kalchenko).
