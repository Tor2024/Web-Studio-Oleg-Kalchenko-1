import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import type { LinksFunction } from 'react-router';
import type { ReactNode } from 'react';
import './global.css';
import RootLayout from './layout';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap',
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let title = 'Ошибка';
  let message = 'Что-то пошло не так.';
  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-[#FEFEFE] text-[#2A2A2A] font-kalam">
      <div className="max-w-md text-center">
        <h1 className="text-4xl mb-4">{title}</h1>
        <p className="text-[#666]">{message}</p>
      </div>
    </main>
  );
}
