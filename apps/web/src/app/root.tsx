import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import type { ReactNode } from 'react';
import type { Route } from './+types/root';
import Layout from './layout';
import './global.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&display=swap',
  },
];

export function HtmlDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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

export default function Root() {
  return (
    <HtmlDocument>
      <Layout>
        <Outlet />
      </Layout>
    </HtmlDocument>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let status = 500;
  let message = 'Неизвестная ошибка';
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || error.data || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <HtmlDocument>
      <div className="min-h-screen flex items-center justify-center bg-[#FEFEFE] p-8 font-kalam">
        <div className="max-w-lg text-center space-y-4">
          <p className="font-caveat text-6xl text-[#2A2A2A]">{status}</p>
          <p className="text-lg text-[#5A5A5A]">{message}</p>
          <a
            href="/"
            className="inline-block px-6 py-2 rounded border border-[#2A2A2A] text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white transition-colors"
          >
            На главную
          </a>
        </div>
      </div>
    </HtmlDocument>
  );
}
