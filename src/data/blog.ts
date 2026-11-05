import type { ImageMetadata } from 'astro';

/**
 * Card shape shared by the /blog list, the topic pages and the home-page
 * teaser. Real posts are mapped into it by `toCard()` in src/lib/blog.ts.
 */
export interface BlogPost {
	readonly category: string;
	readonly title: string;
	readonly excerpt: string;
	readonly readingTime: string;
	/** Link to the article. Placeholders have none and show "Coming soon". */
	readonly href?: string;
	/**
	 * Article artwork. Set `cover` in the post frontmatter; until then each
	 * row shows an empty image slot of the same size, so the layout does not
	 * shift when the real picture arrives.
	 */
	readonly image?: ImageMetadata;
}

/**
 * Shown only while no article is published, so /blog and the home page are
 * never empty. They disappear automatically with the first real post.
 */
export const placeholderPosts: readonly BlogPost[] = [
	{
		category: 'Devices & Setup',
		title: 'How to install IPTV on a Fire Stick in 2026',
		excerpt:
			'A walkthrough of sideloading, player choice and the settings that stop buffering before it starts.',
		readingTime: '6 min read',
	},
	{
		category: 'Best IPTV & Comparisons',
		title: 'IPTV vs cable: what you actually save in a year',
		excerpt:
			'We price out a typical household across both, including the fees cable providers keep off the headline rate.',
		readingTime: '8 min read',
	},
	{
		category: 'Fixes & Troubleshooting',
		title: 'Fixing buffering on a slow connection',
		excerpt:
			'Bitrate, DNS, Wi-Fi band and player buffer size — the four settings worth changing, in order.',
		readingTime: '5 min read',
	},
	{
		category: 'Sports on IPTV',
		title: 'Every league you can follow this season',
		excerpt:
			'NFL, NBA, MLB, NHL and MLS coverage mapped against the channels carrying each fixture.',
		readingTime: '7 min read',
	},
	{
		category: 'IPTV Basics',
		title: 'What 4K streaming means for your home internet',
		excerpt:
			'Bandwidth requirements explained without the jargon, plus how adaptive bitrate protects the picture.',
		readingTime: '4 min read',
	},
	{
		category: 'Devices & Setup',
		title: 'Setting up a second device the right way',
		excerpt:
			'Simultaneous connections, household sharing and the mistakes that trigger an account lock.',
		readingTime: '5 min read',
	},
];

/** How many posts the home-page teaser shows. */
export const HOME_POST_COUNT = 3;
