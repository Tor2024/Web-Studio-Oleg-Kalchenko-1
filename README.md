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

См. `apps/web/.env.example`. На данном этапе переменных не требуется — они
добавятся на последующих шагах (GitHub storage, admin password).

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

## Деплой

Деплой на Vercel — настраивается в отдельном PR.

## Контакты

Олег Кальченко — [Telegram](https://t.me/oleh_kalchenko).
