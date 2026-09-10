import { access, rename, rmdir } from 'node:fs/promises';
import path from 'node:path';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];

if (process.env.GITHUB_ACTIONS === 'true' && repositoryName) {
  const publicRoot = path.join('dist', 'client');
  const nestedRoot = path.join(publicRoot, repositoryName);
  const nestedAssets = path.join(nestedRoot, '_next');
  const publicAssets = path.join(publicRoot, '_next');

  try {
    await access(nestedAssets);
    await rename(nestedAssets, publicAssets);
    await rmdir(nestedRoot);
    console.log(`GitHub Pages assets moved to ${publicAssets}`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}
