/**
 * Single source of truth for navigation and marketing copy.
 * Pages and components import from here so a channel count or plan price is
 * changed in exactly one place.
 */

export interface NavLink {
	readonly label: string;
	readonly href: string;
}

export interface Plan {
	readonly name: string;
	readonly price: string;
	readonly per: string;
	readonly note: string;
	/** Raises the card: accent border, filled CTA. */
	readonly highlight: boolean;
	/** Adds the pulsing neon treatment. Reserved for the headline offer. */
	readonly neon?: boolean;
	readonly tag: string | null;
	readonly features: readonly string[];
}

export interface Feature {
	readonly icon: 'monitor' | 'zap' | 'sliders' | 'headphones';
	readonly title: string;
	readonly description: string;
	readonly badge: string;
}

export interface Faq {
	readonly question: string;
	readonly answer: string;
}

export const site = {
	name: 'Net IPTV',
	tagline: 'Discover Top IPTV Service',
	description:
		'Movies, TV shows and more. Gateway to a universe of channels streaming straight to your device.',
	currency: '€',
	channels: '22,000+',
	titles: '80,000+',
	/**
	 * WhatsApp number in international format: country code, no leading zero
	 * and no +, which is what wa.me expects. Local form is 0617984899 (MA).
	 */
	whatsapp: '212617984899',
	/** Same number formatted for display next to the WhatsApp buttons. */
	whatsappDisplay: '+212 617 984 899',
	email: 'support@netiptv.example',
} as const;

export const navLinks: readonly NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Features', href: '/features' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'FAQ', href: '/faq' },
	{ label: 'Contact', href: '/contact' },
];

/** Secondary/legal routes, shown under the header's "More" dropdown. */
export const moreLinks: readonly NavLink[] = [
	{ label: 'Terms of Service', href: '/terms' },
	{ label: 'Devices', href: '/devices' },
	{ label: 'Privacy Policy', href: '/privacy' },
];

export const plans: readonly Plan[] = [
	{
		name: '1 Month',
		price: '15',
		per: '/ month',
		note: 'Billed monthly',
		highlight: false,
		tag: null,
		features: [
			'22,000+ live channels',
			'80,000+ movies & series',
			'1 device connection',
			'4K / FHD / HD quality',
			'Full 7-day TV guide (EPG)',
			'7-day catch-up on major channels',
			'Multi-language audio & subtitles',
			'Instant activation by email',
			'Works on Smart TV, mobile, Fire Stick & more',
			'7-day money-back guarantee',
			'24/7 live chat support',
		],
	},
	{
		name: '3 Months',
		price: '35',
		per: '/ 3 months',
		note: 'Save 22% · €11.67 per month',
		highlight: false,
		tag: null,
		features: [
			'22,000+ live channels',
			'80,000+ movies & series',
			'2 device connections',
			'4K / FHD / HD quality',
			'Full 7-day TV guide (EPG)',
			'7-day catch-up on major channels',
			'Multi-language audio & subtitles',
			'Instant activation by email',
			'Works on Smart TV, mobile, Fire Stick & more',
			'Anti-freeze technology',
			'VOD library updated daily',
			'7-day money-back guarantee',
			'24/7 live chat support',
		],
	},
	{
		name: '6 Months',
		price: '45',
		per: '/ 6 months',
		note: 'Save 50% · €7.50 per month',
		highlight: false,
		tag: 'Most popular',
		features: [
			'22,000+ live channels',
			'80,000+ movies & series',
			'2 device connections',
			'4K / FHD / HD quality',
			'Full 7-day TV guide (EPG)',
			'7-day catch-up on major channels',
			'Multi-language audio & subtitles',
			'Instant activation by email',
			'Works on Smart TV, mobile, Fire Stick & more',
			'Anti-freeze technology',
			'VOD library updated daily',
			'7-day money-back guarantee',
			'PPV & sports events included',
			'Backup servers in every region',
			'Priority support queue',
		],
	},
	{
		name: '12 Months',
		price: '70',
		per: '/ year',
		note: '14 months of service · €5.00 per month',
		highlight: true,
		neon: true,
		tag: '+ 2 MONTHS FREE',
		features: [
			'2 extra months free — 14 months total',
			'22,000+ live channels',
			'80,000+ movies & series',
			'4 device connections',
			'4K / FHD / HD quality',
			'Full 7-day TV guide (EPG)',
			'7-day catch-up on major channels',
			'Multi-language audio & subtitles',
			'Instant activation by email',
			'Works on Smart TV, mobile, Fire Stick & more',
			'Anti-freeze technology',
			'VOD library updated daily',
			'7-day money-back guarantee',
			'PPV & sports events included',
			'Backup servers in every region',
			'Priority support queue',
			'Free setup assistance',
			'Free plan upgrades',
		],
	},
];

export const features: readonly Feature[] = [
	{
		icon: 'monitor',
		title: '4K And FHD Quality',
		description:
			'Ultra crisp streaming on every channel, with adaptive bitrate that keeps the picture sharp on any connection.',
		badge: 'Ultra crisp',
	},
	{
		icon: 'zap',
		title: 'Zero Buffering',
		description:
			'Pure immersion. Load-balanced servers with 20 Gbps uplinks deliver an uninterrupted stream, even at peak hours.',
		badge: '99.9% uptime',
	},
	{
		icon: 'sliders',
		title: 'Easy to setup',
		description:
			'A smooth installation process — your credentials arrive by email and you are watching in under five minutes.',
		badge: '5 min install',
	},
	{
		icon: 'headphones',
		title: '24/7 Support',
		description:
			'Questions answered anytime. Real humans on live chat and WhatsApp, day or night, every day of the year.',
		badge: 'Always on',
	},
];

export const faqs: readonly Faq[] = [
	{
		question: 'What exactly is IPTV and how does it work?',
		answer:
			'IPTV streams television over your internet connection instead of a satellite dish or cable line. You sign in to our app with the credentials we email you, and channels play instantly on any device connected to the internet.',
	},
	{
		question: 'Do you offer a free trial?',
		answer:
			'Yes. We set up a short trial so you can check picture quality and channel coverage on your own connection before paying. Ask on live chat or WhatsApp and we will activate one — no card details needed.',
	},
	{
		question: 'How fast does my subscription activate?',
		answer:
			'Immediately. Payment confirmation triggers an automated email with your login details and a setup guide, usually within 60 seconds. If it has not arrived in five minutes, message live chat and we will resend it.',
	},
	{
		question: 'What internet speed do I need?',
		answer:
			'8 Mbps is enough for HD, 15 Mbps for FHD and 25 Mbps for stable 4K. The player adapts the bitrate automatically, so a slower connection drops quality rather than buffering.',
	},
	{
		question: 'Can I watch on more than one device at once?',
		answer:
			'Yes. Each plan includes a set number of simultaneous connections — 1 on monthly, 2 on the 3 and 6 month plans, and 4 on the annual plan. Extra connections can be added at any time.',
	},
	{
		question: 'Which devices are supported?',
		answer:
			'Smart TVs (Samsung, LG, Android TV), Amazon Fire Stick, Apple TV, iPhone and iPad, Android phones and tablets, MAG boxes, Windows and macOS, plus Xbox and PlayStation.',
	},
	{
		question: 'Which payment methods do you accept?',
		answer:
			'All major debit and credit cards, PayPal, and selected cryptocurrencies. Payments are handled by our provider — we never see or store your full card number.',
	},
	{
		question: 'Is there a contract, and can I cancel at any time?',
		answer:
			'There is no contract. Plans do not auto-renew unless you opt in at checkout, so a subscription simply ends at the close of its term. If auto-renewal is on, you can switch it off from your account or by messaging support.',
	},
	{
		question: 'What happens if a channel stops working?',
		answer:
			'Report it on live chat with the channel name. Most outages are upstream and restore within minutes; our servers fail over automatically, and we keep backup sources for major channels so you can switch while we fix the primary feed.',
	},
	{
		question: 'Can I watch something I missed?',
		answer:
			'Yes. Major channels carry 7-day catch-up, so you can scroll back through the guide and play anything from the past week. The on-demand library of films and series is separate and always available.',
	},
	{
		question: 'How do I get the TV guide (EPG) working?',
		answer:
			'The guide loads automatically with your playlist. If it looks empty, refresh the EPG from your player\'s settings and set the correct time zone — that fixes it in almost every case.',
	},
	{
		question: 'Does it work while I travel abroad?',
		answer:
			'Yes, anywhere with a stable internet connection. A small number of channels are geo-restricted by the broadcaster rather than by us, so the exact line-up can differ from what you see at home.',
	},
	{
		question: 'Do I need a VPN?',
		answer:
			'Not usually. Some internet providers throttle streaming traffic at peak times, and a VPN can help in that case, but the service does not require one to work.',
	},
	{
		question: 'Can I share my account with family in another house?',
		answer:
			'Connections are intended for your own household. Credentials shared publicly or used from many locations at once may be suspended — if you need more simultaneous streams, add connections to your plan instead.',
	},
	{
		question: 'Do you offer a refund if it does not work for me?',
		answer:
			'We offer a 7-day money-back guarantee from first activation. Contact support within that window and we refund to your original payment method, usually within five business days.',
	},
];

/** Text wordmarks stand in for licensed brand assets. */
export const networks: readonly { name: string; class: string }[] = [
	{ name: 'HBO', class: 'text-2xl font-black tracking-tighter' },
	{ name: 'MGM+', class: 'text-xl font-bold tracking-wide' },
	{ name: 'SHOWTIME', class: 'text-[0.7rem] font-semibold tracking-[0.35em]' },
	{ name: 'Disney+', class: 'text-xl font-semibold italic tracking-tight' },
	{ name: 'FS1', class: 'text-2xl font-black italic tracking-tighter' },
	{ name: 'CBC', class: 'text-xl font-bold tracking-[0.2em]' },
	{ name: 'fubo', class: 'text-2xl font-black lowercase tracking-tight' },
];

/** How many questions the home-page FAQ section shows. */
export const HOME_FAQ_COUNT = 6;

export const guarantees =
	'Instant activation · 7-day money-back guarantee · Cancel anytime';

/**
 * Builds a wa.me link with the chat pre-filled. Each CTA passes its own line,
 * so an incoming message already says which plan or action it came from.
 */
export const whatsappLink = (message: string): string =>
	`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/** Default enquiry, used by the contact page panel. */
export const whatsappUrl = whatsappLink(
	"Hi! I'd like to know more about your IPTV plans.",
);
