// Unified storage facade. Uses GitHub API when GITHUB_TOKEN is set (production /
// Vercel), otherwise falls back to filesystem for local development.

import * as github from './githubStorage.js';
import * as files from './fileStorage.js';

function backend() {
  return github.isGithubStorageAvailable() ? github : files;
}

export function backendName() {
  return github.isGithubStorageAvailable() ? 'github' : 'filesystem';
}

export function getItems(type) {
  return backend().getItems(type);
}

export function getItem(type, id) {
  return backend().getItem(type, id);
}

export function addItem(type, data) {
  return backend().addItem(type, data);
}

export function updateItem(type, id, data) {
  return backend().updateItem(type, id, data);
}

export function deleteItem(type, id) {
  return backend().deleteItem(type, id);
}

export async function uploadAsset({ fileName, buffer }) {
  if (github.isGithubStorageAvailable()) {
    return github.uploadAsset({ fileName, buffer });
  }
  const { promises: fs } = await import('node:fs');
  const { join } = await import('node:path');
  const dir = join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  await fs.writeFile(join(dir, safeName), buffer);
  return { url: `/uploads/${safeName}`, path: `public/uploads/${safeName}` };
}
