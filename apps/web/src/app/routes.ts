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
  isParam: boolean;
  paramName: string;
  isCatchAll: boolean;
};

function buildRouteTree(dir: string, basePath = ''): Tree {
  const files = readdirSync(dir);
  const node: Tree = {
    path: basePath,
    children: [],
    hasPage: false,
    isParam: false,
    isCatchAll: false,
    paramName: '',
  };

  const dirName = basePath.split('/').pop();
  if (dirName?.startsWith('[') && dirName.endsWith(']')) {
    node.isParam = true;
    const paramName = dirName.slice(1, -1);
    if (paramName.startsWith('...')) {
      node.isCatchAll = true;
      node.paramName = paramName.slice(3);
    } else {
      node.paramName = paramName;
    }
  }

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      const childPath = basePath ? `${basePath}/${file}` : file;
      const childNode = buildRouteTree(filePath, childPath);
      node.children.push(childNode);
    } else if (file === 'page.jsx' || file === 'page.tsx') {
      node.hasPage = true;
    }
  }

  return node;
}

function generateRoutes(node: Tree, parentSegments: string[] = []): RouteConfigEntry[] {
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
          if (paramName.startsWith('...')) {
            return '*';
          }
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
    routes.push(...generateRoutes(child, parentSegments));
  }

  return routes;
}

const tree = buildRouteTree(__dirname);
const routes = generateRoutes(tree);

export default routes;
