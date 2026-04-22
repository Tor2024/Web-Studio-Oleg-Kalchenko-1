/// <reference types="node" />
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
  hasRoute: boolean;
  pageFile?: string;
  routeFile?: string;
};

function buildRouteTree(dir: string, basePath = ''): Tree {
  const files = readdirSync(dir);
  const node: Tree = {
    path: basePath,
    children: [],
    hasPage: false,
    hasRoute: false,
  };

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Skip hidden/reserved dirs and the root of routes config itself
      if (file.startsWith('.')) continue;
      const childPath = basePath ? `${basePath}/${file}` : file;
      const childNode = buildRouteTree(filePath, childPath);
      node.children.push(childNode);
    } else if (file === 'page.jsx' || file === 'page.tsx') {
      node.hasPage = true;
      node.pageFile = file;
    } else if (file === 'route.js' || file === 'route.ts') {
      node.hasRoute = true;
      node.routeFile = file;
    }
  }

  return node;
}

function toRouterPath(nextPath: string): string {
  return nextPath
    .split('/')
    .map((segment) => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const inner = segment.slice(1, -1);
        if (inner.startsWith('...')) return '*';
        if (inner.startsWith('[') && inner.endsWith(']')) return `:${inner.slice(1, -1)}?`;
        return `:${inner}`;
      }
      return segment;
    })
    .join('/');
}

function generateRoutes(node: Tree): RouteConfigEntry[] {
  const routes: RouteConfigEntry[] = [];

  if (node.hasPage && node.pageFile) {
    const componentPath = node.path === '' ? `./${node.pageFile}` : `./${node.path}/${node.pageFile}`;
    if (node.path === '') {
      routes.push(index(componentPath));
    } else {
      routes.push(route(toRouterPath(node.path), componentPath));
    }
  } else if (node.hasRoute && node.routeFile) {
    const componentPath = `./${node.path}/${node.routeFile}`;
    routes.push(route(toRouterPath(node.path), componentPath));
  }

  for (const child of node.children) {
    routes.push(...generateRoutes(child));
  }

  return routes;
}

const tree = buildRouteTree(__dirname);
const notFound = route('*?', './not-found.jsx');
const routes: RouteConfigEntry[] = [...generateRoutes(tree), notFound];

export default routes;
