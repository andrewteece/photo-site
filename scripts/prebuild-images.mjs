/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const IN_DIR = 'originals/portfolio';

function detectLFSPointers(dir) {
  if (!existsSync(dir)) return false;
  const files = readdirSync(dir).filter((f) => !f.startsWith('.'));
  for (const f of files) {
    const fp = path.join(dir, f);
    try {
      // LFS pointer files are tiny text files starting with this header
      const head = readFileSync(fp, { encoding: 'utf8' }).slice(0, 200);
      if (
        head.includes('git-lfs.github.com/spec/v1') &&
        head.includes('oid sha256:')
      ) {
        return true;
      }
    } catch {
      // ignore binary or unreadable (which is good — means not a pointer)
    }
  }
  return false;
}

try {
  const hasOriginals =
    existsSync(IN_DIR) && readdirSync(IN_DIR).some((f) => !f.startsWith('.'));
  if (!hasOriginals) {
    console.log('ℹ️  No originals found; skipping image build.');
    process.exit(0);
  }

  if (detectLFSPointers(IN_DIR)) {
    console.log('ℹ️  Git LFS pointers detected — fetching binaries…');
    try {
      execSync('git lfs install', { stdio: 'inherit' });
      execSync('git lfs pull', { stdio: 'inherit' });
      console.log('✅ Git LFS pull complete.');
    } catch (e) {
      console.warn('⚠️  git lfs pull failed; continuing without originals.');
    }
  }

  console.log('ℹ️  Running image pipeline…');
  execSync('pnpm build:images', { stdio: 'inherit' });
} catch (e) {
  console.warn(
    '⚠️  Image prebuild failed — continuing (site will use any committed /public/images).'
  );
  process.exit(0);
}
