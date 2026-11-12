import { getCollection, type CollectionEntry } from 'astro:content';
import {
	AUTHORS,
	CLUSTERS,
	CONTENT_RULES,
	KEYWORD_MAP,
	PILLAR_SLUG,
	RESERVED_KEYWORDS,
	type Author,
	type Cluster,
	type ClusterId,
	type KeywordEntry,
} from '../data/blog-strategy';
import type { BlogPost } from '../data/blog';
import { moreLinks, navLinks } from '../data/site';
import { TRANSLATED_PATHS, getLocale, useTranslations, type Locale } from '../i18n';

/** English posts live in the `blog` collection, German ones in `blogDe` (same slugs). */
export type Post = CollectionEntry<'blog'> | CollectionEntry<'blogDe'>;

export const BLOG_PATH = '/blog';
/** /blog for English, /de/blog for German. */
export const blogPath = (locale: string | undefined = 'en'): string =>
	getLocale(locale) === 'de' ? `/de${BLOG_PATH}` : BLOG_PATH;
export const postUrl = (slug: string, locale?: string): string => `${blogPath(locale)}/${slug}`;
export const topicUrl = (cluster: string, locale?: string): string =>
	`${blogPath(locale)}/topic/${cluster}`;

/** Cluster with its name and description in the given language. */
export const getCluster = (id: string, locale?: string): Cluster => {
	const cluster = CLUSTERS.find((c) => c.id === id);
	if (!cluster) throw new Error(`[blog] Unknown cluster "${id}"`);
	const override = useTranslations(locale).blog.clusters[id];
	return override ? { ...cluster, ...override } : cluster;
};

export const getAuthor = (id: string, locale?: string): Author => {
	const author = AUTHORS.find((a) => a.id === id) ?? AUTHORS[0];
	const override = useTranslations(locale).blog.author;
	return override ? { ...author, ...override } : author;
};

/** Lower-case, collapse whitespace, drop years so "best iptv 2026" ≡ "best iptv". */
export const normalizeKeyword = (keyword: string): string =>
	keyword
		.toLowerCase()
		.replace(/\b(19|20)\d{2}\b/g, '')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();

export const wordCount = (body = ''): number =>
	body
		.replace(/^---[\s\S]*?---/, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_`|[\]()-]/g, ' ')
		.split(/\s+/)
		.filter(Boolean).length;

/** ~230 wpm, rounded up, as "7 min read" / "7 Min. Lesezeit". */
export const readingTime = (body = '', locale?: string): string =>
	useTranslations(locale).blog.readingTime(Math.max(1, Math.ceil(wordCount(body) / 230)));

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

const cache: Partial<Record<Locale, Post[]>> = {};

/**
 * Published posts in one language, newest first. Drafts are included in
 * `astro dev` so they can be previewed, and dropped from production builds.
 */
export async function getPosts(locale?: string): Promise<Post[]> {
	const lang = getLocale(locale);
	const hit = cache[lang];
	if (hit) return hit;
	const keep = (entry: Post) => import.meta.env.DEV || !entry.data.draft;
	const all: Post[] =
		lang === 'de' ? await getCollection('blogDe', keep) : await getCollection('blog', keep);
	all.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
	if (lang === 'de') validateBlogDe(all, await getPosts('en'));
	else validateBlog(all);
	cache[lang] = all;
	return all;
}

export const postsInCluster = (posts: Post[], cluster: ClusterId | string): Post[] =>
	posts.filter((p) => p.data.cluster === cluster);

export const toCard = (post: Post, locale?: string): BlogPost => ({
	category: getCluster(post.data.cluster, locale).name,
	title: post.data.title,
	excerpt: post.data.excerpt ?? post.data.description,
	readingTime: readingTime(post.body, locale),
	href: postUrl(post.id, locale),
	image: post.data.cover,
});

/** Clusters that have at least one post, in registry order. */
export const activeClusters = (posts: Post[], locale?: string): Cluster[] =>
	CLUSTERS.filter((c) => posts.some((p) => p.data.cluster === c.id)).map((c) =>
		getCluster(c.id, locale),
	);

// ---------------------------------------------------------------------------
// Related guides (rendered automatically under every post)
// ---------------------------------------------------------------------------

export interface RelatedGuides {
	/** Pillar, unless this post is the pillar. */
	readonly pillar?: Post;
	/** Cluster hub, unless this post is the hub (or the hub is the pillar). */
	readonly hub?: Post;
	/** Same-cluster posts; every spoke when this post is a hub. */
	readonly siblings: Post[];
	/** Pillar only: the hub of every other cluster. */
	readonly hubs: Post[];
}

export function relatedGuides(post: Post, posts: Post[]): RelatedGuides {
	const cluster = getCluster(post.data.cluster);
	const bySlug = (slug: string) => posts.find((p) => p.id === slug);
	const priority = (p: Post) =>
		KEYWORD_MAP.find((k) => k.slug === p.id)?.priority ?? 3;

	const pillar = post.id === PILLAR_SLUG ? undefined : bySlug(PILLAR_SLUG);
	const hubPost = bySlug(cluster.hub);
	const hub = hubPost && hubPost.id !== post.id && hubPost.id !== PILLAR_SLUG ? hubPost : undefined;

	const isLeader = post.data.role !== 'spoke';
	const siblings = postsInCluster(posts, cluster.id)
		.filter((p) => p.id !== post.id && p.id !== hub?.id && p.id !== pillar?.id)
		.sort((a, b) => priority(a) - priority(b))
		.slice(0, isLeader ? undefined : 4);

	const hubs =
		post.data.role === 'pillar'
			? CLUSTERS.filter((c) => c.hub !== PILLAR_SLUG)
					.map((c) => bySlug(c.hub))
					.filter((p): p is Post => Boolean(p))
			: [];

	return { pillar, hub, siblings, hubs };
}

// ---------------------------------------------------------------------------
// Build-time validation
// ---------------------------------------------------------------------------

let validated = false;

const INTERNAL_LINK =
	/\]\((\/[^)\s#?]*)[^)]*\)|href=["'](\/[^"'#?]*)[^"']*["']/g;

/** Root-relative internal links in a Markdown body, trailing slash removed. */
export function internalLinks(body = ''): string[] {
	const links: string[] = [];
	for (const match of body.matchAll(INTERNAL_LINK)) {
		const path = (match[1] ?? match[2] ?? '').replace(/\/+$/, '') || '/';
		links.push(path);
	}
	return links;
}

function checkRegistry(errors: string[]): void {
	const seen = new Map<string, string>();
	const claim = (keyword: string, owner: string) => {
		const key = normalizeKeyword(keyword);
		const prior = seen.get(key);
		if (prior && prior !== owner) {
			errors.push(`Keyword "${keyword}" is mapped to both ${prior} and ${owner} (cannibalisation).`);
		}
		seen.set(key, owner);
	};

	const slugs = new Set<string>();
	for (const entry of KEYWORD_MAP) {
		if (slugs.has(entry.slug)) errors.push(`Slug "${entry.slug}" appears twice in KEYWORD_MAP.`);
		slugs.add(entry.slug);
		for (const k of [entry.keyword, ...entry.variants]) claim(k, postUrl(entry.slug));
	}
	for (const reserved of RESERVED_KEYWORDS) {
		for (const k of reserved.keywords) claim(k, reserved.owner);
	}

	for (const cluster of CLUSTERS) {
		const hub = KEYWORD_MAP.find((k) => k.slug === cluster.hub);
		if (!hub || hub.cluster !== cluster.id || hub.role === 'spoke') {
			errors.push(`Cluster "${cluster.id}" hub "${cluster.hub}" must be a hub/pillar row of that cluster in KEYWORD_MAP.`);
		}
	}
	if (KEYWORD_MAP.filter((k) => k.role === 'pillar').length !== 1) {
		errors.push('KEYWORD_MAP must contain exactly one pillar.');
	}
}

function checkPost(
	post: Post,
	entry: KeywordEntry | undefined,
	posts: Post[],
	errors: string[],
	warnings: string[],
): void {
	const at = `src/content/blog/${post.id}.md`;
	const d = post.data;

	if (!entry) {
		errors.push(`${at}: slug "${post.id}" is not in KEYWORD_MAP. Add the row to src/data/blog-strategy.ts first.`);
		return;
	}
	if (d.cluster !== entry.cluster) errors.push(`${at}: cluster "${d.cluster}" ≠ keyword map "${entry.cluster}".`);
	if (d.role !== entry.role) errors.push(`${at}: role "${d.role}" ≠ keyword map "${entry.role}".`);
	if (normalizeKeyword(d.primaryKeyword) !== normalizeKeyword(entry.keyword)) {
		errors.push(`${at}: primaryKeyword "${d.primaryKeyword}" ≠ keyword map "${entry.keyword}".`);
	}

	const body = post.body ?? '';
	if (/^#\s/m.test(body)) errors.push(`${at}: body contains an H1 (#). The title is the only H1.`);
	if (/^#{2,3}\s+(faq|frequently asked)/im.test(body)) {
		warnings.push(`${at}: body has its own FAQ heading. FAQs come from frontmatter \`faq\`; remove the body copy.`);
	}

	const words = wordCount(body);
	const min = CONTENT_RULES.minWords[d.role];
	if (words < min) warnings.push(`${at}: ${words} words, below the ${d.role} minimum of ${min}.`);

	// --- links ---------------------------------------------------------------
	const staticRoutes = new Set(['/', BLOG_PATH, ...navLinks.map((l) => l.href), ...moreLinks.map((l) => l.href)]);
	const links = internalLinks(body);
	const cluster = getCluster(d.cluster);
	const published = new Set(posts.map((p) => p.id));

	for (const link of links) {
		if (link.startsWith(`${BLOG_PATH}/topic/`)) {
			const id = link.split('/')[3];
			if (!posts.some((p) => p.data.cluster === id)) errors.push(`${at}: links to empty or unknown topic ${link}.`);
			continue;
		}
		if (link.startsWith(`${BLOG_PATH}/`)) {
			const slug = link.slice(BLOG_PATH.length + 1);
			if (!published.has(slug)) {
				errors.push(`${at}: links to ${link}, which is not published. Link only to live posts.`);
				continue;
			}
			const target = posts.find((p) => p.id === slug)!;
			const crossCluster = target.data.cluster !== d.cluster && slug !== PILLAR_SLUG;
			const isHubLink = slug === getCluster(target.data.cluster).hub;
			if (crossCluster && d.role === 'spoke' && !cluster.bridges.includes(target.data.cluster as ClusterId) && !isHubLink) {
				warnings.push(`${at}: links to ${link} in "${target.data.cluster}", which is not a bridge cluster of "${d.cluster}".`);
			}
			continue;
		}
		if (!staticRoutes.has(link) && !link.startsWith('/_')) {
			errors.push(`${at}: links to ${link}, which is not a page on this site.`);
		}
	}

	const linksTo = (path: string) => links.includes(path);
	if (d.role !== 'pillar' && published.has(PILLAR_SLUG) && !linksTo(postUrl(PILLAR_SLUG))) {
		warnings.push(`${at}: missing the upward link to the pillar ${postUrl(PILLAR_SLUG)}.`);
	}
	if (d.role === 'spoke' && cluster.hub !== PILLAR_SLUG && published.has(cluster.hub) && !linksTo(postUrl(cluster.hub))) {
		warnings.push(`${at}: missing the upward link to its hub ${postUrl(cluster.hub)}.`);
	}
	if (d.role === 'pillar') {
		for (const c of CLUSTERS) {
			if (c.hub !== PILLAR_SLUG && published.has(c.hub) && !linksTo(postUrl(c.hub))) {
				warnings.push(`${at}: pillar does not link down to the "${c.id}" hub ${postUrl(c.hub)}.`);
			}
		}
	}
	if ((d.intent === 'commercial' || d.intent === 'transactional') && !linksTo('/pricing')) {
		warnings.push(`${at}: ${d.intent} article without a /pricing link.`);
	}
	if (links.length > CONTENT_RULES.maxInternalLinks) {
		warnings.push(`${at}: ${links.length} internal links; the cap is ${CONTENT_RULES.maxInternalLinks}.`);
	}
}

/**
 * Enforces the strategy on every build and dev start. Errors stop the build
 * (wrong cluster, unmapped slug, duplicate keyword, broken link); warnings
 * flag linking-contract and length gaps without blocking a publish.
 */
export function validateBlog(posts: Post[]): void {
	if (validated) return;
	validated = true;

	const errors: string[] = [];
	const warnings: string[] = [];
	checkRegistry(errors);

	for (const post of posts) {
		checkPost(post, KEYWORD_MAP.find((k) => k.slug === post.id), posts, errors, warnings);
	}

	for (const cluster of CLUSTERS) {
		if (!cluster.maxShare || posts.length < 10) continue;
		const share = postsInCluster(posts, cluster.id).length / posts.length;
		if (share > cluster.maxShare) {
			warnings.push(`Cluster "${cluster.id}" holds ${Math.round(share * 100)}% of posts (cap ${cluster.maxShare * 100}%). Publish in other clusters.`);
		}
	}

	for (const w of warnings) console.warn(`[blog] warning: ${w}`);
	if (errors.length) {
		throw new Error(`[blog] ${errors.length} strategy error(s):\n- ${errors.join('\n- ')}`);
	}
}

// ---------------------------------------------------------------------------
// German translations
// ---------------------------------------------------------------------------

let validatedDe = false;

/**
 * German posts are translations, so the keyword strategy is enforced on the
 * English originals. Here: every German slug must match an English post with
 * the same cluster and role, and internal links must stay inside the German
 * site (/de/…) and point at pages that exist.
 */
export function validateBlogDe(posts: Post[], english: Post[]): void {
	if (validatedDe) return;
	validatedDe = true;

	const errors: string[] = [];
	const warnings: string[] = [];
	const published = new Set(posts.map((p) => p.id));
	const staticRoutes = new Set(TRANSLATED_PATHS.map((p) => (p === '/' ? '/de' : `/de${p}`)));
	const DE_BLOG = blogPath('de');

	for (const post of posts) {
		const at = `src/content/blog-de/${post.id}.md`;
		const original = english.find((p) => p.id === post.id);
		if (!original) {
			errors.push(`${at}: no English post with slug "${post.id}". German posts must translate an existing article.`);
			continue;
		}
		if (post.data.cluster !== original.data.cluster) errors.push(`${at}: cluster "${post.data.cluster}" ≠ English "${original.data.cluster}".`);
		if (post.data.role !== original.data.role) errors.push(`${at}: role "${post.data.role}" ≠ English "${original.data.role}".`);
		if (/^#\s/m.test(post.body ?? '')) errors.push(`${at}: body contains an H1 (#). The title is the only H1.`);

		for (const link of internalLinks(post.body)) {
			if (link.startsWith(`${DE_BLOG}/topic/`)) {
				const id = link.split('/')[4];
				if (!posts.some((p) => p.data.cluster === id)) errors.push(`${at}: links to empty or unknown topic ${link}.`);
			} else if (link.startsWith(`${DE_BLOG}/`)) {
				if (!published.has(link.slice(DE_BLOG.length + 1))) errors.push(`${at}: links to ${link}, which has no German version.`);
			} else if (link === DE_BLOG || staticRoutes.has(link)) {
				// fine
			} else if (link.startsWith('/de')) {
				errors.push(`${at}: links to ${link}, which is not a page on the German site.`);
			} else if (!link.startsWith('/_')) {
				warnings.push(`${at}: links to the English page ${link}; use the /de version.`);
			}
		}
	}

	for (const original of english) {
		if (!published.has(original.id)) warnings.push(`src/content/blog/${original.id}.md has no German translation yet (src/content/blog-de/${original.id}.md).`);
	}

	for (const w of warnings) console.warn(`[blog] warning: ${w}`);
	if (errors.length) {
		throw new Error(`[blog] ${errors.length} German blog error(s):\n- ${errors.join('\n- ')}`);
	}
}
