# Phase 5: External Content Curation - Complete! ✅

Phase 5 has been successfully implemented with tools and workflows for curating photos from your 500px and Flickr accounts.

## What's New

### 1. Content Curation Script

**File**: `scripts/curate-external-photos.ts`

A TypeScript script that helps you:

- Analyze downloaded photos from staging directories
- Extract EXIF metadata automatically
- Generate curation metadata files
- Import selected photos to your portfolio with proper naming

**Commands**:

```bash
# Step 1: Analyze downloaded photos
pnpm tsx scripts/curate-external-photos.ts analyze

# Step 2: Edit curation-data.json to add URLs, captions, categories

# Step 3: Import selected photos
pnpm tsx scripts/curate-external-photos.ts import
```

### 2. Curation Guide

**File**: `CURATION_GUIDE.md`

Complete step-by-step guide for:

- Manually downloading photos from 500px (69 photos) and Flickr (45 photos)
- Using the curation script
- Adding metadata and source attribution
- Importing photos to your portfolio
- Testing the results

### 3. Source Attribution System

**Type Definition** (`src/lib/captions.ts`):

```typescript
source?: {
  platform: '500px' | 'flickr' | 'instagram' | 'web';
  url: string;
  username?: string;
}
```

**Lightbox Display** (`src/components/sections/Lightbox.tsx`):

- Shows source platform with icon (🌐 for 500px, 📸 for Flickr)
- Links to original photo page
- Clean "Originally shared on [Platform]" message
- Separated from EXIF data with border

## How to Use (Quick Start)

### 1. Download Your Favorites

Create staging directories and download 15-25 of your best photos:

```bash
mkdir -p staging/500px
mkdir -p staging/flickr
```

Visit your profiles and download images:

- 500px: https://500px.com/p/AndrewTeece?view=photos
- Flickr: https://www.flickr.com/photos/andrewteece/

### 2. Analyze Photos

```bash
pnpm tsx scripts/curate-external-photos.ts analyze
```

This creates `curation-data.json` with metadata for all staged photos.

### 3. Add Metadata

Edit `curation-data.json` and fill in for each photo you want to import:

- `url` - Original photo URL (required for import)
- `caption` - Description
- `category` - Landscapes, Nature, etc.
- `tags` - Array of tags for filtering
- `location` - Where it was taken

### 4. Import to Portfolio

```bash
pnpm tsx scripts/curate-external-photos.ts import
```

Selected photos (those with URLs) are copied to `originals/portfolio/` with new filenames.

### 5. Process Images

```bash
pnpm build:images
```

Generates optimized web versions and updates the manifest.

### 6. Add Captions

Update `src/lib/captions.ts` with rich metadata:

```typescript
'landscape-5px-01.jpg': {
  title: 'Canyon Sunrise',
  alt: 'Golden light illuminating canyon walls',
  location: 'Zion National Park, Utah',
  year: 2024,
  category: 'Landscapes',
  tags: ['canyon', 'sunrise', 'national-park'],
  camera: 'Sony α7R III',
  lens: '16-35mm f/2.8',
  settings: 'f/8 • 1/125s • ISO 400',
  source: {
    platform: '500px',
    url: 'https://500px.com/photo/YOUR_PHOTO_ID',
  },
},
```

### 7. Test

```bash
pnpm dev
```

Visit http://localhost:3000/portfolio and verify:

- New photos appear in gallery
- Filtering by category/tags works
- Lightbox shows source attribution with link
- All images load properly

## Example Source Attribution

When viewing an imported photo in the lightbox, users will see:

```
📍 Zion National Park, Utah • 2024
📷 Sony α7R III  🔍 16-35mm f/2.8  ⚙️ f/8 • 1/125s • ISO 400
─────────────────────────────────────
🌐 Originally shared on 500px →
```

Clicking the link opens the original photo on 500px/Flickr.

## File Structure

```
scripts/
  curate-external-photos.ts  ← Curation script
staging/                     ← Downloaded photos (gitignored)
  500px/
  flickr/
curation-data.json          ← Generated metadata (gitignored)
originals/portfolio/        ← Imported originals
CURATION_GUIDE.md           ← Complete user guide
```

## What's Next?

You can now:

1. **Start curating**: Follow CURATION_GUIDE.md to select and import photos
2. **Move to Phase 6**: Performance & SEO optimizations
3. **Both**: Curate photos while implementing Phase 6 in parallel

Phase 6 will focus on:

- Lazy loading with intersection observer
- JSON-LD structured data for images
- Enhanced sitemap with EXIF coordinates
- Image preloading for lightbox navigation
- Core Web Vitals monitoring

## Notes

- The curation script preserves EXIF data during import
- Source attribution respects the platforms where you originally shared
- All imported images maintain proper credit and links back to originals
- Script is reusable - you can run multiple import batches

---

**Phase 5 Status**: ✅ Complete
**Ready for Phase 6**: Yes
**User Action Required**: Follow CURATION_GUIDE.md to curate and import photos
