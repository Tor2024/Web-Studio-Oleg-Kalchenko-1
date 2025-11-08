import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = join(process.cwd(), 'content_data');
const NEWS_DIR = join(DATA_DIR, 'news');
const PORTFOLIO_DIR = join(DATA_DIR, 'portfolio');

async function ensureDirExists(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null; // File not found
    }
    throw error;
  }
}

async function writeJsonFile(filePath, data) {
  await ensureDirExists(join(filePath, '..'));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function getAllItems(dir) {
  await ensureDirExists(dir);
  const files = await fs.readdir(dir);
  const items = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const item = await readJsonFile(join(dir, file));
      if (item) {
        items.push(item);
      }
    }
  }
  return items;
}

// News functions
export async function getNewsItems() {
  await ensureDirExists(NEWS_DIR);
  const files = await fs.readdir(NEWS_DIR);
  const items = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.readFile(join(NEWS_DIR, file), 'utf-8');
      items.push(JSON.parse(content));
    }
  }
  return items;
}

export async function getNewsItem(folderName) {
  const filePath = join(NEWS_DIR, `${folderName}.json`);
  return readJsonFile(filePath);
}

export async function addNewsItem(item) {
  await ensureDirExists(NEWS_DIR);
  const filePath = join(NEWS_DIR, `${item.folder_name}.json`);
  await writeJsonFile(filePath, item);
}

export async function updateNewsItem(folderName, newItem) {
  await ensureDirExists(NEWS_DIR);
  const filePath = join(NEWS_DIR, `${folderName}.json`);
  await writeJsonFile(filePath, newItem);
}

export async function deleteNewsItem(folderName) {
  const filePath = join(NEWS_DIR, `${folderName}.json`);
  await fs.unlink(filePath);
}

// Portfolio functions
export async function getPortfolioItems() {
  await ensureDirExists(PORTFOLIO_DIR);
  const files = await fs.readdir(PORTFOLIO_DIR);
  const items = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.readFile(join(PORTFOLIO_DIR, file), 'utf-8');
      items.push(JSON.parse(content));
    }
  }
  return items;
}

export async function getPortfolioItem(folderName) {
  const filePath = join(PORTFOLIO_DIR, `${folderName}.json`);
  return readJsonFile(filePath);
}

export async function addPortfolioItem(item) {
  await ensureDirExists(PORTFOLIO_DIR);
  const filePath = join(PORTFOLIO_DIR, `${item.folder_name}.json`);
  await writeJsonFile(filePath, item);
}

export async function updatePortfolioItem(folderName, newItem) {
  await ensureDirExists(PORTFOLIO_DIR);
  const filePath = join(PORTFOLIO_DIR, `${folderName}.json`);
  await writeJsonFile(filePath, newItem);
}

export async function deletePortfolioItem(folderName) {
  const filePath = join(PORTFOLIO_DIR, `${folderName}.json`);
  await fs.unlink(filePath);
}

export async function saveItem(type, obj) {
  const DIR = type === 'news' ? NEWS_DIR : PORTFOLIO_DIR;
  await ensureDirExists(DIR);
  const filePath = join(DIR, `${obj.folder_name}.json`);
  await fs.writeFile(filePath, JSON.stringify(obj, null, 2), 'utf-8');
}

export async function deleteItem(type, folderName) {
  const DIR = type === 'news' ? NEWS_DIR : PORTFOLIO_DIR;
  const filePath = join(DIR, `${folderName}.json`);
  await fs.unlink(filePath).catch(() => {});
}
