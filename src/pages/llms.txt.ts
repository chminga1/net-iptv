import type { APIRoute } from 'astro';
import { CLUSTERS, PILLAR_SLUG } from '../data/blog-strategy';
import { moreLinks, navLinks, site } from '../data/site';
import { getPosts, postUrl, postsInCluster } from '../lib/blog';

/**
 * llms.txt — a curated index for AI crawlers (llmstxt.org). Rebuilt from the
 * page list and the published posts on every build, grouped by cluster with
 * each cluster's hub listed first.
 */
export const GET: APIRoute = async ({ site: origin }) => {
	const abs = (path: string) => new URL(path, origin).href;
	const posts = await getPosts();

	const lines = [
		`# ${site.name}`,
		'',
		`> ${site.name} is an IPTV subscription service with ${site.channels} live channels and ${site.titles} films and series in 4K, FHD and HD, available on Smart TVs, Fire TV, Android, iOS and computers, with a free trial and 24/7 support.`,
		'',
		'## Core pages',
		...[...navLinks, ...moreLinks].map((l) => `- [${l.label}](${abs(l.href)})`),
	];

	const pillar = posts.find((p) => p.id === PILLAR_SLUG);
	if (pillar) {
		lines.push('', '## Start here', `- [${pillar.data.title}](${abs(postUrl(pillar.id))}): ${pillar.data.description}`);
	}

	for (const cluster of CLUSTERS) {
		const inCluster = postsInCluster(posts, cluster.id).filter((p) => p.id !== PILLAR_SLUG);
		if (!inCluster.length) continue;
		inCluster.sort((a, b) => Number(b.id === cluster.hub) - Number(a.id === cluster.hub));
		lines.push('', `## ${cluster.name}`);
		for (const p of inCluster) {
			lines.push(`- [${p.data.title}](${abs(postUrl(p.id))}): ${p.data.description}`);
		}
	}

	lines.push('', '## Contact', `- WhatsApp: https://wa.me/${site.whatsapp}`, '');

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
