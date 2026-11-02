# Blog article images

Drop article artwork here, then wire it up in `src/pages/blog.astro`:

```astro
import fireStickGuide from '../assets/blog/fire-stick-guide.jpg';

const upcoming: readonly UpcomingPost[] = [
  {
    category: 'Guides',
    title: 'How to install IPTV on a Fire Stick in 2026',
    // ...
    image: fireStickGuide,
  },
];
```

A post with no `image` shows a placeholder slot of the same size, so adding
the real picture never shifts the layout.

Aim for roughly 16:9 and at least 640px wide — `astro:assets` generates the
208w / 416w variants the row actually renders.
