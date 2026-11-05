---
name: blog-article
description: Plan or write a Net IPTV blog article from a keyword or topic, following the pillar/cluster strategy. Use whenever the user gives a keyword, topic or article idea for the blog ("write about X", "new post: X", "/blog-article X"), asks what to write next, or asks to update, refresh or re-link an existing post. Classifies the keyword, checks cannibalisation, registers it in the keyword map, writes to the article spec, adds internal links and back-links, and validates with the build.
---

# Blog article workflow

Turns one keyword into one correctly placed article. The rules live in the repo; read them, don't improvise:

- `docs/blog/STRATEGY.md`: architecture, routing (§4), cannibalisation (§5), linking contract (§6)
- `docs/blog/ARTICLE_SPEC.md`: frontmatter, templates per role/intent, entities, checklist
- `src/data/blog-strategy.ts`: clusters and the keyword map (source of truth)

Input forms:
- `<keyword>`: full workflow (plan, then write)
- `plan <keyword>`: steps 1–4 only; report the brief and stop
- `next`: run `npm run blog -- next 10`, show the queue, and ask which to write
- `update <slug>`: refresh an existing post (step 6 onwards, on the existing file)

## 1. Look up the keyword

```
npm run blog -- find "<keyword>"
npm run blog -- status
```

Then act on the result (STRATEGY §4.1):

| Result | Action |
|---|---|
| RESERVED | Stop. Tell the user which page owns it and offer to improve that page instead. |
| OWNED by a **planned** row | Use that row as is. Continue to step 3. |
| OWNED by a **published** row | Don't create a new URL. Offer to update that article (`update <slug>`). |
| Overlap ≥ 0.5 | Treat it as the same intent. Propose adding the keyword as a variant of that row, and stop unless the user disagrees. |
| New | Continue to step 2. |

## 2. Classify (new keywords only)

Decide and write down, citing the rule used:
- **Intent**: informational, commercial, transactional or howto (STRATEGY §4.2)
- **Cluster**: the first matching rule in STRATEGY §4.3
- **Role**: almost always `spoke`. Hubs are fixed per cluster; a keyword that seems to need a new hub or cluster is a strategy change, so ask the user.
- **Slug**: short, keyword-led, no year, not already used
- **Variants**: 2–4 close phrasings this URL should absorb (check each with `find`)
- **Priority**: 1 if it has clear demand and low competition or high commercial value, else 2–3

If the cluster or intent is genuinely ambiguous after applying the rules, ask the user once with the two options and a recommendation.

## 3. Brief (show the user before writing)

Present a short brief:

```
Keyword:      <primary>  (+ variants)
URL:          /blog/<slug>
Cluster/role: <cluster> · <role>   Intent: <intent>
Template:     ARTICLE_SPEC §3.x
Upward links: pillar /blog/iptv-guide [live?] · hub /blog/<hub> [live?]
Siblings to link (live only): /blog/a, /blog/b, /blog/c
Bridge link (optional): /blog/<x> in <bridge cluster>
Back-links after publish: hub section "<H2>", siblings /blog/a, /blog/b
H2 outline: …
Target length: ≥ <min> words
```

Get the live posts from `src/content/blog/` (non-draft files). Only link to live posts; the build rejects links to unpublished ones. If the hub isn't live yet, say so; `next` normally schedules hubs first.

For `plan`, stop here. For a full run, continue unless the user objects to the brief.

## 4. Register

Add or confirm the `KEYWORD_MAP` row in `src/data/blog-strategy.ts`, placed in its cluster's block. Then run `npm run blog -- find "<keyword>"` again; it should report OWNED.

## 5. Research before writing

- Check what currently ranks for the keyword (WebSearch) to learn the depth, the sub-questions and the "People also ask" questions. Note facts to verify, such as app versions, device models, season dates and rights holders.
- Pick 15–25 entities from ARTICLE_SPEC §5 that fit the angle.
- Verify any fact that changes over time (app availability on a store, broadcaster rights, competition dates) instead of writing it from memory. If you can't verify something, leave it out.
- Prices, channel counts, connections and guarantees come only from `src/data/site.ts`. Never invent them.

## 6. Write

Create `src/content/blog/<slug>.md` following ARTICLE_SPEC exactly:
- frontmatter fields exactly as in §2 (cluster, role, intent and primaryKeyword identical to the map row; `publishDate` and `updateDate` = today)
- the body template for the role and intent (§3); direct answer first; a 40–60 word answer under every H2; quick-question jump links matching the auto-generated heading IDs
- contextual links per the contract (STRATEGY §6), root-relative, varied keyword-rich anchors
- no H1, no FAQ section, no CTA buttons, no related-posts list in the body (the page adds them)
- English (UK/US-neutral spelling unless the article targets one market); first-hand, specific, honest; no promises of specific copyrighted content "for free", no instructions to break the law

## 7. Back-link

Edit the existing posts named in the brief:
- the **hub**: add or extend the sub-topic section with a contextual link to the new post
- **1–2 siblings**: one contextual link each, where a reader would naturally go next
- for a new **hub**: the **pillar** section for that cluster
- set `updateDate` = today on each edited post, and keep each within the 12-link cap

## 8. Validate

```
npm run build
```

- `[blog] … strategy error(s)` → fix them, then rebuild. Never weaken the validator to pass.
- `[blog] warning:` lines for this post → fix them, or tell the user why one is acceptable (e.g. a hub over 12 links).
- Check the jump links: every `#anchor` in the quick-questions block must match an `id="…"` in `.vercel/output/static/blog/<slug>/index.html`.

## 9. Report

Tell the user in a few lines:
- the URL, cluster, role and word count
- the links added (out of this post) and the back-links added (into it)
- any warnings left and why
- that nothing is committed; suggest the commit when they're happy

Don't commit or push unless asked.
