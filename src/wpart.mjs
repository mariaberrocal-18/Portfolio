// Waterplan "reimagined" artwork: an aerial view of water and territory that gains layers of interpretation
// (contours → signals → relations → scenarios → priorities). Everything here is ILLUSTRATIVE: drawn in SVG/HTML,
// with invented, non-factual labels. It is concept work for an independent exploration, not real data.
// Replace any piece with a final generated/photographic asset by setting `src` in visualcases.mjs.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const AMBER = '#f2a93b', LIGHT = '#bfe0f5', WHITE = '#ffffff';

// the river, shared by every layer so the same territory is recognisable at every step
const RIVER = 'M168 -4 C146 10 150 26 124 36 S92 40 80 54 S58 68 40 78 S12 92 -6 104';
const CONTOURS = (n) => Array.from({ length: n }, (_, i) => {
  const y = 4 + i * (96 / n);
  return `<path d="M-6 ${y.toFixed(1)} C22 ${(y - 7).toFixed(1)} 44 ${(y + 7).toFixed(1)} 76 ${(y - 3).toFixed(1)} S128 ${(y + 8).toFixed(1)} 168 ${(y - 4).toFixed(1)}" fill="none" stroke="#e8f4fb" stroke-opacity="${(0.3 - i * 0.012).toFixed(2)}" stroke-width=".28"/>`;
}).join('');
const PINS = [[34, 62, 'Rainfall anomaly', 'a'], [92, 36, 'Aquifer level', 'b'], [124, 70, 'Facility 04', 'f']];

// scene({ id, layers: ['contours','signals','relations','scenario','priorities'], split })
export function scene({ id = 's', layers = [], split = false, label = true } = {}) {
  const has = (l) => layers.includes(l);
  const g = `${id}`;
  return `<svg class="wps" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrative aerial view of water and territory${layers.length ? ' with layers of interpretation' : ''}">
    <defs>
      <linearGradient id="${g}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06223a"/><stop offset=".55" stop-color="#0d4a73"/><stop offset="1" stop-color="#1b6f93"/></linearGradient>
      <linearGradient id="${g}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9b48a"/><stop offset="1" stop-color="#7f8a62"/></linearGradient>
      <filter id="${g}n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .13 0"/></filter>
      <pattern id="${g}h" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2.6" height="2.6" fill="${AMBER}" fill-opacity=".18"/><line x1="0" y1="0" x2="0" y2="2.6" stroke="${AMBER}" stroke-width=".55" stroke-opacity=".9"/></pattern>
      <clipPath id="${g}c"><rect width="160" height="100"/></clipPath>
    </defs>
    <g clip-path="url(#${g}c)">
      <rect width="160" height="100" fill="url(#${g}w)"/>
      <path d="M-6 8 C20 2 44 16 66 12 S112 -2 130 8 L130 -6 L-6 -6Z" fill="url(#${g}l)" opacity=".95"/>
      <path d="M-6 50 C14 42 34 48 52 40 S88 22 108 26 S136 38 168 28 L168 104 L-6 104Z" fill="url(#${g}l)"/>
      <path d="M-6 50 C14 42 34 48 52 40 S88 22 108 26 S136 38 168 28" fill="none" stroke="#e9e3bd" stroke-opacity=".55" stroke-width=".8"/>
      <g opacity=".5">
        <path d="M6 76 l26 -8 l9 16 l-26 8z" fill="#7a8a4e"/><path d="M34 66 l22 -6 l8 14 l-22 6z" fill="#a8975a"/><path d="M60 80 l20 -5 l7 12 l-20 5z" fill="#6e7f49"/>
        <path d="M112 54 l24 -7 l8 14 l-24 7z" fill="#a8975a"/><path d="M84 66 l16 -4 l6 10 l-16 4z" fill="#7a8a4e"/><path d="M14 92 l24 -6 l7 11 l-24 6z" fill="#8c8f52"/>
      </g>
      <path d="${RIVER}" fill="none" stroke="#0a3552" stroke-width="6.4" stroke-linecap="round" opacity=".55"/>
      <path d="${RIVER}" fill="none" stroke="#4f9fcc" stroke-width="4.2" stroke-linecap="round"/>
      <path d="${RIVER}" fill="none" stroke="#cfe9f7" stroke-width=".7" stroke-linecap="round" opacity=".75"/>
      <ellipse cx="72" cy="60" rx="11" ry="4.8" fill="#4f9fcc" opacity=".9" transform="rotate(-12 72 60)"/>
      <rect width="160" height="100" filter="url(#${g}n)"/>
      ${has('contours') ? `<g class="wp-l wp-l--c">${CONTOURS(11)}</g>` : ''}
      ${has('signals') || has('relations') ? `<g class="wp-l wp-l--g" stroke="#e8f4fb" stroke-opacity=".2" stroke-width=".22">${[32, 64, 96, 128].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="100"/>`).join('')}${[25, 50, 75].map((y) => `<line x1="0" y1="${y}" x2="160" y2="${y}"/>`).join('')}</g>` : ''}
      ${has('scenario') ? `<g class="wp-l wp-l--s"><path d="M96 56 C108 46 134 48 150 58 S160 78 144 86 S104 90 92 78Z" fill="url(#${g}h)" stroke="${AMBER}" stroke-width=".6" stroke-dasharray="2 1.4"/>${split ? `<path d="M112 62 C122 56 138 58 146 64 S148 76 138 80 S112 80 108 72Z" fill="none" stroke="${WHITE}" stroke-width=".7"/>` : ''}</g>` : ''}
      ${has('relations') ? `<g class="wp-l wp-l--r" fill="none" stroke="${WHITE}" stroke-width=".5" stroke-dasharray="1.6 1.4" stroke-opacity=".85"><path d="M34 62 C58 52 80 66 124 70"/><path d="M92 36 C104 44 118 60 124 70"/></g>` : ''}
      ${has('signals') ? `<g class="wp-l wp-l--p">${PINS.map(([x, y, t, k]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="none" stroke="${k === 'f' ? AMBER : WHITE}" stroke-width=".5" stroke-opacity=".8"/><circle cx="${x}" cy="${y}" r="1.7" fill="${k === 'f' ? AMBER : WHITE}"/>${label ? `<g font-size="2.7" font-weight="650"><rect x="${x + 5}" y="${y - 3.2}" width="${t.length * 1.46 + 3.4}" height="6.4" rx="3.2" fill="${k === 'f' ? AMBER : '#06223a'}" fill-opacity="${k === 'f' ? 1 : 0.78}" stroke="${WHITE}" stroke-opacity=".4" stroke-width=".25"/><text x="${x + 7.2}" y="${y + 0.9}" fill="${k === 'f' ? '#06223a' : WHITE}">${esc(t)}</text></g>` : ''}`).join('')}</g>` : ''}
      ${has('priorities') ? `<g class="wp-l wp-l--n" font-size="3" font-weight="700">${[[34, 54, 1], [92, 29, 2], [124, 62, 3]].map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="3" fill="${AMBER}" stroke="#06223a" stroke-width=".4"/><text x="${x}" y="${y + 1.1}" text-anchor="middle" fill="#06223a">${n}</text>`).join('')}</g>` : ''}
    </g>
    ${label ? `<text x="157" y="97" font-size="2.5" fill="#fff" fill-opacity=".75" text-anchor="end" font-weight="600">Illustrative</text>` : ''}
  </svg>`;
}

// the four steps of the image evolution (Q2 of the page)
export const evolution = [
  { layers: [], title: 'Water and territory', text: 'Start from the place itself: an aerial image with no interpretation.' },
  { layers: ['contours'], title: 'Terrain gains structure', text: 'Contours and a measured grid say this is something to read, not admire.' },
  { layers: ['contours', 'signals', 'relations'], title: 'Signals and relations', text: 'Data points sit where they happen and connect to the facility they affect.' },
  { layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, title: 'Scenarios and priorities', text: 'Two futures on the same ground, and a short list of what to do first.' },
];

// ----- HTML mock pieces (sized in cqw so each scales as one object) --------------------------------------------
const logo = '<span class="wpm"><i></i></span>';

export function webHero(w) {
  return `<div class="wph">
    <div class="wph__bg">${scene({ id: 'h', layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, label: false })}</div>
    <i class="wph__scrim"></i>
    <nav class="wph__nav"><span class="wph__logo">${logo}${esc(w.brand)}</span><span class="wph__links">${w.nav.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="wph__cta">${esc(w.navCta)}</span></nav>
    <p class="wph__k">${esc(w.kicker)}</p>
    <h3 class="wph__h">${w.headline.map((t) => `<span>${esc(t)}</span>`).join('')}</h3>
    <p class="wph__s">${esc(w.sub)}</p>
    <div class="wph__b"><span class="wph__btn">${esc(w.cta)}</span><span class="wph__ghost">${esc(w.ghost)}</span></div>
    <div class="wph__card"><p class="wph__ck">${esc(w.card.title)}</p><div class="wph__cr">${w.card.rows.map(([n, v]) => `<span><em>${esc(n)}</em><b>${esc(v)}</b></span>`).join('')}</div><i class="wph__cb"></i></div>
    <span class="wph__ill">Illustrative concept</span>
  </div>`;
}

export function webSection(w) {
  return `<div class="wpx">
    <div class="wpx__t"><p class="wpx__k">${esc(w.section.kicker)}</p><h4>${esc(w.section.title)}</h4><p>${esc(w.section.text)}</p></div>
    <div class="wpx__m">${scene({ id: 'x', layers: ['contours', 'signals', 'relations', 'priorities'], label: false })}
      <div class="wpx__chip wpx__chip--1"><i></i>${esc(w.section.chips[0])}</div><div class="wpx__chip wpx__chip--2"><i></i>${esc(w.section.chips[1])}</div></div>
    <span class="wph__ill wph__ill--d">Illustrative concept</span>
  </div>`;
}

export function phone(w) {
  return `<div class="wpp"><div class="wpp__b">
    <i class="wpp__n"></i>
    <div class="wpp__bg">${scene({ id: 'p', layers: ['contours', 'scenario'], label: false })}</div><i class="wpp__scrim"></i>
    <p class="wpp__logo">${logo}${esc(w.brand)}</p>
    <h4 class="wpp__h">${w.headline.map((t) => `<span>${esc(t)}</span>`).join('')}</h4>
    <span class="wpp__btn">${esc(w.cta)}</span>
    <div class="wpp__c"><em>${esc(w.card.rows[0][0])}</em><b>${esc(w.card.rows[0][1])}</b></div>
    <span class="wph__ill wph__ill--p">Illustrative</span>
  </div></div>`;
}

// motion sequence: the same ground, scenario A ↔ B, with a priority list that updates (CSS loop)
export function motion(w) {
  return `<div class="wpm2" role="img" aria-label="Looping sequence: the map switches from scenario A to scenario B and the exposure value drops">
    <div class="wpm2__map">${scene({ id: 'm', layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, label: false })}
      <i class="wpm2__zone"></i></div>
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
    <p class="wpq__logo">${logo}${esc(w.brand)}</p><h4>${w.comms.poster.map((t) => `<span>${esc(t)}</span>`).join('')}</h4><p class="wpq__sm">${esc(w.comms.posterSub)}</p></div>`;
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
  return `<div class="wpt"><p class="wpt__k">Inter Tight · 650 / 400</p><p class="wpt__aa">Aa</p>
    <p class="wpt__h1">${esc(w.type.h1)}</p><p class="wpt__h2">${esc(w.type.h2)}</p><p class="wpt__b">${esc(w.type.body)}</p></div>`;
}
export const palette = [
  ['Deep water', '#06223A', 'Grounds the page; text on light, backgrounds on dark', 38, '#fff'],
  ['Tide', '#0D4A73', 'Water, interface surfaces, charts', 22, '#fff'],
  ['Clear', '#BFE0F5', 'Light surfaces and secondary data', 16, '#06223A'],
  ['White', '#FFFFFF', 'Space, cards, reading text on dark', 18, '#06223A'],
  ['Amber', '#F2A93B', 'Only for risk, selection and priority', 6, '#06223A'],
];

export function layerKit() {
  return `<div class="wpk">
    <figure><svg viewBox="0 0 60 40" aria-hidden="true">${CONTOURS(7).replace(/stroke="#e8f4fb"/g, 'stroke="#0D4A73"').replace(/viewBox/g, '')}</svg><figcaption>Contours</figcaption></figure>
    <figure><svg viewBox="0 0 60 40" aria-hidden="true"><circle cx="30" cy="20" r="11" fill="none" stroke="#0D4A73" stroke-width=".8" opacity=".55"/><circle cx="30" cy="20" r="5.2" fill="none" stroke="#06223A" stroke-width=".9"/><circle cx="30" cy="20" r="2" fill="${AMBER}"/></svg><figcaption>Signal</figcaption></figure>
    <figure><svg viewBox="0 0 60 40" aria-hidden="true"><path d="M8 30 C22 10 38 34 52 10" fill="none" stroke="#06223A" stroke-width=".9" stroke-dasharray="2.4 2"/><circle cx="8" cy="30" r="2.6" fill="#06223A"/><circle cx="52" cy="10" r="2.6" fill="${AMBER}"/></svg><figcaption>Relation</figcaption></figure>
    <figure><svg viewBox="0 0 60 40" aria-hidden="true"><defs><pattern id="kh" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="${AMBER}" fill-opacity=".2"/><line x1="0" y1="0" x2="0" y2="3" stroke="${AMBER}" stroke-width=".7"/></pattern></defs><path d="M10 28 C16 12 40 8 50 20 S42 36 22 34Z" fill="url(#kh)" stroke="${AMBER}" stroke-width=".8" stroke-dasharray="2.4 1.8"/></svg><figcaption>Scenario zone</figcaption></figure>
  </div>`;
}
