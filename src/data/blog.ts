import type { ImageMetadata } from 'astro';

/**
 * Shared post list: the /blog page renders all of these, the home page teaser
 * renders the first few. One source so the two cannot drift apart.
 */
export interface BlogPost {
	readonly category: string;
	readonly title: string;
	readonly excerpt: string;
	readonly readingTime: string;
	/**
	 * Article artwork. Drop a file in src/assets/blog/ and import it here;
	 * until then each row shows an empty image slot of the same size, so the
	 * layout does not shift when the real picture arrives.
	 */
	readonly image?: ImageMetadata;
}

// Placeholder editorial plan. When the real posts land, move this to a content
// collection (src/content/blog/) and swap the map below for getCollection().
export const posts: readonly BlogPost[] = [
	{
		category: 'Guides',
		title: 'How to install IPTV on a Fire Stick in 2026',
		excerpt:
			'A walkthrough of sideloading, player choice and the settings that stop buffering before it starts.',
		readingTime: '6 min read',
	},
	{
		category: 'Comparisons',
		title: 'IPTV vs cable: what you actually save in a year',
		excerpt:
			'We price out a typical household across both, including the fees cable providers keep off the headline rate.',
		readingTime: '8 min read',
	},
	{
		category: 'Troubleshooting',
		title: 'Fixing buffering on a slow connection',
		excerpt:
			'Bitrate, DNS, Wi-Fi band and player buffer size — the four settings worth changing, in order.',
		readingTime: '5 min read',
	},
	{
		category: 'Sports',
		title: 'Every league you can follow this season',
		excerpt:
			'NFL, NBA, MLB, NHL and MLS coverage mapped against the channels carrying each fixture.',
		readingTime: '7 min read',
	},
	{
		category: 'News',
		title: 'What 4K streaming means for your home internet',
		excerpt:
			'Bandwidth requirements explained without the jargon, plus how adaptive bitrate protects the picture.',
		readingTime: '4 min read',
	},
	{
		category: 'Guides',
		title: 'Setting up a second device the right way',
		excerpt:
			'Simultaneous connections, household sharing and the mistakes that trigger an account lock.',
		readingTime: '5 min read',
	},
];

/** How many posts the home-page teaser shows. */
export const HOME_POST_COUNT = 3;
