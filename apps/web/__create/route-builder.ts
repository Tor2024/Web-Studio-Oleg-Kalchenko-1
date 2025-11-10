import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';
import * as checkDbRoute from '../src/app/api/check-db/route.js';
import * as createDbRoute from '../src/app/api/create-db/route.js';
import * as newsRoute from '../src/app/api/news/route.js';
import * as portfolioRoute from '../src/app/api/portfolio/route.js';
import * as uploadRoute from '../src/app/api/upload/route.js';
import * as uploadsRoute from '../src/app/api/uploads/route.js';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Register routes
function registerRoutes() {
  const routes = [
    { path: '/check-db', module: checkDbRoute },
    { path: '/create-db', module: createDbRoute },
    { path: '/news', module: newsRoute },
    { path: '/portfolio', module: portfolioRoute },
    { path: '/upload', module: uploadRoute },
    { path: '/uploads', module: uploadsRoute },
  ];

  // Clear existing routes
  api.routes = [];

  for (const { path, module } of routes) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    for (const method of methods) {
      // @ts-ignore
      if (module[method]) {
        const handler: Handler = async (c) => {
          const params = c.req.param();
          // @ts-ignore
          return await module[method](c.req.raw, { params });
        };
        const methodLowercase = method.toLowerCase();
        switch (methodLowercase) {
          case 'get':
            api.get(path, handler);
            break;
          case 'post':
            api.post(path, handler);
            break;
          case 'put':
            api.put(path, handler);
            break;
          case 'delete':
            api.delete(path, handler);
            break;
          case 'patch':
            api.patch(path, handler);
            break;
          default:
            console.warn(`Unsupported method: ${method}`);
            break;
        }
      }
    }
  }
}

// Initial route registration
registerRoutes();

// Hot reload routes in development
// @ts-ignore
if (import.meta.env.DEV) {
  // @ts-ignore
  import.meta.glob('../src/app/api/**/route.{js,ts}', {
    eager: true,
  });
  // @ts-ignore
  if (import.meta.hot) {
    // @ts-ignore
    import.meta.hot.accept(() => {
      registerRoutes();
    });
  }
}

export { api, API_BASENAME };
