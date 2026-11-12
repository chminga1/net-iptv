/**
 * German copy. Mirrors en.ts key for key; the Dictionary type makes the build
 * fail if a key is missing. Prices, channel counts and guarantees must match
 * data/site.ts — only the wording changes.
 */
import type { Dictionary } from './en';
import { site } from '../data/site';

const CHANNELS = '22.000+';
const TITLES = '80.000+';

const common = {
	channels: `${CHANNELS} Live-Sender`,
	vod: `${TITLES} Filme & Serien`,
	quality: '4K / FHD / HD Qualität',
	epg: 'Vollständiger 7-Tage-TV-Guide (EPG)',
	catchup: '7 Tage Catch-up bei den wichtigsten Sendern',
	audio: 'Mehrsprachige Tonspuren & Untertitel',
	activation: 'Sofortige Aktivierung per E-Mail',
	devices: 'Läuft auf Smart TV, Handy, Fire Stick & mehr',
	antiFreeze: 'Anti-Freeze-Technologie',
	vodDaily: 'VOD-Bibliothek täglich aktualisiert',
	moneyBack: '7 Tage Geld-zurück-Garantie',
	ppv: 'PPV- & Sport-Events inklusive',
	backup: 'Backup-Server in jeder Region',
	priority: 'Bevorzugter Support',
	support: '24/7 Live-Chat-Support',
};

export const de: Dictionary = {
	meta: {
		ogLocale: 'de_DE',
		defaultTitle: `Top IPTV-Service entdecken | ${CHANNELS} Live-Sender in 4K`,
		defaultDescription:
			'Filme, Serien und mehr. Dein Zugang zu einem Universum an Sendern, direkt auf dein Gerät gestreamt.',
		skipToContent: 'Zum Inhalt springen',
	},
	site: {
		tagline: 'Entdecke den Top IPTV-Service',
		description:
			'Filme, Serien und mehr. Dein Zugang zu einem Universum an Sendern, direkt auf dein Gerät gestreamt.',
		channels: CHANNELS,
		titles: TITLES,
	},
	nav: [
		{ label: 'Start', href: '/' },
		{ label: 'Funktionen', href: '/features' },
		{ label: 'Preise', href: '/pricing' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'FAQ', href: '/faq' },
		{ label: 'Kontakt', href: '/contact' },
	],
	moreLinks: [
		{ label: 'AGB', href: '/terms' },
		{ label: 'Geräte', href: '/devices' },
		{ label: 'Datenschutz', href: '/privacy' },
	],
	plans: [
		{
			name: '1 Monat',
			price: '15',
			per: '/ Monat',
			note: 'Monatliche Zahlung',
			highlight: false,
			tag: null,
			features: [
				common.channels,
				common.vod,
				'1 Geräteverbindung',
				common.quality,
				common.epg,
				common.catchup,
				common.audio,
				common.activation,
				common.devices,
				common.moneyBack,
				common.support,
			],
		},
		{
			name: '3 Monate',
			price: '35',
			per: '/ 3 Monate',
			note: '22 % sparen · 11,67 € pro Monat',
			highlight: false,
			tag: null,
			features: [
				common.channels,
				common.vod,
				'2 Geräteverbindungen',
				common.quality,
				common.epg,
				common.catchup,
				common.audio,
				common.activation,
				common.devices,
				common.antiFreeze,
				common.vodDaily,
				common.moneyBack,
				common.support,
			],
		},
		{
			name: '6 Monate',
			price: '45',
			per: '/ 6 Monate',
			note: '50 % sparen · 7,50 € pro Monat',
			highlight: false,
			tag: 'Am beliebtesten',
			features: [
				common.channels,
				common.vod,
				'2 Geräteverbindungen',
				common.quality,
				common.epg,
				common.catchup,
				common.audio,
				common.activation,
				common.devices,
				common.antiFreeze,
				common.vodDaily,
				common.moneyBack,
				common.ppv,
				common.backup,
				common.priority,
			],
		},
		{
			name: '12 Monate',
			price: '70',
			per: '/ Jahr',
			note: '14 Monate Laufzeit · 5,00 € pro Monat',
			highlight: true,
			neon: true,
			tag: '+ 2 MONATE GRATIS',
			features: [
				'2 Monate extra gratis — 14 Monate insgesamt',
				common.channels,
				common.vod,
				'4 Geräteverbindungen',
				common.quality,
				common.epg,
				common.catchup,
				common.audio,
				common.activation,
				common.devices,
				common.antiFreeze,
				common.vodDaily,
				common.moneyBack,
				common.ppv,
				common.backup,
				common.priority,
				'Kostenlose Einrichtungshilfe',
				'Kostenlose Tarif-Upgrades',
			],
		},
	],
	features: [
		{
			icon: 'monitor',
			title: '4K- und FHD-Qualität',
			description:
				'Gestochen scharfes Streaming auf jedem Sender, mit adaptiver Bitrate, die das Bild bei jeder Verbindung scharf hält.',
			badge: 'Gestochen scharf',
		},
		{
			icon: 'zap',
			title: 'Kein Puffern',
			description:
				'Volles Eintauchen. Lastverteilte Server mit 20-Gbit/s-Anbindung liefern einen unterbrechungsfreien Stream, auch zur Hauptsendezeit.',
			badge: '99,9 % Verfügbarkeit',
		},
		{
			icon: 'sliders',
			title: 'Einfach einzurichten',
			description:
				'Eine reibungslose Installation: Deine Zugangsdaten kommen per E-Mail und du schaust in weniger als fünf Minuten.',
			badge: '5 Min. Installation',
		},
		{
			icon: 'headphones',
			title: '24/7 Support',
			description:
				'Antworten zu jeder Zeit. Echte Menschen im Live-Chat und auf WhatsApp, Tag und Nacht, an jedem Tag des Jahres.',
			badge: 'Immer erreichbar',
		},
	],
	faqs: [
		{
			question: 'Was genau ist IPTV und wie funktioniert es?',
			answer:
				'IPTV überträgt Fernsehen über deine Internetverbindung statt über Satellitenschüssel oder Kabelanschluss. Du meldest dich mit den Zugangsdaten, die wir dir per E-Mail schicken, in unserer App an, und die Sender laufen sofort auf jedem Gerät mit Internetverbindung.',
		},
		{
			question: 'Gibt es einen kostenlosen Test?',
			answer:
				'Ja. Wir richten dir einen kurzen Test ein, damit du Bildqualität und Senderangebot über deine eigene Verbindung prüfen kannst, bevor du bezahlst. Frag einfach im Live-Chat oder auf WhatsApp, und wir schalten ihn frei, ganz ohne Kartendaten.',
		},
		{
			question: 'Wie schnell wird mein Abo aktiviert?',
			answer:
				'Sofort. Die Zahlungsbestätigung löst eine automatische E-Mail mit deinen Zugangsdaten und einer Einrichtungsanleitung aus, meist innerhalb von 60 Sekunden. Ist sie nach fünf Minuten nicht da, schreib uns im Live-Chat und wir senden sie erneut.',
		},
		{
			question: 'Welche Internetgeschwindigkeit brauche ich?',
			answer:
				'8 Mbit/s reichen für HD, 15 Mbit/s für FHD und 25 Mbit/s für stabiles 4K. Der Player passt die Bitrate automatisch an, sodass eine langsamere Verbindung die Qualität senkt, statt zu puffern.',
		},
		{
			question: 'Kann ich auf mehreren Geräten gleichzeitig schauen?',
			answer:
				'Ja. Jeder Tarif enthält eine feste Anzahl gleichzeitiger Verbindungen: 1 beim Monatstarif, 2 bei den 3- und 6-Monats-Tarifen und 4 beim Jahrestarif. Zusätzliche Verbindungen kannst du jederzeit dazubuchen.',
		},
		{
			question: 'Welche Geräte werden unterstützt?',
			answer:
				'Smart TVs (Samsung, LG, Android TV), Amazon Fire Stick, Apple TV, iPhone und iPad, Android-Handys und -Tablets, MAG-Boxen, Windows und macOS sowie Xbox und PlayStation.',
		},
		{
			question: 'Welche Zahlungsmethoden akzeptiert ihr?',
			answer:
				'Alle gängigen Debit- und Kreditkarten, PayPal und ausgewählte Kryptowährungen. Zahlungen wickelt unser Zahlungsdienstleister ab; wir sehen und speichern niemals deine vollständige Kartennummer.',
		},
		{
			question: 'Gibt es einen Vertrag, und kann ich jederzeit kündigen?',
			answer:
				'Es gibt keinen Vertrag. Tarife verlängern sich nicht automatisch, außer du aktivierst es beim Kauf, ein Abo endet also einfach mit Ablauf der Laufzeit. Ist die automatische Verlängerung aktiv, kannst du sie in deinem Konto oder per Nachricht an den Support abschalten.',
		},
		{
			question: 'Was passiert, wenn ein Sender nicht mehr funktioniert?',
			answer:
				'Melde ihn im Live-Chat mit dem Sendernamen. Die meisten Ausfälle liegen beim Zulieferer und sind in wenigen Minuten behoben. Unsere Server schalten automatisch um, und für die wichtigsten Sender halten wir Backup-Quellen bereit, auf die du wechseln kannst, während wir den Hauptfeed reparieren.',
		},
		{
			question: 'Kann ich etwas nachschauen, das ich verpasst habe?',
			answer:
				'Ja. Die wichtigsten Sender bieten 7 Tage Catch-up, du kannst also im Guide zurückblättern und alles aus der vergangenen Woche abspielen. Die On-Demand-Bibliothek mit Filmen und Serien ist davon getrennt und immer verfügbar.',
		},
		{
			question: 'Wie bringe ich den TV-Guide (EPG) zum Laufen?',
			answer:
				'Der Guide lädt automatisch mit deiner Playlist. Wirkt er leer, aktualisiere den EPG in den Einstellungen deines Players und stell die richtige Zeitzone ein. Das behebt es in fast allen Fällen.',
		},
		{
			question: 'Funktioniert es auch auf Reisen im Ausland?',
			answer:
				'Ja, überall mit stabiler Internetverbindung. Einige wenige Sender sind vom Sender selbst geografisch beschränkt, nicht von uns, daher kann das genaue Angebot von dem abweichen, was du zu Hause siehst.',
		},
		{
			question: 'Brauche ich ein VPN?',
			answer:
				'In der Regel nicht. Manche Internetanbieter drosseln Streaming-Verkehr zu Stoßzeiten, dann kann ein VPN helfen, aber der Dienst funktioniert auch ohne.',
		},
		{
			question: 'Kann ich mein Konto mit Familie in einem anderen Haushalt teilen?',
			answer:
				'Die Verbindungen sind für deinen eigenen Haushalt gedacht. Öffentlich geteilte oder gleichzeitig von vielen Orten genutzte Zugangsdaten können gesperrt werden. Wenn du mehr gleichzeitige Streams brauchst, buche lieber zusätzliche Verbindungen.',
		},
		{
			question: 'Bekomme ich mein Geld zurück, wenn es bei mir nicht funktioniert?',
			answer:
				'Wir bieten eine 7-tägige Geld-zurück-Garantie ab der ersten Aktivierung. Melde dich innerhalb dieser Frist beim Support, und wir erstatten den Betrag auf deine ursprüngliche Zahlungsmethode, meist innerhalb von fünf Werktagen.',
		},
	],
	guarantees: 'Sofortige Aktivierung · 7 Tage Geld-zurück-Garantie · Jederzeit kündbar',

	header: {
		more: 'Mehr',
		homeLabel: `${site.name} Startseite`,
		toggleMenu: 'Navigationsmenü öffnen oder schließen',
		mainNav: 'Hauptnavigation',
		mobileNav: 'Mobile Navigation',
		language: 'Sprache',
		languageNames: { en: 'English', de: 'Deutsch' },
	},
	cta: {
		startTrial: 'Gratis testen',
		trialMessage: 'Hallo! Ich möchte den kostenlosen Test starten.',
		testNow: 'Jetzt testen',
	},
	hero: {
		badge: 'Gratis-Test',
		seeFeatures: 'Funktionen ansehen',
		networks: 'Alle deine Lieblingssender inklusive',
	},
	movies: {
		eyebrow: 'On Demand',
		title: 'Eine Bibliothek, die ständig ',
		accent: 'wächst',
		browsePlans: 'Tarife ansehen',
		message: (title: string) => `Hallo! Ich möchte „${title}“ mit Net IPTV schauen.`,
		ariaLabel: (title: string) => `Auf WhatsApp nach ${title} fragen`,
		genres: {
			scifi: 'Sci-Fi',
			drama: 'Drama',
			thriller: 'Thriller',
			action: 'Action',
			comedy: 'Komödie',
		},
		moreTitles: '+ mehr als 23.000 Serien und Filme',
		browseLibrary: 'Die ganze Bibliothek ansehen',
		includedInEveryPlan: 'In jedem Tarif enthalten',
	},
	sports: {
		eyebrow: 'Live-Sport',
		title: 'Verpasse keinen ',
		accent: 'einzigen Spielzug',
		description:
			'Jede große Liga, jeder Spieltag, in bis zu 4K mit Kommentar in mehreren Sprachen. Keine Sperren, kein verpasster Anstoß.',
		message: 'Hallo! Ich möchte mit Net IPTV Live-Sport schauen.',
		button: 'Jetzt schauen',
		items: { basketball: 'Basketball', hockey: 'Eishockey', baseball: 'Baseball' },
	},
	devices: {
		everyLeague: 'Jede Liga',
		photoAlt:
			'Ein Schreibtisch mit Laptop, Tablet, zwei Handys, einer Smartwatch und kabellosen Kopfhörern, auf denen der Dienst läuft.',
		eyebrow: 'Kompatibilität',
		title: 'Läuft auf den Geräten, ',
		accent: 'die du schon hast',
		description:
			'Ein Abo für jeden Bildschirm im Haus. Keine spezielle Box, kein Techniker-Termin.',
		testMessage: 'Hallo! Ich möchte Net IPTV auf meinem Gerät testen.',
	},
	featureGrid: {
		eyebrow: 'Warum es sich anders anfühlt',
		title: 'Gemacht für alle, die ',
		accent: 'keine Kompromisse wollen',
		testMessage: 'Hallo! Ich möchte die Qualität von Net IPTV selbst testen.',
	},
	pricing: {
		eyebrow: 'Tarife',
		title: 'Einfache Preise, ',
		accent: 'keine Überraschungen',
		description:
			'Jeder Tarif enthält die komplette Bibliothek. Wähle die Laufzeit, die zu dir passt: Je länger die Laufzeit, desto günstiger der Monat.',
		getStarted: 'Jetzt starten',
		planMessage: (name: string, price: string) =>
			`Hallo! Ich möchte den Tarif ${name} (${price} ${site.currency}).`,
		planAria: (name: string) => `Tarif ${name} wählen`,
	},
	whyUs: {
		eyebrow: 'Der Unterschied',
		title: 'Warum ',
		accent: 'wir?',
		description:
			'Alles, was wir versprechen, ist messbar: Geschwindigkeit, Verfügbarkeit, Reaktionszeit und eine Erstattungsregel, bei der das Risiko bei uns liegt, nicht bei dir.',
		reasons: [
			{ title: 'Ultraschnelle Server', description: 'Globales 20-Gbit/s-Netz mit automatischem Failover.' },
			{ title: '4K / FHD / SD Qualität', description: 'Wähle die Bitrate, die zu deiner Verbindung passt.' },
			{ title: '24/7 Kundensupport', description: 'Live-Chat und WhatsApp, Antwort in wenigen Minuten.' },
			{ title: 'Kompatibel mit allen Geräten', description: 'Smart TV, Handy, Fire Stick, MAG, Computer und Konsolen.' },
			{ title: '7 Tage Geld-zurück-Garantie', description: 'Nicht zufrieden? Volle Erstattung, ohne Wenn und Aber.' },
		],
		stepsEyebrow: 'So funktioniert es',
		stepsTitle: 'Streaming in ',
		stepsAccent: '3 Schritten',
		stepsDescription: 'Keine Installateure, keine Verträge, kein Warten auf einen Techniker.',
		steps: [
			{ title: 'Bestellung aufgeben', description: 'Wähle deinen Tarif und bezahle sicher in weniger als einer Minute.' },
			{ title: 'Zugangsdaten erhalten', description: 'Zugangsdaten und Einrichtungsanleitung landen innerhalb von 60 Sekunden in deinem Postfach.' },
			{ title: 'Streaming starten', description: 'Melde dich auf einem beliebigen Gerät an, und die ganze Bibliothek wartet auf dich.' },
		],
		orderButton: 'Jetzt bestellen',
		orderMessage: 'Hallo! Ich möchte eine Bestellung aufgeben.',
		orderNote: 'Sofortige Aktivierung · Jederzeit kündbar',
	},
	testimonials: {
		eyebrow: 'Kunden',
		title: 'Tausende Haushalte ',
		accent: 'vertrauen uns',
		rating: 'Mit 5 von 5 bewertet',
		reviews: [
			{
				name: 'Marcus T.',
				location: 'Manchester, UK',
				initials: 'MT',
				quote:
					'Vor sechs Monaten vom Kabel gewechselt und nie zurückgeschaut. Premier League in 4K ohne Verzögerung, und das Bild hält sogar am Spieltag.',
			},
			{
				name: 'Sofia L.',
				location: 'Stockholm, SE',
				initials: 'SL',
				quote:
					'Die Einrichtung auf meinem Fire Stick hat vier Minuten gedauert. Der Support hat mich um 23 Uhr im Chat durchgeführt, wirklich beeindruckender Service.',
			},
			{
				name: 'David R.',
				location: 'Toronto, CA',
				initials: 'DR',
				quote:
					'Die VOD-Bibliothek ist riesig, und neue Titel sind schnell da. Vier Geräte im Jahrestarif reichen für die ganze Familie.',
			},
		],
	},
	faq: {
		eyebrow: 'FAQ',
		title: 'Fragen, ',
		accent: 'beantwortet',
		seeAll: 'Alle Fragen ansehen',
	},
	blogPreview: {
		eyebrow: 'Magazin',
		title: 'Ratgeber & ',
		accent: 'Streaming-News',
		description: 'Praktische Anleitungen statt Pressemitteilungen.',
		readGuide: 'Artikel lesen',
		comingSoon: 'Demnächst',
		seeAll: 'Alle ansehen',
	},
	footer: {
		blurb: (channels: string, titles: string) =>
			`Premium-IPTV-Streaming: ${channels} Live-Sender und ${titles} Titel in bis zu 4K, auf jedem Gerät, das du besitzt.`,
		rights: 'Alle Rechte vorbehalten.',
		disclaimer: 'Streaming-Dienst. Die Verfügbarkeit der Inhalte variiert je nach Region.',
		columns: [
			{
				title: 'Produkt',
				links: [
					{ label: 'Live-TV', href: '/features' },
					{ label: 'Filme & VOD', href: '/#movies' },
					{ label: 'Sport', href: '/#sports' },
					{ label: 'Geräte', href: '/devices' },
					{ label: 'Preise', href: '/pricing' },
				],
			},
			{
				title: 'Support',
				links: [
					{ label: 'Einrichtungsanleitungen', href: '/devices' },
					{ label: 'Live-Chat', href: '/contact' },
					{ label: 'FAQ', href: '/faq' },
					{ label: 'Erstattungsrichtlinie', href: '/terms#refunds' },
					{ label: 'Kontakt', href: '/contact' },
				],
			},
			{
				title: 'Unternehmen',
				links: [
					{ label: 'Blog', href: '/blog' },
					{ label: 'Reseller-Programm', href: '/contact' },
					{ label: 'AGB', href: '/terms' },
					{ label: 'Datenschutz', href: '/privacy' },
				],
			},
		],
	},

	blog: {
		dateLocale: 'de-DE',
		inLanguage: 'de',
		readingTime: (minutes: number) => `${minutes} Min. Lesezeit`,
		home: 'Start',
		blog: 'Blog',
		breadcrumb: 'Brotkrumennavigation',
		by: 'Von',
		updated: 'Aktualisiert am',
		keyTakeaways: 'Das Wichtigste in Kürze',
		onThisPage: 'Auf dieser Seite',
		faqHeading: 'Häufig gestellte Fragen',
		ctaHeading: 'Teste es auf deinem eigenen Bildschirm',
		ctaBody: (channels: string, titles: string) =>
			`${channels} Live-Sender und ${titles} Filme und Serien. Frag nach einem kostenlosen Test und prüfe das Bild über deine eigene Verbindung, bevor du bezahlst.`,
		ctaMessage: (title: string) => `Hallo! Ich habe gerade „${title}“ gelesen und möchte einen kostenlosen Test.`,
		ctaTrial: 'Kostenlos testen',
		ctaPlans: 'Tarife ansehen',
		aboutAuthor: 'Über den Autor',
		readGuide: 'Artikel lesen',
		comingSoon: 'Demnächst',
		related: {
			startHere: 'Hier starten',
			clusterGuide: (cluster: string) => `Ratgeber: ${cluster}`,
			exploreAll: 'Alle Themen entdecken',
			everyGuideIn: (cluster: string) => `Alle Ratgeber zu ${cluster}`,
			relatedGuides: 'Passende Ratgeber',
			allArticles: (cluster: string) => `Alle Artikel zu ${cluster}`,
		},
		index: {
			title: 'Blog | IPTV-News, Ratgeber & Vergleiche | Net IPTV',
			description: 'Einrichtungsanleitungen, Hilfe bei Problemen und Streaming-News vom Net IPTV Team.',
			eyebrow: 'Magazin',
			heading: 'IPTV-News & ',
			accent: 'Anleitungen',
			intro: 'Praktische Anleitungen, ehrliche Vergleiche und Lösungen, die funktionieren, getestet auf echten Geräten.',
			introEmpty: 'Wir schreiben gerade die ersten Artikel. Erwarte praktische Anleitungen statt Pressemitteilungen.',
			topicsLabel: 'Blog-Themen',
			soon: 'Die ersten Artikel erscheinen bald',
		},
		topic: {
			eyebrow: 'Blog-Thema',
			browseAll: 'Alle Artikel ansehen',
		},
		clusters: {
			fundamentals: { name: 'IPTV-Grundlagen', description: 'Was IPTV ist, wie es funktioniert, was du zu Hause brauchst und welche Regeln gelten.' },
			compare: { name: 'Beste IPTV-Anbieter & Vergleiche', description: 'Unabhängige Vergleiche, die dir bei der Wahl eines Dienstes helfen und die schlechten aussortieren.' },
			'free-trial': { name: 'Gratis-Tests & kostenloses IPTV', description: 'Wie du einen Dienst vor dem Bezahlen testest und was „kostenloses IPTV“ dich wirklich kostet.' },
			sports: { name: 'Sport mit IPTV', description: 'Jede Liga, jeder Kampfabend und jedes Rennen: was abgedeckt ist und wie du es live schaust.' },
			'watch-abroad': { name: 'Fernsehen im Ausland', description: 'Für Expats und Reisende: deine Heimatsender, in deiner Sprache, wo immer du lebst.' },
			devices: { name: 'Geräte & Einrichtung', description: 'Schritt-für-Schritt-Anleitungen für jeden Bildschirm im Haus.' },
			'apps-players': { name: 'Apps & Player', description: 'Welche Player-App du nutzen solltest, wie du sie einrichtest und wie die beliebten Apps im Vergleich abschneiden.' },
			'playlists-m3u': { name: 'Playlists, M3U & Xtream', description: 'M3U-Links, Xtream-Codes-Zugänge und EPG-Quellen, erklärt und richtig eingerichtet.' },
			troubleshooting: { name: 'Hilfe & Fehlerbehebung', description: 'Puffern, eingefrorene Sender, fehlende Programmdaten und Login-Fehler, Schritt für Schritt behoben.' },
		},
		author: {
			role: 'Spezialisten für Streaming & Einrichtung',
			bio: 'Unser Redaktionsteam testet jede Player-App, jedes Gerät und jeden Einrichtungsschritt auf echter Hardware und echten Verbindungen, bevor er in einen Ratgeber kommt. Wir aktualisieren Artikel, wenn sich Apps, Preise oder Menüs ändern.',
		},
	},

	pages: {
		features: {
			title: 'Funktionen | Net IPTV',
			description:
				'4K-Streaming, kein Puffern, 24/7 Support und Kompatibilität mit jedem Gerät, das du schon besitzt.',
			eyebrow: 'Das bekommst du',
			heading: 'Alle ',
			accent: 'Funktionen im Überblick',
			intro:
				'Gebaut auf einem globalen 20-Gbit/s-Netz mit adaptiver Bitrate, Anti-Freeze-Technologie und menschlichem Support rund um die Uhr.',
		},
		pricing: {
			title: 'Preise & Tarife | Net IPTV',
			description:
				'Abos ab 15 € im Monat oder 70 € im Jahr mit 2 Gratismonaten. Sofortige Aktivierung, 7 Tage Geld-zurück-Garantie, jederzeit kündbar.',
			eyebrow: 'Tarife & Preise',
			heading: 'Ein Abo, ',
			accent: 'alles inklusive',
			intro:
				'Keine Verträge, keine Hardware und keine versteckten Gebühren. Jeder Tarif enthält die komplette Bibliothek: Wähle die Laufzeit, die zu dir passt.',
		},
		faq: {
			title: 'FAQ | Net IPTV',
			description:
				'Antworten zu Aktivierungszeiten, unterstützten Geräten, nötiger Internetgeschwindigkeit, gleichzeitigen Verbindungen und Erstattungen.',
			eyebrow: 'Support',
			heading: 'Fragen, ',
			accent: 'beantwortet',
			intro:
				'Alles, was Leute vor dem Abschluss fragen. Ist deine Frage nicht dabei, antwortet der Live-Chat in wenigen Minuten.',
		},
		devices: {
			title: 'Unterstützte Geräte & Einrichtung | Net IPTV',
			description:
				'Schritt-für-Schritt-Einrichtung für Smart TV, Fire Stick, Android, iOS, MAG-Boxen, Windows, macOS und Spielkonsolen.',
			eyebrow: 'Kompatibilität',
			heading: 'Läuft auf den Geräten, ',
			accent: 'die du schon hast',
			intro:
				'Ein Abo für jeden Bildschirm im Haus. Die meisten schauen schon fünf Minuten nach dem Kauf.',
			guidesEyebrow: 'Einrichtungsanleitungen',
			guidesTitle: 'Installiert in ',
			guidesAccent: 'fünf Minuten',
			guidesDescription:
				'Wähle deine Plattform und folge den Schritten. Wenn du lieber Hilfe möchtest, kann der Support per Bildschirmfreigabe mit dir einrichten.',
			needHand: 'Brauchst du Hilfe? Sprich mit dem Support',
			setups: [
				{
					platform: 'Smart TV (Samsung / LG)',
					time: '3 Min.',
					steps: [
						'Öffne den App Store deines Fernsehers und installiere Smart IPTV oder IBO Player.',
						'Notiere die MAC-Adresse, die die App beim ersten Start anzeigt.',
						'Schick diese MAC-Adresse an unseren Support-Chat, und wir aktivieren das Gerät.',
						'Starte die App neu: Deine komplette Senderliste lädt automatisch.',
					],
				},
				{
					platform: 'Amazon Fire Stick',
					time: '4 Min.',
					steps: [
						'Aktiviere unter Einstellungen → Mein Fire TV → Entwickleroptionen Apps aus unbekannten Quellen.',
						'Installiere die App Downloader und gib den Link aus deiner Willkommens-E-Mail ein.',
						'Öffne den installierten Player und melde dich mit Benutzername und Passwort an.',
						'Wähle eine Kategorie und leg los.',
					],
				},
				{
					platform: 'Android & iOS',
					time: '2 Min.',
					steps: [
						'Installiere IBO Pro Player oder IBO Player aus Google Play oder dem App Store.',
						'Öffne die App und schick uns einen Screenshot deiner MAC-Adresse und Geräte-ID: Wir fügen die Playlist für dich zu deinem Gerät hinzu.',
						'Die Bibliothek synchronisiert sich in wenigen Sekunden und ist über mobile Daten oder WLAN bereit.',
					],
				},
				{
					platform: 'MAG Box & Windows / macOS',
					time: '5 Min.',
					steps: [
						'Geh bei MAG zu Einstellungen → Server → Portale und gib die Portal-URL ein, die wir dir geschickt haben.',
						'Installiere am Computer VLC oder MyIPTV Player und lade den Link zur M3U-Playlist.',
						'Starte das Gerät neu, damit das Portal aktualisiert wird.',
						'Sender, Filme und Serien erscheinen in getrennten Reitern.',
					],
				},
			],
		},
		contact: {
			title: 'Kontakt | Net IPTV',
			description:
				'Sprich mit dem Net IPTV Support über WhatsApp, Live-Chat oder E-Mail. Rund um die Uhr erreichbar, meist innerhalb weniger Minuten.',
			eyebrow: 'Kontakt',
			heading: 'Wir antworten in ',
			accent: 'Minuten, nicht Tagen',
			intro:
				'Frage vor dem Kauf, Problem bei der Einrichtung oder Thema zur Abrechnung: Wähle einfach den Kanal, der dir am besten passt.',
			whatsappMessage: 'Hallo! Ich möchte mehr über eure IPTV-Tarife erfahren.',
			preferWhatsapp: 'Lieber WhatsApp?',
			preferWhatsappBody:
				'Schreib uns direkt, und wir helfen dir bei Tarifen, einem kostenlosen Test oder der Einrichtung auf deinem Gerät, ohne Formulare und ohne Ticketnummern.',
			chatOnWhatsapp: 'Auf WhatsApp chatten',
			repliesUnder: 'Antwort in unter 5 Minuten',
			channels: {
				whatsapp: { title: 'WhatsApp', description: 'Der schnellste Weg zu einem Menschen. Antwort meist in unter 5 Minuten.' },
				email: { title: 'E-Mail', description: 'Für Fragen zur Abrechnung, Erstattungen und Reseller-Anfragen.' },
				chat: {
					title: 'Live-Chat',
					description: 'Hilfe bei der Einrichtung, während du vor dem Bildschirm sitzt, mit Bildschirmfreigabe.',
					detail: 'Mo–So, rund um die Uhr',
				},
			},
			formTitle: 'Schreib uns eine Nachricht',
			formIntro: 'Gib deine Bestell-E-Mail an, wenn es um ein bestehendes Abo geht.',
			name: 'Dein Name',
			namePlaceholder: 'Max Mustermann',
			email: 'E-Mail-Adresse',
			emailPlaceholder: 'du@beispiel.de',
			subject: 'Betreff',
			subjects: [
				{ value: 'Before I subscribe', label: 'Vor dem Abschluss' },
				{ value: 'Setup help', label: 'Hilfe bei der Einrichtung' },
				{ value: 'Billing or refund', label: 'Abrechnung oder Erstattung' },
				{ value: 'Reseller programme', label: 'Reseller-Programm' },
				{ value: 'Something else', label: 'Etwas anderes' },
			],
			message: 'Nachricht',
			messagePlaceholder: 'Sag uns, welches Gerät du nutzt und was du brauchst…',
			noscript: (email: string) =>
				`Dieses Formular benötigt JavaScript. Du erreichst uns stattdessen auf WhatsApp oder unter ${email}.`,
			send: 'Nachricht senden',
			sending: 'Wird gesendet…',
			success: 'Danke! Deine Nachricht ist unterwegs.',
			error: 'Etwas ist schiefgelaufen. Bitte versuch es erneut.',
			network: 'Der Server ist nicht erreichbar. Prüfe deine Verbindung und versuch es erneut.',
			useServerMessages: false,
			setupInstead: 'Suchst du eher eine Einrichtungsanleitung?',
			browseGuides: 'Zu den Geräte-Anleitungen →',
		},
		legal: {
			eyebrow: 'Rechtliches',
			lastUpdated: (date: string) => `Zuletzt aktualisiert am ${date}.`,
			onThisPage: 'Auf dieser Seite',
			templateNotice: 'Hinweis zur Vorlage:',
			contactUs: 'Kontakt aufnehmen',
		},
		terms: {
			title: 'Allgemeine Geschäftsbedingungen | Net IPTV',
			description:
				'Die Bedingungen für dein Net IPTV Abo: Konten, Zahlung, Erstattungen, Verfügbarkeit und Haftung.',
			pageTitle: 'Allgemeine ',
			accent: 'Geschäftsbedingungen',
			lastUpdated: '17. September 2026',
			notice:
				'Diese Seite ist ein Platzhaltertext aus dem Theme. Ersetze ihn durch Bedingungen, die von einer qualifizierten Anwältin oder einem Anwalt für deine Rechtsordnung erstellt oder geprüft wurden, bevor du Zahlungen annimmst.',
			ctaHeading: 'Noch Fragen?',
			ctaBody: 'Der Support klärt vor dem Abschluss gern alles, was hier steht.',
			sections: [
				{
					id: 'acceptance',
					heading: '1. Annahme der Bedingungen',
					body: [
						'Mit dem Abschluss eines Abos oder der Nutzung des Net IPTV Dienstes stimmst du diesen Allgemeinen Geschäftsbedingungen zu. Wenn du einem Teil davon nicht zustimmst, nutze den Dienst nicht.',
						'Wir können diese Bedingungen von Zeit zu Zeit ändern. Wesentliche Änderungen kündigen wir mindestens 14 Tage vor Inkrafttreten per E-Mail an die Adresse in deinem Konto an. Nutzt du den Dienst nach diesem Datum weiter, gilt dies als Zustimmung zu den geänderten Bedingungen.',
					],
				},
				{
					id: 'service',
					heading: '2. Beschreibung des Dienstes',
					body: [
						'Net IPTV bietet Zugang zu Streaming-Medien über das öffentliche Internet. Der Dienst wird als Software und Zugangsdaten bereitgestellt; es wird keine physische Hardware geliefert.',
						'Die Verfügbarkeit von Sendern und Inhalten variiert je nach Region und kann sich ohne Ankündigung ändern, wenn sich unsere Vereinbarungen mit Zulieferern ändern. Wir garantieren nicht, dass ein bestimmter Sender, ein bestimmtes Ereignis oder ein bestimmter Titel während der gesamten Laufzeit deines Abos verfügbar bleibt.',
					],
				},
				{
					id: 'accounts',
					heading: '3. Konten und zulässige Nutzung',
					body: [
						'Deine Zugangsdaten gelten nur für deinen Haushalt. Die Anzahl der gleichzeitigen Verbindungen in deinem Tarif wird beim Kauf angegeben; wird sie überschritten, kann das Konto vorübergehend gesperrt werden.',
						'Du darfst den Dienst oder seine Inhalte ohne schriftliche Reseller-Vereinbarung mit uns nicht weiterverkaufen, unterlizenzieren, öffentlich ausstrahlen oder weiterverbreiten. Konten, deren Zugangsdaten öffentlich geteilt werden, können ohne Erstattung gekündigt werden.',
						'Du bist dafür verantwortlich, deine Zugangsdaten vertraulich zu behandeln, und für alle Aktivitäten unter deinem Konto.',
					],
				},
				{
					id: 'payment',
					heading: '4. Zahlung, Verlängerung und Kündigung',
					body: [
						'Abogebühren werden im Voraus für die gewählte Laufzeit berechnet. Preise werden, wo erforderlich, inklusive der geltenden Steuern angezeigt.',
						'Abos verlängern sich nicht automatisch, außer du stimmst dem beim Kauf ausdrücklich zu. Ist die automatische Verlängerung aktiv, kannst du jederzeit in deinem Konto oder über den Support kündigen; die Kündigung wird zum Ende der laufenden Laufzeit wirksam.',
					],
				},
				{
					id: 'refunds',
					heading: '5. Erstattungen',
					body: [
						'Wir bieten eine 7-tägige Geld-zurück-Garantie ab dem Datum der ersten Aktivierung. Für eine Erstattung kontaktiere den Support innerhalb dieser Frist; wir erstatten auf die ursprüngliche Zahlungsmethode, in der Regel innerhalb von fünf Werktagen.',
						'Die Garantie gilt nicht, wenn der Dienst unter Verstoß gegen Abschnitt 3 genutzt wurde, und nicht für Verlängerungen über die erste Abo-Laufzeit hinaus.',
					],
				},
				{
					id: 'availability',
					heading: '6. Verfügbarkeit und Support',
					body: [
						'Wir streben eine monatliche Verfügbarkeit von 99,9 % an, garantieren aber keinen unterbrechungsfreien Dienst. Geplante Wartungen kündigen wir, wo möglich, im Voraus an.',
						'Die Servicequalität hängt von deiner eigenen Internetverbindung, deinem Gerät und deinem lokalen Netzwerk ab, die außerhalb unserer Kontrolle liegen. Support ist rund um die Uhr per Live-Chat und WhatsApp erreichbar.',
					],
				},
				{
					id: 'liability',
					heading: '7. Haftungsbeschränkung',
					body: [
						'Soweit gesetzlich zulässig, ist unsere Gesamthaftung im Zusammenhang mit dem Dienst auf den Betrag begrenzt, den du uns in den zwölf Monaten vor dem Anspruch gezahlt hast.',
						'Wir haften nicht für indirekte, zufällige oder Folgeschäden, einschließlich entgangener Gewinne oder Datenverlusten, die aus der Nutzung oder Nichtnutzbarkeit des Dienstes entstehen.',
					],
				},
				{
					id: 'termination',
					heading: '8. Beendigung',
					body: [
						'Wir können deinen Zugang sperren oder beenden, wenn du gegen wesentliche Punkte dieser Bedingungen verstößt, eine Zahlung fehlschlägt oder es gesetzlich oder von einem Zulieferer verlangt wird.',
						'Du kannst die Nutzung des Dienstes jederzeit beenden. Abschnitte, die ihrer Natur nach über die Beendigung hinaus gelten sollen, einschließlich der Haftungsbeschränkung, gelten weiter.',
					],
				},
				{
					id: 'contact',
					heading: '9. Kontakt',
					body: [
						'Fragen zu diesen Bedingungen kannst du an legal@netiptv.example senden oder über einen der Kanäle auf unserer Kontaktseite stellen.',
					],
				},
			],
		},
		privacy: {
			title: 'Datenschutzerklärung | Net IPTV',
			description:
				'Welche Daten Net IPTV erhebt, warum wir sie verarbeiten, wie lange wir sie speichern und welche Rechte du hast.',
			pageTitle: 'Unsere ',
			accent: 'Datenschutzerklärung',
			lastUpdated: '17. September 2026',
			notice:
				'Dieser Text stammt aus dem Theme und beschreibt ein typisches Setup. Eine Datenschutzerklärung muss widerspiegeln, was deine eigene Technik tatsächlich erhebt. Lass sie vor dem Start von einer Anwältin oder einem Anwalt prüfen.',
			ctaHeading: 'Möchtest du deine Daten löschen lassen?',
			ctaBody: 'Schick uns eine Anfrage, und wir bestätigen sie innerhalb von 30 Tagen.',
			sections: [
				{
					id: 'overview',
					heading: '1. Überblick',
					body: [
						'Diese Erklärung beschreibt, welche personenbezogenen Daten Net IPTV erhebt, warum wir sie erheben, wie lange wir sie speichern und welche Rechte du daran hast.',
						'Wir erheben nur das Minimum, das zum Verkauf und zur Bereitstellung eines Streaming-Abos nötig ist. Wir verkaufen keine personenbezogenen Daten an Dritte.',
					],
				},
				{
					id: 'collect',
					heading: '2. Welche Daten wir erheben',
					body: [
						'Kontodaten: die E-Mail-Adresse, die du beim Kauf angibst, dein gewählter Tarif und dein Abo-Status.',
						'Zahlungsdaten: werden von unserem Zahlungsdienstleister verarbeitet. Wir erhalten eine Transaktionsreferenz und die letzten vier Ziffern der Karte; vollständige Kartennummern sehen oder speichern wir nie.',
						'Technische Daten: IP-Adresse, Gerätetyp und Player-Version, erfasst, wenn sich dein Gerät mit unseren Servern verbindet. Damit setzen wir das Limit gleichzeitiger Verbindungen deines Tarifs durch und analysieren Streaming-Störungen.',
						'Support-Daten: der Inhalt der Nachrichten, die du uns per E-Mail, Live-Chat oder WhatsApp sendest.',
					],
				},
				{
					id: 'why',
					heading: '3. Warum wir sie verarbeiten',
					body: [
						'Zur Erfüllung unseres Vertrags mit dir: Erstellen von Zugangsdaten, Bereitstellen des Streams, Abrechnung und Bearbeitung von Erstattungen.',
						'Aufgrund unserer berechtigten Interessen: Verhinderung von Account-Sharing und Betrug, Überwachung der Servicequalität und Verbesserung unserer Infrastruktur.',
						'Zur Erfüllung gesetzlicher Pflichten: Aufbewahrung von Transaktionsbelegen für Steuer- und Buchhaltungszwecke.',
					],
				},
				{
					id: 'cookies',
					heading: '4. Cookies und Analyse',
					body: [
						'Diese Website verwendet unbedingt erforderliche Cookies, damit deine Sitzung funktioniert. Analyse- oder Werbe-Cookies werden erst nach deiner Einwilligung gesetzt, und du kannst diese Einwilligung jederzeit in deinen Browsereinstellungen widerrufen.',
					],
				},
				{
					id: 'sharing',
					heading: '5. An wen wir Daten weitergeben',
					body: [
						'An Zahlungsdienstleister, um Zahlungen abzuwickeln und Erstattungen auszuführen. An Hosting- und CDN-Anbieter, um den Dienst bereitzustellen. An Support-Tools, um deine Nachrichten zu bearbeiten.',
						'Jeder Auftragsverarbeiter ist vertraglich verpflichtet, die Daten nur nach unseren Weisungen zu verwenden. Außerdem geben wir Daten weiter, wenn wir gesetzlich dazu verpflichtet sind.',
					],
				},
				{
					id: 'retention',
					heading: '6. Wie lange wir sie speichern',
					body: [
						'Kontodaten werden gespeichert, solange dein Abo aktiv ist, und danach 24 Monate lang, damit wir ein Konto reaktivieren oder einen Abrechnungsstreit klären können.',
						'Verbindungsprotokolle werden 30 Tage gespeichert. Finanzunterlagen bewahren wir so lange auf, wie es das geltende Steuerrecht verlangt.',
					],
				},
				{
					id: 'rights',
					heading: '7. Deine Rechte',
					body: [
						'Je nach Wohnort hast du das Recht auf Auskunft, Berichtigung, Datenübertragbarkeit oder Löschung deiner personenbezogenen Daten, das Recht, bestimmten Verarbeitungen zu widersprechen, und das Recht auf Beschwerde bei deiner Datenschutzbehörde.',
						'Um eines dieser Rechte auszuüben, schreib an privacy@netiptv.example. Wir antworten innerhalb von 30 Tagen und bitten dich eventuell vorher, deine Identität zu bestätigen.',
					],
				},
				{
					id: 'security',
					heading: '8. Sicherheit',
					body: [
						'Der Datenverkehr zu dieser Website und zu unserem Panel ist während der Übertragung verschlüsselt. Der Zugriff auf Kundendaten ist auf Mitarbeitende beschränkt, die ihn benötigen, und Zugangsdaten werden mit branchenüblichem Hashing gespeichert.',
						'Kein System ist vollkommen sicher. Betrifft eine Datenpanne deine personenbezogenen Daten, informieren wir dich und die zuständige Behörde, wie gesetzlich vorgeschrieben.',
					],
				},
				{
					id: 'children',
					heading: '9. Kinder',
					body: [
						'Der Dienst richtet sich nicht an Kinder unter 16 Jahren, und wir erheben wissentlich keine Daten von ihnen. Eltern, die glauben, dass ihr Kind uns personenbezogene Daten übermittelt hat, können uns kontaktieren, und wir löschen sie.',
					],
				},
				{
					id: 'contact',
					heading: '10. Kontakt',
					body: [
						'Datenschutzfragen und Anfragen zu deinen Daten richtest du an privacy@netiptv.example oder über einen der Kanäle auf unserer Kontaktseite.',
					],
				},
			],
		},
	},
};
