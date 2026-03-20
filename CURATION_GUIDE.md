# External Photo Curation Guide

This guide walks you through curating and importing photos from your 500px and Flickr accounts.

## Overview

You have:

- **500px**: 69 photos at https://500px.com/p/AndrewTeece?view=photos
- **Flickr**: 45 photos at https://www.flickr.com/photos/andrewteece/

**Goal**: Select 15-25 of your best images to add to the portfolio with proper attribution.

---

## Step 1: Manual Photo Selection

### Option A: Manual Download (Recommended)

Since API access for these platforms is limited/paid, the easiest approach is:

1. **Browse your galleries**:
   - Visit your 500px profile: https://500px.com/p/AndrewTeece?view=photos
   - Visit your Flickr photostream: https://www.flickr.com/photos/andrewteece/

2. **Download your favorites**:
   - Right-click photos and "Save Image As..." or use the download button
   - Save to organized directories:
     ```bash
     mkdir -p staging/500px
     mkdir -p staging/flickr
     ```
   - Aim for 15-25 of your absolute best images
   - Download highest resolution available

3. **Keep track of source URLs**:
   - As you download, note each photo's original URL
   - You'll need these for attribution

### Option B: Bulk Download Tools

If you want to download all photos first, then curate:

**For 500px:**

- Use browser DevTools Network tab to find image URLs
- Or use a bulk downloader extension

**For Flickr:**

- Use Flickr's own bulk download feature: https://www.flickr.com/tools/
- Or tools like `flickr-download` or `flickr-backup`

---

## Step 2: Analyze Downloaded Photos

Run the curation script to analyze your staged photos:

```bash
pnpm tsx scripts/curate-external-photos.ts analyze
```

This will:

- Scan `staging/` directory recursively
- Extract EXIF metadata (camera, lens, settings)
- Detect source (500px/Flickr) from folder structure
- Generate a `curation-data.json` file

---

## Step 3: Curate Metadata

Open `curation-data.json` and enrich each photo with:

```json
{
  "photos": [
    {
      "filename": "DSC_1234.jpg",
      "suggested": {
        "newFilename": "landscape-5px-01.jpg",
        "source": "500px",
        "url": "https://500px.com/photo/...", // ← ADD THIS
        "caption": "Golden hour at the canyon", // ← ADD THIS
        "category": "Landscapes", // ← ADD THIS
        "tags": ["canyon", "sunset", "nature"], // ← ADD THIS
        "location": "Zion National Park, Utah" // ← ADD THIS
      }
    }
  ]
}
```

**Required fields** for import:

- `url` - Original photo URL (for attribution)
- `caption` - Brief description
- `category` - One of: Landscapes, Nature, Architecture, etc.

**Optional but recommended**:

- `tags` - Array of tags for filtering
- `location` - Where the photo was taken

**Filename conventions**:

- Landscapes: `landscape-{source}-{number}.jpg`
- Nature: `nature-{source}-{number}.jpg`
- Macro: `macro-{source}-{number}.jpg`

---

## Step 4: Import Selected Photos

After editing `curation-data.json`, import photos to your portfolio:

```bash
pnpm tsx scripts/curate-external-photos.ts import
```

This will:

- Copy selected photos (those with URLs) to `originals/portfolio/`
- Rename them according to your filename scheme
- Skip photos that are already imported

---

## Step 5: Process Images

Run the image build script to optimize for web:

```bash
pnpm build:images
```

This generates:

- Responsive sizes (320w, 640w, 1024w, 1280w, 1920w)
- Blur placeholders
- Updated `src/lib/image-manifest.json`

---

## Step 6: Add Captions

Update `src/lib/captions.ts` with metadata from your curation data:

```typescript
export const CAPTIONS: Record<string, Caption> = {
  // ... existing photos ...

  // New 500px photo
  'landscape-5px-01.jpg': {
    title: 'Golden Hour Canyon',
    alt: 'Canyon walls illuminated by warm sunset light',
    caption: 'Golden hour at the canyon',
    location: 'Zion National Park, Utah',
    year: 2024,
    category: 'Landscapes',
    tags: ['canyon', 'sunset', 'nature'],
    camera: 'Sony α7R III',
    lens: '16-35mm f/2.8',
    settings: 'f/8 · 1/125s · ISO 400',
    source: {
      platform: '500px',
      url: 'https://500px.com/photo/...',
    },
  },
};
```

**Source attribution format**:

```typescript
source: {
  platform: '500px' | 'flickr',
  url: string,  // Original photo URL
}
```

---

## Step 7: Test Portfolio

1. Start dev server:

   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000/portfolio

3. Verify:
   - New photos appear in the gallery
   - Filtering by category/tags works
   - Lightbox shows EXIF and source attribution
   - Images load properly with blur placeholders

---

## Tips for Selection

When choosing 15-25 photos from 114 total:

**Prioritize**:

- Your most technically excellent work
- Photos with strong composition and storytelling
- Variety in subjects and styles
- Images you're proud to showcase prominently

**Consider**:

- Portfolio balance (landscapes, macro, nature, etc.)
- Seasonal and lighting variety
- Geographic diversity
- Photos with complete EXIF data

**Avoid**:

- Duplicate or very similar compositions
- Technically flawed images
- Photos you've improved upon with newer work

---

## API Research Notes

### 500px API

- **Status**: Deprecated in 2018, minimal public access
- **Alternative**: Manual download or web scraping
- **Attribution**: Link back to original photo page

### Flickr API

- **Status**: Active but requires API key (free tier available)
- **Useful for**: Fetching photoset metadata, EXIF data
- **Not needed for**: Simple manual downloads work fine
- **Docs**: https://www.flickr.com/services/api/

For this project, manual download is the most straightforward approach given the relatively small number of photos (15-25 out of 114).

---

## Source Attribution in UI

Once imported, photos will display source attribution in the lightbox:

- Platform badge (500px or Flickr logo)
- "View on [Platform]" link
- Original photographer credit (that's you!)

This maintains good practice for portfolio work and respects the platforms where you originally shared these images.
