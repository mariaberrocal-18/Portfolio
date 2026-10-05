# María Berrocal: portfolio

Static site, no framework. Source of truth for copy and drawings is `src/`; `npm run build` regenerates `index.html` and `work/*.html`.

```
npm run build   # regenerate HTML from src/
npm start       # serve on http://localhost:4173
```

| Where | What |
|---|---|
| `src/content.mjs` | All copy: hero, journey, toolkit, about, contact, and the four case studies. Set `draft: false` per project once the copy is verified (drafts ship with `noindex`). |
| `src/visuals.mjs` | The reconstructed product visuals (SVG). Stage 1–3 = how the design evolved; stage 3 is the shipped state and the card image. |
| `src/build.mjs` | Page templates. |
| `assets/css/site.css` | Design tokens and styles (see `DESIGN.md`). |
| `assets/js/site.js` | Smooth scroll (Lenis), load sequence, reveals, timeline, evolve wipe, cursor label. |
| `assets/photos/` | `maria-hero.webp` is the hi-res cutout (transparent background). `maria-contact.jpg` is still cropped from a Framer screenshot: replace it with the original at the same filename. |

## Before publishing

1. Replace `site.email` and `site.linkedin` in `src/content.mjs`.
2. Replace `maria-contact.jpg` with the full-resolution original.
3. Verify every case-study claim; then set `draft: false`.
