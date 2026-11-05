# Net IPTV — Blog Strategy

The operating manual for the Net IPTV blog: how it is structured, how a keyword becomes an article, and the rules every article follows. Market: **global English** (UK, US, Canada, Australia, Ireland and English-speaking expats).

| File | Role |
|---|---|
| `docs/blog/STRATEGY.md` | This document: architecture and rules |
| `docs/blog/ARTICLE_SPEC.md` | Frontmatter reference, article templates per role, pre-publish checklist |
| `src/data/blog-strategy.ts` | **The registry**: pillar, clusters, keyword map, reserved keywords, authors, limits |
| `.claude/skills/blog-article/SKILL.md` | The step-by-step workflow Claude follows when given a keyword |
| `scripts/blog.ts` | `npm run blog -- find / status / next` |

---

## 1. What we took from Portugal IPTV, and what we changed

Portugal IPTV (AstroWind, ~46 posts) was studied before building this system. Its playbook (`IPTV_ASTRO_SEO_STRATEGY.md`) and its own pillar/cluster audit (`SEO_PILLAR_CLUSTER_PLAN.md`) give both the method and the lessons.

**Kept: what worked**

- **Pillar → cluster → spoke model**, with clusters mapped to search intent rather than to vague categories.
- **Money clusters weighted 2×** in the publishing rotation (comparisons, free trial, sports, diaspora), and technical clusters 1×.
- **Answer-first writing for AI Overviews (GEO)**: a TL;DR box, a 40–60 word direct answer under each H2, a self-contained answer in the first 100 words, specific numbers over adjectives.
- **Schema on every post**: BreadcrumbList, BlogPosting and FAQPage from frontmatter, plus HowTo for setup guides.
- **Auto-injected CTAs**: a build-time plugin places CTAs at the article's decision points, so no button HTML lives in Markdown.
- **A jump-link "quick questions" block** near the top, answered in paragraphs further down.
- **E-E-A-T**: a visible byline, a visible "Updated" date, an author bio, and one outbound authority link.
- **llms.txt**, a sitemap, and a robots.txt with a Sitemap line.

**Fixed: what went wrong there**

| Problem on Portugal IPTV | Fix built into this system |
|---|---|
| Every post had `category: Tutoriais`, so the clusters existed only on paper | `cluster` and `role` are required, validated fields; topic pages and related links derive from them |
| Two pairs of cannibalising posts (`playlist-iptv-portugal` vs `iptv-playlist-portugal`, `m3u-iptv` vs `portugal-iptv-m3u`) | One keyword → one URL. Variants are listed on the owning row, and the **build fails** on a duplicate. `npm run blog -- find` flags near-duplicates before writing |
| The Apps cluster grew to over a third of the blog and converts worst | Apps is capped at **20%**; the build warns, and `next` deprioritises it |
| Troubleshooting cluster missing; diaspora "the biggest missed opportunity" | Both are first-class clusters from day one (`troubleshooting`, `watch-abroad`) |
| Hubs and the "related guides" box were planned but never built | Hubs are defined per cluster; a related-guides box (pillar → hub → siblings) renders automatically under every post |
| Linking rules were documented but not checked | The build checks broken links, links to unpublished posts, missing upward links, link count and the pricing link |
| Absolute URLs hard-coded in Markdown (the domain moved once) | **Root-relative** links (`/blog/slug`), validated at build; canonicals and schema use the configured site URL |
| FAQs written twice (body H3s and frontmatter) | FAQs live **only** in frontmatter; the page renders them and the schema from the same data |
| Flat 4,000-word floor for every post | Length by role: pillar 4,000+, hub 3,000+, spoke 1,800+ (and longer when the results page demands it) |
| No validation that a post matched the plan | A post can only build if its slug, cluster, role and keyword match its keyword-map row |

---

## 2. Architecture

```
                         ┌──────────────────────────────┐
   Homepage / Pricing ◀──┤  PILLAR  /blog/iptv-guide     │  "what is iptv"
   (money pages)         │  links down to every hub      │
                         └──────────────┬───────────────┘
            ┌──────────────┬────────────┼────────────┬──────────────┐
            ▼              ▼            ▼            ▼              ▼
       HUB compare   HUB free-trial  HUB sports  HUB watch-abroad  … 8 hubs
       best-iptv-    iptv-free-      iptv-for-   watch-tv-abroad
       service       trial           sports
            │              │            │            │
       ┌────┼────┐    ┌────┼───┐   ┌────┼────┐   ┌────┼────┐
       ▼    ▼    ▼    ▼    ▼   ▼   ▼    ▼    ▼   ▼    ▼    ▼
     SPOKES (one keyword each) ── link up to hub + pillar, across to siblings
```

- **Pillar** (exactly one): the broad guide for the head topic. It is also the hub of `fundamentals`.
- **Hub** (one per cluster): the strongest article for the cluster's head keyword. It introduces every spoke in its cluster.
- **Spoke**: one specific query. It links up to its hub and the pillar, and sideways to 2–4 siblings.
- **Money pages** (`/`, `/pricing`, …) own the transactional head terms (see `RESERVED_KEYWORDS`). The blog feeds them; it never competes with them.

### URLs and pages

| URL | Source | Notes |
|---|---|---|
| `/blog` | `src/pages/blog/index.astro` | All posts, pillar first, with topic links. Shows placeholders until the first post |
| `/blog/<slug>` | `src/pages/blog/[slug].astro` | Article page; `<slug>` = filename in `src/content/blog/` |
| `/blog/topic/<cluster>` | `src/pages/blog/topic/[cluster].astro` | Cluster archive, hub first. `noindex` and out of the sitemap until the cluster has 3 posts |
| `/llms.txt` | `src/pages/llms.txt.ts` | Generated: core pages + posts grouped by cluster |
| `/robots.txt`, `/sitemap-index.xml` | generated | Sitemap URLs match canonicals (no trailing slash) |

### What every article page renders automatically

Breadcrumbs (visible and schema) · cluster badge · H1 · lead (meta description) · byline with "Updated" date and reading time · cover · **Key takeaways** box · "On this page" contents (3+ H2s) · body · **mid-article CTAs** (by H2 count) · **FAQ** accordion · closing trial CTA · author bio · **related guides** (pillar → hub → siblings; on a hub, all spokes; on the pillar, all hubs) · JSON-LD: BreadcrumbList, BlogPosting, FAQPage and HowTo when `howto` is set.

The writer supplies only the frontmatter and the body. Everything else is consistent by construction.

---

## 3. Pillar and clusters

| Cluster (`id`) | Weight | Hub article → head keyword | Owns |
|---|---|---|---|
| **IPTV Basics** (`fundamentals`) | 1 | `/blog/iptv-guide` → *what is iptv* (**pillar**) | what/how/meaning, legality, safety, VPN, speed and bandwidth, connections, catch-up, glossary |
| **Best IPTV & Comparisons** (`compare`) | **2** | `/blog/best-iptv-service` → *best iptv service* | best/top/review/legit/reddit about **services**; IPTV vs cable/satellite/streaming; cheap, 4K; choosing a provider, scams |
| **Free Trials & Free IPTV** (`free-trial`) | **2** | `/blog/iptv-free-trial` → *iptv free trial* | trials of any length, no-card trials; anything with "free" |
| **Sports on IPTV** (`sports`) | **2** | `/blog/iptv-for-sports` → *iptv for sports* | a league, team, sport or event + IPTV; PPV and season-pass alternatives |
| **Watch TV Abroad** (`watch-abroad`) | **2** | `/blog/watch-tv-abroad` → *watch tv from home abroad* | watch <country> TV abroad, <language> TV in <country>, diaspora channel packs |
| **Devices & Setup** (`devices`) | 1 | `/blog/how-to-set-up-iptv` → *how to set up iptv* | IPTV on / install on / set up on <device or OS> |
| **Apps & Players** (`apps-players`) | 1, **cap 20%** | `/blog/best-iptv-player` → *best iptv player* | a named player app; best app/player (+ for a device); app vs app |
| **Playlists, M3U & Xtream** (`playlists-m3u`) | 1 | `/blog/m3u-playlist` → *iptv m3u playlist* | M3U/M3U8, playlists, Xtream Codes, portal URLs, EPG source setup |
| **Fixes & Troubleshooting** (`troubleshooting`) | 1 | `/blog/iptv-not-working` → *iptv not working* | not working, buffering, freezing, black screen, no sound, errors, login failed, ISP blocking |

The full keyword map (69 planned articles with variants, intent and priority) lives in `src/data/blog-strategy.ts`. Run `npm run blog -- status` for the live picture.

---

## 4. Classifying a new keyword

Run `npm run blog -- find "<keyword>"` first. Then:

### 4.1 Does it already have an owner?

1. **RESERVED** → a money page owns it. Don't write a post; improve that page.
2. **OWNED** by a planned row → write that article (the keyword is its primary or a variant).
3. **OWNED** by a published row → **update that article** (add a section, refresh the date). Never create a second URL.
4. **High overlap (≥ 0.5)** with an existing row → almost always the same intent. Add the keyword as a **variant** of that row.
5. Otherwise → it's new. Continue with 4.2.

**Same intent test:** if the top 5 Google results for both keywords are largely the same pages, they are one article.

### 4.2 Pick the search intent

| Intent | Signals | Article shape |
|---|---|---|
| `informational` | what is, how does, meaning, explained, is it legal | Explainer: definition first, then mechanics, examples, misconceptions |
| `commercial` | best, top, vs, review, cheap, legit, reddit, alternative | Comparison: criteria, comparison table, verdict per need, how to test |
| `transactional` | free trial, buy, watch <thing> abroad/now | Action: the shortest path to doing it, proof, objections, CTA |
| `howto` | how to install/set up/fix, not working, error | Steps first (numbered), then variations per device, then fixes |

### 4.3 Route to a cluster (first match wins)

1. Contains a **money-page term** (`iptv service`, `subscription`, `price`, `cost`) → reserved. Stop.
2. Contains **"free"** or **"trial"** → `free-trial` (even "free m3u").
3. A **problem**: not working, buffering, error, failed, black screen, not loading/showing → `troubleshooting` (even "tivimate buffering", "firestick epg not showing").
4. A **league, team, sport, event or PPV** → `sports` (even "watch premier league abroad": the event drives the intent).
5. **Abroad / outside / expat / in <country>**, or a language or diaspora pack → `watch-abroad`.
6. A **named player app**, or "best app/player" → `apps-players` (even "best iptv app for firestick": app intent beats device).
7. **M3U, playlist, list, Xtream, portal, EPG source** → `playlists-m3u`.
8. **On / install on / set up on a device or OS** → `devices`.
9. **Best / vs / review / cheap / 4K / legit / reddit** about services or ways to watch TV → `compare`.
10. Anything conceptual → `fundamentals`.

### 4.4 Assign the role

- **hub** only if it is the cluster's head term. Hubs are pre-defined; a new hub means a new cluster, which is a strategy change and needs the user's sign-off.
- **spoke** for everything else.
- A spoke belongs to **exactly one** cluster. If it seems to fit two, the routing order above decides.

### 4.5 Register it

Add a row to `KEYWORD_MAP` **before writing**: slug (short, keyword-led, no year), keyword, variants, cluster, role, intent and priority (1 = high value or low competition, 3 = later). The build refuses a post whose row is missing or mismatched.

---

## 5. Cannibalisation rules

1. **One keyword → one URL.** Every keyword and variant appears once across `KEYWORD_MAP` and `RESERVED_KEYWORDS`; the build fails otherwise.
2. **Word-order and spelling variants are variants**, not new posts: *iptv playlist / playlist iptv / iptv list*, *firestick / fire stick / fire tv*.
3. **Year modifiers never create a new post.** "best iptv 2026" is the "best iptv service" article, refreshed each year (keep the slug without a year; the title may carry it).
4. **Different intent may share words.** *iptv on firestick* (howto, devices) and *best iptv app for firestick* (commercial, apps) are different pages. Each links to the other once.
5. **Never target a reserved keyword** in a title, H1 or meta description. Link to the owning page instead.
6. **When two posts collide anyway:** keep the one with more impressions in Search Console, merge the other's useful sections into it, delete the loser, add a 301 in `vercel.json`, and move the loser's keyword into the winner's `variants`.

---

## 6. Internal linking contract

Contextual links inside the body, in sentences, never as a "see also" list. Root-relative paths (`/blog/slug`, `/pricing`).

| From → to | Pillar | Own hub | Siblings (same cluster) | Bridge cluster | `/pricing` | Home `/` | Max total |
|---|---|---|---|---|---|---|---|
| **Pillar** | — | every hub (required) | best spoke per cluster | — | 1× | 1× | 12* |
| **Hub** | 1× (required) | — | every published spoke | 1–2 neighbouring hubs | 1× | 0–1× | 12* |
| **Spoke** | 1× (required) | 1× (required) | 2–4× | 0–1× (only `bridges`) | 1× if commercial/transactional | 0–1× | 12 |

\* Pillar and hubs may exceed 12 once their cluster grows, because their job is to link down. The warning is advisory for them.

**Bridges** (the clusters a spoke may link into) are defined per cluster in the registry. Examples: troubleshooting → devices and apps; apps → devices and playlists; watch-abroad → fundamentals and devices.

**Anchor text**

- The pillar link uses a keyword-rich anchor ("our complete guide to what IPTV is").
- Vary anchors: never the same exact anchor to two different URLs, and avoid the identical anchor to one URL more than twice site-wide.
- Describe the destination, never "click here".
- Link to a sibling where a reader would naturally ask the next question.

**After publishing a post (the back-link step)**

1. Its **hub** gets a contextual link to it in the matching section.
2. **1–2 sibling spokes** get a contextual link to it.
3. If it's a hub: the **pillar** gets a link to it in that cluster's section.
4. Set `updateDate` on every post you edited.

The related-guides box handles navigation automatically; contextual links carry the ranking signal.

**What the build checks:** broken internal links and links to unpublished posts (error); missing pillar or hub links (warning); more than 12 links (warning); a commercial or transactional post without `/pricing` (warning); a spoke linking outside its bridges (warning).

---

## 7. On-page SEO and GEO rules (summary)

Full detail and templates are in `ARTICLE_SPEC.md`.

- **H1** (`title`) contains the primary keyword; at least **2 H2s** contain it or a close variant.
- **First 100 words**: a complete, self-contained answer to the title's question, including the keyword. No warm-up.
- **Every H2** opens with a **40–60 word direct answer** before any detail.
- **Key takeaways** (3–5 bullets, frontmatter) carry concrete facts: numbers, versions, names.
- **Quick questions** block after the intro: 4–6 jump links to body sections answered in prose.
- **Entity coverage**: at least 15 relevant entities (apps, devices, protocols, codecs, leagues, channels), woven into sentences. See ARTICLE_SPEC §5.
- **At least 1 comparison table** in pillar, hub and commercial posts; **at least 1 troubleshooting section** in howto posts.
- **Specifics beat adjectives**: "Fire OS 7+, 25 Mbps for 4K, H.265", never "works on most devices, fast".
- **Keyword density** about 1% for the primary keyword, then synonyms. Never stuff.
- **E-E-A-T**: first-hand language ("we tested on a Fire TV Stick 4K Max"), 1+ outbound authority link (official app page, Ofcom, FCC, Wikipedia), honest limits.
- **FAQ**: 6+ items in frontmatter, phrased like real searches, different from the quick questions.
- **Meta**: `description` 120–160 characters with the keyword in the first 10 words; `seoTitle` ≤ 60 characters when the H1 is longer.
- **Images**: cover 16:9 in `src/assets/blog/`, alt text describes the image and naturally includes the keyword.
- **Compliance**: never promise specific copyrighted channels "for free", never instruct users to bypass DRM or geo-restrictions illegally, and say plainly that users are responsible for local law. This protects the domain as much as the reader.

---

## 8. Publishing order

`npm run blog -- next` computes the queue:

1. **Pillar first.** Every other post links up to it.
2. **All 8 hubs next.** Spokes need a live hub to link to; hubs make topic pages meaningful.
3. **Spokes by score.** Money clusters (weight 2) and priority-1 rows first. Apps drops to the back once it reaches its 20% share.

A sustainable rhythm is 2–3 posts a week, rotating clusters so no topic goes stale. After every 10 posts, run `status` and rebalance.

**Refresh cadence:** hubs and the pillar every 6 months; "best", sports and price-sensitive posts yearly or when facts change; any post that drops in Search Console. Always set `updateDate`.

---

## 9. Off-page (outside this codebase)

Rankings in IPTV stall at page 2 without signals from elsewhere: links from cord-cutting and tech blogs, being listed in "best IPTV" roundups, helpful (non-spam) answers on Reddit (r/cordcutters, r/IPTV, r/fireTV), and short YouTube setup videos embedded in the matching device and app posts. Track brand searches ("net iptv") in Search Console; above 20% of clicks means the brand is sticking.

---

## 10. Changing the strategy

- **Add a keyword:** a row in `KEYWORD_MAP` (the workflow does this).
- **Add a cluster:** a `ClusterId`, a `CLUSTERS` entry with a hub row, a routing rule in §4.3, and a row in §3. Needs a deliberate decision, not a single keyword.
- **Rename a slug after publishing:** avoid it. If unavoidable, add a 301 in `vercel.json` and update every link (the build lists them).
- **Add an author:** an `AUTHORS` entry, then `author: <id>` in frontmatter.
