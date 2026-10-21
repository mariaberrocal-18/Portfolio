// The Trace. Three claims, one shared model, one state machine.
//   pinned  : the claim the reader chose (click, tap, keys, dock, swipe)
//   preview : a claim the pointer is resting on (hover only, never announced)
//   active  : preview ?? pinned, which every view renders from

import { claims, model, TOTAL, excess } from './data.js';
import { createPlate } from './plate.js';
import { createLeaders } from './leaders.js';

const TICK = '<svg width="14" height="12" viewBox="0 0 14 12" aria-hidden="true" focusable="false"><path d="M1.5 6 5.5 10 12.5 1.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV_L = '<svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true" focusable="false"><path d="M8 2 2 8l6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV_R = '<svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true" focusable="false"><path d="m2 2 6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const sleeve = (id) => model.sleeves.find((s) => s.id === id);

/* ── Evidence visualisations: HTML, drawn to printed scales ─────── */
function scaleViz() {
  const share = model.risk.equitiesShare;
  const lim = model.risk.limit;
  return `
  <div class="viz viz--scale" role="img" aria-label="Scale from 0 to 100 percent of risk. The limit is at ${lim}. Equities are at ${share}. The ${excess}-point gap between them is the excess.">
    <span class="scale__rule"></span>
    <span class="scale__tick" style="left:0"></span><span class="scale__tick" style="left:50%"></span><span class="scale__tick" style="left:100%"></span>
    <span class="scale__excess" style="left:${lim}%;width:${share - lim}%"></span>
    <span class="scale__limit" style="left:${lim}%"></span>
    <span class="scale__dot" style="left:${share}%"></span>
    <span class="scale__lbl scale__lbl--limit" style="left:${lim}%">limit ${lim}</span>
    <span class="scale__lbl scale__lbl--val" style="left:${share}%">${share}</span>
    <span class="scale__lbl scale__lbl--0">0</span>
    <span class="scale__lbl scale__lbl--100">100</span>
  </div>
  <p class="viz__scale">Scale 0–100% of risk</p>`;
}

function barsViz(label, rows, scale) {
  return `<div class="viz viz--bars" role="img" aria-label="${label}">${rows.map((r) => `
    <div class="bar">
      <p class="bar__head"><span>${r.label}</span><span class="num">${r.figure}</span></p>
      <div class="bar__track">
        <i class="bar__fill${r.gold ? ' bar__fill--gold' : ''}" style="width:${r.base}%"></i>
        ${r.ghost ? `<i class="bar__ghost" style="left:${r.ghost[0]}%;width:${r.ghost[1] - r.ghost[0]}%"></i>` : ''}
        ${r.add ? `<i class="bar__add" style="left:${r.add[0]}%;width:${r.add[1] - r.add[0]}%"></i>` : ''}
      </div>
    </div>`).join('')}<p class="viz__scale">${scale}</p></div>`;
}

function evidenceViz(id) {
  const eq = sleeve('equities');
  const bonds = sleeve('bonds');
  const bt = model.backtest;
  if (id === 1) return scaleViz();
  if (id === 2) {
    const p = (n) => (n / 50) * 100;
    return barsViz(
      `Paired bars on a scale of 0 to 50 percent of capital. Global equities go from ${eq.now} to ${eq.next}. Government bonds go from ${bonds.now} to ${bonds.next}.`,
      [
        { label: eq.label, figure: `${eq.now} → ${eq.next}`, base: p(eq.next), ghost: [p(eq.next), p(eq.now)] },
        { label: bonds.label, figure: `${bonds.now} → ${bonds.next}`, base: p(bonds.now), add: [p(bonds.now), p(bonds.next)] },
      ],
      'Scale 0–50% of capital',
    );
  }
  const p = (n) => (Math.abs(n) / 20) * 100;
  return barsViz(
    `Paired bars on a scale of 0 to 20 percent drawdown. Now is ${Math.abs(bt.now)} percent. Proposed is ${Math.abs(bt.next)} percent.`,
    [
      { label: 'Now', figure: `−${Math.abs(bt.now)}%`, base: p(bt.next), ghost: [p(bt.next), p(bt.now)] },
      { label: 'Proposed', figure: `−${Math.abs(bt.next)}%`, base: p(bt.next), gold: true },
    ],
    'Scale 0–20% drawdown',
  );
}

/* ── Markup ─────────────────────────────────────────────────────── */
function template() {
  const credit = sleeve('credit');
  const cash = sleeve('cash');
  const alts = sleeve('alts');
  return `
  <div class="trace__shell" data-claim="1">
    <div class="wrap">
      <header class="trace__head">
        <div class="trace__title">
          <h2 id="trace-title" class="h2"><span>Every decision has a reason.</span> <span>Explore the evidence behind it.</span></h2>
          <p class="trace__sub">Select a claim in the proposal. Its evidence and its drawing update together, under the same numeral. Illustrative portfolio, not investment advice.</p>
        </div>
        <details class="key" id="trace-key">
          <summary>Key to marks</summary>
          <ul>
            <li><svg width="30" height="12" viewBox="0 0 30 12" aria-hidden="true"><circle cx="3.5" cy="6" r="3.5" fill="currentColor"/><path d="M3 6h26" stroke="currentColor" stroke-width="1.4"/></svg>leader: claim to evidence</li>
            <li><svg width="30" height="18" viewBox="0 0 30 18" aria-hidden="true"><circle cx="15" cy="9" r="7.5" stroke="currentColor" stroke-width="1.3"/></svg>numeral: same in sentence, row, plate</li>
            <li><span class="key__tick">${TICK}</span>checked against the data</li>
            <li><svg width="30" height="12" viewBox="0 0 30 12" aria-hidden="true"><path d="M2 6h26" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3"/></svg>dashed: removed by the proposal</li>
            <li><svg width="30" height="12" viewBox="0 0 30 12" aria-hidden="true"><path d="M2 6h26" stroke="currentColor" stroke-width="4.5"/></svg>heavy: the difference that matters</li>
          </ul>
        </details>
      </header>

      <div class="trace__body" id="trace-body">
        <svg class="trace__leaders" aria-hidden="true" focusable="false"></svg>

        <div class="trace__proposal">
          <p class="colhead">The proposal, as a sentence</p>
          <div class="claims" role="radiogroup" aria-labelledby="trace-title" aria-describedby="trace-help">
            ${claims.map((c) => `
            <button type="button" class="claim" role="radio" id="claim-${c.id}" data-claim="${c.id}" aria-checked="false" tabindex="-1" aria-controls="ev-${c.id} trace-plate">
              <span class="claim__mark" aria-hidden="true"><span>${c.id}</span></span>
              <span class="claim__text"><span class="sr-only">Claim ${c.id} of ${TOTAL}. </span>${c.clause}</span>
            </button>`).join('')}
          </div>
          <p class="sr-only" id="trace-help">Use the arrow keys to move between claims. The evidence and the plate change with the selected claim.</p>
        </div>

        <div class="trace__evidence">
          <p class="colhead">The evidence</p>
          <div class="evs">
            ${claims.map((c) => `
            <article class="ev" id="ev-${c.id}" data-claim="${c.id}" aria-labelledby="ev-${c.id}-title">
              <div class="ev__head">
                <span class="ev__num" aria-hidden="true">${c.id}</span>
                <h3 class="ev__title" id="ev-${c.id}-title">${c.title}</h3>
                <p class="ev__summary num">${c.summary}</p>
                <p class="ev__checked">${TICK}<span>Checked</span></p>
              </div>
              <div class="ev__body"><div class="ev__inner">
                <p class="ev__line"><span class="ev__value">${c.value}</span><span class="ev__desc">${c.desc}</span></p>
                ${evidenceViz(c.id)}
                <p class="ev__meta"><span>Source · ${c.source} · illustrative</span><a class="ev__plate" href="#trace-plate">See the plate <span aria-hidden="true">↓</span></a></p>
              </div></div>
            </article>`).join('')}
          </div>
          <p class="unused">Not used by this sentence · Credit ${credit.now} → ${credit.next} · Cash ${cash.now} → ${cash.next} · Alternatives ${alts.now} → ${alts.next}</p>
        </div>
      </div>

      <div class="trace__plateband">
        <div class="trace__platecol">
          <p class="colhead"><span>The plate</span> · <span id="plate-title">${claims[0].plateTitle}</span></p>
          <div class="plate" id="trace-plate" role="img"></div>
        </div>
        <div class="read">
          <p class="colhead">How to read the plate</p>
          <div class="read__stack">
            ${claims.map((c) => `<p class="read__text" data-for="${c.id}">${c.read}</p>`).join('')}
          </div>
          <div class="agree" aria-label="Agreement check">
            ${['sentence', 'evidence', 'plate'].map((w) => `<p class="agree__item">${TICK}<b class="agree__v">${claims[0].agree}</b><span>${w}</span></p>`).join('')}
            <p class="agree__word">agree</p>
          </div>
          <p class="read__concept">Concept interaction, not a Palmarium feature · Figures illustrative</p>
        </div>
      </div>
    </div>

    <nav class="dock" aria-label="Claim navigation">
      <div class="dock__in">
        <button type="button" class="dock__btn dock__prev" aria-label="Previous claim">${CHEV_L}<span>Previous</span></button>
        <ol class="dock__dots">
          ${claims.map((c) => `<li><button type="button" class="dock__dot" data-claim="${c.id}" aria-label="Show claim ${c.id} of ${TOTAL}"><span>${c.id}</span></button></li>`).join('')}
        </ol>
        <button type="button" class="dock__btn dock__next" aria-label="Next claim"><span>Next</span>${CHEV_R}</button>
      </div>
    </nav>
    <p class="sr-only" role="status" aria-live="polite" id="trace-live"></p>
  </div>`;
}

/* ── Behaviour ──────────────────────────────────────────────────── */
export function initTrace(root, { initial = 1 } = {}) {
  root.innerHTML = template();
  const $ = (s, p = root) => p.querySelector(s);
  const $$ = (s, p = root) => [...p.querySelectorAll(s)];

  const shell = $('.trace__shell');
  const body = $('#trace-body');
  const claimEls = $$('.claim');
  const evEls = $$('.ev');
  const dots = $$('.dock__dot');
  const prev = $('.dock__prev');
  const next = $('.dock__next');
  const live = $('#trace-live');
  const key = $('#trace-key');
  const plateTitle = $('#plate-title');
  const readEls = $$('.read__text');
  const agreeVals = $$('.agree__v');
  const agreeItems = $$('.agree__item');

  const mqDesktop = matchMedia('(min-width: 1100px)');
  const mqHover = matchMedia('(hover: hover) and (pointer: fine)');
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');

  const plate = createPlate($('#trace-plate'));
  const leaders = createLeaders($('.trace__leaders'), body, () =>
    claimEls.map((c, i) => ({ mark: $('.claim__mark', c), num: $('.ev__num', evEls[i]) })));

  let pinned = Math.min(Math.max(initial, 1), TOTAL);
  let preview = null;
  let announceTimer = 0;

  const current = () => preview ?? pinned;

  function announce(text) {
    clearTimeout(announceTimer);
    live.textContent = '';
    announceTimer = setTimeout(() => { live.textContent = text; }, 60);
  }

  let trackUntil = 0;
  function trackLayout(ms = 700) {
    if (!mqDesktop.matches) return;
    const first = performance.now() > trackUntil;
    trackUntil = performance.now() + ms;
    if (!first) return;
    const tick = () => {
      leaders.update();
      if (performance.now() < trackUntil) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function stampAgreement(id) {
    const value = claims[id - 1].agree;
    agreeVals.forEach((v) => { v.textContent = value; });
    if (mqReduce.matches || !agreeItems[0].animate) return;
    agreeItems.forEach((item, i) => {
      item.animate(
        [{ opacity: 0.25, transform: 'translateY(3px)' }, { opacity: 1, transform: 'none' }],
        { duration: 320, delay: 380 + i * 90, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' },
      );
    });
  }

  let lastRendered = 0;
  function render() {
    const id = current();
    shell.dataset.claim = String(id);
    claimEls.forEach((el, i) => {
      const n = i + 1;
      el.setAttribute('aria-checked', String(n === pinned));
      el.tabIndex = n === pinned ? 0 : -1;
      el.classList.toggle('is-active', n === id);
      el.classList.toggle('is-preview', preview === n);
    });
    evEls.forEach((el, i) => el.classList.toggle('is-active', i + 1 === id));
    readEls.forEach((el, i) => el.classList.toggle('is-active', i + 1 === id));
    plate.setClaim(id);
    plateTitle.textContent = claims[id - 1].plateTitle;
    leaders.setActive(id);
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i + 1 === pinned);
      if (i + 1 === pinned) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
    });
    prev.setAttribute('aria-disabled', String(pinned === 1));
    next.setAttribute('aria-disabled', String(pinned === TOTAL));
    if (id !== lastRendered) { stampAgreement(id); lastRendered = id; }
    trackLayout();
  }

  function pin(id, { focus = false, scroll = false } = {}) {
    if (id < 1 || id > TOTAL) return;
    const changed = id !== pinned;
    pinned = id;
    preview = null;
    render();
    if (focus) claimEls[id - 1].focus({ preventScroll: true });
    if (scroll && !mqDesktop.matches) {
      claimEls[id - 1].scrollIntoView({ block: 'nearest', behavior: mqReduce.matches ? 'auto' : 'smooth' });
    }
    if (changed) announce(claims[id - 1].announce);
  }

  function setPreview(id) {
    if (preview === id) return;
    preview = id === pinned ? null : id;
    render();
  }

  /* Pointer: hovering a claim previews it, click pins it. Mouse only; touch has no hover.
     Only the claims preview: the evidence rows resize as claims change, so hovering
     them would move the row out from under the pointer and make the state flicker. */
  const onOver = (e) => {
    if (e.pointerType !== 'mouse' || !mqHover.matches) return;
    const target = e.target.closest('.claim');
    if (target) setPreview(+target.dataset.claim);
  };
  $('.claims').addEventListener('pointerover', onOver);
  $('.claims').addEventListener('pointerleave', () => setPreview(null));

  claimEls.forEach((el) => el.addEventListener('click', () => pin(+el.dataset.claim, { scroll: true })));
  evEls.forEach((el) => $('.ev__head', el).addEventListener('click', () => {
    if (mqDesktop.matches) pin(+el.dataset.claim);
  }));

  /* Keyboard: arrow keys move through the radio group and pin. */
  $('.claims').addEventListener('keydown', (e) => {
    const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let id = pinned;
    if (e.key in map) id = Math.min(Math.max(pinned + map[e.key], 1), TOTAL);
    else if (e.key === 'Home') id = 1;
    else if (e.key === 'End') id = TOTAL;
    else return;
    e.preventDefault();
    pin(id, { focus: true });
  });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && preview !== null) setPreview(null); });

  /* Dock (tablet and mobile) */
  const step = (d) => { if (pinned + d >= 1 && pinned + d <= TOTAL) pin(pinned + d, { scroll: true }); };
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  dots.forEach((d) => d.addEventListener('click', () => pin(+d.dataset.claim, { scroll: true })));

  /* Swipe: touch only, horizontal intent only. touch-action keeps vertical scroll native. */
  const swipeTargets = [$('.trace__evidence'), $('#trace-plate')];
  swipeTargets.forEach((target) => {
    let start = null;
    target.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch' || mqDesktop.matches) return;
      start = { x: e.clientX, y: e.clientY, t: performance.now() };
    });
    target.addEventListener('pointerup', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const dt = performance.now() - start.t;
      start = null;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.8 && dt < 700) step(dx < 0 ? 1 : -1);
    });
    target.addEventListener('pointercancel', () => { start = null; });
  });

  /* Responsive plumbing */
  const syncKey = () => { key.open = mqDesktop.matches; };
  syncKey();
  mqDesktop.addEventListener('change', () => { syncKey(); render(); leaders.update(); plate.layout(); });
  new ResizeObserver(() => { if (mqDesktop.matches) leaders.update(); }).observe(body);
  if (document.fonts?.ready) document.fonts.ready.then(() => { leaders.update(); plate.layout(); });

  render();
  leaders.update();

  return {
    select(id) { pin(id); },
    get claim() { return pinned; },
  };
}
