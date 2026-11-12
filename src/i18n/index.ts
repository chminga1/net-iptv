/**
 * Locale helpers. English is the default and lives at the root (/pricing);
 * German lives under /de (/de/pricing, /de/blog/<slug>). A blog post or topic
 * counts as translated only when src/content/blog-de/ has it.
 */
import { de } from './de';
import { en } from './en';

export const LOCALES = ['en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Routes that exist in every locale. Anything else is English-only. */
export const TRANSLATED_PATHS: readonly string[] = [
	'/',
	'/features',
	'/pricing',
	'/faq',
	'/devices',
	'/contact',
	'/terms',
	'/privacy',
];

const dictionaries = { en, de } as const;

/** German post slugs and their clusters, read from the files at build time. */
const germanPosts = Object.entries(
	import.meta.glob<string>('../content/blog-de/*.md', { query: '?raw', import: 'default', eager: true }),
)
	.filter(([, raw]) => !/^draft:\s*true\s*$/m.test(raw) || import.meta.env.DEV)
	.map(([file, raw]) => ({
		slug: file.split('/').pop()!.replace(/\.md$/, ''),
		cluster: raw.match(/^cluster:\s*["']?([\w-]+)/m)?.[1],
	}));

/** True when `path` (unprefixed, no hash) exists in German. */
const hasGerman = (path: string): boolean => {
	if (TRANSLATED_PATHS.includes(path) || path === '/blog') return true;
	const topic = path.match(/^\/blog\/topic\/([\w-]+)$/);
	if (topic) return germanPosts.some((p) => p.cluster === topic[1]);
	const post = path.match(/^\/blog\/([\w-]+)$/);
	return Boolean(post && germanPosts.some((p) => p.slug === post[1]));
};

export const getLocale = (value: string | undefined): Locale =>
	value === 'de' ? 'de' : 'en';

export const useTranslations = (locale: string | undefined) =>
	dictionaries[getLocale(locale)];

/** /de/pricing/ → /pricing, /de → /, /faq/ → /faq */
export const basePath = (pathname: string): string => {
	const clean = pathname.replace(/(.)\/+$/, '$1');
	if (clean === '/de') return '/';
	return clean.startsWith('/de/') ? clean.slice(3) : clean;
};

/** Prefixes an internal link for the given locale. External links, anchors and untranslated routes pass through. */
export const localizePath = (href: string, locale: string | undefined): string => {
	if (getLocale(locale) === DEFAULT_LOCALE || !href.startsWith('/')) return href;
	const hashAt = href.indexOf('#');
	const path = hashAt === -1 ? href : href.slice(0, hashAt);
	const hash = hashAt === -1 ? '' : href.slice(hashAt);
	if (!hasGerman(path)) return href;
	return `/de${path === '/' ? '' : path}${hash}`;
};

/**
 * Where the language switch should go from the current page: the same page in
 * the other language when it exists, otherwise that language's home page.
 */
export const switchPath = (pathname: string, target: Locale): string => {
	const base = basePath(pathname);
	if (!hasGerman(base)) return target === 'de' ? '/de' : '/';
	return target === 'de' ? localizePath(base, 'de') : base;
};

/** True when the current page also exists in the other language. */
export const isTranslated = (pathname: string): boolean => hasGerman(basePath(pathname));
