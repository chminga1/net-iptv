## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Blog

The blog runs on a pillar/cluster system. Before writing, editing or planning any blog post, use the `blog-article` skill (`.claude/skills/blog-article/SKILL.md`) and follow:

- `docs/blog/STRATEGY.md`: architecture, keyword routing, cannibalisation and internal-linking rules
- `docs/blog/ARTICLE_SPEC.md`: frontmatter, templates and checklist
- `src/data/blog-strategy.ts`: clusters and the keyword map (source of truth)

Posts live in `src/content/blog/<slug>.md`, and each slug must be in the keyword map. `npm run blog -- find "<keyword>" | status | next` shows ownership, coverage and the publishing queue. `npm run build` enforces the strategy: errors fail the build, and `[blog] warning:` lines flag gaps.
