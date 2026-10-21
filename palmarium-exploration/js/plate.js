// The plate: one engraved drawing that changes with the selected claim.
//   claim 1: rosette + measuring arc (share of risk against a limit)
//   claim 2: the same rosette, a line removed and a line added, an arrow
//   claim 3: paired backtest curves with a heavy gap at the worst point
// Geometry is computed from the data model, so every mark is to scale.

import { el, buildRings, polar, TAU } from './rosette.js';
import { model, claims, lineCounts, linesFor, moved, btGap } from './data.js';

const VB = { x: -370, y: -330, w: 740, h: 660 };
const ARC_R = 292;
const minus = (n) => `−${Math.abs(n)}%`;

const sleeve = (id) => model.sleeves.find((s) => s.id === id);

export function createPlate(host) {
  const eq = sleeve('equities');
  const bonds = sleeve('bonds');
  host.classList.add('plate');
  host.replaceChildren();

  const stage = document.createElement('div');
  stage.className = 'plate__stage';
  host.appendChild(stage);

  /* ── Rosette layer ─────────────────────────────────────────── */
  const rosette = el('svg', {
    class: 'plate__rosette', viewBox: `${VB.x} ${VB.y} ${VB.w} ${VB.h}`,
    'aria-hidden': 'true', focusable: 'false',
  }, stage);
  buildRings(rosette, { prefix: 'pl', now: lineCounts('now'), next: lineCounts('next') });

  const C = TAU * ARC_R;
  const limit = model.risk.limit / 100;
  const share = model.risk.equitiesShare / 100;
  const measure = el('g', { class: 'measure' }, rosette);
  el('circle', { class: 'guide', r: ARC_R, 'vector-effect': 'non-scaling-stroke' }, measure);
  const arcBase = el('circle', { class: 'arc arc--base', r: ARC_R, transform: 'rotate(-90)' }, measure);
  arcBase.style.setProperty('--on', `${limit * C} ${C}`);
  arcBase.style.setProperty('--off', `0 ${C}`);
  const arcExcess = el('circle', { class: 'arc arc--excess', r: ARC_R, transform: 'rotate(-90)' }, measure);
  arcExcess.style.setProperty('--on', `0 ${limit * C} ${(share - limit) * C} ${C}`);
  arcExcess.style.setProperty('--off', `0 ${limit * C} 0 ${C}`);
  const [tx1, ty1] = polar(limit * TAU, ARC_R - 14);
  const [tx2, ty2] = polar(limit * TAU, ARC_R + 14);
  el('line', { class: 'tick', x1: tx1, y1: ty1, x2: tx2, y2: ty2 }, measure);
  const lblVal = el('text', { class: 'lbl lbl--val' }, measure);
  lblVal.textContent = `${model.risk.equitiesShare}%`;
  const lblLim = el('text', { class: 'lbl lbl--lim' }, measure);
  lblLim.textContent = `limit ${model.risk.limit}`;

  const move = el('g', { class: 'move' }, rosette);
  const arrow = el('path', { class: 'arrow', pathLength: 1 }, move);
  const head = el('path', { class: 'arrow-head' }, move);
  const dot = el('circle', { class: 'arrow-dot' }, move);
  const lblMove = el('text', { class: 'lbl lbl--move' }, move);
  lblMove.textContent = `${moved} pts`;

  /* ── Chart layer (claim 3) ─────────────────────────────────── */
  const chart = el('svg', { class: 'plate__chart', 'aria-hidden': 'true', focusable: 'false' }, stage);

  function curve(depth, X, Y, tt = 0.62) {
    let d = '';
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      let v;
      if (t <= tt) {
        const s = t / tt;
        v = -depth * (s * s * (3 - 2 * s));
      } else {
        const s = (t - tt) / (1 - tt);
        const r = s * s * (3 - 2 * s);
        v = -depth * (1 - r * (1 - 1 / 3));
      }
      d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(v).toFixed(1);
    }
    return d;
  }

  function drawChart() {
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    if (!W || !H) return;
    chart.setAttribute('viewBox', `0 0 ${W} ${H}`);
    chart.replaceChildren();
    const m = { l: 60, r: 24, t: 44, b: 38 };
    const pw = W - m.l - m.r;
    const ph = H - m.t - m.b;
    const ppp = ph / 20; // pixels per point of drawdown; axis is 0 to −20
    const X = (t) => m.l + t * pw;
    const Y = (v) => m.t + -v * ppp;
    const tt = 0.62;
    const now = model.backtest.now;
    const next = model.backtest.next;

    const grid = el('g', { class: 'chart__grid' }, chart);
    [0, -10, -20].forEach((v) => {
      el('line', { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v) }, grid);
      const t = el('text', { x: m.l - 10, y: Y(v) + 4, 'text-anchor': 'end' }, grid);
      t.textContent = v === 0 ? '0%' : minus(v);
    });
    const cap = el('text', { class: 'chart__cap', x: m.l, y: H - 10 }, chart);
    cap.textContent = W < 360 ? 'Illustrative period' : 'Illustrative backtest period →';

    el('path', { class: 'curve curve--now', d: curve(Math.abs(now), X, Y, tt), pathLength: 1 }, chart);
    el('path', { class: 'curve curve--next', d: curve(Math.abs(next), X, Y, tt), pathLength: 1 }, chart);
    const gx = X(tt);
    const gap = el('g', { class: 'chart__gap' }, chart);
    el('line', { class: 'gap', x1: gx, x2: gx, y1: Y(next), y2: Y(now), pathLength: 1 }, gap);
    el('line', { class: 'gap-cap gap-cap--next', x1: gx - 9, x2: gx + 9, y1: Y(next), y2: Y(next) }, gap);
    el('line', { class: 'gap-cap gap-cap--now', x1: gx - 9, x2: gx + 9, y1: Y(now), y2: Y(now) }, gap);
    const lNext = el('text', { class: 'chart__v chart__v--next', x: gx, y: Y(next) - 14, 'text-anchor': 'middle' }, gap);
    lNext.textContent = minus(next);
    const lNow = el('text', { class: 'chart__v chart__v--now', x: gx, y: Y(now) + 24, 'text-anchor': 'middle' }, gap);
    lNow.textContent = minus(now);

    const leg = el('g', { class: 'chart__legend' }, chart);
    const lx = W - m.r - 168;
    el('line', { class: 'curve--now', x1: lx, x2: lx + 26, y1: 14, y2: 14 }, leg);
    const t1 = el('text', { x: lx + 34, y: 18 }, leg);
    t1.textContent = 'now';
    el('line', { class: 'curve--next', x1: lx + 84, x2: lx + 110, y1: 14, y2: 14 }, leg);
    const t2 = el('text', { x: lx + 118, y: 18 }, leg);
    t2.textContent = 'proposed';
  }

  /* ── Captions (HTML, so type is real pixels) ───────────────── */
  const caps = document.createElement('div');
  caps.className = 'plate__caps';
  caps.setAttribute('aria-hidden', 'true');
  caps.innerHTML = `
    <div class="cap" data-for="1">
      <span class="badge">1</span>
      <p><b>Global equities</b><span>${eq.now}% of capital</span><span>${model.risk.equitiesShare}% of risk</span></p>
    </div>
    <div class="cap" data-for="2">
      <span class="badge">2</span>
      <p><b>Global equities</b><span>${eq.now}% → ${eq.next}% of capital</span><span>${linesFor(eq.now)} → ${linesFor(eq.next)} lines, dashed removed</span></p>
      <p><b>Government bonds</b><span>${bonds.now}% → ${bonds.next}% of capital</span><span>${linesFor(bonds.now)} → ${linesFor(bonds.next)} lines, heavy added</span></p>
    </div>
    <div class="cap cap--worst" data-for="3">
      <span class="badge">3</span>
      <p><b>Worst point</b><span>${minus(model.backtest.now)} → ${minus(model.backtest.next)}</span></p>
      <p><b>Difference</b><span>${btGap} points</span></p>
    </div>`;
  host.appendChild(caps);

  /* ── Layout: keep SVG text at a constant pixel size ────────── */
  function layout() {
    const w = rosette.getBoundingClientRect().width;
    if (!w) return;
    const k = VB.w / w; // user units per css px
    rosette.style.setProperty('--k', k.toFixed(4));
    const place = (node, a, r, dy = 4) => {
      const [x, y] = polar(a, r);
      node.setAttribute('x', x.toFixed(1));
      node.setAttribute('y', (y + dy * k).toFixed(1));
      node.setAttribute('text-anchor', x < 0 ? 'end' : 'start');
    };
    place(lblVal, share * TAU, ARC_R + 12 * k);
    place(lblLim, limit * TAU, ARC_R + 14 * k, 8);

    const y0 = -16 * k;
    arrow.setAttribute('d', `M-228 ${y0.toFixed(1)} H${(-124 - 9 * k).toFixed(1)}`);
    head.setAttribute('d', `M-118 ${y0.toFixed(1)} l${(-11 * k).toFixed(1)} ${(-6 * k).toFixed(1)} v${(12 * k).toFixed(1)} z`);
    dot.setAttribute('cx', -228);
    dot.setAttribute('cy', y0.toFixed(1));
    dot.setAttribute('r', (3.2 * k).toFixed(1));
    lblMove.setAttribute('x', -176);
    lblMove.setAttribute('y', (y0 - 10 * k).toFixed(1));
    lblMove.setAttribute('text-anchor', 'middle');
    drawChart();
  }

  const ro = new ResizeObserver(layout);
  ro.observe(stage);
  layout();

  return {
    setClaim(id) {
      host.dataset.claim = String(id);
      host.setAttribute('aria-label', claims[id - 1].alt);
    },
    layout,
  };
}
