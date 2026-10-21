import { buildRings } from './rosette.js';
import { lineCounts } from './data.js';
import { initTrace } from './trace.js';

const root = document.documentElement;

/* ── Hero rosette: the engraving the Trace later measures ───────── */
const hero = document.getElementById('hero-rosette');
const mqMobile = matchMedia('(max-width: 719px)');
buildRings(hero, { prefix: 'hero', now: lineCounts('now') });
// Desktop shows the rising crown of the rosette; mobile shows a smaller whole crown.
function fitHero() {
  hero.setAttribute('viewBox', mqMobile.matches ? '-275 -275 550 176' : '-297.3 -286.5 594.6 121.1');
}
fitHero();
mqMobile.addEventListener('change', fitHero);

/* ── The Trace ──────────────────────────────────────────────────── */
const params = new URLSearchParams(location.search);
const initial = Number(params.get('claim')) || 1;
const trace = initTrace(document.getElementById('trace-root'), { initial });

// Hero links jump into the Trace with a claim already selected.
document.querySelectorAll('[data-claim-jump]').forEach((a) => {
  a.addEventListener('click', () => trace.select(Number(a.dataset.claimJump)));
});

/* ── One authored moment: the hero rosette draws in from the centre ── */
const ready = () => root.classList.add('is-ready');
if (document.fonts?.ready) document.fonts.ready.then(() => requestAnimationFrame(ready));
else ready();
setTimeout(ready, 1200);
