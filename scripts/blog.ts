/**
 * Blog strategy CLI. Reads the registry in src/data/blog-strategy.ts and the
 * posts in src/content/blog/ — no build needed.
 *
 *   npm run blog -- find "iptv on firestick"   who owns this keyword? what is close?
 *   npm run blog -- status                     coverage per cluster
 *   npm run blog -- next [count]               what to write next, in order
 *
 * Runs on Node's built-in TypeScript type stripping (Node 22.18+ / 24).
 */
import { readdirSync, readFileSync } from 'node:fs';
import {
	CLUSTERS,
	KEYWORD_MAP,
	PILLAR_SLUG,
	RESERVED_KEYWORDS,
	type KeywordEntry,
} from '../src/data/blog-strategy.ts';

const CONTENT_DIR = new URL('../src/content/blog/', import.meta.url);

// Spellings searchers use interchangeably, folded to one form before comparing.
const SYNONYMS: [RegExp, string][] = [
	[/\bfire\s?(tv\s?)?stick\b|\bfire\s?tv\b/g, 'firestick'],
	[/\b(set\s?up|setup|install(ation)?|configure)\b/g, 'setup'],
	[/\b(apps?|players?)\b/g, 'app'],
	[/\b(m3u8?|playlists?|lists?)\b/g, 'playlist'],
	[/\bfree trial|trial\b/g, 'trial'],
	[/\b(usa|us|american)\b/g, 'us'],
	[/\b(uk|british)\b/g, 'uk'],
];

const normalize = (k: string) => {
	let s = k.toLowerCase().replace(/\b(19|20)\d{2}\b/g, '').replace(/[^a-z0-9]+/g, ' ');
	for (const [pattern, to] of SYNONYMS) s = s.replace(pattern, to);
	return s.replace(/\s+/g, ' ').trim();
};

// Words too common in this niche to signal overlap on their own.
const STOP = new Set(['iptv', 'the', 'a', 'an', 'for', 'on', 'to', 'in', 'of', 'how', 'is', 'do', 'you', 'with', 'what', 'best']);
const tokens = (k: string) => new Set(normalize(k).split(' ').filter((t) => t && !STOP.has(t)));

function similarity(a: string, b: string): number {
	const ta = tokens(a);
	const tb = tokens(b);
	if (!ta.size || !tb.size) return 0;
	const shared = [...ta].filter((t) => tb.has(t)).length;
	return shared / new Set([...ta, ...tb]).size;
}

/** slug → 'published' | 'draft' for every Markdown file in the content dir. */
function postStates(): Map<string, 'published' | 'draft'> {
	const states = new Map<string, 'published' | 'draft'>();
	for (const file of readdirSync(CONTENT_DIR)) {
		if (!file.endsWith('.md')) continue;
		const source = readFileSync(new URL(file, CONTENT_DIR), 'utf8');
		const draft = /^draft:\s*true\s*$/m.test(source.split(/^---$/m)[1] ?? '');
		states.set(file.replace(/\.md$/, ''), draft ? 'draft' : 'published');
	}
	return states;
}

const states = postStates();
const stateOf = (slug: string) => states.get(slug) ?? 'planned';
const describe = (e: KeywordEntry) =>
	`/blog/${e.slug}  [${e.cluster} · ${e.role} · ${e.intent} · P${e.priority} · ${stateOf(e.slug)}]`;

function find(query: string): void {
	const q = normalize(query);
	if (!q) return console.log('Usage: npm run blog -- find "<keyword>"');

	for (const r of RESERVED_KEYWORDS) {
		if (r.keywords.some((k) => normalize(k) === q)) {
			console.log(`RESERVED → owned by the page ${r.owner}. Do not write a blog post for it; improve ${r.owner} instead.`);
			return;
		}
	}
	const exact = KEYWORD_MAP.find((e) => [e.keyword, ...e.variants].some((k) => normalize(k) === q));
	if (exact) {
		const as = normalize(exact.keyword) === q ? 'primary keyword' : 'variant';
		console.log(`OWNED (${as}) → ${describe(exact)}`);
		console.log(stateOf(exact.slug) === 'planned'
			? 'Write this planned article; the keyword belongs to it.'
			: 'Update this existing article instead of writing a new one.');
		return;
	}

	console.log(`"${query}" is not in the keyword map.\n`);
	const close = KEYWORD_MAP.map((e) => ({
		e,
		score: Math.max(...[e.keyword, ...e.variants].map((k) => similarity(query, k))),
	}))
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 6);

	if (!close.length) {
		console.log('No overlapping entries. Classify it with the routing rules in docs/blog/STRATEGY.md §4.');
		return;
	}
	console.log('Closest existing entries (overlap score 0–1):');
	for (const { e, score } of close) console.log(`  ${score.toFixed(2)}  "${e.keyword}"  ${describe(e)}`);
	if (close[0].score >= 0.5) {
		console.log('\nHigh overlap: probably the same search intent. Add it as a variant of the top entry rather than a new article.');
	}
}

function status(): void {
	const published = KEYWORD_MAP.filter((e) => stateOf(e.slug) === 'published').length;
	console.log(`Published ${published} / ${KEYWORD_MAP.length} mapped articles\n`);
	for (const c of CLUSTERS) {
		const rows = KEYWORD_MAP.filter((e) => e.cluster === c.id);
		const done = rows.filter((e) => stateOf(e.slug) === 'published').length;
		const share = published ? Math.round((done / published) * 100) : 0;
		const hub = c.hub === PILLAR_SLUG ? 'pillar' : stateOf(c.hub);
		const cap = c.maxShare ? ` (cap ${c.maxShare * 100}%)` : '';
		console.log(`${c.name.padEnd(26)} ${String(done).padStart(2)}/${String(rows.length).padEnd(3)} weight ${c.weight}  share ${share}%${cap}  hub: ${hub}`);
	}
	const drafts = [...states].filter(([, s]) => s === 'draft').map(([slug]) => slug);
	if (drafts.length) console.log(`\nDrafts: ${drafts.join(', ')}`);
	const unmapped = [...states.keys()].filter((slug) => !KEYWORD_MAP.some((e) => e.slug === slug));
	if (unmapped.length) console.log(`\nNOT IN KEYWORD MAP (build will fail): ${unmapped.join(', ')}`);
}

/**
 * Order: pillar first, then every cluster hub (spokes need a live hub to link
 * up to), then spokes. Within a tier, money clusters (weight 2) and higher
 * priority win; a cluster over its share cap drops to the end.
 */
function next(count: number): void {
	const published = KEYWORD_MAP.filter((e) => stateOf(e.slug) === 'published');
	const overCap = (e: KeywordEntry) => {
		const cap = CLUSTERS.find((c) => c.id === e.cluster)?.maxShare;
		if (!cap || published.length < 10) return false;
		return published.filter((p) => p.cluster === e.cluster).length / published.length >= cap;
	};
	const tier = (e: KeywordEntry) => (e.role === 'pillar' ? 0 : e.role === 'hub' ? 1 : 2);
	const weight = (e: KeywordEntry) => CLUSTERS.find((c) => c.id === e.cluster)?.weight ?? 1;
	const hubLive = (e: KeywordEntry) => {
		const hub = CLUSTERS.find((c) => c.id === e.cluster)?.hub;
		return !hub || stateOf(hub) === 'published';
	};

	const queue = KEYWORD_MAP.filter((e) => stateOf(e.slug) !== 'published').sort(
		(a, b) =>
			Number(overCap(a)) - Number(overCap(b)) ||
			tier(a) - tier(b) ||
			Number(hubLive(b)) - Number(hubLive(a)) ||
			a.priority * (3 - weight(a)) - b.priority * (3 - weight(b)) ||
			a.priority - b.priority,
	);

	console.log(`Next ${Math.min(count, queue.length)} articles to write:\n`);
	queue.slice(0, count).forEach((e, i) => {
		const note = e.role === 'spoke' && !hubLive(e) ? '  (hub not live yet)' : overCap(e) ? '  (cluster over cap)' : '';
		console.log(`${String(i + 1).padStart(2)}. "${e.keyword}"  ${describe(e)}${note}`);
	});
}

const [command = 'status', ...rest] = process.argv.slice(2);
if (command === 'find') find(rest.join(' '));
else if (command === 'next') next(Number(rest[0]) || 10);
else if (command === 'status') status();
else console.log('Commands: find "<keyword>" | status | next [count]');
