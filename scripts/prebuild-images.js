/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';

const dir = 'originals/portfolio';

try {
  if (
    !existsSync(dir) ||
    readdirSync(dir).filter((f) => !f.startsWith('.')).length === 0
  ) {
    console.log('ℹ️  No originals found; skipping image build.');
    process.exit(0);
  }
  execSync('pnpm build:images', { stdio: 'inherit' });
} catch (e) {
  console.warn(
    '⚠️  Image build failed — continuing (site will use any committed /public/images).'
  );
  process.exit(0);
}
