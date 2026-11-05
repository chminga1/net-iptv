# Net IPTV — Article Spec

How to build one article. Read `STRATEGY.md` first for where the article fits.

---

## 1. File

`src/content/blog/<slug>.md`. The filename **is** the slug and must match a `KEYWORD_MAP` row in `src/data/blog-strategy.ts` (same cluster, role and primary keyword). Cover art goes in `src/assets/blog/<slug>.(jpg|png|webp)`, 16:9, at least 1440 px wide.

## 2. Frontmatter

```yaml
---
title: "IPTV on Firestick: How to Install It in 5 Minutes (2026)"   # H1, ≤ 90 chars, contains the keyword
seoTitle: "IPTV on Firestick: 5-Minute Install Guide (2026)"          # optional <title>, ≤ 60 chars; " | Net IPTV" is appended
description: "IPTV on Firestick takes about five minutes: enable apps from unknown sources, install Downloader, add a player and sign in."  # 120–160 chars, keyword in first 10 words
excerpt: "Sideloading, player choice and the settings that stop buffering."  # optional card text, ≤ 200 chars
publishDate: 2026-11-10
updateDate: 2026-11-10            # set whenever the post is meaningfully edited
draft: false                      # true = visible in `astro dev` only
author: editorial                 # an AUTHORS id

cluster: devices                  # must equal the KEYWORD_MAP row
role: spoke                       # pillar | hub | spoke — must equal the row
intent: howto                     # informational | commercial | transactional | howto — must equal the row
primaryKeyword: "iptv on firestick"
secondaryKeywords: ["install iptv on firestick", "firestick iptv setup", "fire tv iptv"]

cover: ../../assets/blog/iptv-on-firestick.jpg   # optional until art exists
coverAlt: "Fire TV Stick 4K Max remote next to a TV showing an IPTV player"

keyTakeaways:                     # 3–5 bullets, each a concrete fact
  - "Works on every Fire TV Stick running Fire OS 6 or later, including the 4K Max."
  - "You need Downloader (free, Amazon Appstore) and a player such as TiviMate or IPTV Smarters Pro."
  - "Allow 25 Mbps for 4K channels; 10 Mbps is enough for HD."
faq:                              # 6+ items; rendered on the page and as FAQPage schema
  - q: "Is it legal to install IPTV on a Firestick?"
    a: "Installing a player app is legal. What matters is the service you connect it to: use a licensed provider and follow your local law."
  # …five more
howto:                            # setup guides only → HowTo schema; mirrors the numbered steps in the body
  name: "How to install IPTV on a Firestick"
  totalTime: "PT5M"
  tools: ["Amazon Fire TV Stick", "Downloader app"]
  steps:
    - name: "Allow apps from unknown sources"
      text: "Settings → My Fire TV → Developer options → Install unknown apps → Downloader → On."
    # …
---
```

**Do not put in the body:** an H1 (`#`), a FAQ section (the page renders frontmatter `faq`), CTA buttons (injected automatically), or a "related posts" list (rendered automatically).

---

## 3. Body templates

All templates share this opening, so the first screen answers the query:

```markdown
<Direct answer in 2–3 sentences: the full answer to the title, with the primary keyword in the first sentence. Under 100 words.>

<One short paragraph of context: who this is for and what they'll have at the end. Contains the pillar link where natural.>

## Quick questions

- [How long does it take?](#how-long-does-it-take)
- [Which player app should I use?](#which-player-app-should-you-use)
- [Why is my Firestick buffering?](#fixing-buffering-on-firestick)
- [Can I use it on two TVs?](#using-iptv-on-more-than-one-tv)
```

Jump-link anchors are the auto-generated heading IDs: lowercase, punctuation dropped, spaces become hyphens. "Which Player App Should You Use?" becomes `#which-player-app-should-you-use`. Check every jump link in `astro dev`.

Every `##` section then opens with a **40–60 word answer paragraph** before details, lists or tables.

### 3.1 Spoke · `howto` (devices, apps, playlists, troubleshooting)

```
## What you need before you start        ← device/OS versions, app, credentials, speed
## How to <primary keyword> (step by step)  ← numbered steps, one action each; mirrors frontmatter howto
## <Variation>: <device/model/OS 2>       ← differences per model/version
## Which <app/setting> works best          ← short comparison table
## Fixing <the 3 most common problems>     ← problem → cause → fix (bridge link to troubleshooting)
## <2nd-order question readers ask next>
## Conclusion                              ← recap in 3 sentences + /pricing or trial nudge
```

Troubleshooting spokes start from the symptom instead: *Quick fix (works 80% of the time)* → *Why it happens* → *Fixes in order, easiest first* → *By device* → *When it's the provider, not you*.

### 3.2 Spoke · `commercial` (compare, sports, apps "best", free-trial "free iptv")

```
## <Keyword>: the short answer             ← verdict up front
## What matters when choosing              ← 5–7 criteria with thresholds (uptime, 4K, EPG, connections, support, refund)
## Comparison table                         ← options × criteria; specific numbers
## <Option/approach> in detail              ← one H2 per serious option: strengths, limits, who it suits
## Red flags and scams to avoid             ← trust section (CTA lands here)
## How to test before you pay               ← trial logic; link to free-trial hub
## Conclusion                              ← verdict per need + /pricing
```

Sports spokes add: *what's covered this season (competitions, rights holders)*, *kick-off times by time zone*, *picture quality and latency for live sport*.

### 3.3 Spoke · `transactional` (free trial, watch abroad)

```
## How to <do it> right now                 ← 3–5 steps to the result
## What you get                              ← channels/quality/devices, specific
## What it costs vs the alternatives          ← table (cable abroad, VPN + apps, IPTV)
## Setting it up in <country>/on your TV     ← bridge to devices
## Common questions before you start         ← objections: legality, speed, payment, cancellation
## Conclusion                                ← direct CTA + /pricing
```

Watch-abroad spokes name the actual channel groups (BBC One, ITV1, Channel 4, Sky Sports / ABC, NBC, ESPN…) as **what expats look for**, without promising a specific broadcaster's content unless the service carries it.

### 3.4 Spoke · `informational` (fundamentals, playlists)

```
## <Term> explained in plain English
## How it works                              ← diagram-like walkthrough, protocols named
## <Term> vs <adjacent term>                  ← table
## What it means for you in practice
## Common misconceptions
## Conclusion
```

### 3.5 Hub (one per cluster, 3,000+ words)

```
<direct answer + who this hub is for>
## Quick questions
## <Cluster head keyword>: the essentials     ← the topic in 60 words
## <One H2 per sub-topic, each a summary of a spoke>  ← 1 paragraph + link to that spoke ("full guide: …")
## Comparison table across the sub-topics
## How to choose / where to start
## Conclusion + /pricing
```

The hub links to **every published spoke** in its cluster and to the pillar. When a new spoke is published, add or expand its sub-topic section in the hub.

### 3.6 Pillar (`/blog/iptv-guide`, 4,000+ words)

```
<direct answer: what IPTV is, in 2–3 sentences>
## Quick questions
## What is IPTV?                     ← definition, acronym, history in brief
## How IPTV works                    ← links to how-does-iptv-work
## IPTV vs cable, satellite and streaming apps  ← table; link to compare hub
## Is IPTV legal and safe?           ← link to is-iptv-legal
## What you need: devices, apps, internet speed  ← links to devices hub, apps hub, speed spoke
## Channels, sports and watching from abroad    ← links to sports hub, watch-abroad hub
## Playlists, M3U and Xtream Codes   ← link to playlists hub
## Trying IPTV before you pay        ← link to free-trial hub
## When IPTV doesn't work            ← link to troubleshooting hub
## Conclusion + / and /pricing
```

---

## 4. Length

| Role | Minimum | Typical |
|---|---|---|
| Pillar | 4,000 | 4,500–6,000 |
| Hub | 3,000 | 3,500–4,500 |
| Spoke | 1,800 | 2,000–3,000 (troubleshooting can sit at the floor) |

Match or beat the depth of the current top 3 results, not a word count. The build warns below the minimum.

---

## 5. Entity graph (global English)

Use at least 15 relevant entities per article, in context. Pick by angle.

| Group | Entities |
|---|---|
| Player apps | IPTV Smarters Pro, TiviMate, OTT Navigator, XCIPTV, IPTVX, GSE Smart IPTV, Kodi (PVR IPTV Simple Client), VLC, Perfect Player, Smarters Player Lite |
| Devices / OS | Amazon Fire TV Stick (4K, 4K Max, Lite), Fire OS, Android TV, Google TV, Chromecast with Google TV, NVIDIA Shield, Samsung Tizen, LG webOS, Apple TV 4K, tvOS, iPhone/iPad (iOS), Windows, macOS, MAG 524/544, Formuler, Roku |
| Protocols / formats | M3U, M3U8, HLS, MPEG-TS, Xtream Codes API, Stalker portal, EPG, XMLTV |
| Quality / codecs | HD 720p, Full HD 1080p, 4K UHD, HDR10, H.264, H.265/HEVC, AV1, 50/60 fps |
| Network | Mbps, latency, buffering, adaptive bitrate, CDN, DNS, VPN, ISP, Wi-Fi 5 GHz, Ethernet |
| Sports | Premier League, Champions League, La Liga, Serie A, Bundesliga, NFL, NBA, MLB, NHL, UFC, boxing PPV, Formula 1, cricket (IPL, The Ashes), Six Nations |
| UK channels | BBC One, ITV1, Channel 4, Sky Sports, TNT Sports, Sky Atlantic |
| US channels | ABC, NBC, CBS, FOX, ESPN, CNN, HBO |
| Streaming (context) | Netflix, Disney+, Prime Video, Max, Apple TV+, YouTube TV, Sling TV, DAZN, NOW |
| Incumbents (comparisons) | Sky, Virgin Media, BT, Comcast Xfinity, DirecTV, Spectrum |
| Regulators / legal | Ofcom, FCC, ACMA, DMCA, EU Digital Services Act |

---

## 6. Pre-publish checklist

**Plan**
- [ ] `npm run blog -- find "<keyword>"` run; no existing owner or close duplicate
- [ ] `KEYWORD_MAP` row exists; frontmatter cluster, role, intent and keyword match it

**Content**
- [ ] Direct, complete answer in the first 100 words, keyword included
- [ ] Keyword in the H1 and in 2+ H2s; about 1% density, with synonyms after that
- [ ] Every H2 opens with a 40–60 word answer
- [ ] Quick questions block (4–6 jump links), every link tested
- [ ] 15+ entities; specific numbers and versions
- [ ] Comparison table (pillar, hub, commercial); troubleshooting section (howto)
- [ ] 3–5 key takeaways; 6+ FAQs that don't repeat the quick questions
- [ ] Length at or above the role minimum
- [ ] First-hand, tested language; honest limits; compliance line where relevant

**Links**
- [ ] Pillar link (keyword-rich anchor) and hub link (spokes)
- [ ] 2–4 sibling links; at most 1 bridge link; ≤ 12 total
- [ ] `/pricing` once (commercial and transactional)
- [ ] 1 outbound authority link
- [ ] Root-relative internal links only; no `(#)` placeholders; no "see also" list

**Media and schema**
- [ ] Cover and `coverAlt` (or a deliberate placeholder)
- [ ] `howto` frontmatter on setup guides, mirroring the body steps
- [ ] Mid-body images have descriptive alt text

**Ship**
- [ ] `npm run build`: no `[blog]` errors; warnings resolved or consciously accepted
- [ ] Back-links added from the hub and 1–2 siblings (and the pillar for a hub); `updateDate` set on those
- [ ] After deploy: request indexing in Search Console; validate in the Rich Results Test
