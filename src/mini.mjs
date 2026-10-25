// Tiny drawings for the three loop cards on the home page (240 x 120).
const wrap = (inner, label) =>
  `<svg class="mini" viewBox="0 -10 240 140" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// Product thinking: strike the noise, land on the real problem
const thinking = () =>
  wrap(
    `<g class="m-noise">
      ${['Request', 'Assumption', 'Symptom']
        .map(
          (t, i) => `<g transform="translate(14 ${14 + i * 30})">
            <rect width="112" height="24" rx="12" fill="none" stroke="currentColor" stroke-opacity=".28"/>
            <text x="14" y="16.5" font-size="12" fill="currentColor" fill-opacity=".55">${t}</text>
            <line class="m-strike" x1="10" y1="12" x2="102" y2="12" stroke="currentColor" stroke-width="1.4" style="--i:${i}"/>
          </g>`,
        )
        .join('')}
    </g>
    <path class="m-link" d="M130 26 C150 26 150 60 164 60 M130 56 C148 56 150 60 164 60 M130 86 C150 86 150 62 164 62" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="2 4"/>
    <g class="m-real">
      <rect x="164" y="34" width="68" height="52" rx="12" fill="currentColor"/>
      <circle cx="178" cy="47" r="3.5" fill="var(--sage-hi)"/>
      <text x="177" y="68" font-size="11" font-weight="600" fill="var(--paper)">The real</text>
      <text x="177" y="80" font-size="11" font-weight="600" fill="var(--paper)">problem</text>
    </g>`,
    'Three noisy starting points struck through, leading to one highlighted real problem',
  );

// UI & Interaction Design: an interface refines itself (hierarchy sharpens, components fall into order) and
// responds to a selection (a cursor picks Q3, the chart updates). The still frame is the refined state.
const craft = () => {
  const kpis = [['Flood', '78', 'var(--sage-hi)'], ['Heat', '54', 'currentColor'], ['Supply', '41', 'currentColor']];
  const offs = [[-12, 8, -5], [10, -9, 4], [-8, 12, 6]];
  const old = [14, 26, 12, 30, 16, 22], now = [26, 18, 32, 22, 38, 30];
  return wrap(
    `<rect x="8" y="6" width="224" height="108" rx="10" fill="#fff" stroke="currentColor" stroke-opacity=".28"/>
    <g class="m-hier"><text x="20" y="27" font-size="12" font-weight="700" fill="currentColor">Exposure</text><text x="20" y="37" font-size="5.8" fill="currentColor" fill-opacity=".5">Portfolio · 2040</text></g>
    <rect x="150" y="14" width="72" height="14" rx="7" fill="currentColor" fill-opacity=".07"/>
    <rect class="m-pill" x="198" y="15.5" width="22" height="11" rx="5.5" fill="var(--sage-hi)" fill-opacity=".22" stroke="var(--sage-hi)" stroke-width=".8"/>
    ${['Q1', 'Q2', 'Q3'].map((q, i) => `<text x="${162 + i * 24}" y="23" font-size="6.2" font-weight="600" text-anchor="middle" fill="currentColor" fill-opacity="${i === 2 ? 0.85 : 0.5}">${q}</text>`).join('')}
    ${kpis.map(([l, v, col], i) => `<g class="m-ord" style="--i:${i};--dx:${offs[i][0]}px;--dy:${offs[i][1]}px;--r:${offs[i][2]}deg"><rect x="20" y="${44 + i * 22}" width="64" height="18" rx="5" fill="#fff" stroke="currentColor" stroke-opacity=".25"/><text x="26" y="${55.6 + i * 22}" font-size="5.6" fill="currentColor" fill-opacity=".55">${l}</text><text x="78" y="${57 + i * 22}" font-size="9" font-weight="700" text-anchor="end" fill="${col}">${v}</text></g>`).join('')}
    <g class="m-ord" style="--i:3;--dx:12px;--dy:8px;--r:0deg"><rect x="94" y="44" width="130" height="62" rx="6" fill="#fff" stroke="currentColor" stroke-opacity=".25"/>
      <line x1="102" y1="98" x2="216" y2="98" stroke="currentColor" stroke-opacity=".2"/>
      ${now.map((h, j) => `<rect class="m-bar2" x="${104 + j * 18.5}" y="${98 - h}" width="11" height="${h}" rx="2.5" fill="${j === 5 ? 'var(--sage-hi)' : 'currentColor'}" fill-opacity="${j === 5 ? 1 : 0.72}" style="--a:${(old[j] / h).toFixed(3)};--i:${j}"/>`).join('')}</g>
    <path class="m-cur" d="M0 0 L0 10 L2.8 7.6 L4.6 11.6 L6.2 10.9 L4.4 7 L8 7Z" fill="currentColor" stroke="#fff" stroke-width=".7" stroke-linejoin="round" transform="translate(208 22)"/>`,
    'A dashboard interface refining itself: the title gains hierarchy, components fall into order, and selecting Q3 updates the chart',
  );
};

// High-pressure, fast-paced: quick iterations streaking toward a shipped release
const pace = () =>
  wrap(
    `${[26, 46, 66, 86, 104].map((y, i) => `<line class="m-streak" x1="${-30 + (i % 2) * 14}" y1="${y}" x2="${52 + ((i * 29) % 70)}" y2="${y}" stroke="currentColor" stroke-opacity="${0.18 + (i % 3) * 0.08}" stroke-width="1.6" stroke-linecap="round" style="--i:${i}"/>`).join('')}
    ${[0, 1, 2].map((i) => `<g class="m-iter" style="--i:${i}" transform="translate(${14 + i * 56} ${34 + (2 - i) * 4})">
      <rect width="44" height="${46 - (2 - i) * 4 + 8}" rx="8" fill="#fff" stroke="currentColor" stroke-opacity="${0.22 + i * 0.2}"/>
      <rect x="7" y="8" width="${18 + i * 6}" height="4" rx="2" fill="currentColor" fill-opacity=".6"/>
      <rect x="7" y="17" width="30" height="3" rx="1.5" fill="currentColor" fill-opacity=".18"/>
      ${i > 0 ? '<rect x="7" y="25" width="30" height="3" rx="1.5" fill="currentColor" fill-opacity=".18"/>' : ''}
      ${i > 1 ? '<rect x="7" y="33" width="16" height="7" rx="3.5" fill="var(--sage-hi)"/>' : ''}
      <text x="22" y="${46 - (2 - i) * 4 + 3}" font-size="7" font-weight="600" text-anchor="middle" fill="currentColor" fill-opacity=".55">v${i + 1}</text></g>`).join('')}
    ${[0, 1].map((i) => `<path class="m-chev" d="M${62 + i * 56} 62 l5 5 -5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="--i:${i}"/>`).join('')}
    <g class="m-shipped"><rect x="184" y="52" width="46" height="26" rx="13" fill="var(--sage-hi)"/><path d="M194 65 l4 4 8 -8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><text x="213" y="68.8" font-size="7.5" font-weight="650" fill="#fff">Live</text></g>`,
    'Three quick iterations, v1 to v3, speeding past motion lines to a shipped release',
  ).replace('viewBox="0 -10 240 140"', 'viewBox="0 18 240 96"');

export const mini = [thinking, craft, pace];
