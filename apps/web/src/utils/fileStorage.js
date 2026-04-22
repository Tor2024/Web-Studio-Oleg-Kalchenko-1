import { promises as fs } from 'node:fs';
import { join } from 'node:path';

// Simple filesystem-based storage for content_data/news and content_data/portfolio.
// Works for local development. For production (Vercel) PR #2 switches this to GitHub API.

const DATA_DIR = join(process.cwd(), 'content_data');
const TYPE_DIRS = {
  news: join(DATA_DIR, 'news'),
  portfolio: join(DATA_DIR, 'portfolio'),
};

function getDirForType(type) {
  const dir = TYPE_DIRS[type];
  if (!dir) {
    throw new Error(
      `Unknown content type: ${type}. Supported types: ${Object.keys(TYPE_DIRS).join(', ')}`,
    );
  }
  return dir;
}

async function ensureDirExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.warn(`Warning: Could not create directory ${dir}:`, error.message);
  }
}

async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeJsonFile(filePath, data) {
  await ensureDirExists(join(filePath, '..'));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function sanitizeId(raw) {
  const base = String(raw ?? Date.now());
  return base.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export async function getItems(type) {
  const dir = getDirForType(type);
  await ensureDirExists(dir);
  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const items = [];
  for (const entry of entries) {
    if (!entry.endsWith('.json')) continue;
    const item = await readJsonFile(join(dir, entry));
    if (item) items.push(item);
  }
  return items;
}

export async function getItem(type, id) {
  const dir = getDirForType(type);
  return readJsonFile(join(dir, `${sanitizeId(id)}.json`));
}

export async function addItem(type, data) {
  const dir = getDirForType(type);
  const id = sanitizeId(data.id ?? `item_${Date.now()}`);
  const item = { ...data, id, createdAt: new Date().toISOString() };
  await writeJsonFile(join(dir, `${id}.json`), item);
  return item;
}

export async function updateItem(type, id, data) {
  const dir = getDirForType(type);
  const filePath = join(dir, `${sanitizeId(id)}.json`);
  const existing = (await readJsonFile(filePath)) ?? {};
  const item = { ...existing, ...data, id: sanitizeId(id), updatedAt: new Date().toISOString() };
  await writeJsonFile(filePath, item);
  return item;
}

export async function deleteItem(type, id) {
  const dir = getDirForType(type);
  const filePath = join(dir, `${sanitizeId(id)}.json`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}
