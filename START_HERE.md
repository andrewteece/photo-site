# Photo Curation Workflow - Quick Start

## You're Ready! Here's What to Do:

### Step 1: Download Your Favorite Photos (15-25 total)

**From 500px** (69 photos available):

1. Visit: https://500px.com/p/AndrewTeece?view=photos
2. Browse your gallery and select your best images
3. Download high-resolution versions
4. Save to: `staging/500px/`
5. Keep notes of the photo URLs for attribution

**From Flickr** (45 photos available):

1. Visit: https://www.flickr.com/photos/andrewteece/
2. Browse your photostream and select favorites
3. Download original quality
4. Save to: `staging/flickr/`
5. Keep notes of the photo URLs

**Tips for Selection**:

- Choose your absolute best work (technically and artistically)
- Aim for variety: landscapes, nature, macro, different seasons
- Pick images with strong composition and storytelling
- Prefer photos with complete EXIF data
- Select images you're proudest of showcasing

---

### Step 2: Analyze Your Downloaded Photos

Once you've downloaded 15-25 photos to the staging directories, run:

```bash
pnpm tsx scripts/curate-external-photos.ts analyze
```

This will:

- Scan all photos in `staging/500px/` and `staging/flickr/`
- Extract EXIF metadata (camera, lens, settings, dimensions)
- Generate `curation-data.json` with metadata for each photo
- Show you a summary of what was found

---

### Step 3: Enrich the Metadata

Open `curation-data.json` and for each photo you want to import, add:

**Required**:

- `url` - Original photo URL from 500px/Flickr (THIS IS REQUIRED FOR IMPORT)

**Recommended**:

- `caption` - Brief description of the photo
- `category` - One of: Landscapes, Nature, Macro, Architecture, Wildlife
- `tags` - Array like `["sunset", "canyon", "golden-hour"]`
- `location` - Where it was taken (e.g., "Zion National Park, Utah")

**Example entry**:

```json
{
  "filename": "DSC_5678.jpg",
  "suggested": {
    "newFilename": "landscape-5px-01.jpg",
    "source": "500px",
    "url": "https://500px.com/photo/1234567/canyon-sunrise",
    "caption": "Golden light illuminating ancient canyon walls at dawn",
    "category": "Landscapes",
    "tags": ["canyon", "sunrise", "golden-hour", "desert"],
    "location": "Zion National Park, Utah"
  }
}
```

**Important**: Only photos with a `url` field will be imported!

---

### Step 4: Import Selected Photos

After editing `curation-data.json`, run:

```bash
pnpm tsx scripts/curate-external-photos.ts import
```

This copies your selected photos to `originals/portfolio/` with proper naming.

---

### Step 5: Process Images for Web

Generate optimized versions and blur placeholders:

```bash
pnpm build:images
```

---

### Step 6: Add Rich Captions

Update `src/lib/captions.ts` with metadata. Use the data from your `curation-data.json`:

```typescript
// Add entries like this for each imported photo:
'landscape-5px-01.jpg': {
  title: 'Canyon Sunrise',
  alt: 'Golden light illuminating ancient canyon walls',
  caption: 'Golden light illuminating ancient canyon walls at dawn',
  location: 'Zion National Park, Utah',
  year: 2024,
  category: 'Landscapes',
  tags: ['canyon', 'sunrise', 'golden-hour', 'desert'],
  camera: 'Sony α7R III',
  lens: '16-35mm f/2.8 GM',
  settings: 'f/8 • 1/125s • ISO 400',
  source: {
    platform: '500px',
    url: 'https://500px.com/photo/1234567/canyon-sunrise',
  },
},
```

---

### Step 7: Test Your Portfolio

```bash
pnpm dev
```

Visit http://localhost:3001/portfolio and verify:

- ✅ New photos appear in the gallery grid
- ✅ Category/tag filtering works
- ✅ Lightbox shows your photos with EXIF data
- ✅ Source attribution displays with clickable link to original
- ✅ Images load smoothly with blur placeholders

---

## Current Status

📁 **Staging Directories**: Created

- `staging/500px/` - Ready for your 500px downloads
- `staging/flickr/` - Ready for your Flickr downloads

🎯 **Your Mission**: Download 15-25 of your absolute best photos!

📚 **Full Guide**: See [CURATION_GUIDE.md](CURATION_GUIDE.md) for detailed instructions

---

## Quick Commands Reference

```bash
# After downloading photos:
pnpm tsx scripts/curate-external-photos.ts analyze

# After editing curation-data.json:
pnpm tsx scripts/curate-external-photos.ts import

# Process images:
pnpm build:images

# Test:
pnpm dev
```

---

## Need Help?

- **Script usage**: `pnpm tsx scripts/curate-external-photos.ts` (shows help)
- **Detailed guide**: Read [CURATION_GUIDE.md](CURATION_GUIDE.md)
- **Example captions**: Check `src/lib/captions.ts` for existing entries
- **Filename patterns**: `{category}-{source}-{number}.jpg`
  - `landscape-5px-01.jpg`
  - `nature-flkr-02.jpg`
  - `macro-5px-03.jpg`

Good luck curating! 📸✨
