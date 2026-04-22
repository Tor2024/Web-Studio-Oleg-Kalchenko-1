import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type RouteConfigEntry,
  index,
  route,
} from '@react-router/dev/routes';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

type Tree = {
  path: string;
  children: Tree[];
  hasPage: boolean;
};

function buildRouteTree(dir: string, basePath = ''): Tree {
  const files = readdirSync(dir);
  const node: Tree = {
    path: basePath,
    children: [],
    hasPage: false,
  };

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Skip `api/` — resource routes are added explicitly below.
      if (basePath === '' && file === 'api') continue;
      const childPath = basePath ? `${basePath}/${file}` : file;
      const childNode = buildRouteTree(filePath, childPath);
      node.children.push(childNode);
    } else if (file === 'page.jsx' || file === 'page.tsx') {
      node.hasPage = true;
    }
  }

  return node;
}

function generateRoutes(node: Tree): RouteConfigEntry[] {
  const routes: RouteConfigEntry[] = [];

  if (node.hasPage) {
    const componentPath =
      node.path === '' ? './page.jsx' : `./${node.path}/page.jsx`;

    if (node.path === '') {
      routes.push(index(componentPath));
    } else {
      const segments = node.path.split('/');
      const processedSegments = segments.map((segment) => {
        if (segment.startsWith('[') && segment.endsWith(']')) {
          const paramName = segment.slice(1, -1);
          if (paramName.startsWith('...')) return '*';
          if (paramName.startsWith('[') && paramName.endsWith(']')) {
            return `:${paramName.slice(1, -1)}?`;
          }
          return `:${paramName}`;
        }
        return segment;
      });

      routes.push(route(processedSegments.join('/'), componentPath));
    }
  }

  for (const child of node.children) {
    routes.push(...generateRoutes(child));
  }

  return routes;
}

const pageRoutes = generateRoutes(buildRouteTree(__dirname));

// Resource routes (API endpoints — no default export, only loader/action).
const apiRoutes: RouteConfigEntry[] = [
  route('api/news', './api/news.js'),
  route('api/portfolio', './api/portfolio.js'),
];

export default [...pageRoutes, ...apiRoutes] satisfies RouteConfigEntry[];
