import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical host is the apex getculprit.app (www 301s to it — see public/_redirects
// and the Cloudflare redirect rule in README). `site` feeds canonical URLs,
// sitemap.xml, and robots.txt.
export default defineConfig({
  site: 'https://getculprit.app',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // /privacy and /terms are noindex shells in Phase 1 (real legal copy lands
      // in Phase 2 — B-229/B-230/B-270); keep them out of the sitemap until then.
      filter: (page) =>
        !page.endsWith('/privacy') && !page.endsWith('/terms'),
    }),
  ],
  build: {
    // Cleaner URLs: /support instead of /support/index.html
    format: 'file',
  },
});
