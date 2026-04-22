import * as fileStorage from './fileStorage.js';
import * as githubStorage from './githubStorage.js';

function useGithub() {
  return Boolean(process.env.GITHUB_TOKEN);
}

export async function getNewsItems() {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.getNewsItems();
}
export async function addNewsItem(item) {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.addNewsItem(item);
}
export async function updateNewsItem(folderName, item) {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.updateNewsItem(folderName, item);
}
export async function deleteNewsItem(folderName) {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.deleteNewsItem(folderName);
}

export async function getPortfolioItems() {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.getPortfolioItems();
}
export async function addPortfolioItem(item) {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.addPortfolioItem(item);
}
export async function updatePortfolioItem(folderName, item) {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.updatePortfolioItem(folderName, item);
}
export async function deletePortfolioItem(folderName) {
  const impl = useGithub() ? githubStorage : fileStorage;
  return impl.deletePortfolioItem(folderName);
}
