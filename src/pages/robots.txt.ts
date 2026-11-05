import type { APIRoute } from 'astro';

/** Generated so the Sitemap line always points at the configured site URL. */
export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL('sitemap-index.xml', site);
	return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${sitemap.href}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
