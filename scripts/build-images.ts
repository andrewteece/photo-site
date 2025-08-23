/* eslint-disable no-console */
import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IN_DIR = 'originals/portfolio';
const OUT_DIR = 'public/images/portfolio';
const MANIFEST = 'src/lib/image-manifest.json';

sharp.concurrency(0);

type ManifestItem = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\.(jpeg|jpg|png|tif|tiff|webp|heic|heif)$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

async function isReadableImage(fp: string) {
  try {
    const buf = await fs.readFile(fp);
    await sharp(buf, { limitInputPixels: false }).metadata();
    return true;
  } catch {
    return false;
  }
}

async function processOne(inputPath: string): Promise<ManifestItem | null> {
  const base = path.basename(inputPath);
  const outBase = `${slugify(base)}.jpg`;
  const outPath = path.join(OUT_DIR, outBase);
  const webSrc = `/images/portfolio/${outBase}`;

  try {
    const image = sharp(inputPath, { limitInputPixels: false }).rotate();

    const meta = await image.metadata();

    const webJpeg = image
      .toColourspace('srgb')
      .jpeg({
        quality: 85,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
        force: true,
      });

    await fs.writeFile(outPath, await webJpeg.toBuffer());

    const blurBuf = await sharp(outPath)
      .resize({ width: 28, withoutEnlargement: true })
      .jpeg({ quality: 35 })
      .toBuffer();

    const blurDataURL = `data:image/jpeg;base64,${blurBuf.toString('base64')}`;

    const outMeta = await sharp(outPath).metadata();
    const width = meta.width ?? outMeta.width ?? 0;
    const height = meta.height ?? outMeta.height ?? 0;

    console.log(`→ ${inputPath}  =>  ${outPath}  (${width}×${height})`);
    return { src: webSrc, width, height, blurDataURL };
  } catch (err: any) {
    console.warn(
      `⚠️  Skipping "${inputPath}" — ${
        err?.message || 'unsupported or unreadable image'
      }`
    );
    return null;
  }
}

async function main() {
  console.log('🖼  Building web-ready images + blur placeholders…');

  await ensureDir(OUT_DIR);

  let files = await fs.readdir(IN_DIR).catch(() => []);
  files = files.filter((f) => !f.startsWith('.'));

  const allowed = /\.(jpe?g|png|tiff?|webp|heic|heif)$/i;
  const inputs = files
    .filter((f) => allowed.test(f))
    .map((f) => path.join(IN_DIR, f));

  console.log(`✔ Found ${inputs.length} original(s)`);

  const manifest: ManifestItem[] = [];
  let processed = 0;
  let skipped = 0;

  for (const fp of inputs) {
    const ok = await isReadableImage(fp);
    if (!ok) {
      console.warn(`⚠️  Skipping "${fp}" — unsupported format`);
      skipped++;
      continue;
    }

    const item = await processOne(fp);
    if (item) {
      manifest.push(item);
      processed++;
    } else {
      skipped++;
    }
  }

  // Only write manifest if we actually processed images
  if (processed > 0) {
    manifest.sort((a, b) => a.src.localeCompare(b.src));
    await ensureDir(path.dirname(MANIFEST));
    await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
    console.log(`📄 Manifest updated: ${MANIFEST}`);
  } else {
    // If there is an existing manifest, keep it intact.
    const exists = fssync.existsSync(MANIFEST);
    console.warn(
      `⚠️  No images processed. ${
        exists ? 'Preserving existing manifest.' : 'No manifest present.'
      }`
    );
  }

  console.log(`✅ Done. ${processed} processed, ${skipped} skipped.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(0); // don't fail CI
});
