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

// For production builds, always run contentlayer explicitly to avoid race conditions
if (major >= 20) {
  try {
    console.log('ℹ️  Running: contentlayer build');
    execSync('contentlayer build', { stdio: 'inherit' });
    console.log('✅ Contentlayer build complete.');
  } catch (err) {
    console.error('❌ Contentlayer build failed:', err.message);
    process.exit(1); // Fail the build if contentlayer fails
  }
} else {
  console.warn(`⚠️  Node ${version} detected (<20). Skipping Contentlayer.`);
}
