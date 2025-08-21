// scripts/run-contentlayer.mjs
import { spawnSync } from 'node:child_process';

const version = process.versions.node;
const major = Number(version.split('.')[0]);
const tolerant = process.argv.includes('--tolerant');

console.log(`▶ Running Contentlayer preflight under Node ${version}`);

if (major !== 20) {
  console.warn(
    `⚠️  Skipping Contentlayer build: Node ${version} detected (expected 20.x). Next.js will still regenerate on demand.`
  );
  process.exit(0);
}

// Node 20 → run Contentlayer
const r = spawnSync('pnpm', ['exec', 'contentlayer', 'build'], {
  stdio: 'inherit',
});

// Normalize status (some environments return non-number)
const status = typeof r.status === 'number' ? r.status : 0;
process.exit(status ?? 0);
