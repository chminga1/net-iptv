// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

import { satteri } from '@astrojs/markdown-satteri';

import { blogCtaPlugin } from './src/lib/blog-cta-plugin';
import { sitemapNoindex } from './src/lib/sitemap-noindex';

/**
 * Production origin, used for canonical URLs, the sitemap, robots.txt and
 * schema. SITE_URL overrides it, e.g. for a staging domain.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://netiptv.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  // English at the root, German under /de. Blog posts are English-only.
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    // Lists every prerendered page; drafts never build, and API routes are
    // on-demand so they are never listed.
    sitemap({
      // Match the canonical URLs, which never end in a slash (except the root).
      serialize: (item) => ({
        ...item,
        url: item.url.replace(/([^/])\/$/, '$1'),
        links: item.links?.map((link) => ({ ...link, url: link.url.replace(/([^/])\/$/, '$1') })),
      }),
      // Adds hreflang alternates between /page and /de/page.
      i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de' } },
    }),
    // Must follow sitemap(): drops pages that render a robots noindex.
    sitemapNoindex(),
  ],

  markdown: {
    // Astro 7's default Markdown processor, extended with the blog CTA plugin.
    processor: satteri({ hastPlugins: [blogCtaPlugin] }),
  },

  adapter: vercel()
});
