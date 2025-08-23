/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const IN_DIR = 'originals/portfolio';
const OUT_DIR = 'public/images/portfolio';
const MANIFEST = 'src/lib/image-manifest.json';

function dirHasFiles(dir) {
  try {
    return (
      existsSync(dir) &&
      readdirSync(dir).some((f) => {
        if (f.startsWith('.')) return false;
        const fp = path.join(dir, f);
        try {
          return statSync(fp).isFile();
        } catch {
          return false;
        }
      })
    );
  } catch {
    return false;
  }
}

function manifestLooksValid() {
  try {
    if (!existsSync(MANIFEST)) return false;
    const json = JSON.parse(readFileSync(MANIFEST, 'utf8'));
    return (
      Array.isArray(json) && json.length > 0 && typeof json[0]?.src === 'string'
    );
  } catch {
    return false;
  }
}

function detectLFSPointers(dir) {
  if (!existsSync(dir)) return false;
  const files = readdirSync(dir).filter((f) => !f.startsWith('.'));
  for (const f of files) {
    const fp = path.join(dir, f);
    try {
      const head = readFileSync(fp, { encoding: 'utf8' }).slice(0, 220);
      if (
        head.includes('git-lfs.github.com/spec/v1') &&
        head.includes('oid sha256:')
      ) {
        return true;
      }
    } catch {
      // binary or unreadable => not a pointer
    }
  }
  return false;
}

try {
  // 1) If processed outputs are already committed, just use them.
  if (dirHasFiles(OUT_DIR) && manifestLooksValid()) {
    console.log(
      'ℹ️  Processed images & manifest found — using committed assets (skipping prebuild).'
    );
    process.exit(0);
  }

  // 2) If no originals, we can’t build — continue silently.
  const hasOriginals = dirHasFiles(IN_DIR);
  if (!hasOriginals) {
    console.log('ℹ️  No originals found; skipping image build.');
    process.exit(0);
  }

  // 3) If originals are LFS pointers, try to fetch — may fail on Vercel (no remote).
  if (detectLFSPointers(IN_DIR)) {
    console.log(
      'ℹ️  Git LFS pointers detected — attempting to fetch binaries…'
    );
    try {
      execSync('git lfs install', { stdio: 'inherit' });
      execSync('git lfs pull', { stdio: 'inherit' });
      console.log('✅ Git LFS pull complete.');
    } catch {
      console.warn('⚠️  git lfs pull failed; continuing without originals.');
    }
  }

  console.log('ℹ️  Running image pipeline…');
  execSync('pnpm build:images', { stdio: 'inherit' });
} catch {
  console.warn(
    '⚠️  Image prebuild failed — continuing (site will use any committed /public/images).'
  );
  process.exit(0);
}
