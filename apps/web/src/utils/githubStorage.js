import { Octokit } from '@octokit/rest';

const CONTENT_BASE_PATH = 'apps/web/content_data';

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is not set');
  }
  return {
    token,
    owner: process.env.GITHUB_REPO_OWNER || 'Tor2024',
    repo: process.env.GITHUB_REPO_NAME || 'Web-Studio-Oleg-Kalchenko-1',
    branch: process.env.GITHUB_REPO_BRANCH || 'master',
  };
}

function getClient() {
  const { token } = getConfig();
  return new Octokit({ auth: token });
}

async function listItems(type) {
  const octokit = getClient();
  const { owner, repo, branch } = getConfig();
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: `${CONTENT_BASE_PATH}/${type}`,
      ref: branch,
    });
    if (!Array.isArray(data)) return [];
    const files = data.filter(
      (entry) => entry.type === 'file' && entry.name.endsWith('.json')
    );
    const results = await Promise.all(
      files.map(async (entry) => {
        try {
          const { data: fileData } = await octokit.repos.getContent({
            owner,
            repo,
            path: entry.path,
            ref: branch,
          });
          if (Array.isArray(fileData) || !('content' in fileData)) return null;
          const decoded = Buffer.from(fileData.content, 'base64').toString('utf-8');
          return JSON.parse(decoded);
        } catch (err) {
          console.error(`Failed to read ${entry.path}:`, err);
          return null;
        }
      })
    );
    return results.filter((item) => item !== null);
  } catch (error) {
    if (error && error.status === 404) return [];
    throw error;
  }
}

async function saveItem(type, item) {
  const octokit = getClient();
  const { owner, repo, branch } = getConfig();
  const path = `${CONTENT_BASE_PATH}/${type}/${item.folder_name}.json`;
  const content = Buffer.from(JSON.stringify(item, null, 2), 'utf-8').toString('base64');

  let sha;
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if (!Array.isArray(data) && 'sha' in data) {
      sha = data.sha;
    }
  } catch (error) {
    if (!(error && error.status === 404)) throw error;
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `[cms] ${sha ? 'update' : 'create'} ${type}/${item.folder_name}`,
    content,
    sha,
    branch,
  });
}

async function deleteItemByFolderName(type, folderName) {
  const octokit = getClient();
  const { owner, repo, branch } = getConfig();
  const path = `${CONTENT_BASE_PATH}/${type}/${folderName}.json`;
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if (Array.isArray(data) || !('sha' in data)) return;
    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `[cms] delete ${type}/${folderName}`,
      sha: data.sha,
      branch,
    });
  } catch (error) {
    if (error && error.status === 404) return;
    throw error;
  }
}

export async function getNewsItems() {
  return listItems('news');
}
export async function addNewsItem(item) {
  return saveItem('news', item);
}
export async function updateNewsItem(_folderName, item) {
  return saveItem('news', item);
}
export async function deleteNewsItem(folderName) {
  return deleteItemByFolderName('news', folderName);
}

export async function getPortfolioItems() {
  return listItems('portfolio');
}
export async function addPortfolioItem(item) {
  return saveItem('portfolio', item);
}
export async function updatePortfolioItem(_folderName, item) {
  return saveItem('portfolio', item);
}
export async function deletePortfolioItem(folderName) {
  return deleteItemByFolderName('portfolio', folderName);
}
