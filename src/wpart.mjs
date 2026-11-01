// Waterplan "reimagined" artwork. ILLUSTRATIVE concept work for an independent exploration:
// drawn in SVG/HTML, with invented, non-factual labels. Not the real product, brand assets or data.
// One short homepage (home) is the single source: the hero, the key sections, the full page and the mobile
// views are all cropped from the same markup. Palette = Waterplan's: Dark + White as base, Blue and Green as accents.
// Typeface: Golos Text. Replace any piece with a final asset by setting `src` in visualcases.mjs.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const C = {
  navy: '#022148', slate: '#2D3748', slate2: '#4A5568', mist: '#C3CCD7',
  blue: '#3675F0', blue2: '#5E91F3', sky: '#6EB9FF', ice: '#E9F4FE',
  g1: '#065244', g2: '#0C7965', g3: '#66CB71', g4: '#A7D8AF',
  l1: '#E0E9FF', l2: '#F3F7FF', l3: '#E2EBF3', l4: '#EDF2F7',
};

// ----- territory: the same ground in every piece --------------------------------------------------------------
const RIVER = 'M168 -4 C146 10 150 26 124 36 S92 40 80 54 S58 68 40 78 S12 92 -6 104';
const CONTOURS = (n, stroke = C.ice, op = 0.3) => Array.from({ length: n }, (_, i) => {
  const y = 4 + i * (96 / n);
  return `<path d="M-6 ${y.toFixed(1)} C22 ${(y - 7).toFixed(1)} 44 ${(y + 7).toFixed(1)} 76 ${(y - 3).toFixed(1)} S128 ${(y + 8).toFixed(1)} 168 ${(y - 4).toFixed(1)}" fill="none" stroke="${stroke}" stroke-opacity="${(op - i * 0.012).toFixed(2)}" stroke-width=".28"/>`;
}).join('');
const PINS = [[34, 62, 'Rainfall anomaly', 'a'], [92, 36, 'Aquifer level', 'b'], [124, 70, 'Facility 04', 'f']];

// scene({ id, layers: ['contours','signals','relations','scenario','priorities'], split, label })
export function scene({ id = 's', layers = [], split = false, label = true } = {}) {
  const has = (l) => layers.includes(l);
  const g = id;
  return `<svg class="wps" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrative aerial view of water and territory${layers.length ? ' with layers of interpretation' : ''}">
    <defs>
      <linearGradient id="${g}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.navy}"/><stop offset=".6" stop-color="#0a3570"/><stop offset="1" stop-color="#1655b8"/></linearGradient>
      <linearGradient id="${g}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.g2}"/><stop offset="1" stop-color="${C.g1}"/></linearGradient>
      <filter id="${g}n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .12 0"/></filter>
      <pattern id="${g}h" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2.6" height="2.6" fill="${C.sky}" fill-opacity=".2"/><line x1="0" y1="0" x2="0" y2="2.6" stroke="${C.sky}" stroke-width=".55" stroke-opacity=".95"/></pattern>
      <clipPath id="${g}c"><rect width="160" height="100"/></clipPath>
    </defs>
    <g clip-path="url(#${g}c)">
      <rect width="160" height="100" fill="url(#${g}w)"/>
      <path d="M-6 8 C20 2 44 16 66 12 S112 -2 130 8 L130 -6 L-6 -6Z" fill="url(#${g}l)" opacity=".95"/>
      <path d="M-6 50 C14 42 34 48 52 40 S88 22 108 26 S136 38 168 28 L168 104 L-6 104Z" fill="url(#${g}l)"/>
      <path d="M-6 50 C14 42 34 48 52 40 S88 22 108 26 S136 38 168 28" fill="none" stroke="${C.ice}" stroke-opacity=".5" stroke-width=".8"/>
      <g opacity=".6">
        <path d="M6 76 l26 -8 l9 16 l-26 8z" fill="${C.g3}" fill-opacity=".5"/><path d="M34 66 l22 -6 l8 14 l-22 6z" fill="${C.g4}" fill-opacity=".35"/><path d="M60 80 l20 -5 l7 12 l-20 5z" fill="${C.g3}" fill-opacity=".4"/>
        <path d="M112 54 l24 -7 l8 14 l-24 7z" fill="${C.g4}" fill-opacity=".32"/><path d="M84 66 l16 -4 l6 10 l-16 4z" fill="${C.g3}" fill-opacity=".45"/><path d="M14 92 l24 -6 l7 11 l-24 6z" fill="${C.g4}" fill-opacity=".3"/>
      </g>
      <path d="${RIVER}" fill="none" stroke="${C.navy}" stroke-width="6.4" stroke-linecap="round" opacity=".5"/>
      <path d="${RIVER}" fill="none" stroke="${C.blue}" stroke-width="4.2" stroke-linecap="round"/>
      <path d="${RIVER}" fill="none" stroke="${C.sky}" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>
      <ellipse cx="72" cy="60" rx="11" ry="4.8" fill="${C.blue2}" opacity=".95" transform="rotate(-12 72 60)"/>
      <rect width="160" height="100" filter="url(#${g}n)"/>
      ${has('contours') ? `<g>${CONTOURS(11)}</g>` : ''}
      ${has('signals') || has('relations') ? `<g stroke="${C.ice}" stroke-opacity=".2" stroke-width=".22">${[32, 64, 96, 128].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="100"/>`).join('')}${[25, 50, 75].map((y) => `<line x1="0" y1="${y}" x2="160" y2="${y}"/>`).join('')}</g>` : ''}
      ${has('scenario') ? `<g><path d="M96 56 C108 46 134 48 150 58 S160 78 144 86 S104 90 92 78Z" fill="url(#${g}h)" stroke="${C.sky}" stroke-width=".6" stroke-dasharray="2 1.4"/>${split ? `<path d="M112 62 C122 56 138 58 146 64 S148 76 138 80 S112 80 108 72Z" fill="none" stroke="#fff" stroke-width=".7"/>` : ''}</g>` : ''}
      ${has('relations') ? `<g fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray="1.6 1.4" stroke-opacity=".85"><path d="M34 62 C58 52 80 66 124 70"/><path d="M92 36 C104 44 118 60 124 70"/></g>` : ''}
      ${has('signals') ? `<g>${PINS.map(([x, y, t, k]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="none" stroke="${k === 'f' ? C.g3 : '#fff'}" stroke-width=".5" stroke-opacity=".85"/><circle cx="${x}" cy="${y}" r="1.7" fill="${k === 'f' ? C.g3 : '#fff'}"/>${label ? `<g font-size="2.7" font-weight="650"><rect x="${x + 5}" y="${y - 3.2}" width="${t.length * 1.5 + 3.4}" height="6.4" rx="3.2" fill="${k === 'f' ? C.g3 : C.navy}" fill-opacity="${k === 'f' ? 1 : 0.82}" stroke="#fff" stroke-opacity=".4" stroke-width=".25"/><text x="${x + 7.2}" y="${y + 0.9}" fill="${k === 'f' ? C.navy : '#fff'}">${esc(t)}</text></g>` : ''}`).join('')}</g>` : ''}
      ${has('priorities') ? `<g font-size="3" font-weight="700">${[[34, 54, 1], [92, 29, 2], [124, 62, 3]].map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="3" fill="${C.g3}" stroke="${C.navy}" stroke-width=".45"/><text x="${x}" y="${y + 1.1}" text-anchor="middle" fill="${C.navy}">${n}</text>`).join('')}</g>` : ''}
    </g>
    ${label ? `<text x="157" y="97" font-size="2.5" fill="#fff" fill-opacity=".75" text-anchor="end" font-weight="600">Illustrative</text>` : ''}
  </svg>`;
}

export const evolution = [
  { layers: [], title: 'Water and territory', text: 'Start from the place itself: an aerial image with no interpretation.' },
  { layers: ['contours'], title: 'Terrain gains structure', text: 'Contours and a measured grid say this is something to read, not admire.' },
  { layers: ['contours', 'signals', 'relations'], title: 'Signals and relations', text: 'Data points sit where they happen and connect to the facility they affect.' },
  { layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, title: 'Scenarios and priorities', text: 'Two futures on the same ground, and a short list of what to do first.' },
];

const mark = '<span class="wpm"><i></i></span>';

// ----- the short homepage (single source) ----------------------------------------------------------------------
// heights in cqw of the page width. A 16:9 slice is 56.25.
export const SLICES = { hero: [0, 56.25], s1: [56.25, 112.5], s2: [112.5, 168.75], s3: [168.75, 218.75], full: [0, 252.75] };
const SECS = [['hero', 0, 56.25], ['s1', 56.25, 112.5], ['s2', 112.5, 168.75], ['s3', 168.75, 218.75], ['cta', 218.75, 240.75], ['foot', 240.75, 252.75]];

function secHero(w, u) {
  return `<section class="h-hero" style="top:0">
    <div class="h-hero__bg">${scene({ id: u + 'h', layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, label: false })}</div><i class="h-hero__scrim"></i>
    <nav class="h-nav"><span class="h-logo">${mark}${esc(w.brand)}</span><span class="h-links">${w.nav.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="h-cta">${esc(w.navCta)}</span></nav>
    <p class="h-kick">${esc(w.kicker)}</p>
    <h3 class="h-h">${w.headline.map((t) => `<span>${esc(t)}</span>`).join('')}</h3>
    <p class="h-sub">${esc(w.sub)}</p>
    <div class="h-btns"><span class="h-btn">${esc(w.cta)}</span><span class="h-ghost">${esc(w.ghost)}</span></div>
    <div class="h-card"><p class="h-card__k">${esc(w.card.title)}</p><div class="h-card__r">${w.card.rows.map(([n, v]) => `<span><em>${esc(n)}</em><b>${esc(v)}</b></span>`).join('')}</div><i class="h-card__b"></i></div>
  </section>`;
}
function secOne(w, u) {
  const s = w.section;
  return `<section class="h-s1" style="top:56.25cqw">
    <div class="h-s1__t"><p class="h-k">${esc(s.kicker)}</p><h4>${esc(s.title)}</h4><p class="h-p">${esc(s.text)}</p><span class="h-link">${esc(s.link)} →</span></div>
    <div class="h-s1__m">${scene({ id: u + 'x', layers: ['contours', 'signals', 'relations'], label: true })}<span class="h-chip h-chip--1"><i></i>${esc(s.chips[0])}</span><span class="h-chip h-chip--2"><i></i>${esc(s.chips[1])}</span></div>
  </section>`;
}
function secTwo(w, u) {
  const s = w.s2;
  const a = [6, 9, 12, 14, 18, 22, 25, 29, 33, 38], b = [6, 8, 9, 10, 12, 14, 15, 16, 17, 18];
  const path = (ys) => ys.map((y, i) => `${i ? 'L' : 'M'}${(i / (ys.length - 1) * 150).toFixed(1)} ${(44 - y).toFixed(1)}`).join('');
  return `<section class="h-s2" style="top:112.5cqw">
    <div class="h-s2__ui">
      <div class="h-ui__top"><p>${esc(s.metric)}<em>Facility 04</em></p><span class="h-tog"><i>${esc(s.a[0].split(' ')[0])}</i><b>${esc(s.b[0].split(' ')[0])}</b></span></div>
      <div class="h-ui__nums"><div><span>${esc(s.a[0])}</span><b>${esc(s.a[1])}</b><u class="lv lv--a">${esc(s.a[2])}</u></div><div class="is-sel"><span>${esc(s.b[0])}</span><b>${esc(s.b[1])}</b><u class="lv lv--b">${esc(s.b[2])}</u></div></div>
      <svg class="h-ui__chart" viewBox="0 0 150 48" preserveAspectRatio="none" aria-hidden="true"><path d="${path(a)}L150 44L0 44Z" fill="${C.blue}" fill-opacity=".1"/><path d="${path(a)}" fill="none" stroke="${C.navy}" stroke-width="1.3" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="${path(b)}" fill="none" stroke="${C.g2}" stroke-width="1.3" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>
      <span class="h-ui__delta">−29 pts</span>
      <span class="wph__ill wph__ill--d">Illustrative</span>
    </div>
    <div class="h-s2__t"><p class="h-k">${esc(s.kicker)}</p><h4>${esc(s.title)}</h4><p class="h-p">${esc(s.text)}</p><span class="h-link">${esc(s.link)} →</span></div>
  </section>`;
}
function secThree(w) {
  const s = w.s3;
  return `<section class="h-s3" style="top:168.75cqw">
    <p class="h-k">${esc(s.kicker)}</p><h4>${esc(s.title)}</h4>
    <div class="h-acts">${s.cards.map(([t, d], i) => `<article><b>${i + 1}</b><h5>${esc(t)}</h5><p>${esc(d)}</p></article>`).join('')}</div>
  </section>`;
}
function secCta(w) { return `<section class="h-cta2" style="top:218.75cqw"><h4>${esc(w.close.title)}</h4><span class="h-btn h-btn--w">${esc(w.close.btn)}</span></section>`; }
function secFoot(w) { return `<footer class="h-foot" style="top:240.75cqw"><span class="h-logo">${mark}${esc(w.brand)}</span><span class="h-foot__l">${w.footer.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="h-foot__c">${esc(w.legal)}</span></footer>`;
}

// slice of the homepage: only the sections that intersect it are rendered
export function homeSlice(w, key, uid = 'hs') {
  const [from, to] = SLICES[key];
  const fn = { hero: secHero, s1: secOne, s2: secTwo, s3: secThree, cta: secCta, foot: secFoot };
  const inner = SECS.filter(([, a, b]) => a < to && b > from).map(([k]) => fn[k](w, `${uid}${key}`)).join('');
  return `<div class="wphs" style="--from:${from}"><div class="wphome">${inner}</div></div>`;
}
export const slice = (w, key, uid) => homeSlice(w, key, uid);
export const sliceAr = (key) => `100 / ${(SLICES[key][1] - SLICES[key][0]).toFixed(2)}`;

// ----- mobile: the same copy and territory, two views ----------------------------------------------------------
export function phones(w) {
  const hero = `<div class="wpp"><div class="wpp__b">
      <i class="wpp__n"></i><div class="wpp__bg">${scene({ id: 'pm1', layers: ['contours', 'scenario'], label: false })}</div><i class="wpp__scrim"></i>
      <p class="wpp__logo">${mark}${esc(w.brand)}</p>
      <h4 class="wpp__h">${w.headline.map((t) => `<span>${esc(t)}</span>`).join('')}</h4>
      <span class="wpp__btn">${esc(w.cta)}</span>
      <div class="wpp__c"><em>${esc(w.card.rows[0][0])}</em><b>${esc(w.card.rows[0][1])}</b></div>
      <span class="wph__ill wph__ill--p">Illustrative</span></div></div>`;
  const s = w.s2;
  const scen = `<div class="wpp wpp--l"><div class="wpp__b">
      <i class="wpp__n wpp__n--l"></i>
      <p class="wpp__k">${esc(s.kicker)}</p><h4 class="wpp__h2">${esc(s.title)}</h4>
      <div class="wpp__nums"><div><span>${esc(s.a[0])}</span><b>${esc(s.a[1])}</b></div><div class="is-sel"><span>${esc(s.b[0])}</span><b>${esc(s.b[1])}</b></div></div>
      <div class="wpp__map">${scene({ id: 'pm2', layers: ['contours', 'signals', 'scenario', 'priorities'], label: false })}</div>
      <span class="wpp__btn wpp__btn--b">${esc(w.cta)}</span>
      <span class="wph__ill wph__ill--pl">Illustrative</span></div></div>`;
  return `<div class="wpps">${hero}${scen}</div>`;
}

// motion sequence: the same ground, scenario A <-> B, with a priority list that updates (CSS loop)
export function motion(w) {
  return `<div class="wpm2" role="img" aria-label="Looping sequence: the map switches from scenario A to scenario B and the exposure value drops">
    <div class="wpm2__map">${scene({ id: 'm', layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, label: false })}<i class="wpm2__zone"></i></div>
    <div class="wpm2__panel">
      <div class="wpm2__tog"><span class="a">A · Current</span><span class="b">B · Adapted</span><i></i></div>
      <p class="wpm2__l">${esc(w.motion.metric)}</p>
      <p class="wpm2__v"><b class="va">78</b><b class="vb">49</b></p>
      <ul>${w.motion.priorities.map((t, i) => `<li style="--i:${i}"><b>${i + 1}</b>${esc(t)}</li>`).join('')}</ul>
      <span class="wph__ill wph__ill--d">Illustrative scenario</span>
    </div>
  </div>`;
}

export function poster(w) {
  return `<div class="wpq wpq--poster"><div class="wpq__bg">${scene({ id: 'q1', layers: ['contours'], label: false })}</div><i class="wpq__scrim"></i>
    <p class="wpq__logo">${mark}${esc(w.brand)}</p><h4>${w.comms.poster.map((t) => `<span>${esc(t)}</span>`).join('')}</h4><p class="wpq__sm">${esc(w.comms.posterSub)}</p></div>`;
}
export function social(w) {
  return `<div class="wpq wpq--social"><div class="wpq__bg">${scene({ id: 'q2', layers: ['contours', 'signals', 'scenario'], label: false })}</div><i class="wpq__scrim wpq__scrim--b"></i>
    <p class="wpq__big">${esc(w.comms.social.big)}</p><p class="wpq__sm">${esc(w.comms.social.small)}</p><span class="wpq__tag">${esc(w.comms.social.tag)}</span></div>`;
}
export function report(w) {
  return `<div class="wpq wpq--report"><p class="wpq__k">${esc(w.comms.report.kicker)}</p><h4>${w.comms.report.title.map((t) => `<span>${esc(t)}</span>`).join('')}</h4>
    <div class="wpq__map">${scene({ id: 'q3', layers: ['contours', 'signals', 'relations', 'priorities'], label: false })}</div><p class="wpq__f">${esc(w.brand)} · ${esc(w.comms.report.foot)}</p></div>`;
}

// identity: type + palette
export function typeSpecimen(w) {
  return `<div class="wpt"><p class="wpt__k">Golos Text · 600 / 400</p><p class="wpt__aa">Aa</p>
    <p class="wpt__h1">${esc(w.type.h1)}</p><p class="wpt__h2">${esc(w.type.h2)}</p><p class="wpt__b">${esc(w.type.body)}</p></div>`;
}
// [name, hex, use, share of the bar, text colour]
export const palette = [
  ['Deep navy', C.navy, 'Hero and dark sections; text on light', 34, '#fff'],
  ['White', '#FFFFFF', 'Space, cards and reading surfaces', 22, C.navy],
  ['Mist', C.l2, 'Alternating light sections', 12, C.navy],
  ['Blue', C.blue, 'Water, data and primary actions', 12, '#fff'],
  ['Sky', C.sky, 'Rivers, links and data on dark', 6, C.navy],
  ['Forest', C.g1, 'Land and depth in the imagery', 8, '#fff'],
  ['Green', C.g3, 'Selection and priorities: what to do first', 6, C.navy],
];

export function layerKit() {
  return `<div class="wpk">
    <figure><svg viewBox="0 0 60 40" aria-hidden="true">${CONTOURS(7, C.blue, 0.55)}</svg><figcaption>Contours</figcaption></figure>
    <figure><svg viewBox="0 0 60 40" aria-hidden="true"><circle cx="30" cy="20" r="11" fill="none" stroke="${C.blue}" stroke-width=".8" opacity=".55"/><circle cx="30" cy="20" r="5.2" fill="none" stroke="${C.navy}" stroke-width=".9"/><circle cx="30" cy="20" r="2" fill="${C.g3}"/></svg><figcaption>Signal</figcaption></figure>
    <figure><svg viewBox="0 0 60 40" aria-hidden="true"><path d="M8 30 C22 10 38 34 52 10" fill="none" stroke="${C.navy}" stroke-width=".9" stroke-dasharray="2.4 2"/><circle cx="8" cy="30" r="2.6" fill="${C.navy}"/><circle cx="52" cy="10" r="2.6" fill="${C.g3}"/></svg><figcaption>Relation</figcaption></figure>
    <figure><svg viewBox="0 0 60 40" aria-hidden="true"><defs><pattern id="kh" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="${C.blue}" fill-opacity=".14"/><line x1="0" y1="0" x2="0" y2="3" stroke="${C.blue}" stroke-width=".7"/></pattern></defs><path d="M10 28 C16 12 40 8 50 20 S42 36 22 34Z" fill="url(#kh)" stroke="${C.blue}" stroke-width=".8" stroke-dasharray="2.4 1.8"/></svg><figcaption>Scenario zone</figcaption></figure>
  </div>`;
}
