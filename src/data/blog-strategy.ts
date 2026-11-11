/**
 * Blog strategy registry — the single source of truth for the pillar/cluster
 * architecture and the keyword map.
 *
 * Everything else reads from here:
 *  - src/content.config.ts   validates each post's `cluster` / `role` / `author`
 *  - src/lib/blog.ts          validates posts against the keyword map at build,
 *                             builds breadcrumbs, related guides and hub lists
 *  - scripts/blog.ts          `npm run blog -- find|status|next`
 *
 * Rules (full rationale in docs/blog/STRATEGY.md):
 *  - One keyword → one URL. A keyword (or any of its variants) may appear in
 *    this file exactly once; the build fails on a duplicate.
 *  - A post can only be published if its slug is listed in KEYWORD_MAP with
 *    the same cluster, role and primary keyword. Add the row first.
 *  - Money pages (home, pricing…) own their commercial terms in
 *    RESERVED_KEYWORDS. The blog never targets those.
 *
 * Keep this file free of imports and non-erasable TypeScript (no enums), so
 * `node scripts/blog.ts` can load it directly with Node's type stripping.
 */

export type ClusterId =
	| 'fundamentals'
	| 'compare'
	| 'free-trial'
	| 'sports'
	| 'watch-abroad'
	| 'devices'
	| 'apps-players'
	| 'playlists-m3u'
	| 'troubleshooting';

export type PostRole = 'pillar' | 'hub' | 'spoke';

/**
 * informational — wants to learn ("what is", "how does", "is it legal")
 * commercial    — comparing options before buying ("best", "vs", "review")
 * transactional — ready to act ("free trial", "buy", "watch X abroad")
 * howto         — wants step-by-step setup or a fix
 */
export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'howto';

export interface Cluster {
	readonly id: ClusterId;
	/** Display name, used on the topic page, breadcrumbs and badges. */
	readonly name: string;
	/** One-line promise of the topic page. */
	readonly description: string;
	/**
	 * Publishing weight. 2 = money cluster (converts), 1 = technical/support
	 * cluster. The `next` command rotates new articles by this weight.
	 */
	readonly weight: 1 | 2;
	/**
	 * Hard cap on the share of all published posts this cluster may hold.
	 * Stops one easy-to-write topic (apps) from bloating the blog.
	 */
	readonly maxShare?: number;
	/** Slug of the hub article that leads this cluster. */
	readonly hub: string;
	/**
	 * Routing signals: modifiers and topics that place a new keyword here.
	 * Used by the writing workflow when classifying a keyword.
	 */
	readonly owns: readonly string[];
	/**
	 * Clusters a post here may link into with a single "bridge" link, because
	 * readers naturally continue there (e.g. a fix guide → the device setup).
	 */
	readonly bridges: readonly ClusterId[];
}

export interface KeywordEntry {
	/** URL slug → /blog/<slug>. Short, keyword-led, no year. */
	readonly slug: string;
	/** The single query this URL is built to rank for. */
	readonly keyword: string;
	/**
	 * Close variants this same URL must absorb. Listing them here is what
	 * stops a second, cannibalising article from being planned later.
	 */
	readonly variants: readonly string[];
	readonly cluster: ClusterId;
	readonly role: PostRole;
	readonly intent: SearchIntent;
	/** 1 = write first, 3 = later. Combined with cluster weight by `next`. */
	readonly priority: 1 | 2 | 3;
}

export interface ReservedKeyword {
	/** Static route that owns these queries. */
	readonly owner: string;
	readonly keywords: readonly string[];
}

export interface Author {
	readonly id: string;
	readonly name: string;
	readonly role: string;
	readonly bio: string;
}

// ---------------------------------------------------------------------------
// Pillar
// ---------------------------------------------------------------------------

/**
 * The main pillar. It is also the hub of the `fundamentals` cluster, links
 * down to every cluster hub, and every other post links up to it.
 */
export const PILLAR_SLUG = 'iptv-guide';

// ---------------------------------------------------------------------------
// Clusters
// ---------------------------------------------------------------------------

export const CLUSTERS: readonly Cluster[] = [
	{
		id: 'fundamentals',
		name: 'IPTV Basics',
		description:
			'What IPTV is, how it works, what you need at home and the rules around it.',
		weight: 1,
		hub: PILLAR_SLUG,
		owns: [
			'what is / how does / meaning / explained',
			'legality, safety, VPN',
			'internet speed, bandwidth, data usage',
			'connections, catch-up, EPG as a concept, glossary',
		],
		bridges: ['devices', 'compare'],
	},
	{
		id: 'compare',
		name: 'Best IPTV & Comparisons',
		description:
			'Independent comparisons that help you pick a service — and avoid the bad ones.',
		weight: 2,
		hub: 'best-iptv-service',
		owns: [
			'best / top / review / legit / reddit (about services, not apps)',
			'IPTV vs another way of watching TV (cable, satellite, streaming apps)',
			'cheap, premium, 4K/8K quality as a buying criterion',
			'how to choose a provider, scams to avoid',
		],
		bridges: ['free-trial', 'sports'],
	},
	{
		id: 'free-trial',
		name: 'Free Trials & Free IPTV',
		description:
			'How to test a service before paying, and what “free IPTV” really costs you.',
		weight: 2,
		hub: 'iptv-free-trial',
		owns: [
			'free trial, test, 24h/48h trial, no credit card',
			'anything with the modifier “free” (free iptv, free m3u, free apps)',
		],
		bridges: ['compare', 'playlists-m3u'],
	},
	{
		id: 'sports',
		name: 'Sports on IPTV',
		description:
			'Every league, fight night and race — what is covered and how to watch it live.',
		weight: 2,
		hub: 'iptv-for-sports',
		owns: [
			'a league, competition, team, sport or event + iptv',
			'PPV, fight nights, season passes and their alternatives',
		],
		bridges: ['compare', 'troubleshooting'],
	},
	{
		id: 'watch-abroad',
		name: 'Watch TV Abroad',
		description:
			'For expats and travellers: your home channels, in your language, wherever you live.',
		weight: 2,
		hub: 'watch-tv-abroad',
		owns: [
			'watch <country> tv abroad / outside <country>',
			'<language> tv in <country>, expat tv',
			'language or diaspora channel packs (arabic iptv, indian iptv…)',
		],
		bridges: ['fundamentals', 'devices'],
	},
	{
		id: 'devices',
		name: 'Devices & Setup',
		description:
			'Step-by-step setup guides for every screen in the house.',
		weight: 1,
		hub: 'how-to-set-up-iptv',
		owns: [
			'iptv on / install iptv on / set up iptv on <device>',
			'device brands and OS: Fire TV, Samsung, LG, Android TV, Apple TV, iOS, Windows, MAG, Roku',
		],
		bridges: ['apps-players', 'troubleshooting'],
	},
	{
		id: 'apps-players',
		name: 'Apps & Players',
		description:
			'Which player app to use, how to configure it and how the popular ones compare.',
		weight: 1,
		// Lesson from earlier sites: app posts are easy to write and convert
		// worst, so they grew to a third of the blog. Cap them.
		maxShare: 0.2,
		hub: 'best-iptv-player',
		owns: [
			'a named player app (Smarters, TiviMate, OTT Navigator, XCIPTV, VLC, Kodi)',
			'best iptv app/player (+ for <device>) — app intent beats device intent',
			'app vs app comparisons',
		],
		bridges: ['devices', 'playlists-m3u'],
	},
	{
		id: 'playlists-m3u',
		name: 'Playlists, M3U & Xtream',
		description:
			'M3U links, Xtream Codes logins and EPG sources, explained and set up properly.',
		weight: 1,
		hub: 'm3u-playlist',
		owns: [
			'm3u, m3u8, playlist, list, xtream codes, portal URL',
			'EPG / XMLTV source setup',
		],
		bridges: ['apps-players', 'troubleshooting'],
	},
	{
		id: 'troubleshooting',
		name: 'Fixes & Troubleshooting',
		description:
			'Buffering, frozen channels, missing guide data and login errors — fixed in order.',
		weight: 1,
		hub: 'iptv-not-working',
		owns: [
			'not working, buffering, freezing, lag, black screen, no sound',
			'error messages, login/authorization failed, ISP blocking',
			'anything “not loading / not showing”',
		],
		bridges: ['devices', 'apps-players'],
	},
];

// ---------------------------------------------------------------------------
// Keyword map — every planned and published article
// ---------------------------------------------------------------------------

export const KEYWORD_MAP: readonly KeywordEntry[] = [
	// --- Pillar / IPTV Basics -------------------------------------------------
	{
		slug: PILLAR_SLUG,
		keyword: 'what is iptv',
		variants: ['iptv explained', 'iptv guide', 'iptv meaning', 'what does iptv stand for', 'iptv'],
		cluster: 'fundamentals',
		role: 'pillar',
		intent: 'informational',
		priority: 1,
	},
	{
		slug: 'how-does-iptv-work',
		keyword: 'how does iptv work',
		variants: ['iptv technology', 'how iptv streaming works'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 2,
	},
	{
		slug: 'is-iptv-legal',
		keyword: 'is iptv legal',
		variants: ['iptv legality', 'legal iptv', 'is iptv safe'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 1,
	},
	{
		slug: 'iptv-internet-speed',
		keyword: 'internet speed for iptv',
		variants: ['iptv bandwidth requirements', 'how many mbps for iptv', 'iptv data usage'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 2,
	},
	{
		slug: 'vpn-for-iptv',
		keyword: 'do you need a vpn for iptv',
		variants: ['iptv vpn', 'best vpn for iptv'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 2,
	},
	{
		slug: 'iptv-connections',
		keyword: 'iptv connections explained',
		variants: ['iptv multi screen', 'how many devices iptv', 'iptv simultaneous connections'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 3,
	},
	{
		slug: 'iptv-catch-up',
		keyword: 'iptv catch up',
		variants: ['catch up tv iptv', 'iptv timeshift'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 3,
	},
	{
		slug: 'iptv-glossary',
		keyword: 'iptv glossary',
		variants: ['iptv terms explained', 'iptv terminology'],
		cluster: 'fundamentals',
		role: 'spoke',
		intent: 'informational',
		priority: 3,
	},

	// --- Best IPTV & Comparisons (money) -----------------------------------
	{
		slug: 'best-iptv-service',
		keyword: 'best iptv service',
		variants: ['best iptv', 'best iptv provider', 'top iptv providers', 'best iptv subscription'],
		cluster: 'compare',
		role: 'hub',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'iptv-vs-cable',
		keyword: 'iptv vs cable',
		variants: ['iptv vs cable tv', 'cable vs iptv', 'iptv vs cable cost'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'iptv-vs-satellite',
		keyword: 'iptv vs satellite',
		variants: ['satellite vs iptv', 'iptv vs satellite tv'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 3,
	},
	{
		slug: 'iptv-vs-streaming-services',
		keyword: 'iptv vs streaming services',
		variants: ['iptv vs youtube tv', 'iptv vs sling', 'iptv vs netflix'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'cheap-iptv',
		keyword: 'cheap iptv',
		variants: ['affordable iptv', 'budget iptv', 'cheapest iptv'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: '4k-iptv',
		keyword: '4k iptv',
		variants: ['best 4k iptv', 'iptv 4k uhd', '8k iptv'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'how-to-choose-iptv-provider',
		keyword: 'how to choose an iptv provider',
		variants: ['reliable iptv provider', 'iptv scams', 'iptv provider checklist'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'best-iptv-reddit',
		keyword: 'best iptv reddit',
		variants: ['iptv reddit', 'iptv recommendations reddit'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'net-iptv-review',
		keyword: 'net iptv review',
		variants: ['is net iptv legit', 'net iptv reviews'],
		cluster: 'compare',
		role: 'spoke',
		intent: 'commercial',
		priority: 3,
	},

	// --- Free Trials & Free IPTV (money) ------------------------------------
	{
		slug: 'iptv-free-trial',
		keyword: 'iptv free trial',
		variants: ['free iptv trial', 'iptv trial', 'iptv test'],
		cluster: 'free-trial',
		role: 'hub',
		intent: 'transactional',
		priority: 1,
	},
	{
		slug: '24-hour-iptv-trial',
		keyword: '24 hour iptv free trial',
		variants: ['24h iptv trial', '48 hour iptv trial', '24 hour iptv trial'],
		cluster: 'free-trial',
		role: 'spoke',
		intent: 'transactional',
		priority: 1,
	},
	{
		slug: 'iptv-trial-no-credit-card',
		keyword: 'iptv free trial no credit card',
		variants: ['iptv trial without payment', 'iptv trial no card'],
		cluster: 'free-trial',
		role: 'spoke',
		intent: 'transactional',
		priority: 2,
	},
	{
		slug: 'free-iptv',
		keyword: 'free iptv',
		variants: ['free iptv service', 'is free iptv worth it', 'free iptv apps'],
		cluster: 'free-trial',
		role: 'spoke',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'free-iptv-m3u',
		keyword: 'free iptv m3u playlist',
		variants: ['free m3u playlist', 'free iptv links', 'free iptv list'],
		cluster: 'free-trial',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},

	// --- Sports on IPTV (money) ---------------------------------------------
	{
		slug: 'iptv-for-sports',
		keyword: 'iptv for sports',
		variants: ['sports iptv', 'best iptv for sports', 'live sports iptv'],
		cluster: 'sports',
		role: 'hub',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'premier-league-iptv',
		keyword: 'premier league iptv',
		variants: ['watch premier league on iptv', 'epl iptv'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'nfl-iptv',
		keyword: 'nfl iptv',
		variants: ['watch nfl on iptv', 'nfl sunday ticket alternative'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'nba-iptv',
		keyword: 'nba iptv',
		variants: ['watch nba on iptv', 'nba league pass alternative'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'champions-league-iptv',
		keyword: 'champions league iptv',
		variants: ['ucl iptv', 'watch champions league on iptv'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'ppv-iptv',
		keyword: 'iptv ppv',
		variants: ['ufc iptv', 'boxing ppv iptv', 'ppv events iptv'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 2,
	},
	{
		slug: 'f1-iptv',
		keyword: 'f1 iptv',
		variants: ['formula 1 iptv', 'watch f1 on iptv'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 3,
	},
	{
		slug: 'cricket-iptv',
		keyword: 'cricket iptv',
		variants: ['watch cricket on iptv', 'ipl iptv'],
		cluster: 'sports',
		role: 'spoke',
		intent: 'commercial',
		priority: 3,
	},

	// --- Watch TV Abroad (money) --------------------------------------------
	{
		slug: 'watch-tv-abroad',
		keyword: 'watch tv from home abroad',
		variants: ['iptv for expats', 'expat tv', 'watch home tv abroad'],
		cluster: 'watch-abroad',
		role: 'hub',
		intent: 'transactional',
		priority: 1,
	},
	{
		slug: 'watch-uk-tv-abroad',
		keyword: 'watch uk tv abroad',
		variants: ['british tv abroad', 'uk tv outside uk', 'uk iptv abroad'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 1,
	},
	{
		slug: 'watch-us-tv-abroad',
		keyword: 'watch american tv abroad',
		variants: ['us tv abroad', 'watch us tv outside the us', 'us iptv abroad'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 1,
	},
	{
		slug: 'english-tv-in-spain',
		keyword: 'english tv in spain',
		variants: ['uk tv in spain', 'iptv spain english channels'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 2,
	},
	{
		slug: 'english-tv-in-france',
		keyword: 'english tv in france',
		variants: ['uk tv in france', 'iptv france english channels'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 3,
	},
	{
		slug: 'english-tv-in-uae',
		keyword: 'english tv in dubai',
		variants: ['iptv uae', 'uk tv in dubai'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 3,
	},
	{
		// Honest country guide for English speakers in Germany: legality,
		// enforcement and licensed options — never a pitch to bypass rights.
		slug: 'iptv-germany',
		keyword: 'iptv germany',
		variants: ['iptv in germany', 'is iptv legal in germany', 'english tv in germany'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'informational',
		priority: 1,
	},
	{
		slug: 'arabic-iptv',
		keyword: 'arabic iptv',
		variants: ['arabic channels iptv', 'arabic tv abroad'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 2,
	},
	{
		slug: 'indian-iptv',
		keyword: 'indian iptv',
		variants: ['hindi iptv', 'indian channels abroad'],
		cluster: 'watch-abroad',
		role: 'spoke',
		intent: 'transactional',
		priority: 3,
	},

	// --- Devices & Setup ------------------------------------------------------
	{
		slug: 'how-to-set-up-iptv',
		keyword: 'how to set up iptv',
		variants: ['iptv setup', 'how to install iptv', 'iptv installation guide'],
		cluster: 'devices',
		role: 'hub',
		intent: 'howto',
		priority: 1,
	},
	{
		// Brand-adjacent setup guide. "net iptv" and "iptv subscription" stay
		// reserved for / and /pricing; this owns the post-purchase how-to intent.
		slug: 'how-to-activate-net-iptv',
		keyword: 'how to activate net iptv',
		variants: ['net iptv setup', 'net iptv activation', 'activate net iptv subscription'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 1,
	},
	{
		slug: 'iptv-on-firestick',
		keyword: 'iptv on firestick',
		variants: ['install iptv on firestick', 'firestick iptv setup', 'fire tv iptv'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 1,
	},
	{
		slug: 'iptv-on-samsung-smart-tv',
		keyword: 'iptv on samsung smart tv',
		variants: ['samsung tv iptv app', 'iptv tizen'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 1,
	},
	{
		slug: 'iptv-on-lg-smart-tv',
		keyword: 'iptv on lg smart tv',
		variants: ['lg tv iptv app', 'iptv webos'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-on-android-tv',
		keyword: 'iptv on android tv box',
		variants: ['android box iptv', 'google tv iptv', 'nvidia shield iptv'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-on-apple-tv',
		keyword: 'iptv on apple tv',
		variants: ['apple tv iptv app', 'tvos iptv'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-on-iphone',
		keyword: 'iptv on iphone',
		variants: ['iptv ios', 'iptv on ipad'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'iptv-on-pc',
		keyword: 'iptv on pc',
		variants: ['iptv on windows', 'iptv on mac', 'iptv on laptop'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'iptv-on-mag-box',
		keyword: 'mag box iptv setup',
		variants: ['mag 524 iptv', 'stalker portal setup'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'iptv-on-roku',
		keyword: 'iptv on roku',
		variants: ['roku iptv app', 'can you get iptv on roku'],
		cluster: 'devices',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},

	// --- Apps & Players (capped at 20 %) ------------------------------------
	{
		slug: 'best-iptv-player',
		keyword: 'best iptv player',
		variants: ['best iptv app', 'iptv player app', 'iptv apps'],
		cluster: 'apps-players',
		role: 'hub',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'best-iptv-app-for-firestick',
		keyword: 'best iptv app for firestick',
		variants: ['firestick iptv app', 'best iptv player for fire tv'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'commercial',
		priority: 1,
	},
	{
		slug: 'iptv-smarters-pro',
		keyword: 'iptv smarters pro',
		variants: ['iptv smarters', 'smarters pro setup', 'iptv smarters player'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'tivimate',
		keyword: 'tivimate',
		variants: ['tivimate setup', 'tivimate premium', 'tivimate iptv player'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-smarters-vs-tivimate',
		keyword: 'iptv smarters vs tivimate',
		variants: ['tivimate vs smarters', 'tivimate vs iptv smarters'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'commercial',
		priority: 3,
	},
	{
		slug: 'ott-navigator',
		keyword: 'ott navigator',
		variants: ['ott navigator setup', 'ott navigator iptv'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'vlc-iptv',
		keyword: 'iptv on vlc',
		variants: ['vlc m3u playlist', 'watch iptv with vlc'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'kodi-iptv',
		keyword: 'kodi iptv',
		variants: ['pvr iptv simple client', 'iptv on kodi'],
		cluster: 'apps-players',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},

	// --- Playlists, M3U & Xtream --------------------------------------------
	{
		slug: 'm3u-playlist',
		keyword: 'iptv m3u playlist',
		// Earlier sites published "iptv playlist" and "playlist iptv" as two
		// competing posts. Every word-order variant lives on this one URL.
		variants: ['m3u playlist', 'iptv playlist', 'playlist iptv', 'm3u iptv', 'iptv list'],
		cluster: 'playlists-m3u',
		role: 'hub',
		intent: 'informational',
		priority: 1,
	},
	{
		slug: 'what-is-m3u',
		keyword: 'what is an m3u file',
		variants: ['m3u file', 'm3u vs m3u8', 'm3u8 file'],
		cluster: 'playlists-m3u',
		role: 'spoke',
		intent: 'informational',
		priority: 2,
	},
	{
		slug: 'xtream-codes',
		keyword: 'xtream codes',
		variants: ['xtream codes api', 'xtream codes login', 'xtream iptv'],
		cluster: 'playlists-m3u',
		role: 'spoke',
		intent: 'informational',
		priority: 2,
	},
	{
		slug: 'how-to-add-m3u-playlist',
		keyword: 'how to add m3u playlist',
		variants: ['load m3u url', 'add iptv playlist', 'upload m3u playlist'],
		cluster: 'playlists-m3u',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-epg',
		keyword: 'iptv epg',
		variants: ['epg url', 'xmltv epg', 'iptv tv guide'],
		cluster: 'playlists-m3u',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},

	// --- Fixes & Troubleshooting ----------------------------------------------
	{
		slug: 'iptv-not-working',
		keyword: 'iptv not working',
		variants: ['iptv problems', 'iptv troubleshooting', 'iptv down'],
		cluster: 'troubleshooting',
		role: 'hub',
		intent: 'howto',
		priority: 1,
	},
	{
		slug: 'iptv-buffering',
		keyword: 'iptv buffering',
		variants: ['iptv freezing', 'iptv lagging', 'fix iptv buffering'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 1,
	},
	{
		slug: 'epg-not-showing',
		keyword: 'iptv epg not showing',
		variants: ['tv guide not loading', 'epg not updating'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-login-failed',
		keyword: 'iptv authorization failed',
		variants: ['iptv login failed', 'iptv invalid credentials'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'm3u-playlist-not-loading',
		keyword: 'm3u playlist not loading',
		variants: ['iptv playlist failed to load', 'm3u not working'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 2,
	},
	{
		slug: 'iptv-black-screen',
		keyword: 'iptv black screen',
		variants: ['iptv channels not playing', 'iptv no picture'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'iptv-no-sound',
		keyword: 'iptv no sound',
		variants: ['iptv audio out of sync', 'iptv audio problems'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
	{
		slug: 'isp-blocking-iptv',
		keyword: 'isp blocking iptv',
		variants: ['iptv blocked by isp', 'iptv blocked'],
		cluster: 'troubleshooting',
		role: 'spoke',
		intent: 'howto',
		priority: 3,
	},
];

// ---------------------------------------------------------------------------
// Keywords owned by static pages — the blog never targets these
// ---------------------------------------------------------------------------

export const RESERVED_KEYWORDS: readonly ReservedKeyword[] = [
	{
		owner: '/',
		keywords: ['iptv service', 'iptv subscription', 'buy iptv', 'iptv provider', 'net iptv', 'net iptv subscription'],
	},
	{
		owner: '/pricing',
		keywords: ['iptv price', 'iptv plans', 'iptv subscription price', 'iptv cost', 'how much is iptv'],
	},
	{ owner: '/devices', keywords: ['iptv compatible devices', 'iptv supported devices'] },
	{ owner: '/features', keywords: ['iptv features'] },
	{ owner: '/faq', keywords: ['iptv faq'] },
	{ owner: '/contact', keywords: ['iptv support', 'iptv customer service'] },
];

// ---------------------------------------------------------------------------
// Authors (E-E-A-T)
// ---------------------------------------------------------------------------

export const AUTHORS: readonly Author[] = [
	{
		id: 'editorial',
		name: 'Net IPTV Editorial Team',
		role: 'Streaming & setup specialists',
		bio: 'Our editorial team tests every player app, device and setup step on real hardware and real connections before it goes into a guide. We update articles when apps, prices or menus change.',
	},
];

// ---------------------------------------------------------------------------
// Content rules the build checks (warnings, not errors)
// ---------------------------------------------------------------------------

export const CONTENT_RULES = {
	/** Minimum body word count per role. */
	minWords: { pillar: 4000, hub: 3000, spoke: 1800 } satisfies Record<PostRole, number>,
	/** Contextual internal links in the body (excludes auto-injected blocks). */
	maxInternalLinks: 12,
	/** Topic pages stay noindex until a cluster has this many posts. */
	topicIndexThreshold: 3,
} as const;
