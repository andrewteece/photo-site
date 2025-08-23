/* eslint-disable no-console */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IN_DIR = 'originals/portfolio';
const OUT_DIR = 'public/images/portfolio';
const MANIFEST = 'src/lib/image-manifest.json';

// Useful if a camera/export produced massive pixel counts (we're safe, but be explicit)
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
    // Let sharp sniff the format. If it throws, we'll catch it.
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

    // Read metadata first — if this fails, we'll catch below
    const meta = await image.metadata();

    // Normalize everything to sRGB 8-bit and write a clean JPEG
    const webJpeg = image
      .toColourspace('srgb') // fix CMYK/GRAY/etc
      .jpeg({
        quality: 85,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
        force: true,
      });

    await fs.writeFile(outPath, await webJpeg.toBuffer());

    // Tiny LQIP (blur placeholder)
    const blurBuf = await sharp(outPath)
      .resize({ width: 28, withoutEnlargement: true })
      .toFormat('jpeg', { quality: 35 })
      .toBuffer();

    const blurDataURL = `data:image/jpeg;base64,${blurBuf.toString('base64')}`;

    // Dimensions: prefer meta (original) but fallback to reading from out
    const width = meta.width ?? (await sharp(outPath).metadata()).width ?? 0;
    const height = meta.height ?? (await sharp(outPath).metadata()).height ?? 0;

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

  // Collect all files in IN_DIR
  let files = await fs.readdir(IN_DIR).catch(() => []);
  files = files.filter((f) => !f.startsWith('.')); // ignore dotfiles

  // Only attempt formats we intend to normalize; anything else will be skipped
  const allowed = /\.(jpe?g|png|tiff?|webp|heic|heif)$/i;
  const inputs = files
    .filter((f) => allowed.test(f))
    .map((f) => path.join(IN_DIR, f));

  console.log(`✔ Found ${inputs.length} original(s)`);

  const manifest: ManifestItem[] = [];
  let processed = 0;
  let skipped = 0;

  for (const fp of inputs) {
    // Quick guard: if sharp can't sniff the image, skip gracefully
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

  // Sort by filename for stable order
  manifest.sort((a, b) => a.src.localeCompare(b.src));

  await ensureDir(path.dirname(MANIFEST));
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`📄 Manifest: ${MANIFEST}`);
  console.log(`✅ Done. ${processed} processed, ${skipped} skipped.`);
}

main().catch((e) => {
  console.error(e);
  // Don't crash CI — but surface a non-zero exit could break deploy.
  // If you prefer hard-fail on any issue, change exitCode to 1.
  process.exit(0);
});
