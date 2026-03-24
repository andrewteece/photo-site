/*
  Simple SEO smoke test.
  Run against a running production server (pnpm build && pnpm start).

  Usage:
    pnpm build && pnpm start
    # in another terminal:
    pnpm test:seo
*/

// Base used for making HTTP requests (local server by default).
// Can be overridden with SEO_TEST_BASE_URL if needed.
const REQUEST_BASE = process.env.SEO_TEST_BASE_URL || 'http://localhost:3000';

// Pages to check and the tags we expect to see in the HTML <head>.
// These are intentionally minimal and conservative.
const pages: {
  path: string;
  requiredSnippets: string[];
}[] = [
  {
    path: '/',
    requiredSnippets: [
      '<title>Andrew Teece Photography</title>',
      '<meta name="description"',
      '<meta property="og:title"',
      '<meta property="og:description"',
      '<meta name="twitter:card"',
      '<link rel="canonical"',
    ],
  },
  {
    path: '/portfolio',
    requiredSnippets: [
      '<title>Portfolio — Andrew Teece Photography</title>',
      '<meta name="description"',
      '<meta property="og:title"',
      '<meta property="og:image"',
      '<link rel="canonical"',
      '/portfolio"',
    ],
  },
  {
    path: '/blog',
    requiredSnippets: [
      '<title>Blog — Andrew Teece Photography</title>',
      '<meta name="description"',
      '<meta property="og:title"',
      '<link rel="canonical"',
      '/blog"',
    ],
  },
  {
    path: '/blog/2025-craig-roberts-e6',
    requiredSnippets: [
      '<meta property="og:type" content="article"',
      '<meta property="og:title"',
      '<meta property="og:description"',
      '<meta name="twitter:card" content="summary_large_image"',
      '<link rel="canonical"',
      '/blog/2025-craig-roberts-e6"',
    ],
  },
  {
    path: '/blog/2025-site-refactor-redesign',
    requiredSnippets: [
      '<meta property="og:type" content="article"',
      '<meta property="og:title"',
      '<meta property="og:description"',
      '<meta name="twitter:card" content="summary_large_image"',
      '<link rel="canonical"',
      '/blog/2025-site-refactor-redesign"',
    ],
  },
  {
    path: '/portfolio/morning-landscapes',
    requiredSnippets: [
      '<meta property="og:type" content="article"',
      '<meta property="og:title"',
      '<meta property="og:description"',
      '<meta name="twitter:card" content="summary_large_image"',
      '<link rel="canonical"',
      '/portfolio/morning-landscapes"',
    ],
  },
];

async function fetchHtml(path: string): Promise<string> {
  const url = new URL(path, REQUEST_BASE).toString();
  const res = await fetch(url, {
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Request failed for ${url} with status ${res.status}`);
  }

  return await res.text();
}

async function run() {
  const failures: string[] = [];

  for (const page of pages) {
    try {
      const html = await fetchHtml(page.path);

      for (const snippet of page.requiredSnippets) {
        if (!html.includes(snippet)) {
          failures.push(
            `${page.path}: missing expected head snippet: ${snippet}`,
          );
        }
      }
    } catch (err) {
      failures.push(`${page.path}: ${(err as Error).message}`);
    }
  }

  if (failures.length > 0) {
    console.error('SEO smoke test FAILED:\n');
    for (const f of failures) {
      console.error('-', f);
    }
    process.exitCode = 1;
  } else {
    console.log('SEO smoke test passed for all monitored pages.');
  }
}

run().catch((err) => {
  console.error('Unexpected error running SEO test:', err);
  process.exitCode = 1;
});
