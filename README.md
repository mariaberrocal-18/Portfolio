# María Berrocal: portfolio

Static site, no framework. Source of truth for copy and drawings is `src/`; `npm run build` regenerates `index.html` and `work/*.html`.

**Mac, one click:** double-click `Preview.command`. It pulls the latest from GitHub and opens the site.

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
| `assets/photos/` | `maria-hero.webp` and `maria-contact.webp` are the hi-res cutouts (transparent background). `maria-avatar.jpg` (nav) is cropped from the hero. |

## Before publishing

1. Replace `site.email` and `site.linkedin` in `src/content.mjs`.
2. (done) hero and footer portraits are the hi-res cutouts.
3. Verify every case-study claim; then set `draft: false`.
