// scripts/run-contentlayer.mjs
import { execSync } from 'node:child_process';

const version = process.versions.node;
const major = Number.parseInt(version.split('.')[0], 10);
const lifecycle = process.env.npm_lifecycle_event || ''; // "dev", "build", etc.

console.log(`▶ Contentlayer preflight under Node ${version}`);

if (lifecycle === 'dev') {
  console.log('ℹ️  Dev mode: letting Next.js handle Contentlayer watch.');
  process.exit(0);
}

// Node 22+ has a CLI exitCode quirk. Skip explicit run; Next will generate during build.
if (major >= 22) {
  console.log(
    'ℹ️  Skipping explicit Contentlayer build on Node 22+ (handled by Next.js).'
  );
  process.exit(0);
}

// Node 20–21: run a one-off build
if (major >= 20) {
  try {
    console.log('ℹ️  Running: contentlayer build');
    execSync('contentlayer build', { stdio: 'inherit' });
    console.log('✅ Contentlayer build complete.');
  } catch {
    console.warn(
      '⚠️  Contentlayer build failed; continuing (Next.js may still regenerate).'
    );
  }
} else {
  console.warn(`⚠️  Node ${version} detected (<20). Skipping Contentlayer.`);
}
