import { readdir, readFile, writeFile } from 'node:fs/promises';
import type { AstroIntegration } from 'astro';

/**
 * Removes noindex pages from the files written by @astrojs/sitemap.
 *
 * The sitemap integration lists every prerendered route, but some pages opt
 * out of indexing at render time (e.g. a blog topic page below its post
 * threshold, or any page passed `noindex` in Layout). This reads each listed
 * page's built HTML and drops the URL when it carries a robots noindex, so the
 * page itself stays the single source of truth.
 *
 * Must be registered after sitemap() so its build:done hook runs second.
 */
export function sitemapNoindex(): AstroIntegration {
	return {
		name: 'net-iptv:sitemap-noindex',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const files = (await readdir(dir)).filter((f) => /^sitemap-\d+\.xml$/.test(f));

				for (const file of files) {
					const fileUrl = new URL(file, dir);
					const xml = await readFile(fileUrl, 'utf8');
					const removed: string[] = [];

					const entries = await Promise.all(
						[...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map(async ([entry]) => {
							const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
							if (!loc) return entry;
							const path = new URL(loc).pathname.replace(/^\/|\/$/g, '');
							const html = await readFile(new URL(path ? `${path}/index.html` : 'index.html', dir), 'utf8').catch(() => '');
							if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) {
								removed.push(new URL(loc).pathname);
								return '';
							}
							return entry;
						}),
					);

					const urlset = xml.replace(/<url>[\s\S]*<\/url>/, entries.join(''));
					await writeFile(fileUrl, urlset);
					if (removed.length) logger.info(`Excluded noindex pages from ${file}: ${removed.join(', ')}`);
				}
			},
		},
	};
}
