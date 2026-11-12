/**
 * English copy. Plans, features and FAQs still come from data/site.ts (their
 * English source of truth); everything else that was hard-coded in components
 * and pages lives here so the German dictionary can mirror it key for key.
 */
import type { Faq, Feature, NavLink, Plan } from '../data/site';
import { faqs, features, guarantees, moreLinks, navLinks, plans, site } from '../data/site';

export interface LegalSection {
	readonly id: string;
	readonly heading: string;
	readonly body: readonly string[];
}

export interface LegalPage {
	readonly title: string;
	readonly description: string;
	readonly pageTitle: string;
	readonly accent: string;
	readonly lastUpdated: string;
	readonly notice: string;
	readonly ctaHeading: string;
	readonly ctaBody: string;
	readonly sections: readonly LegalSection[];
}

export interface PageMeta {
	readonly title: string;
	readonly description: string;
	readonly eyebrow: string;
	readonly heading: string;
	readonly accent: string;
	readonly intro: string;
}

export const en = {
	meta: {
		ogLocale: 'en_US',
		defaultTitle: `${site.tagline} | ${site.channels} Live Channels in 4K`,
		defaultDescription: site.description as string,
		skipToContent: 'Skip to content',
	},
	site: {
		tagline: site.tagline as string,
		description: site.description as string,
		channels: site.channels as string,
		titles: site.titles as string,
	},
	nav: navLinks as readonly NavLink[],
	moreLinks: moreLinks as readonly NavLink[],
	plans: plans as readonly Plan[],
	features: features as readonly Feature[],
	faqs: faqs as readonly Faq[],
	guarantees: guarantees as string,

	header: {
		more: 'More',
		homeLabel: `${site.name} home`,
		toggleMenu: 'Toggle navigation menu',
		mainNav: 'Main',
		mobileNav: 'Mobile',
		language: 'Language',
		languageNames: { en: 'English', de: 'Deutsch' },
	},
	cta: {
		startTrial: 'Start free trial',
		trialMessage: 'Hi! I would like to start the free trial.',
		testNow: 'Test now',
	},
	hero: {
		badge: 'Free trial',
		seeFeatures: 'See Features',
		networks: 'All your favourite networks included',
	},
	movies: {
		eyebrow: 'On demand',
		title: 'A library that keeps ',
		accent: 'growing',
		browsePlans: 'Browse plans',
		message: (title: string) => `Hi! I'd like to watch "${title}" with Net IPTV.`,
		ariaLabel: (title: string) => `Ask about watching ${title} on WhatsApp`,
		genres: {
			scifi: 'Sci-Fi',
			drama: 'Drama',
			thriller: 'Thriller',
			action: 'Action',
			comedy: 'Comedy',
		},
		moreTitles: '+ more than 23,000 series and films',
		browseLibrary: 'Browse the full library',
		includedInEveryPlan: 'Included in every plan',
	},
	sports: {
		eyebrow: 'Live sports',
		title: 'Never miss ',
		accent: 'a single play',
		description:
			'Every major league, every match day, in up to 4K with commentary in multiple languages. No blackouts, no missed kick-offs.',
		message: "Hi! I'd like to start watching live sports with Net IPTV.",
		button: 'Start watching',
		items: { basketball: 'Basketball', hockey: 'Hockey', baseball: 'Baseball' },
	},
	devices: {
		everyLeague: 'Every league',
		photoAlt:
			'A desk with a laptop, tablet, two phones, a smartwatch and wireless earbuds, all able to run the service.',
		eyebrow: 'Compatibility',
		title: 'Works on the devices ',
		accent: 'you already own',
		description:
			'One subscription covers every screen in the house. No proprietary box, no installation visit.',
		testMessage: "Hi! I'd like to test Net IPTV on my device.",
	},
	featureGrid: {
		eyebrow: 'Why it feels different',
		title: 'Built for people who ',
		accent: 'hate compromise',
		testMessage: "Hi! I'd like to test the Net IPTV quality myself.",
	},
	pricing: {
		eyebrow: 'Plans',
		title: 'Simple pricing, ',
		accent: 'no surprises',
		description:
			'Every plan carries the full library. Pick the term that suits you — the longer the term, the lower the monthly cost.',
		getStarted: 'Get started',
		planMessage: (name: string, price: string) => `Hi! I'd like the ${name} plan (${site.currency}${price}).`,
		planAria: (name: string) => `Choose the ${name} plan`,
	},
	whyUs: {
		eyebrow: 'The difference',
		title: 'Why ',
		accent: 'us?',
		description:
			'Everything we promise is measurable — speed, uptime, response time and a refund policy that puts the risk on us, not you.',
		reasons: [
			{ title: 'Ultra fast servers', description: 'Global 20 Gbps network with automatic failover.' },
			{ title: '4K / FHD / SD quality', description: 'Pick the bitrate that suits your connection.' },
			{ title: '24/7 customer support', description: 'Live chat and WhatsApp, answered in minutes.' },
			{ title: 'All devices compatibility', description: 'Smart TV, mobile, Fire Stick, MAG, desktop and consoles.' },
			{ title: '7-day money-back guarantee', description: 'Not happy? Full refund, no questions asked.' },
		],
		stepsEyebrow: 'How it works',
		stepsTitle: 'Streaming in ',
		stepsAccent: '3 steps',
		stepsDescription: 'No installers, no contracts, no waiting on a technician.',
		steps: [
			{ title: 'Place Your Order', description: 'Choose the plan that fits you and check out securely in under a minute.' },
			{ title: 'Receive Your Details', description: 'Credentials and a setup guide land in your inbox within 60 seconds.' },
			{ title: 'Start Streaming', description: 'Sign in on any device and the full library is there waiting.' },
		],
		orderButton: 'Place Your Order',
		orderMessage: 'Hi! I would like to place an order.',
		orderNote: 'Instant activation · Cancel anytime',
	},
	testimonials: {
		eyebrow: 'Customers',
		title: 'Trusted by ',
		accent: 'thousands of homes',
		rating: 'Rated 5 out of 5',
		reviews: [
			{
				name: 'Marcus T.',
				location: 'Manchester, UK',
				initials: 'MT',
				quote:
					'Switched from cable six months ago and never looked back. Premier League in 4K with no lag, and the picture holds up even on match night.',
			},
			{
				name: 'Sofia L.',
				location: 'Stockholm, SE',
				initials: 'SL',
				quote:
					'Setup took me four minutes on my Fire Stick. Support walked me through it on chat at 11pm — genuinely impressive service.',
			},
			{
				name: 'David R.',
				location: 'Toronto, CA',
				initials: 'DR',
				quote:
					'The VOD library is enormous and new releases show up fast. Four devices on the yearly plan covers the whole family.',
			},
		],
	},
	faq: {
		eyebrow: 'FAQ',
		title: 'Questions, ',
		accent: 'answered',
		seeAll: 'See all FAQ',
	},
	blogPreview: {
		eyebrow: 'Journal',
		title: 'Guides & ',
		accent: 'streaming news',
		description: 'Practical walkthroughs rather than press releases.',
		readGuide: 'Read guide',
		comingSoon: 'Coming soon',
		seeAll: 'See all',
	},
	footer: {
		blurb: (channels: string, titles: string) =>
			`Premium IPTV streaming — ${channels} live channels and ${titles} titles in up to 4K, on every device you own.`,
		rights: 'All rights reserved.',
		disclaimer: 'Streaming service. Content availability varies by region.',
		columns: [
			{
				title: 'Product',
				links: [
					{ label: 'Live TV', href: '/features' },
					{ label: 'Movies & VOD', href: '/#movies' },
					{ label: 'Sports', href: '/#sports' },
					{ label: 'Devices', href: '/devices' },
					{ label: 'Pricing', href: '/pricing' },
				],
			},
			{
				title: 'Support',
				links: [
					{ label: 'Setup guides', href: '/devices' },
					{ label: 'Live chat', href: '/contact' },
					{ label: 'FAQ', href: '/faq' },
					{ label: 'Refund policy', href: '/terms#refunds' },
					{ label: 'Contact us', href: '/contact' },
				],
			},
			{
				title: 'Company',
				links: [
					{ label: 'Blog', href: '/blog' },
					{ label: 'Reseller program', href: '/contact' },
					{ label: 'Terms of service', href: '/terms' },
					{ label: 'Privacy policy', href: '/privacy' },
				],
			},
		],
	},

	blog: {
		dateLocale: 'en-GB',
		inLanguage: 'en',
		readingTime: (minutes: number) => `${minutes} min read`,
		home: 'Home',
		blog: 'Blog',
		breadcrumb: 'Breadcrumb',
		by: 'By',
		updated: 'Updated',
		keyTakeaways: 'Key takeaways',
		onThisPage: 'On this page',
		faqHeading: 'Frequently asked questions',
		ctaHeading: 'Try it on your own screen',
		ctaBody: (channels: string, titles: string) =>
			`${channels} live channels and ${titles} films and series. Ask for a free trial and check the picture on your own connection before you pay.`,
		ctaMessage: (title: string) => `Hi! I just read "${title}" and I'd like a free trial.`,
		ctaTrial: 'Get a free trial',
		ctaPlans: 'See plans',
		aboutAuthor: 'About the author',
		readGuide: 'Read guide',
		comingSoon: 'Coming soon',
		related: {
			startHere: 'Start here',
			clusterGuide: (cluster: string) => `${cluster} guide`,
			exploreAll: 'Explore every topic',
			everyGuideIn: (cluster: string) => `Every guide in ${cluster}`,
			relatedGuides: 'Related guides',
			allArticles: (cluster: string) => `All ${cluster} articles`,
		},
		index: {
			title: 'Blog | IPTV News, Guides & Comparisons | Net IPTV',
			description: 'Setup guides, troubleshooting walkthroughs and streaming news from the Net IPTV team.',
			eyebrow: 'Journal',
			heading: 'IPTV news & ',
			accent: 'setup guides',
			intro: 'Practical walkthroughs, honest comparisons and fixes that work — tested on real devices.',
			introEmpty: 'We are writing the first batch now. Expect practical walkthroughs rather than press releases.',
			topicsLabel: 'Blog topics',
			soon: 'First articles publishing soon',
		},
		topic: {
			eyebrow: 'Blog topic',
			browseAll: 'Browse all articles',
		},
		/** Overrides for CLUSTERS names/descriptions; English uses the registry as is. */
		clusters: {} as Partial<Record<string, { name: string; description: string }>>,
		author: null as null | { role: string; bio: string },
	},

	pages: {
		features: {
			title: 'Features | Net IPTV',
			description:
				'4K streaming, zero buffering, 24/7 support and compatibility with every device you already own.',
			eyebrow: 'What you get',
			heading: 'The complete ',
			accent: 'feature set',
			intro:
				'Built on a 20 Gbps global network with adaptive bitrate, anti-freeze technology and human support around the clock.',
		} as PageMeta,
		pricing: {
			title: 'Pricing & Plans | Net IPTV',
			description:
				'Subscription plans from €15 a month, or €70 a year with 2 months free. Instant activation, 7-day money-back guarantee, cancel anytime.',
			eyebrow: 'Plans & pricing',
			heading: 'One subscription, ',
			accent: 'everything included',
			intro:
				'No contracts, no hardware to buy and no hidden fees. Every plan carries the full library — pick the term that suits you.',
		} as PageMeta,
		faq: {
			title: 'FAQ | Net IPTV',
			description:
				'Answers on activation times, supported devices, required internet speed, simultaneous connections and refunds.',
			eyebrow: 'Support',
			heading: 'Questions, ',
			accent: 'answered',
			intro:
				'Everything people ask before subscribing. If your question is not here, live chat replies in minutes.',
		} as PageMeta,
		devices: {
			title: 'Supported Devices & Setup Guides | Net IPTV',
			description:
				'Step-by-step setup for Smart TV, Fire Stick, Android, iOS, MAG boxes, Windows, macOS and games consoles.',
			eyebrow: 'Compatibility',
			heading: 'Works on the devices ',
			accent: 'you already own',
			intro:
				'One subscription, every screen in the house. Most people are watching within five minutes of checkout.',
			guidesEyebrow: 'Setup guides',
			guidesTitle: 'Installed in ',
			guidesAccent: 'five minutes',
			guidesDescription:
				'Pick your platform and follow the steps. Support can screen-share if you would rather we did it with you.',
			needHand: 'Need a hand? Talk to support',
			setups: [
				{
					platform: 'Smart TV (Samsung / LG)',
					time: '3 min',
					steps: [
						'Open the app store on your TV and install Smart IPTV or IBO Player.',
						'Note the MAC address the app displays on first launch.',
						'Send that MAC address to our support chat and we activate the device.',
						'Restart the app — your full channel list loads automatically.',
					],
				},
				{
					platform: 'Amazon Fire Stick',
					time: '4 min',
					steps: [
						'From Settings → My Fire TV → Developer Options, enable apps from unknown sources.',
						'Install the Downloader app and enter the link from your welcome email.',
						'Open the installed player and sign in with your username and password.',
						'Pick a category and start watching.',
					],
				},
				{
					platform: 'Android & iOS',
					time: '2 min',
					steps: [
						'Install IBO Pro Player or IBO Player from Google Play or the App Store.',
						'Open the app and send us a screenshot of your MAC address and device ID — we add the playlist to your device for you.',
						'The library syncs in a few seconds and is ready on mobile data or Wi-Fi.',
					],
				},
				{
					platform: 'MAG Box & Windows / macOS',
					time: '5 min',
					steps: [
						'On MAG, go to Settings → Servers → Portals and enter the portal URL we sent you.',
						'On desktop, install VLC or MyIPTV Player and load the M3U playlist link.',
						'Reboot the device so the portal refreshes.',
						'Channels, movies and series appear under separate tabs.',
					],
				},
			],
		},
		contact: {
			title: 'Contact Us | Net IPTV',
			description:
				'Talk to Net IPTV support on WhatsApp, live chat or email. Answered 24/7, usually within minutes.',
			eyebrow: 'Get in touch',
			heading: 'We reply in ',
			accent: 'minutes, not days',
			intro:
				'Pre-sales question, setup snag or billing issue — pick whichever channel suits you.',
			whatsappMessage: "Hi! I'd like to know more about your IPTV plans.",
			preferWhatsapp: 'Prefer WhatsApp?',
			preferWhatsappBody:
				'Message us directly and we will walk you through plans, a free trial or setup on your device — no forms, no ticket numbers.',
			chatOnWhatsapp: 'Chat on WhatsApp',
			repliesUnder: 'replies in under 5 minutes',
			channels: {
				whatsapp: { title: 'WhatsApp', description: 'Fastest route to a human. Typical reply under 5 minutes.' },
				email: { title: 'Email', description: 'For billing questions, refunds and reseller enquiries.' },
				chat: {
					title: 'Live chat',
					description: 'Setup help while you are at the screen, with screen sharing.',
					detail: 'Mon–Sun, all hours',
				},
			},
			formTitle: 'Send us a message',
			formIntro: 'Include your order email if your question is about an existing subscription.',
			name: 'Your name',
			namePlaceholder: 'Alex Johnson',
			email: 'Email address',
			emailPlaceholder: 'you@example.com',
			subject: 'Subject',
			/** `value` must match the API's English SUBJECTS list. */
			subjects: [
				{ value: 'Before I subscribe', label: 'Before I subscribe' },
				{ value: 'Setup help', label: 'Setup help' },
				{ value: 'Billing or refund', label: 'Billing or refund' },
				{ value: 'Reseller programme', label: 'Reseller programme' },
				{ value: 'Something else', label: 'Something else' },
			],
			message: 'Message',
			messagePlaceholder: 'Tell us which device you use and what you need…',
			noscript: (email: string) =>
				`This form needs JavaScript. You can reach us on WhatsApp or at ${email} instead.`,
			send: 'Send message',
			sending: 'Sending…',
			success: 'Thanks — your message is on its way.',
			error: 'Something went wrong. Please try again.',
			network: 'Could not reach the server. Check your connection and try again.',
			useServerMessages: true,
			setupInstead: 'Looking for setup instructions instead?',
			browseGuides: 'Browse device guides →',
		},
		legal: {
			eyebrow: 'Legal',
			lastUpdated: (date: string) => `Last updated ${date}.`,
			onThisPage: 'On this page',
			templateNotice: 'Template notice:',
			contactUs: 'Contact us',
		},
		terms: {
			title: 'Terms of Service | Net IPTV',
			description:
				'The terms governing your Net IPTV subscription — accounts, payment, refunds, availability and liability.',
			pageTitle: 'Terms of ',
			accent: 'Service',
			lastUpdated: 'September 17, 2026',
			notice:
				'this page is placeholder wording supplied with the theme. Replace it with terms drafted or reviewed by a qualified lawyer for your jurisdiction before taking payments.',
			ctaHeading: 'Still have questions?',
			ctaBody: 'Support can clarify anything here before you subscribe.',
			sections: [
				{
					id: 'acceptance',
					heading: '1. Acceptance of terms',
					body: [
						'By subscribing to or using the Net IPTV service you agree to these Terms of Service. If you do not agree with any part of them, do not use the service.',
						'We may amend these terms from time to time. Material changes will be announced by email to the address on your account at least 14 days before they take effect. Continuing to use the service after that date constitutes acceptance of the revised terms.',
					],
				},
				{
					id: 'service',
					heading: '2. Description of the service',
					body: [
						'Net IPTV provides access to streaming media over the public internet. The service is delivered as software and credentials; no physical hardware is supplied.',
						'Channel and content availability varies by region and may change without notice as our upstream arrangements change. We do not guarantee that any specific channel, event or title will remain available for the duration of your subscription.',
					],
				},
				{
					id: 'accounts',
					heading: '3. Accounts and acceptable use',
					body: [
						'Your credentials are personal to your household. The number of simultaneous connections included in your plan is stated at checkout, and exceeding it may result in temporary suspension.',
						'You may not resell, sublicense, publicly broadcast or redistribute the service or its content without a written reseller agreement with us. Accounts found sharing credentials publicly may be terminated without refund.',
						'You are responsible for keeping your credentials confidential and for all activity that occurs under your account.',
					],
				},
				{
					id: 'payment',
					heading: '4. Payment, renewal and cancellation',
					body: [
						'Subscription fees are charged in advance for the term you select. Prices are shown inclusive of applicable taxes where required.',
						'Subscriptions do not auto-renew unless you explicitly opt in at checkout. Where auto-renewal is enabled, you may cancel at any time from your account or by contacting support, and cancellation takes effect at the end of the current term.',
					],
				},
				{
					id: 'refunds',
					heading: '5. Refunds',
					body: [
						'We offer a 7-day money-back guarantee from the date of first activation. To request a refund, contact support within that window and we will process it to the original payment method, typically within five business days.',
						'The guarantee does not apply where the service has been used in breach of section 3, or to renewal terms beyond the first subscription period.',
					],
				},
				{
					id: 'availability',
					heading: '6. Availability and support',
					body: [
						'We target 99.9% monthly uptime but do not warrant uninterrupted service. Scheduled maintenance is announced in advance where practical.',
						'Service quality depends on your own internet connection, device and local network, which are outside our control. Support is available 24/7 via live chat and WhatsApp.',
					],
				},
				{
					id: 'liability',
					heading: '7. Limitation of liability',
					body: [
						'To the maximum extent permitted by law, our total liability arising out of or relating to the service is limited to the amount you paid us in the twelve months preceding the claim.',
						'We are not liable for indirect, incidental or consequential losses, including lost profits or loss of data, arising from your use of or inability to use the service.',
					],
				},
				{
					id: 'termination',
					heading: '8. Termination',
					body: [
						'We may suspend or terminate your access where you materially breach these terms, where payment fails, or where required by law or by an upstream provider.',
						'You may stop using the service at any time. Sections that by their nature should survive termination — including limitation of liability — continue to apply.',
					],
				},
				{
					id: 'contact',
					heading: '9. Contacting us',
					body: [
						'Questions about these terms can be sent to legal@netiptv.example, or raised through any of the channels on our contact page.',
					],
				},
			],
		} as LegalPage,
		privacy: {
			title: 'Privacy Policy | Net IPTV',
			description:
				'What data Net IPTV collects, why we process it, how long we keep it and the rights you have over it.',
			pageTitle: 'Privacy ',
			accent: 'Policy',
			lastUpdated: 'September 17, 2026',
			notice:
				'this wording ships with the theme and describes a typical setup. A privacy policy must reflect what your own stack actually collects — review it with a lawyer before launch.',
			ctaHeading: 'Want your data removed?',
			ctaBody: 'Send us a request and we will confirm within 30 days.',
			sections: [
				{
					id: 'overview',
					heading: '1. Overview',
					body: [
						'This policy explains what personal data Net IPTV collects, why we collect it, how long we keep it and the rights you have over it.',
						'We collect the minimum needed to sell and deliver a streaming subscription. We do not sell personal data to third parties.',
					],
				},
				{
					id: 'collect',
					heading: '2. Data we collect',
					body: [
						'Account data: the email address you provide at checkout, your chosen plan and your subscription status.',
						'Payment data: processed by our payment provider. We receive a transaction reference and the last four digits of the card; we never see or store full card numbers.',
						'Technical data: IP address, device type and player version, recorded when your device connects to our servers. This is used to enforce the simultaneous-connection limit on your plan and to diagnose streaming faults.',
						'Support data: the contents of messages you send us by email, live chat or WhatsApp.',
					],
				},
				{
					id: 'why',
					heading: '3. Why we process it',
					body: [
						'To perform our contract with you: creating credentials, delivering the stream, handling billing and processing refunds.',
						'For our legitimate interests: preventing credential sharing and fraud, monitoring service quality and improving our infrastructure.',
						'To meet legal obligations: retaining transaction records for tax and accounting purposes.',
					],
				},
				{
					id: 'cookies',
					heading: '4. Cookies and analytics',
					body: [
						'This website uses strictly necessary cookies to keep your session working. Any analytics or advertising cookies are set only after you consent, and you can withdraw that consent at any time from your browser settings.',
					],
				},
				{
					id: 'sharing',
					heading: '5. Who we share data with',
					body: [
						'Payment processors, to take payment and issue refunds. Hosting and CDN providers, to deliver the service. Support tooling, to handle your messages.',
						'Each processor is bound by contract to use the data only on our instructions. We also disclose data where we are legally required to do so.',
					],
				},
				{
					id: 'retention',
					heading: '6. How long we keep it',
					body: [
						'Account data is retained for as long as your subscription is active and for 24 months afterwards, so that we can reinstate an account or resolve a billing dispute.',
						'Connection logs are retained for 30 days. Financial records are retained for the period required by applicable tax law.',
					],
				},
				{
					id: 'rights',
					heading: '7. Your rights',
					body: [
						'Depending on where you live, you may have the right to access, correct, export or delete your personal data, to object to certain processing, and to lodge a complaint with your data protection authority.',
						'To exercise any of these, email privacy@netiptv.example. We respond within 30 days and may ask you to verify your identity first.',
					],
				},
				{
					id: 'security',
					heading: '8. Security',
					body: [
						'Traffic to this site and to our panel is encrypted in transit. Access to subscriber records is restricted to staff who need it, and credentials are stored using industry-standard hashing.',
						'No system is perfectly secure. If a breach affects your personal data we will notify you and the relevant authority as required by law.',
					],
				},
				{
					id: 'children',
					heading: '9. Children',
					body: [
						'The service is not directed at children under 16 and we do not knowingly collect their data. Parents who believe a child has provided us with personal data should contact us and we will delete it.',
					],
				},
				{
					id: 'contact',
					heading: '10. Contacting us',
					body: [
						'Privacy questions and data requests go to privacy@netiptv.example, or through any channel on our contact page.',
					],
				},
			],
		} as LegalPage,
	},
};

export type Dictionary = typeof en;
