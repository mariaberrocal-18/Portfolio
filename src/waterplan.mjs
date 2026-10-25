// Waterplan concept scene for Visual Design: a product screen becomes the hero of a reinterpreted website.
// Everything here is ILLUSTRATIVE (no real data, no commercial claims). Pieces to swap for final assets are
// marked PLACEHOLDER; set `scene.photo` in content.mjs to use a real photograph instead of the drawn terrain.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// PLACEHOLDER (data-asset="waterplan-hero-photo"): drawn, satellite-like territory. Replace with a photograph.
const terrain = () => `<svg class="vphoto__svg" viewBox="0 0 220 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="vg-base" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2540"/><stop offset=".5" stop-color="#11506e"/><stop offset="1" stop-color="#1d6f7c"/></linearGradient>
      <filter id="vg-grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .1 0"/></filter>
    </defs>
    <rect width="220" height="100" fill="url(#vg-base)"/>
    <path d="M0 62 C30 48 52 58 80 46 S128 20 160 30 S206 18 220 10 L220 100 L0 100Z" fill="#06182c" opacity=".35"/>
    <path d="M0 80 C26 70 48 82 76 72 S130 60 168 70 S204 62 220 58 L220 100 L0 100Z" fill="#0c3550" opacity=".5"/>
    <path d="M120 0 C140 14 150 8 176 20 S214 14 220 24 L220 0Z" fill="#0d3a52" opacity=".6"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${-10 + i * 6} ${74 - i * 6} C${30 + i * 8} ${54 - i * 5} ${70 + i * 6} ${70 - i * 6} ${110 + i * 6} ${50 - i * 4} S${170 + i * 4} ${34 - i * 3} ${230} ${20 - i * 2}" fill="none" stroke="#cfe3f5" stroke-opacity="${(0.17 - i * 0.02).toFixed(2)}" stroke-width=".35"/>`).join('')}
    <g opacity=".55"><path d="M6 78 l22 -6 l8 14 l-22 6z" fill="#8c9a4e"/><path d="M30 70 l20 -5 l7 13 l-20 5z" fill="#b59a4a"/><path d="M12 90 l24 -6 l6 10 l-24 6z" fill="#7f8f4a"/><path d="M52 82 l18 -4 l6 11 l-18 4z" fill="#a88f46"/></g>
    <path class="vp-river" d="M232 6 C196 22 172 8 150 34 S110 50 96 62 S60 80 38 104" fill="none" stroke="#7cc3ee" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>
    <path d="M232 6 C196 22 172 8 150 34 S110 50 96 62 S60 80 38 104" fill="none" stroke="#e3f4ff" stroke-width=".7" stroke-linecap="round" opacity=".7"/>
    <ellipse cx="62" cy="76" rx="10" ry="4.6" fill="#5fb0e3" opacity=".85"/>
    <rect width="220" height="100" filter="url(#vg-grain)"/>
  </svg>`;

const layers = () => `<svg class="vlayers" viewBox="0 0 220 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><pattern id="vg-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="#f2a93b" fill-opacity=".16"/><line x1="0" y1="0" x2="0" y2="3" stroke="#f2a93b" stroke-width=".6" stroke-opacity=".7"/></pattern></defs>
    <g class="vl-grid" stroke="#cfe3f5" stroke-opacity=".28" stroke-width=".25" fill="none">
      ${[28, 56, 84, 112, 140, 168, 196].map((x) => `<line pathLength="1" x1="${x}" y1="0" x2="${x}" y2="100"/>`).join('')}
      ${[20, 40, 60, 80].map((y) => `<line pathLength="1" x1="0" y1="${y}" x2="220" y2="${y}"/>`).join('')}
    </g>
    <path class="vl-flow" pathLength="1" d="M232 6 C196 22 172 8 150 34 S110 50 96 62 S60 80 38 104" fill="none" stroke="#e3f4ff" stroke-width=".9" stroke-dasharray="1" stroke-linecap="round"/>
    <path class="vl-risk" pathLength="1" d="M52 38 L80 32 L92 50 L72 68 L48 60Z"/>
    <path class="vl-risk" pathLength="1" d="M16 72 L42 66 L50 88 L22 94Z"/>
    <path class="vl-risk" pathLength="1" d="M124 5 L158 9 L162 21 L130 22Z"/>
    ${[[66, 50], [34, 80], [144, 14]].map(([x, y]) => `<g class="vl-pin"><circle class="vl-ring" cx="${x}" cy="${y}" r="3.4" fill="none" stroke="#f2a93b" stroke-width=".5"/><circle cx="${x}" cy="${y}" r="1.4" fill="#f2a93b"/></g>`).join('')}
  </svg>`;

const mapDetail = () => `<div class="vdet vdet--map"><div class="vdet__in">
        <p class="vdet__t">Basin risk</p>
        <svg viewBox="0 0 100 64" aria-hidden="true"><rect width="100" height="64" fill="#dcebf7"/>
          <path d="M6 40 C14 22 34 18 48 24 S82 16 94 30 S88 56 64 58 S18 62 6 40Z" fill="#eef5fb" stroke="#0a2540" stroke-width=".5" stroke-dasharray="1.6 1.2"/>
          <path d="M90 8 C74 18 66 22 58 32 S40 44 30 60" fill="none" stroke="#4c9bd6" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M26 36 L44 32 L52 44 L34 52Z" fill="#f2a93b" fill-opacity=".38" stroke="#d98a1c" stroke-width=".5"/>
          <path d="M62 24 L80 28 L78 40 L62 38Z" fill="#f2a93b" fill-opacity=".22" stroke="#d98a1c" stroke-width=".5"/>
          <circle cx="40" cy="42" r="1.6" fill="#d98a1c"/><circle cx="71" cy="33" r="1.4" fill="#d98a1c"/>
        </svg>
        <ul class="vdet__leg"><li><i class="a"></i>High</li><li><i class="b"></i>Medium</li><li><i class="c"></i>Low</li></ul>
      </div></div>`;

const chartDetail = () => `<div class="vdet vdet--chart"><div class="vdet__in">
        <p class="vdet__t">Trajectory</p>
        <svg viewBox="0 0 100 60" aria-hidden="true">
          ${[12, 26, 40, 54].map((y) => `<line x1="2" y1="${y}" x2="98" y2="${y}" stroke="#0a2540" stroke-opacity=".1" stroke-width=".4"/>`).join('')}
          <path d="M4 12 L96 42" fill="none" stroke="#0a2540" stroke-width=".8" stroke-dasharray="2 1.6"/>
          <path d="M4 12 C30 14 58 22 96 26" fill="none" stroke="#8fc2ea" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M4 12 C30 16 58 32 96 44" fill="none" stroke="#1c6fb8" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M4 12 C28 14 60 18 96 14" fill="none" stroke="#f2a93b" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <ul class="vdet__leg"><li><i class="t"></i>Target</li><li><i class="a"></i>A</li><li><i class="b"></i>B</li><li><i class="c"></i>C</li></ul>
      </div></div>`;

const productScreen = () => `<div class="vps" data-vps>
      <div class="vps__body">
        <aside class="vps__side"><i class="vps__dot"></i>${[0, 1, 2, 3, 4].map((i) => `<u${i === 1 ? ' class="on"' : ''}></u>`).join('')}</aside>
        <header class="vps__top"><p>Basins / Demo basin</p><h5>Water risk</h5><span class="vps__pill">Scenario B</span></header>
        <span class="vslot vslot--map"></span><span class="vslot vslot--chart"></span>
        <div class="vkpis">${[['Exposure', 'High'], ['Scenarios', '3'], ['Signals', '12']].map(([l, v]) => `<div><span>${l}</span><b>${v}</b><i></i></div>`).join('')}</div>
      </div>
      ${mapDetail()}
      ${chartDetail()}
    </div>`;

export function waterplanScene(visual, p) {
  const s = p.scene;
  const photo = s.photo
    ? `<img src="${s.photo}" alt="" loading="lazy">`
    : terrain();
  return `<div class="vframe" data-vframe role="img" aria-label="${esc(`Concept: a Waterplan product screen inside a reinterpreted website. ${s.headline.join(' ')}`)}">
      <span class="vframe__edge"></span>
      <div class="vworld">
        <div class="vsite">
          <div class="vphoto" data-asset="waterplan-hero-photo">${photo}</div>
          ${layers()}
          <div class="vscrim"></div>
          <nav class="vnav"><span class="vnav__logo">${esc(s.brand)}</span><span class="vnav__links">${s.nav.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="vnav__cta">${esc(s.navCta)}</span></nav>
          <h3 class="vh">${s.headline.map((t, i) => `<span style="--i:${i}"><b>${esc(t)}</b></span>`).join('')}</h3>
          <p class="vsub">${esc(p.descriptor)}</p>
          <div class="vctas"><span class="vcta">${esc(s.cta)}</span><span class="vghost">${esc(s.ghost)}</span></div>
          ${s.signals.map((t, i) => `<span class="vchip vchip--${i + 1}"><i></i>${esc(t)}</span>`).join('')}
          ${['A', 'B', 'C'].map((l, i) => `<span class="vtag vtag--${i + 1}">${l}</span>`).join('')}
        </div>
        ${productScreen()}
      </div>
    </div>`;
}
