import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { AUTHORS, CLUSTERS } from './data/blog-strategy';

const clusterIds = CLUSTERS.map((c) => c.id) as [string, ...string[]];
const authorIds = AUTHORS.map((a) => a.id) as [string, ...string[]];

/**
 * Blog articles: one Markdown file per post in src/content/blog/<slug>.md.
 * The filename is the slug and must exist in KEYWORD_MAP
 * (src/data/blog-strategy.ts); src/lib/blog.ts checks that at build time.
 * Field-by-field guidance lives in docs/blog/ARTICLE_SPEC.md.
 */
const blog = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			/** The H1. Contains the primary keyword. */
			title: z.string().max(90),
			/** <title> tag, when it should differ from the H1. Brand is appended. */
			seoTitle: z.string().max(60).optional(),
			/** Meta description: keyword in the first 10 words. */
			description: z.string().min(70).max(160),
			/** Card text on /blog and the home page. Defaults to `description`. */
			excerpt: z.string().max(200).optional(),

			publishDate: z.coerce.date(),
			updateDate: z.coerce.date().optional(),
			/** Drafts render in `astro dev` only. */
			draft: z.boolean().default(false),
			author: z.enum(authorIds).default('editorial'),

			cluster: z.enum(clusterIds),
			role: z.enum(['pillar', 'hub', 'spoke']),
			intent: z.enum(['informational', 'commercial', 'transactional', 'howto']),
			primaryKeyword: z.string(),
			secondaryKeywords: z.array(z.string()).default([]),

			/** 16:9 artwork in src/assets/blog/. Optional until art exists. */
			cover: image().optional(),
			coverAlt: z.string().optional(),

			/** Rendered as the "Key takeaways" box above the body. */
			keyTakeaways: z.array(z.string()).min(3).max(5),

			/** Rendered as the visible FAQ section and the FAQPage schema. */
			faq: z
				.array(z.object({ q: z.string(), a: z.string() }))
				.min(6),

			/** Setup guides only: emits HowTo schema mirroring the body steps. */
			howto: z
				.object({
					name: z.string(),
					totalTime: z.string().optional(),
					tools: z.array(z.string()).default([]),
					steps: z.array(z.object({ name: z.string(), text: z.string() })).min(2),
				})
				.optional(),
		}),
});

export const collections = { blog };
