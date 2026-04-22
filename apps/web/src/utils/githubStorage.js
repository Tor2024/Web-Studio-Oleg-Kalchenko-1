// GitHub-backed storage for CMS content.
// Commits JSON and binary assets directly to the configured repo/branch via the
// Contents API. Works anywhere with a GITHUB_TOKEN; used on Vercel (where
// filesystem is read-only) and optionally overridable in local dev.

import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_REPO_OWNER || 'Tor2024';
const REPO = process.env.GITHUB_REPO_NAME || 'Web-Studio-Oleg-Kalchenko-1';
const BRANCH = process.env.GITHUB_REPO_BRANCH || 'main';

export function isGithubStorageAvailable() {
  return Boolean(GITHUB_TOKEN);
}

function getOctokit() {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set — GitHub storage is unavailable');
  }
  return new Octokit({ auth: GITHUB_TOKEN });
}

async function getFileSha(path) {
  try {
    const octokit = getOctokit();
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    if (Array.isArray(data)) return null;
    return data.sha;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function listDir(path) {
  try {
    const octokit = getOctokit();
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.status === 404) return [];
    throw error;
  }
}

async function readJson(path) {
  try {
    const octokit = getOctokit();
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    if (Array.isArray(data) || data.type !== 'file') return null;
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function writeFile({ path, content, message, isBinary = false }) {
  const octokit = getOctokit();
  const sha = await getFileSha(path);
  const base64 = isBinary
    ? Buffer.from(content).toString('base64')
    : Buffer.from(content, 'utf-8').toString('base64');
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content: base64,
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  });
}

async function deleteFile({ path, message }) {
  const octokit = getOctokit();
  const sha = await getFileSha(path);
  if (!sha) return false;
  await octokit.repos.deleteFile({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    sha,
    branch: BRANCH,
  });
  return true;
}

function sanitizeId(raw) {
  return String(raw ?? Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
}

function dirForType(type) {
  if (!['news', 'portfolio'].includes(type)) {
    throw new Error(`Unknown content type: ${type}`);
  }
  return `content_data/${type}`;
}

export async function getItems(type) {
  const dir = dirForType(type);
  const entries = await listDir(dir);
  const items = [];
  for (const entry of entries) {
    if (entry.type !== 'file' || !entry.name.endsWith('.json')) continue;
    const item = await readJson(entry.path);
    if (item) items.push(item);
  }
  return items;
}

export async function getItem(type, id) {
  const dir = dirForType(type);
  return readJson(`${dir}/${sanitizeId(id)}.json`);
}

export async function addItem(type, data) {
  const dir = dirForType(type);
  const id = sanitizeId(data.id ?? data.folder_name ?? `item_${Date.now()}`);
  const item = { ...data, id, folder_name: id, createdAt: new Date().toISOString() };
  await writeFile({
    path: `${dir}/${id}.json`,
    content: JSON.stringify(item, null, 2),
    message: `[cms] create ${type}/${id}`,
  });
  return item;
}

export async function updateItem(type, id, data) {
  const dir = dirForType(type);
  const safeId = sanitizeId(id);
  const existing = (await readJson(`${dir}/${safeId}.json`)) ?? {};
  const item = {
    ...existing,
    ...data,
    id: safeId,
    folder_name: safeId,
    updatedAt: new Date().toISOString(),
  };
  await writeFile({
    path: `${dir}/${safeId}.json`,
    content: JSON.stringify(item, null, 2),
    message: `[cms] update ${type}/${safeId}`,
  });
  return item;
}

export async function deleteItem(type, id) {
  const dir = dirForType(type);
  return deleteFile({
    path: `${dir}/${sanitizeId(id)}.json`,
    message: `[cms] delete ${type}/${sanitizeId(id)}`,
  });
}

export async function uploadAsset({ fileName, buffer }) {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `public/uploads/${safeName}`;
  await writeFile({
    path,
    content: buffer,
    message: `[cms] upload ${safeName}`,
    isBinary: true,
  });
  return { url: `/uploads/${safeName}`, path };
}
