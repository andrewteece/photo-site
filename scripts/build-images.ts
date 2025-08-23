// scripts/build-images.ts
import sharp from 'sharp';
import fg from 'fast-glob';
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  statSync,
  existsSync,
} from 'node:fs';
import { dirname, join, posix } from 'node:path';

const INPUT = 'originals/portfolio/**/*.{jpg,jpeg,png,tif,tiff}';
const OUTDIR = 'public/images/portfolio';
const MANIFEST_OUT = 'src/lib/image-manifest.json';
const CACHE_FILE = '.image-cache.json';

// Tweak these → also update SETTINGS_VERSION when you do
const TARGET_LONG_EDGE = 3800;
const JPEG_QUALITY = 86;

// Bump this if you change any processing settings above
const SETTINGS_VERSION = `v2-long${TARGET_LONG_EDGE}-q${JPEG_QUALITY}`;

const FORCE = process.argv.includes('--force');

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9./-]/g, '');

const normalizeOutExt = (file: string) =>
  file.replace(/\.(tif|tiff|png|jpeg)$/i, '.jpg');

const outPathFor = (absFile: string) => {
  const rel = absFile.replace(/^originals\/portfolio\//, '');
  const clean = slugify(rel);
  return join(OUTDIR, normalizeOutExt(clean));
};

// Next/Image needs URL-ish paths
const webSrcFor = (outPath: string) => {
  const rel = outPath.replace(/^public\//, '');
  return '/' + rel.split(posix.sep).join('/');
};

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

type CacheEntry = {
  srcMtimeMs: number;
  srcSize: number;
  settings: string;
};

type CacheMap = Record<string, CacheEntry>;

function loadCache(): CacheMap {
  try {
    return JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache: CacheMap) {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

(async () => {
  console.log('🖼  Building web-ready images + blur placeholders…');
  if (FORCE) console.log('⚠️  --force enabled: rebuilding all files');

  const files = await fg(INPUT, { onlyFiles: true, caseSensitiveMatch: false });
  if (files.length === 0) {
    console.log('⚠️  No originals found in originals/portfolio/');
    process.exit(0);
  }
  console.log(`✔ Found ${files.length} original(s)`);

  const cache = loadCache();
  const manifest: ManifestItem[] = [];
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const out = outPathFor(file);
    const srcStat = statSync(file);
    const key = file; // cache key is the source absolute-ish path

    const cached = cache[key];
    const upToDate =
      !FORCE &&
      cached &&
      cached.settings === SETTINGS_VERSION &&
      cached.srcMtimeMs === srcStat.mtimeMs &&
      cached.srcSize === srcStat.size &&
      existsSync(out) &&
      existsSync(MANIFEST_OUT);

    if (upToDate) {
      // Still need manifest data for downstream use; we’ll re-derive dimensions via reading the output.
      // Cheap way: read dimensions from the output file itself.
      try {
        const meta = await sharp(out).metadata();
        const blurBuf = await sharp(out)
          .resize({ width: 24 })
          .jpeg({ quality: 40 })
          .toBuffer();
        manifest.push({
          src: webSrcFor(out),
          width: meta.width ?? 0,
          height: meta.height ?? 0,
          blurDataURL: `data:image/jpeg;base64,${blurBuf.toString('base64')}`,
        });
      } catch {
        /* ignore */
      }
      skipped++;
      console.log(`↷ Skipping (up‑to‑date): ${out}`);
      continue;
    }

    mkdirSync(dirname(out), { recursive: true });

    // Build main web image
    const base = sharp(file, { unlimited: true }).rotate();
    const { data: mainBuf, info } = await base
      .clone()
      .resize({ width: TARGET_LONG_EDGE, withoutEnlargement: true })
      .withMetadata({ orientation: 1 })
      .jpeg({
        quality: JPEG_QUALITY,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer({ resolveWithObject: true });

    writeFileSync(out, mainBuf);
    processed++;
    console.log(`→ ${file}  =>  ${out}  (${info.width}×${info.height})`);

    // LQIP
    const blurBuf = await base
      .clone()
      .resize({ width: 24, withoutEnlargement: true })
      .jpeg({ quality: 40 })
      .toBuffer();
    const blurDataURL = `data:image/jpeg;base64,${blurBuf.toString('base64')}`;

    manifest.push({
      src: webSrcFor(out),
      width: info.width ?? 0,
      height: info.height ?? 0,
      blurDataURL,
    });

    // Update cache
    cache[key] = {
      srcMtimeMs: srcStat.mtimeMs,
      srcSize: srcStat.size,
      settings: SETTINGS_VERSION,
    };
  }

  // Write manifest + cache
  mkdirSync(dirname(MANIFEST_OUT), { recursive: true });
  writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2), 'utf8');
  saveCache(cache);

  console.log(`✅ Done. ${processed} processed, ${skipped} skipped.`);
  console.log(`📄 Manifest: ${MANIFEST_OUT}`);
})();
