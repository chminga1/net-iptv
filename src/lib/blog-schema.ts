import { site } from '../data/site';
import type { Author } from '../data/blog-strategy';
import type { Post } from './blog';

/** JSON-LD builders for blog pages. Every URL is absolute against `origin`. */

export interface Crumb {
	readonly name: string;
	readonly path: string;
}

const abs = (path: string, origin: URL): string => new URL(path, origin).href;

export const organization = (origin: URL) => ({
	'@type': 'Organization',
	name: site.name,
	url: abs('/', origin),
	logo: abs('/favicon.svg', origin),
});

export const breadcrumbSchema = (crumbs: readonly Crumb[], origin: URL) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: crumbs.map((crumb, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: crumb.name,
		item: abs(crumb.path, origin),
	})),
});

export const blogPostingSchema = (
	post: Post,
	path: string,
	author: Author,
	origin: URL,
	image?: string,
) => ({
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: post.data.title,
	description: post.data.description,
	datePublished: post.data.publishDate.toISOString(),
	dateModified: (post.data.updateDate ?? post.data.publishDate).toISOString(),
	author: { '@type': 'Organization', name: author.name, url: abs('/', origin) },
	publisher: organization(origin),
	mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path, origin) },
	keywords: [post.data.primaryKeyword, ...post.data.secondaryKeywords].join(', '),
	inLanguage: 'en',
	...(image ? { image } : {}),
});

export const faqSchema = (faq: Post['data']['faq']) => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faq.map(({ q, a }) => ({
		'@type': 'Question',
		name: q,
		acceptedAnswer: { '@type': 'Answer', text: a },
	})),
});

export const howToSchema = (howto: NonNullable<Post['data']['howto']>) => ({
	'@context': 'https://schema.org',
	'@type': 'HowTo',
	name: howto.name,
	...(howto.totalTime ? { totalTime: howto.totalTime } : {}),
	...(howto.tools.length
		? { tool: howto.tools.map((name) => ({ '@type': 'HowToTool', name })) }
		: {}),
	step: howto.steps.map((step, i) => ({
		'@type': 'HowToStep',
		position: i + 1,
		name: step.name,
		text: step.text,
	})),
});
