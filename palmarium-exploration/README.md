# Palmarium: "Every number shows its work"

An **independent, unofficial design exploration**. It is not an official redesign and
not a Palmarium product. It uses no confidential client material, and every figure is
fictional and labelled illustrative. Nothing here is investment advice or a real
Palmarium output.

It implements the approved Round 2 direction: Intaglio visual language with Workpaper
evidence clarity.

## Run

No build step and no dependencies.

```
cd palmarium-exploration
python3 -m http.server 4180      # any static server works; ES modules need http, not file://
```

Open http://127.0.0.1:4180. Use `?claim=2` to open the Trace on a given claim.

## What is in it

- **Hero**: engraved rosette that draws in, with links straight into each claim.
- **The Trace**: one sentence, three claims, one data model (`js/data.js`). Selecting a
  claim updates the sentence, the evidence row, the plate (rosette arc, before/after
  rosette, or paired backtest curves) and the agreement line together.
- **Outcomes**: compact ledger of what the exploration demonstrates.

## Interaction

- Desktop: hover previews a claim, click pins it, arrow keys / Home / End move and pin.
  Escape clears a preview. Leader lines re-route to the active claim.
- Tablet and mobile: no hover. One claim is always selected, evidence and plate sit
  beneath it, and a sticky Previous / numbered / Next dock lives inside the section.
  Horizontal swipe (touch only) changes claim and does not interfere with vertical scroll.
- Changes are announced through a polite live region; plates have text alternatives
  generated from the same model.

## Structure

```
index.html        semantic page, noscript fallback
css/              fonts, site, trace (mobile-first; tablet >=720, desktop >=1100)
js/data.js        the single illustrative data model and all derived copy
js/rosette.js     procedural engraved rings
js/plate.js       rosette + chart + captions per claim
js/leaders.js     right-angle leader routing
js/trace.js       state machine, input, accessibility
fonts/            self-hosted latin woff2 (Bodoni Moda, Hanken Grotesk, Martian Mono)
tools/            Playwright scripts: shoot.mjs (screens), test.mjs (behaviour, axe, perf), motion.mjs
```

Run the checks with `CHROME_PATH=<chromium> node tools/test.mjs http://127.0.0.1:4180 <path to axe.min.js>`
(Playwright and axe-core are not vendored).

## Verified

Rendered and inspected at 2560, 1440, 1280, 1100, 1024, 820, 768, 390 and 320 for all
three claim states, with no horizontal overflow and a clean console. The automated
suite covers keyboard behaviour, ARIA, axe, reduced motion, swipe versus scroll, touch
target sizes and the 12/14px type floor. Measured: CLS 0.018, no long tasks, about
179 KB uncompressed in 13 requests.

## Deliberate deviations from the boards

- Navigation and CTA wording adjusted to match the final copy.
- An outcomes section was added, as requested for this build.
- Mono label sizes raised to meet the 12px floor.
- A visible independence banner and footer credit; `noindex` is set.

## Limitations

- The "→" glyph falls back to a system font (excluded from the font subset).
- Swipe is touch-only by design; mouse users use the dock or keys.
- Tested in Chromium only; Safari and Firefox are not yet checked.
- Plate geometry is illustrative, not a charting engine.
- At very wide screens (2560) the layout is capped and centred, leaving generous margins.
