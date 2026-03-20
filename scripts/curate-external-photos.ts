#!/usr/bin/env tsx
/**
 * Content Curation Script for External Photo Platforms
 *
 * This script helps manage the process of curating photos from 500px and Flickr.
 *
 * WORKFLOW:
 * 1. Manually download your favorite photos from 500px/Flickr to a staging directory
 * 2. Run this script to analyze photos and generate curation metadata
 * 3. Review and select final images for the portfolio
 * 4. Script copies selected images to originals/portfolio/ with proper naming
 *
 * USAGE:
 *   pnpm tsx scripts/curate-external-photos.ts analyze
 *   pnpm tsx scripts/curate-external-photos.ts import staging_photos.json
 */

import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const STAGING_DIR = path.join(process.cwd(), 'staging');
const ORIGINALS_DIR = path.join(process.cwd(), 'originals', 'portfolio');
const CURATION_FILE = path.join(process.cwd(), 'curation-data.json');

interface PhotoMetadata {
  filename: string;
  originalPath: string;
  hash: string;
  width: number;
  height: number;
  format: string;
  size: number;
  exif?: {
    make?: string;
    model?: string;
    lens?: string;
    focalLength?: number;
    aperture?: number;
    shutterSpeed?: string;
    iso?: number;
    dateTime?: string;
  };
  suggested: {
    newFilename: string;
    source: '500px' | 'flickr' | 'unknown';
    url: string;
    caption?: string;
    category?: string;
    tags?: string[];
    location?: string;
  };
}

interface CurationReport {
  scannedAt: string;
  totalPhotos: number;
  photos: PhotoMetadata[];
  sources: {
    '500px': number;
    flickr: number;
    unknown: number;
  };
}

async function fileHash(filepath: string): Promise<string> {
  const buffer = await fs.readFile(filepath);
  return createHash('sha256').update(buffer).digest('hex').substring(0, 16);
}

function inferSource(
  filename: string,
  dirPath: string,
): '500px' | 'flickr' | 'unknown' {
  const lower = filename.toLowerCase();
  const dirLower = dirPath.toLowerCase();

  if (lower.includes('500px') || dirLower.includes('500px')) return '500px';
  if (lower.includes('flickr') || dirLower.includes('flickr')) return 'flickr';

  return 'unknown';
}

function autoDetectCategory(width: number, height: number): string {
  const ratio = width / height;

  if (ratio > 1.3) return 'Landscapes';
  if (ratio < 0.75) return 'Portrait';
  if (ratio > 0.9 && ratio < 1.1) return 'Square';
  return 'Nature'; // Default for anything in between
}

function generateFilename(
  index: number,
  source: string,
  category?: string,
): string {
  const prefix = category?.toLowerCase().replace(/\s+/g, '-') || 'photo';
  const sourceShort =
    source === '500px' ? '5px' : source === 'flickr' ? 'flkr' : 'ext';
  return `${prefix}-${sourceShort}-${String(index).padStart(2, '0')}.jpg`;
}

async function analyzePhoto(
  filepath: string,
  index: number,
): Promise<PhotoMetadata> {
  const stats = await fs.stat(filepath);
  const filename = path.basename(filepath);
  const dirPath = path.dirname(filepath);

  // Load image metadata
  const image = sharp(filepath);
  const metadata = await image.metadata();
  const hash = await fileHash(filepath);

  // Infer source from filename or directory
  const source = inferSource(filename, dirPath) as '500px' | 'flickr';

  // Extract EXIF data
  const exif = metadata.exif
    ? {
        make: (metadata.exif as any).Make,
        model: (metadata.exif as any).Model,
        lens: (metadata.exif as any).LensModel,
        focalLength: (metadata.exif as any).FocalLength,
        aperture: (metadata.exif as any).FNumber,
        shutterSpeed: (metadata.exif as any).ExposureTime,
        iso:
          (metadata.exif as any).ISO || (metadata.exif as any).ISOSpeedRatings,
        dateTime: (metadata.exif as any).DateTimeOriginal,
      }
    : undefined;

  const width = metadata.width || 0;
  const height = metadata.height || 0;
  const category = autoDetectCategory(width, height);

  const photo: PhotoMetadata = {
    filename,
    originalPath: filepath,
    hash,
    width,
    height,
    format: metadata.format || 'unknown',
    size: stats.size,
    exif:
      exif && Object.values(exif).some((v) => v !== undefined)
        ? exif
        : undefined,
    suggested: {
      newFilename: generateFilename(index, source, category),
      source,
      url: '', // Optional: add Flickr/500px URL for attribution
      caption: '', // Optional: add caption
      category, // Auto-detected from aspect ratio
      tags: [],
      location: '',
    },
  };

  return photo;
}

async function scanStagingDirectory(): Promise<CurationReport> {
  try {
    await fs.access(STAGING_DIR);
  } catch {
    throw new Error(
      `Staging directory not found: ${STAGING_DIR}\n` +
        `Please create it and add photos:\n` +
        `  mkdir -p staging/500px\n` +
        `  mkdir -p staging/flickr`,
    );
  }

  const photos: PhotoMetadata[] = [];
  const sources = { '500px': 0, flickr: 0, unknown: 0 };

  async function scanDir(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (/\.(jpe?g|png|tiff?)$/i.test(entry.name)) {
        const photo = await analyzePhoto(fullPath, photos.length + 1);
        photos.push(photo);
        sources[
          photo.suggested.source === 'unknown'
            ? 'unknown'
            : photo.suggested.source
        ]++;
      }
    }
  }

  await scanDir(STAGING_DIR);

  return {
    scannedAt: new Date().toISOString(),
    totalPhotos: photos.length,
    photos,
    sources,
  };
}

async function analyzeCommand() {
  console.log('🔍 Scanning staging directory for photos...\n');

  const report = await scanStagingDirectory();

  console.log(`✅ Found ${report.totalPhotos} photos:`);
  console.log(`   • 500px:   ${report.sources['500px']}`);
  console.log(`   • Flickr:  ${report.sources.flickr}`);
  console.log(`   • Unknown: ${report.sources.unknown}\n`);

  // Save curation data
  await fs.writeFile(CURATION_FILE, JSON.stringify(report, null, 2));
  console.log(`📝 Curation data saved to: ${CURATION_FILE}\n`);

  console.log('NEXT STEPS:');
  console.log('1. Run: pnpm tsx scripts/curate-external-photos.ts import');
  console.log('2. Photos will be auto-categorized by aspect ratio');
  console.log(
    '   (Optional: Edit curation-data.json first to customize categories/captions)\n',
  );
}

async function importCommand() {
  console.log('📦 Importing curated photos...\n');

  // Load curation data
  let report: CurationReport;
  try {
    const data = await fs.readFile(CURATION_FILE, 'utf-8');
    report = JSON.parse(data);
  } catch (err) {
    throw new Error(
      'Curation data not found. Run analyze first:\n' +
        '  pnpm tsx scripts/curate-external-photos.ts analyze',
    );
  }

  // Ensure originals directory exists
  await fs.mkdir(ORIGINALS_DIR, { recursive: true });

  let imported = 0;
  let skipped = 0;

  for (const photo of report.photos) {
    const targetPath = path.join(ORIGINALS_DIR, photo.suggested.newFilename);

    // Check if already exists
    try {
      await fs.access(targetPath);
      console.log(
        `⏭️  Skipping ${photo.suggested.newFilename} (already exists)`,
      );
      skipped++;
      continue;
    } catch {
      // File doesn't exist, proceed with copy
    }

    // Copy file
    await fs.copyFile(photo.originalPath, targetPath);
    console.log(`✅ Imported ${photo.suggested.newFilename}`);
    imported++;
  }

  console.log(`\n✨ Import complete!`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped:  ${skipped}\n`);

  if (imported > 0) {
    console.log('NEXT STEPS:');
    console.log('1. Run the image build script: pnpm build:images');
    console.log(
      '2. Update src/lib/captions.ts with metadata from curation-data.json',
    );
    console.log('3. Test the new photos in your portfolio\n');
  }
}

async function main() {
  const [, , command] = process.argv;

  try {
    switch (command) {
      case 'analyze':
        await analyzeCommand();
        break;
      case 'import':
        await importCommand();
        break;
      default:
        console.log('Photo Curation Tool\n');
        console.log('Commands:');
        console.log(
          '  analyze  - Scan staging directory and generate curation data',
        );
        console.log('  import   - Import selected photos to portfolio\n');
        console.log('Usage:');
        console.log('  pnpm tsx scripts/curate-external-photos.ts [command]\n');
        process.exit(1);
    }
  } catch (err) {
    console.error('❌ Error:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
