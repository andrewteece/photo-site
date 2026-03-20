# SEO & Analytics Setup Guide

This guide covers the professional-grade SEO and analytics implementation for Andrew Teece Photography.

## 🎯 What's Implemented

### Core SEO Features

#### 1. Meta Tags (All Pages)

- ✅ Title tags with site branding
- ✅ Meta descriptions
- ✅ Canonical URLs
- ✅ Author/creator metadata
- ✅ Keywords (where relevant)
- ✅ OpenGraph tags (Facebook, LinkedIn)
- ✅ Twitter Cards

#### 2. Structured Data (JSON-LD)

- ✅ **Person Schema** - Professional photographer profile
- ✅ **WebSite Schema** - Site navigation and search
- ✅ **ImageGallery Schema** - Portfolio collections
- ✅ **BlogPosting Schema** - Individual blog posts
- ✅ Breadcrumb navigation

#### 3. Sitemaps & Robots

- ✅ XML sitemap (`/sitemap.xml`)
- ✅ Image sitemap (`/sitemap-images.xml`)
- ✅ robots.txt configuration
- ✅ RSS feed (`/feed.xml`)

#### 4. Technical SEO

- ✅ Next.js 15 Image Optimization (AVIF, WebP)
- ✅ Responsive images with `srcset`
- ✅ Lazy loading for below-fold images
- ✅ Optimized font loading
- ✅ PWA manifest
- ✅ Theme-aware favicons

### Analytics & Performance

#### 1. Google Analytics 4

Location: `src/components/Analytics.tsx` & `src/lib/analytics.ts`

**Features:**

- Page view tracking
- Custom event tracking
- Core Web Vitals monitoring
- Portfolio engagement metrics
- Contact form conversions

**Events Tracked:**

- `view_image` - Portfolio image views
- `open_lightbox` - Lightbox opens
- `submit_contact` - Contact form submissions
- `click_social` - Social media link clicks
- Core Web Vitals (LCP, FID, CLS, TTFB, INP)

#### 2. Performance Monitoring

Location: `src/components/WebVitals.tsx`

Tracks and reports:

- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)
- Interaction to Next Paint (INP)

## 🚀 Setup Instructions

### 1. Configure Environment Variables

Create `.env.local` file:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://www.andrewteecephotography.com

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Get Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Get your Measurement ID (starts with `G-`)
4. Add it to `.env.local`

### 3. Verify Setup

**Test Analytics (Local):**

```bash
# Analytics won't fire in development
# To test, do a production build:
pnpm build && pnpm start
```

**Check in Browser:**

1. Open DevTools → Network tab
2. Filter: `google-analytics.com`
3. Navigate site, verify events fire

**Test Web Vitals:**

```bash
pnpm dev
# Check console for Web Vitals logs
```

### 4. Verify SEO Elements

**Test OpenGraph:**

- Use [OpenGraph Debugger](https://www.opengraph.xyz/)
- Enter your URLs, verify images/text

**Test Structured Data:**

- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Enter URLs, verify schemas

**Test Sitemaps:**

- Visit: `https://yourdomain.com/sitemap.xml`
- Visit: `https://yourdomain.com/sitemap-images.xml`
- Submit to Google Search Console

## 📊 Analytics Tracking Examples

### Track Custom Events

```typescript
import { event } from '@/lib/analytics';

// Track button clicks
event({
  action: 'click_cta',
  category: 'Engagement',
  label: 'View Portfolio',
});

// Track downloads
event({
  action: 'download_file',
  category: 'Conversion',
  label: 'price-list.pdf',
});
```

### Track Portfolio Engagement

Already implemented in:

- `src/components/sections/Lightbox.tsx` - Image lightbox opens
- `src/components/sections/GalleryGrid.tsx` - Image views

### Track Form Submissions

```typescript
import { trackContactSubmit } from '@/lib/analytics';

// In your form handler
const handleSubmit = async (data) => {
  // ... form logic
  trackContactSubmit();
};
```

## 🎨 Photography-Specific SEO Best Practices

### Image Optimization

✅ Already using Next/Image with:

- Automatic AVIF/WebP conversion
- Lazy loading
- Blur placeholders
- Responsive srcsets

### Alt Text

✅ Using caption system in `src/lib/captions.ts`

- Descriptive alt text for all images
- Location data in structured data
- Image titles for SEO

### Image Sitemap

✅ Includes:

- All portfolio images
- Image captions
- Geographic location
- License information

### Structured Data for Photography

✅ Using:

- ImageGallery schema
- ImageObject schema
- Person (Professional Photographer)
- Creative Work metadata

## 📈 Monitoring & Maintenance

### Weekly

- [ ] Check Google Search Console for errors
- [ ] Review top-performing pages
- [ ] Check for broken links

### Monthly

- [ ] Review GA4 dashboard
- [ ] Analyze Core Web Vitals
- [ ] Update meta descriptions for new content
- [ ] Check competitor rankings

### Quarterly

- [ ] Update keywords based on search terms
- [ ] Refresh OpenGraph images
- [ ] Review and update structured data
- [ ] Performance audit

## 🔧 Advanced Configuration

### Add Vercel Analytics

Vercel automatically provides analytics. To enable:

1. In Vercel dashboard → Project Settings → Analytics
2. Enable Web Analytics
3. Deploy

No code changes needed!

### Add Additional Analytics

**Plausible (Privacy-focused):**

```typescript
// Add to .env.local
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=andrewteecephotography.com

// Add to layout.tsx <head>
<Script
  defer
  data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  src="https://plausible.io/js/script.js"
/>
```

**Umami (Self-hosted):**

```typescript
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id

<Script
  async
  src="https://analytics.umami.is/script.js"
  data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
/>
```

## 🎯 Key Performance Targets

### Core Web Vitals (Target)

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **TTFB:** < 600ms
- **INP:** < 200ms

### SEO Scores (Target)

- **Google PageSpeed:** 90+
- **Lighthouse:** 90+ across all metrics
- **GTmetrix:** Grade A

### Analytics Benchmarks

- **Bounce Rate:** < 50%
- **Avg. Session:** > 2 min
- **Pages/Session:** > 2.5
- **Conversion Rate:** > 2%

## 📚 Resources

- [Google Search Console](https://search.google.com/search-console)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Web Vitals](https://web.dev/vitals/)

## 🆘 Troubleshooting

**Analytics not firing:**

1. Check `.env.local` has correct GA ID
2. Verify production build (`pnpm build`)
3. Check Network tab for analytics requests
4. Wait 24-48hrs for GA4 to show data

**Images not in sitemap:**

1. Check `/sitemap-images.xml` route
2. Verify images in `/public/images/portfolio/`
3. Check `src/lib/captions.ts` for metadata

**Poor Web Vitals:**

1. Check image sizes (should be < 500KB)
2. Verify lazy loading working
3. Check for layout shifts
4. Review third-party scripts

---

**Last Updated:** March 2026
