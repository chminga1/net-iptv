import type { Element } from 'hast';
import type { HastPluginEntry, HastVisitorContext } from 'satteri';
import { whatsappLink } from '../data/site';

/**
 * Sätteri hast plugin that injects mid-article calls to action into blog
 * posts at build time, so writers never paste button HTML into Markdown and
 * every post converts the same way. Placement follows the article's own H2
 * rhythm:
 *
 *   5+ H2s  → before the 2nd H2, at ~45 % and at ~75 % of the sections
 *   2–4 H2s → before the 2nd H2 only
 *
 * The closing CTA is rendered by the post page, not here.
 */

interface CtaVariant {
	readonly label: string;
	readonly note: string;
	readonly href: string;
	readonly external: boolean;
}

const VARIANTS: readonly CtaVariant[] = [
	{
		label: 'Get a free trial on WhatsApp',
		note: 'No card needed · Activated in minutes',
		href: whatsappLink("Hi! I'd like a free IPTV trial."),
		external: true,
	},
	{
		label: 'Ask us anything on WhatsApp',
		note: 'Real people, 24/7 · Replies in minutes',
		href: whatsappLink('Hi! I have a question about your IPTV service.'),
		external: true,
	},
	{
		label: 'Compare plans and prices',
		note: '1, 3, 6 or 12 months · 7-day money-back guarantee',
		href: '/pricing',
		external: false,
	},
];

/* Mirrors src/components/ui/Button.astro (trial variant, size lg): every
   in-article CTA uses the green trial style so they read as one action. */
const BASE =
	'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold no-underline transition-all duration-200 ease-out hover:-translate-y-0.5';
const TRIAL = 'neon-green bg-trial-fill text-trial-on-fill hover:brightness-110';

const ctaNode = (variant: CtaVariant): Element => ({
	type: 'element',
	tagName: 'aside',
	properties: { className: ['not-prose', 'blog-cta', 'my-12', 'text-center'] },
	children: [
		{
			type: 'element',
			tagName: 'a',
			properties: {
				href: variant.href,
				className: [BASE, TRIAL],
				...(variant.external ? { target: '_blank', rel: ['noopener', 'noreferrer'] } : {}),
			},
			children: [{ type: 'text', value: variant.label }],
		},
		{
			type: 'element',
			tagName: 'p',
			properties: { className: ['mt-3', 'text-sm', 'text-fg-subtle'] },
			children: [{ type: 'text', value: variant.note }],
		},
	],
});

/** Indexes (into the list of top-level H2s) that get a CTA before them. */
export function ctaSlots(h2Count: number): number[] {
	const n = h2Count;
	const targets = n >= 5 ? [1, Math.floor(n * 0.45), Math.floor(n * 0.75)] : n >= 2 ? [1] : [];
	return [...new Set(targets.map((t) => Math.min(Math.max(t, 1), n - 1)))];
}

export const blogCtaPlugin: HastPluginEntry = ({ fileURL }) => {
	if (!fileURL?.pathname.includes('/src/content/blog/')) return null;
	return {
		name: 'net-iptv-blog-cta',
		after(root, ctx: HastVisitorContext) {
			const h2s = root.children.filter(
				(node): node is Element => node.type === 'element' && node.tagName === 'h2',
			);
			ctaSlots(h2s.length).forEach((slot, variant) => {
				ctx.insertBefore(h2s[slot], ctaNode(VARIANTS[variant]));
			});
		},
	};
};
