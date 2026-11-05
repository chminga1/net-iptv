// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

import { satteri } from '@astrojs/markdown-satteri';

import { blogCtaPlugin } from './src/lib/blog-cta-plugin';

/**
 * Public origin used for canonical URLs, the sitemap, robots.txt and schema.
 * Set SITE_URL in Vercel (Project → Settings → Environment Variables) to the
 * exact production domain, e.g. https://www.yourdomain.com. Without it, a
 * Vercel build falls back to the project's production domain, and a local
 * build to localhost.
 */
const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      // Topic archives stay out until they are indexable; see src/pages/blog/topic.
      filter: (page) => !page.includes('/blog/topic/'),
      // Match the canonical URLs, which never end in a slash (except the root).
      serialize: (item) => ({ ...item, url: item.url.replace(/([^/])\/$/, '$1') }),
    }),
  ],

  markdown: {
    // Astro 7's default Markdown processor, extended with the blog CTA plugin.
    processor: satteri({ hastPlugins: [blogCtaPlugin] }),
  },

  adapter: vercel()
});
