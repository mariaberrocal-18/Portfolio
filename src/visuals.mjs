// Reconstructed product visuals. Every visual is authored SVG (800 x 500) so
// nothing depends on confidential screenshots. Stages 1-3 show how a
// design evolved; stage 3 is the shipped state and doubles as the card visual.
//
// Colors come from CSS custom properties set on the media wrapper
// (see .v in site.css) so one drawing works on dark and light panels.

const W = 800;
const H = 500;

// deterministic noise so builds are reproducible
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => Math.round(n * 10) / 10;

function text(x, y, str, { size = 12, weight = 500, fill = 'var(--v-ink)', anchor = 'start', op = 1, cls = '' } = {}) {
  return `<text x="${f(x)}" y="${f(y)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="${op}" class="${cls}">${str}</text>`;
}
const rect = (x, y, w, h, o = {}) =>
  `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.rx ?? 0}" fill="${o.fill ?? 'none'}" stroke="${o.stroke ?? 'none'}" stroke-width="${o.sw ?? 1}" opacity="${o.op ?? 1}" ${o.cls ? `class="${o.cls}"` : ''}/>`;
const line = (x1, y1, x2, y2, o = {}) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${o.stroke ?? 'var(--v-line)'}" stroke-width="${o.sw ?? 1}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} opacity="${o.op ?? 1}"/>`;
const circle = (x, y, r, o = {}) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${o.fill ?? 'none'}" stroke="${o.stroke ?? 'none'}" stroke-width="${o.sw ?? 1}" opacity="${o.op ?? 1}"/>`;
const card = (x, y, w, h, rx = 16) => rect(x, y, w, h, { rx, fill: 'var(--v-card)', stroke: 'var(--v-card-line)', cls: 'fl' });
const draw = (d, o = {}) =>
  `<path d="${d}" pathLength="1" class="${o.dash ? 'fade' : 'draw'}" fill="none" stroke="${o.stroke ?? 'var(--v-ink)'}" stroke-width="${o.sw ?? 2}" stroke-linecap="round" stroke-linejoin="round" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} style="--d:${o.delay ?? 0}ms"/>`;

const wrap = (inner, label, h = H, w = W) =>
  `<svg class="v-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--v-ink)" stroke-width="1" opacity=".28"/></pattern></defs>${inner}</svg>`;

// 1. Waterplan target tracking -------------------------------------------------

function targetTracking(stage, float = false) {
  const cx = 110, cy = 46, cw = 580;
  let s = card(cx, cy, cw, 470, 18);
  s += text(cx + 30, cy + 46, 'Reduce water withdrawal 30% by 2030', { size: 17, weight: 600 });
  s += text(cx + 30, cy + 68, 'Baseline 2019 · 12 facilities · updated today', { size: 12, fill: 'var(--v-mute)' });

  if (stage === 1) {
    const cols = [30, 270, 360, 450];
    ['Target', 'Baseline', 'Current', 'Progress'].forEach((h, i) =>
      (s += text(cx + cols[i], cy + 112, h, { size: 11, fill: 'var(--v-mute)', weight: 500 })),
    );
    const rows = [
      ['Withdrawal −30%', '4.2 Mm³', '3.6 Mm³', '42%'],
      ['Reuse +25%', '8%', '12%', '40%'],
      ['Discharge quality', '71', '78', '54%'],
      ['Basin protection', '3 sites', '5 sites', '50%'],
      ['Leak reduction −15%', '19%', '16%', '40%'],
      ['Water-use intensity', '2.9', '2.5', '38%'],
    ];
    rows.forEach((r, i) => {
      const y = cy + 142 + i * 42;
      s += line(cx + 30, y - 8, cx + cw - 30, y - 8);
      r.forEach((c, j) => (s += text(cx + cols[j], y + 14, c, { size: 13, weight: j === 0 ? 600 : 500, fill: j === 0 ? 'var(--v-ink)' : 'var(--v-mute2)' })));
    });
    return wrap(s, 'A plain table of targets with baseline, current value and progress percentage');
  }

  // plot
  const px = cx + 30, pw = 520, py = cy + 112, ph = 136;
  for (let i = 0; i < 4; i++) s += line(px, py + (ph / 3) * i, px + pw, py + (ph / 3) * i, { op: 0.8 });
  ['2019', '2022', '2025', '2030'].forEach((y, i) => (s += text(px + (pw / 3) * i, py + ph + 22, y, { size: 11, fill: 'var(--v-mute)', anchor: i === 3 ? 'end' : i === 0 ? 'start' : 'middle' })));
  const tgt = `M${px} ${py + 20} L${px + pw} ${py + ph - 24}`;
  s += draw(tgt, { stroke: 'var(--v-mute)', sw: 1.5, dash: '0.02 0.012' });
  const act = `M${px} ${py + 20} C${px + 60} ${py + 26} ${px + 90} ${py + 44} ${px + 150} ${py + 48} S${px + 230} ${py + 50} ${px + 290} ${py + 58}`;
  s += draw(act, { sw: 2.5, delay: 250 });
  const tx = px + 290, ty = py + 58;

  if (stage === 2) {
    s += line(tx, py - 6, tx, py + ph, { dash: '2 4', stroke: 'var(--v-mute)' });
    s += circle(tx, ty, 5, { fill: 'var(--v-ink)' });
    s += text(tx, py - 14, 'Today', { size: 11, fill: 'var(--v-mute)', anchor: 'middle' });
    s += text(px + pw, cy + 68, '42% complete', { size: 12, weight: 600, anchor: 'end' });
    s += text(px + 8, py + ph - 8, 'Target path', { size: 11, fill: 'var(--v-mute)' });
    return wrap(s, 'A line chart of water withdrawal against its target path');
  }

  return ttShipped(float);
}

// Shipped state, inspired by how the real tool is organised: KPI strip, one evolution
// chart with Baseline / Last reported / Target markers, and per-target status rows.
function ttShipped(float = false) {
  const BLUE = '#3566d6', INK = '#141414', GREEN = '#2f8a5b', RED = '#d6453d', SLATE = '#7b8794', SKY = '#79a6e8';
  let s = `<defs><linearGradient id="ttg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfeaff"/><stop offset=".6" stop-color="#eaf2ff"/><stop offset="1" stop-color="#f4f8ff"/></linearGradient></defs>`;
  s += `<g transform="translate(-24 -14)">`;
  if (!float) {
    s += card(36, 26, 728, 528, 10);
    s += `<path d="M36 36a10 10 0 0 1 10-10h708a10 10 0 0 1 10 10v44H36z" fill="url(#ttg)"/>`;
  }
  // KPI strip
  const kpis = [['Status to target', 'On track', 1], ['Target value', '0.246 hl/hl', 0], ['Expected impact', '5.1M hl', 0], ['Scenario cost', '$2.8M', 0]];
  kpis.forEach(([k, val, hi], i) => {
    const x = 56 + i * 172;
    s += rect(x, 44, 160, 54, { rx: 10, fill: hi ? '#e4f6ec' : '#fff', stroke: hi ? GREEN : 'var(--v-card-line)', cls: 'fl' });
    s += text(x + 12, 63, k, { size: 10.5, fill: 'var(--v-mute2)' });
    s += text(x + 12, 85, val, { size: hi ? 15 : 14.5, weight: 650, fill: hi ? GREEN : 'var(--v-ink)' });
  });
  // chart
  const cx = 56, cy = 112, cw = 688, ch = 268;
  s += rect(cx, cy, cw, ch, { rx: 12, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += text(cx + 16, cy + 25, 'Target: Water Use Efficiency', { size: 13, weight: 650 });
  const px = cx + 56, pw = cw - 92, py = cy + 62, ph = 150;
  for (let i = 0; i < 4; i++) s += line(px, py + (ph / 3) * i, px + pw, py + (ph / 3) * i, { op: 0.7, dash: '2 4' });
  ['FY22', 'FY24', 'FY26', 'FY28', 'FY30'].forEach((l, i) => (s += text(px + (pw / 4) * i, py + ph + 17, l, { size: 10, fill: 'var(--v-mute)', anchor: 'middle' })));
  const X = (t) => px + pw * t, Y = (v) => py + ph * (1 - v);
  [[0.25, 'Baseline'], [0.375, 'Last reported'], [1, 'Target']].forEach(([t, l]) => {
    s += line(X(t), py - 6, X(t), py + ph, { stroke: 'var(--v-mute)', op: 0.8 });
    s += rect(X(t) - (l.length * 2.9 + 8), cy + 36, l.length * 5.8 + 16, 17, { rx: 5, fill: '#fff', stroke: 'var(--v-card-line)' });
    s += text(X(t), cy + 48, l, { size: 9.5, fill: 'var(--v-mute2)', anchor: 'middle', weight: 500 });
  });
  const sx = X(0.375), sy = Y(0.81);
  s += draw(`M${X(0.25)} ${Y(0.82)} C${X(0.4)} ${Y(0.6)} ${X(0.5)} ${Y(0.5)} ${X(0.62)} ${Y(0.44)} S${X(0.86)} ${Y(0.3)} ${X(1)} ${Y(0.25)}`, { stroke: INK, sw: 2.6, delay: 450 });
  s += draw(`M${X(0)} ${Y(0.79)} L${X(0.125)} ${Y(0.82)} L${X(0.25)} ${Y(0.82)} L${sx} ${sy}`, { stroke: BLUE, sw: 2.6, delay: 100 });
  // three scenarios from the last reported value
  s += draw(`M${sx} ${sy} C${X(0.5)} ${Y(0.74)} ${X(0.75)} ${Y(0.55)} ${X(1)} ${Y(0.42)}`, { stroke: SLATE, sw: 2.3, delay: 1250 });
  s += draw(`M${sx} ${sy} C${X(0.5)} ${Y(0.66)} ${X(0.72)} ${Y(0.3)} ${X(1)} ${Y(0.16)}`, { stroke: GREEN, sw: 2.3, delay: 1500 });
  s += draw(`M${sx} ${sy} C${X(0.52)} ${Y(0.72)} ${X(0.78)} ${Y(0.46)} ${X(1)} ${Y(0.34)}`, { stroke: SKY, sw: 2.3, delay: 1750 });
  [0, 0.125, 0.25, 0.375].forEach((t, i) => (s += circle(X(t), Y([0.79, 0.82, 0.82, 0.81][i]), 3.8, { fill: '#fff', stroke: BLUE, sw: 1.8 })));
  [[0.25, 0.82], [0.5, 0.5], [0.75, 0.33], [1, 0.25]].forEach(([t, val]) => (s += circle(X(t), Y(val), 3.8, { fill: '#fff', stroke: INK, sw: 1.8 })));
  // legend
  const leg = [['Historic data', BLUE], ['Target', INK], ['Scenario 1', SLATE], ['Scenario 2', GREEN], ['Scenario 3', SKY]];
  let lx = cx + 16;
  leg.forEach(([l, col]) => {
    s += rect(lx, cy + ch - 24, 18, 3, { rx: 1.5, fill: col });
    s += text(lx + 25, cy + ch - 19.5, l, { size: 10, fill: 'var(--v-mute2)', weight: 500 });
    lx += 25 + l.length * 5.4 + 22;
  });
  // scenarios
  const rows = [['Scenario 1', 'Low investment', SLATE, 0, 'Short by 2.6M m³'], ['Scenario 2', 'Full programme', GREEN, 1, 'Reaches the target in FY2029'], ['Scenario 3', 'Phased rollout', SKY, 0, 'Short by 1.1M m³']];
  rows.forEach(([n, sub, col, ok, note], i) => {
    const y = 392 + i * 50;
    s += rect(56, y, 688, 42, { rx: 10, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' });
    s += rect(56, y, 5, 42, { rx: 2.5, fill: col });
    s += circle(80, y + 21, 5, { fill: col });
    s += text(94, y + 19, n, { size: 12.5, weight: 650 });
    s += text(94, y + 33, sub, { size: 10.5, fill: 'var(--v-mute2)' });
    s += text(ok ? 456 : 430, y + 25, note, { size: 10.5, fill: ok ? GREEN : RED, anchor: 'end' });
    s += rect(ok ? 468 : 442, y + 11, 68, 20, { rx: 10, fill: ok ? '#e4f6ec' : '#fde9e7' });
    s += circle(ok ? 480 : 454, y + 21, 3, { fill: ok ? GREEN : RED });
    s += text(ok ? 488 : 462, y + 25, ok ? 'On track' : 'Off track', { size: 10.5, weight: 600, fill: ok ? GREEN : RED });
    if (ok) {
      s += rect(588, y + 9, 146, 24, { rx: 7, fill: '#fff', stroke: '#c9c9c4' });
      s += text(661, y + 25, 'View scenario', { size: 10.5, weight: 600, anchor: 'middle' });
    } else {
      s += `<g class="${i === 0 ? 'tt-cta' : ''}">` + rect(588, y + 9, 146, 24, { rx: 7, fill: INK }) + text(661, y + 25, 'How to reach the target?', { size: 10.5, weight: 600, fill: '#fff', anchor: 'middle' }) + '</g>';
    }
  });
  // popover shown while hovering the first off-track CTA
  const opts = [['Wastewater recycling + Condensate return', '$620K', 'FY2029'], ['Rotary spray balls + CIP rinse recovery', '$480K', 'FY2030'], ['Wastewater recycling + Cleaning skid', '$710K', 'FY2028']];
  s += `<g class="tt-pop"><rect x="352" y="204" width="392" height="176" rx="12" fill="#fff" stroke="${BLUE}" stroke-width="1.2" style="filter:drop-shadow(0 12px 28px rgba(20,40,90,.24))"/>
    <rect x="366" y="217" width="22" height="22" rx="7" fill="#e3ecff"/><path d="M377 221l1.6 4.2 4.2 1.6-4.2 1.6L377 233l-1.6-4.6-4.2-1.6 4.2-1.6z" fill="${BLUE}"/>
    <text x="396" y="232" font-size="11.5" font-weight="650" fill="#141414">Combinations that reach the target</text>
    <text x="366" y="254" font-size="10" fill="var(--v-mute2)">Projects and investment, ranked by cost</text>`;
  opts.forEach(([p, inv, fy], i) => {
    const y = 264 + i * 36;
    s += `<rect x="366" y="${y}" width="364" height="30" rx="8" fill="${i === 0 ? '#eef3ff' : '#fff'}" stroke="${i === 0 ? BLUE : '#e2e2dd'}"/><text x="378" y="${y + 19}" font-size="10.5" font-weight="600" fill="#141414">${p}</text><text x="640" y="${y + 19}" font-size="10.5" font-weight="650" fill="#141414" text-anchor="end">${inv}</text><text x="718" y="${y + 19}" font-size="10" fill="${GREEN}" font-weight="600" text-anchor="end">${fy}</text>`;
  });
  s += `</g>`;
  s += `<g class="tt-cursor"><path d="M0 0l0 15 4-3.6 3 6.6 2.4-1.1-3-6.5 5.4-.3z" fill="#141414" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  s += '</g>';
  return wrap(s, 'Target tracking: an evolution chart with historic data, the target and three scenarios, a list of scenarios with on-track and off-track status, and a popover with project and investment combinations that reach the target', 552, 752);
}

export const ratio = { targetTracking: '752 / 552', siteSelection: '780 / 500' };

// 2. Civarea site selection ---------------------------------------------------

// Civarea site selection: a map that is read in layers ------------------------
// Clean map with candidate areas → power → water → environment → permitting, each
// layer flagging the sites it rules out → one site stays suitable and is shortlisted.
// stage 1 = clean map, 2 = layers visible, 3 = full (animated on a loop via CSS .v--loop).
const SITES = [
  { id: 'A', x: 150, y: 140, flag: 'No grid capacity', layer: 1 },
  { id: 'B', x: 340, y: 262, flag: null, layer: 0 },
  { id: 'C', x: 450, y: 120, flag: 'Water stress', layer: 2 },
  { id: 'D', x: 170, y: 340, flag: 'Protected wetland', layer: 3 },
  { id: 'E', x: 470, y: 360, flag: 'Zoning restriction', layer: 4 },
];
const blob = (cx, cy, k = 1, seed = 1) => {
  const r = rng(seed);
  const pts = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const rr = (30 + r() * 12) * k;
    return [cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr * 0.9];
  });
  let d = `M ${f((pts[0][0] + pts[6][0]) / 2)} ${f((pts[0][1] + pts[6][1]) / 2)}`;
  pts.forEach((p, i) => {
    const n = pts[(i + 1) % 7];
    d += ` Q ${f(p[0])} ${f(p[1])} ${f((p[0] + n[0]) / 2)} ${f((p[1] + n[1]) / 2)}`;
  });
  return d + ' Z';
};

function siteSelection(stage, float = false) {
  const GREEN = '#2f8a5b', RED = '#d6453d', BLUE = '#3566d6', INK = '#141414';
  const MX = 40, MY = 28, MW = 556, MH = 444;
  const L = (n, inner) => `<g class="sm sm-l${n}" ${stage === 1 ? 'style="opacity:0"' : ''}>${inner}</g>`;
  let s = `<defs><clipPath id="smclip"><rect x="${MX}" y="${MY}" width="${MW}" height="${MH}" rx="16"/></clipPath>
    <pattern id="smhatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="7" stroke="#2f8a5b" stroke-width="1.3" opacity=".55"/></pattern>
    <pattern id="smdry" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#b3822e" opacity=".5"/></pattern></defs>`;
  // base map
  s += rect(MX, MY, MW, MH, { rx: 16, fill: '#f3f3ef', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += `<g clip-path="url(#smclip)">`;
  for (let i = 0; i < 9; i++) {
    const y0 = MY + 30 + i * 52;
    s += `<path d="M${MX - 10} ${y0} C ${MX + 140} ${y0 - 40 + (i % 3) * 20}, ${MX + 330} ${y0 + 36 - (i % 2) * 30}, ${MX + MW + 10} ${y0 - 14 + (i % 4) * 12}" fill="none" stroke="#000" stroke-opacity=".055" stroke-width="1"/>`;
  }
  // 1. power: transmission network and substations
  s += L(1, `<g fill="none" stroke="${INK}" stroke-width="1.4" stroke-dasharray="5 4" opacity=".8"><path d="M${MX} 232 C 180 190 260 250 340 250 S 520 222 ${MX + MW} 196"/><path d="M340 250 C 360 180 380 120 440 62"/><path d="M340 250 C 300 330 250 380 232 ${MY + MH}"/></g>`
    + [[180, 205], [340, 250], [440, 150], [232, 440]].map(([x, y]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" rx="2.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`).join('')
    + `<path d="M${MX + 14} ${MY + MH - 24} l5 -9 l-1.4 6 h5 l-5 9 l1.4 -6 z" fill="${INK}" transform="translate(0 0)"/>`
    + `<text x="${MX + 30}" y="${MY + MH - 17}" font-size="10" font-weight="600" fill="${INK}">Power</text>`);
  // 2. water: river and stressed (dry) basin
  s += L(2, `<path d="M${MX} 330 C 150 290 210 300 300 330 S 470 400 ${MX + MW} 330" fill="none" stroke="${BLUE}" stroke-opacity=".28" stroke-width="22" stroke-linecap="round"/><path d="M${MX} 330 C 150 290 210 300 300 330 S 470 400 ${MX + MW} 330" fill="none" stroke="${BLUE}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="${blob(450, 118, 1.9, 4)}" fill="url(#smdry)" stroke="#b3822e" stroke-opacity=".5" stroke-dasharray="3 3"/>
    <path d="M${MX + 100} ${MY + MH - 24} q-6 -9 0 -16 q6 7 0 16 z" fill="${BLUE}" opacity="0"/>`
    + `<text x="${MX + 100}" y="${MY + MH - 17}" font-size="10" font-weight="600" fill="${BLUE}">Water</text>`);
  // 3. environment: protected wetland / habitat
  s += L(3, `<path d="${blob(176, 346, 2.1, 9)}" fill="url(#smhatch)" stroke="${GREEN}" stroke-opacity=".7"/><path d="${blob(540, 90, 1.1, 12)}" fill="url(#smhatch)" stroke="${GREEN}" stroke-opacity=".5"/>`
    + `<text x="${MX + 176}" y="${MY + MH - 17}" font-size="10" font-weight="600" fill="${GREEN}">Environment</text>`);
  // 4. permitting: parcel grid and zoning boundary
  s += L(4, `<g fill="none" stroke="${INK}" stroke-opacity=".3" stroke-width="1" stroke-dasharray="2 3">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${MX + 70 + i * 90} ${MY} V${MY + MH}"/>`).join('')}${[0, 1, 2, 3].map((i) => `<path d="M${MX} ${MY + 80 + i * 100} H${MX + MW}"/>`).join('')}</g>
    <path d="${blob(470, 360, 1.8, 15)}" fill="rgba(214,69,61,.07)" stroke="${RED}" stroke-width="1.4" stroke-dasharray="6 4"/>`
    + `<text x="${MX + 280}" y="${MY + MH - 17}" font-size="10" font-weight="600" fill="${INK}">Permitting</text>`);
  s += `</g>`;
  // candidate areas (always visible), flags as layers reveal
  SITES.forEach((st, i) => {
    const sel = st.flag === null;
    s += `<g class="${sel ? 'sm-site sm-sel' : `sm-site sm-fl${st.layer}`}">`;
    s += `<path class="sm-area" d="${blob(st.x, st.y, 0.85, i + 3)}" fill="${sel ? 'rgba(47,138,91,.18)' : 'rgba(20,20,20,.07)'}" stroke="${INK}" stroke-width="1.6"/>`;
    s += circle(st.x, st.y, 11, { fill: '#fff', stroke: INK, sw: 1.6 }) + text(st.x, st.y + 4, st.id, { size: 11, weight: 700, anchor: 'middle' });
    if (!sel) {
      const w = st.flag.length * 5.9 + 32;
      s += `<g class="sm-flag"><rect x="${st.x - w / 2}" y="${st.y + 26}" width="${w}" height="22" rx="11" fill="#fff" stroke="${RED}" stroke-opacity=".5"/><circle cx="${st.x - w / 2 + 12}" cy="${st.y + 37}" r="3.5" fill="${RED}"/><text x="${st.x - w / 2 + 22}" y="${st.y + 40.5}" font-size="10" font-weight="600" fill="${RED}">${st.flag}</text></g>`;
      s += `<path class="sm-x" d="M${st.x - 18} ${st.y - 18} l36 36 M${st.x + 18} ${st.y - 18} l-36 36" stroke="${RED}" stroke-opacity=".5" stroke-width="1.4"/>`;
    } else {
      s += `<circle class="sm-ring" cx="${st.x}" cy="${st.y}" r="40" fill="none" stroke="${GREEN}" stroke-width="2"/><circle class="sm-ring2" cx="${st.x}" cy="${st.y}" r="40" fill="none" stroke="${GREEN}" stroke-width="1.2"/>`;
    }
    s += `</g>`;
  });
  // layer legend
  s += rect(616, 60, 140, 160, { rx: 14, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += text(634, 88, 'Assessment layers', { size: 11.5, weight: 650 });
  [['Power', INK, 1], ['Water', BLUE, 2], ['Environment', GREEN, 3], ['Permitting', RED, 4]].forEach(([n, col, k], i) => {
    const y = 114 + i * 26;
    s += `<g class="sm-chip sm-c${k}">` + rect(634, y - 10, 104, 22, { rx: 11, fill: '#f3f3ef' }) + circle(646, y + 1, 4, { fill: col }) + text(657, y + 5, n, { size: 10.5, weight: 600 }) + `</g>`;
  });
  // shortlisted card
  s += `<g class="sm-card">` + rect(616, 262, 140, 150, { rx: 14, fill: '#fff', stroke: GREEN, cls: 'fl' })
    + circle(640, 292, 12, { fill: 'rgba(47,138,91,.14)' }) + `<path d="M634 292 l4 4 l8 -9" fill="none" stroke="${GREEN}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    + text(660, 296, 'Site B', { size: 12.5, weight: 650 })
    + text(634, 330, 'Site shortlisted', { size: 11.5, weight: 650 })
    + text(634, 350, 'Suitability', { size: 10, fill: 'var(--v-mute2)' }) + text(738, 350, '86', { size: 12, weight: 700, anchor: 'end', fill: GREEN })
    + rect(634, 360, 104, 6, { rx: 3, fill: 'rgba(0,0,0,.08)' }) + rect(634, 360, 90, 6, { rx: 3, fill: GREEN })
    + text(634, 390, '4 layers cleared', { size: 10, fill: 'var(--v-mute2)' }) + `</g>`;
  return wrap(s, 'A site-selection map revealed in layers: power, water, environment and permitting each flag locations as higher risk until one site, B, is shortlisted as suitable', 500, 780);
}

// 3. EY digital banking -------------------------------------------------------

function banking(stage) {
  let s = '';
  const x = 272, y = 30, w = 256, h = 440;
  s += card(x, y, w, h, 30);
  const px = x + 24;

  if (stage === 1) {
    s += text(px, y + 40, 'Good morning', { size: 12, fill: 'var(--v-mute)' });
    s += rect(px, y + 56, w - 48, 22, { rx: 6, fill: 'var(--v-ink)', op: 0.9 });
    s += text(px + 10, y + 71, 'Special offer: pre-approved loan', { size: 10.5, weight: 600, fill: 'var(--v-card)' });
    const tiles = ['Accounts', 'Cards', 'Loans', 'Invest', 'Insurance', 'Transfers', 'Payments', 'Offers', 'Mortgage', 'Pensions', 'FX', 'Support'];
    tiles.forEach((t, i) => {
      const tx = px + (i % 3) * 72;
      const ty = y + 92 + Math.floor(i / 3) * 58;
      s += rect(tx, ty, 66, 50, { rx: 8, fill: 'none', stroke: 'var(--v-card-line)' });
      s += rect(tx + 8, ty + 8, 14, 14, { rx: 4, fill: 'var(--v-ink)', op: 0.2 + (i % 4) * 0.12 });
      s += text(tx + 8, ty + 42, t, { size: 10, weight: 500, fill: 'var(--v-mute2)' });
    });
    s += rect(px, y + 332, w - 48, 36, { rx: 8, fill: 'none', stroke: 'var(--v-card-line)' });
    s += text(px + 10, y + 354, 'Latest news and rates', { size: 10.5, fill: 'var(--v-mute2)' });
    s += rect(px, y + 378, w - 48, 36, { rx: 8, fill: 'none', stroke: 'var(--v-card-line)' });
    s += text(px + 10, y + 400, 'Recommended for you', { size: 10.5, fill: 'var(--v-mute2)' });
    return wrap(s, 'A crowded banking home screen with a tile for every product and offer');
  }

  if (stage === 2) {
    const groups = [
      ['Accounts', ['Current account', 'Savings']],
      ['Pay and transfer', ['Send money', 'Pay a bill', 'Move between accounts']],
      ['Plan', ['Cards', 'Loans', 'Invest']],
    ];
    let yy = y + 52;
    groups.forEach(([g, items]) => {
      s += text(px, yy, g, { size: 12.5, weight: 600 });
      yy += 12;
      items.forEach((it) => {
        s += line(px, yy, px + w - 48, yy);
        s += text(px, yy + 22, it, { size: 12, fill: 'var(--v-mute2)' });
        s += `<path d="M${px + w - 58} ${yy + 14}l4 4-4 4" stroke="var(--v-mute)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
        yy += 34;
      });
      yy += 26;
    });
    return wrap(s, 'The same banking features regrouped into accounts, pay and transfer, and plan');
  }

  // stage 3
  s += text(px, y + 52, 'Total balance', { size: 12, fill: 'var(--v-mute)' });
  s += text(px, y + 92, '$12,480.20', { size: 32, weight: 600 });
  ['Send', 'Pay', 'Move'].forEach((a, i) => {
    const bx = px + i * 70;
    s += rect(bx, y + 114, 64, 36, { rx: 18, fill: i === 0 ? 'var(--v-ink)' : 'none', stroke: i === 0 ? 'none' : 'var(--v-ink)', sw: 1.2 });
    s += text(bx + 32, y + 137, a, { size: 12.5, weight: 600, fill: i === 0 ? 'var(--v-card)' : 'var(--v-ink)', anchor: 'middle' });
  });
  s += text(px, y + 192, 'Today', { size: 12, weight: 600 });
  [
    ['Coffee Lab', '−4.80', 0],
    ['Salary', '+3,200.00', 1],
    ['Rent', '−1,150.00', 0],
    ['Transit pass', '−32.00', 0],
  ].forEach(([n, v, pos], i) => {
    const ry = y + 214 + i * 50;
    s += line(px, ry, px + w - 48, ry);
    s += circle(px + 14, ry + 27, 14, { fill: 'var(--v-ink)', op: pos ? 1 : 0.08 });
    s += text(px + 14, ry + 31, n[0], { size: 11, weight: 700, fill: pos ? 'var(--v-card)' : 'var(--v-ink)', anchor: 'middle' });
    s += text(px + 38, ry + 31, n, { size: 13, weight: 500 });
    s += text(px + w - 48, ry + 31, v, { size: 13, weight: 600, anchor: 'end', fill: pos ? 'var(--v-accent)' : 'var(--v-ink)' });
  });

  // send-money step
  s += card(52, 250, 196, 160, 18);
  s += text(72, 280, 'Send money', { size: 13, weight: 600 });
  s += rect(72, 294, 156, 30, { rx: 8, fill: 'none', stroke: 'var(--v-card-line)' });
  s += text(82, 313, 'To: Ana Pérez', { size: 11.5, fill: 'var(--v-mute2)' });
  s += text(72, 354, '$250.00', { size: 20, weight: 600 });
  s += rect(72, 366, 156, 30, { rx: 15, fill: 'var(--v-ink)' });
  s += text(150, 385.5, 'Continue', { size: 12, weight: 600, fill: 'var(--v-card)', anchor: 'middle' });

  // month summary
  s += card(552, 92, 200, 174, 18);
  s += text(572, 122, 'This month', { size: 13, weight: 600 });
  [
    ['Housing', 0.78],
    ['Food', 0.46],
    ['Transport', 0.22],
  ].forEach(([n, v], i) => {
    const by = 154 + i * 36;
    s += text(572, by, n, { size: 11.5, fill: 'var(--v-mute2)' });
    s += rect(572, by + 9, 160, 6, { rx: 3, fill: 'var(--v-line)' });
    s += rect(572, by + 9, 160 * v, 6, { rx: 3, fill: i === 0 ? 'var(--v-accent)' : 'var(--v-ink)', op: i === 0 ? 1 : 0.75, cls: 'grow' });
  });
  return wrap(s, 'A task-first banking home with balance, three primary actions and recent activity, beside a send-money step');
}

// 4. Waterplan platform navigation -------------------------------------------

const NODES = ['Overview', 'Risk map', 'Facilities', 'Basins', 'Targets', 'Reports', 'Data upload', 'Settings', 'Alerts', 'Scenarios', 'Benchmark', 'Projects', 'Users', 'Integrations', 'Audit log', 'Help'];

function sprawl(offsetX, scale, r, opacity = 1) {
  let s = `<g opacity="${opacity}" transform="translate(${offsetX} 0) scale(${scale})">`;
  const root = [W * 0.5 - 40, 54];
  const pos = NODES.map((n, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    return [60 + col * 176 + (r() - 0.5) * 70, 124 + row * 92 + (r() - 0.5) * 30, n];
  });
  pos.forEach(([x, y]) => (s += `<path d="M${f(root[0] + 40)} ${root[1] + 22}C${f(root[0] + 40)} ${f(y - 30)} ${f(x + 48)} ${f(y - 40)} ${f(x + 48)} ${f(y)}" stroke="var(--v-ink)" stroke-width="1" fill="none" opacity=".28"/>`));
  s += rect(root[0], root[1], 80, 26, { rx: 13, fill: 'var(--v-ink)' });
  s += text(root[0] + 40, root[1] + 17, 'Platform', { size: 11.5, weight: 600, fill: 'var(--v-card)', anchor: 'middle' });
  pos.forEach(([x, y, n]) => {
    s += rect(x, y, 96, 28, { rx: 8, fill: 'var(--v-card)', stroke: 'var(--v-card-line)' });
    s += text(x + 48, y + 18, n, { size: 11.5, weight: 500, anchor: 'middle' });
  });
  return s + '</g>';
}

function navigation(stage) {
  const r = rng(5);
  let s = '';
  if (stage === 1) {
    s += card(40, 30, 720, 450, 18);
    s += sprawl(0, 1, r);
    return wrap(s, 'A sprawling map of sixteen separate entry points to the platform');
  }

  if (stage === 2) {
    s += card(40, 30, 720, 450, 18);
    const groups = [
      ['Understand', ['Overview', 'Risk map', 'Basins', 'Benchmark']],
      ['Plan', ['Targets', 'Scenarios', 'Projects']],
      ['Report', ['Reports', 'Alerts', 'Audit log']],
      ['Manage', ['Data upload', 'Users', 'Integrations', 'Settings']],
    ];
    groups.forEach(([g, items], i) => {
      const gx = 70 + i * 172;
      s += text(gx, 96, g, { size: 15, weight: 600 });
      s += line(gx, 112, gx + 148, 112, { stroke: 'var(--v-ink)', sw: 1.5 });
      items.forEach((it, j) => {
        const iy = 150 + j * 46;
        s += rect(gx, iy - 18, 148, 34, { rx: 8, fill: 'none', stroke: 'var(--v-card-line)' });
        s += text(gx + 14, iy + 3, it, { size: 12.5, fill: 'var(--v-mute2)' });
      });
    });
    return wrap(s, 'The same sixteen entry points grouped into four: understand, plan, report, manage');
  }

  // stage 3: before (faint) behind, after in front
  s += `<g opacity=".16" transform="translate(380 40) scale(.5)">${sprawl(0, 1, rng(5)).replace(/var\(--v-card\)/g, 'none')}</g>`;
  s += card(56, 30, 238, 440, 20);
  s += rect(76, 56, 28, 28, { rx: 8, fill: 'var(--v-ink)' });
  s += text(90, 75, 'A', { size: 13, weight: 700, fill: 'var(--v-card)', anchor: 'middle' });
  s += text(114, 66, 'Acme Foods', { size: 12.5, weight: 600 });
  s += text(114, 80, 'All facilities', { size: 11, fill: 'var(--v-mute)' });
  s += `<path d="M270 66l4-4 4 4M270 74l4 4 4-4" stroke="var(--v-mute)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += line(76, 100, 274, 100);
  const items = ['Overview', 'Risk', 'Targets', 'Reports', 'Data'];
  items.forEach((it, i) => {
    const y = 122 + i * 38 + (i > 2 ? 3 * 30 : 0);
    const active = it === 'Targets';
    if (active) s += rect(70, y - 6, 212, 32, { rx: 9, fill: 'var(--v-ink)' });
    s += rect(84, y + 3, 14, 14, { rx: 4, fill: active ? 'var(--v-card)' : 'var(--v-ink)', op: active ? 1 : 0.25 });
    s += text(110, y + 15, it, { size: 13, weight: active ? 600 : 500, fill: active ? 'var(--v-card)' : 'var(--v-ink)' });
    if (active) {
      ['Tracking', 'Scenarios', 'Projects'].forEach((sub, j) => {
        const sy = y + 48 + j * 30;
        if (j === 0) s += circle(92, sy - 4, 3, { fill: 'var(--v-accent)' });
        s += text(110, sy, sub, { size: 12, weight: j === 0 ? 600 : 500, fill: j === 0 ? 'var(--v-ink)' : 'var(--v-mute2)' });
      });
    }
  });
  // content area
  const cx = 330;
  s += card(cx, 30, 420, 440, 20);
  s += text(cx + 28, 80, 'Target tracking', { size: 19, weight: 600 });
  [['Tracking', 1], ['Scenarios', 0], ['Projects', 0]].forEach(([t, a], i) => {
    const tx = cx + 28 + i * 86;
    s += text(tx, 112, t, { size: 12, weight: a ? 600 : 500, fill: a ? 'var(--v-ink)' : 'var(--v-mute)' });
    if (a) s += line(tx, 122, tx + 56, 122, { stroke: 'var(--v-ink)', sw: 2 });
  });
  s += line(cx + 28, 124, cx + 392, 124, { op: 0.6 });
  for (let i = 0; i < 3; i++) {
    const ry = 150 + i * 60;
    s += rect(cx + 28, ry, 364, 46, { rx: 10, fill: 'none', stroke: 'var(--v-card-line)' });
    s += rect(cx + 44, ry + 14, 120 - i * 14, 8, { rx: 4, fill: 'var(--v-ink)', op: 0.75 });
    s += rect(cx + 44, ry + 28, 180, 5, { rx: 2.5, fill: 'var(--v-line)' });
    s += rect(cx + 322, ry + 16, 54, 16, { rx: 8, fill: i === 0 ? 'var(--v-ink)' : 'none', stroke: i === 0 ? 'none' : 'var(--v-ink)' });
  }
  s += rect(cx + 28, 340, 364, 120, { rx: 12, fill: 'none', stroke: 'var(--v-card-line)' });
  s += draw(`M${cx + 48} 430 C${cx + 100} 420 ${cx + 130} 400 ${cx + 190} 392 S${cx + 290} 372 ${cx + 372} 358`, { sw: 2.2, delay: 300 });
  return wrap(s, 'The shipped navigation: a persistent sidebar with a workspace switcher and contextual secondary tabs, over a faint map of the old sprawl');
}

export const visuals = { targetTracking, siteSelection, banking, navigation };
export const render = (name, stage = 3, float = false) => visuals[name](stage, float);


// Target Tracking, "How it evolved": one product screen that transforms as the page scrolls.
// CSS custom properties on the stage (set by site.js) drive every piece: --t2 table → chart,
// --t2b target line, --l1..3 scenario lines, --c1..3 scenario cards. Defaults = final state.
export function ttEvolve() {
  const BLUE = '#3566d6', INK = '#141414', GREEN = '#2f8a5b', RED = '#d6453d', SLATE = '#7b8794', SKY = '#79a6e8';
  const g = (style, inner, cls = '') => `<g class="${cls}" style="${style}">${inner}</g>`;
  const tl = (d, stroke, sw, varName) => `<path d="${d}" pathLength="1" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:1;stroke-dashoffset:calc(1 - var(${varName}, 1));opacity:min(calc(var(${varName}, 1) * 40), 1)"/>`;
  let s = '';
  s += rect(6, 6, 740, 548, { rx: 16, fill: '#fff', stroke: 'rgba(0,0,0,.08)' });
  s += text(34, 44, 'Water use efficiency', { size: 15, weight: 650 });
  s += text(34, 64, 'Baseline 2019 · 12 facilities · updated today', { size: 11, fill: 'var(--v-mute)' });

  // step 1: a table of numbers
  let t = '';
  [['Target', 34], ['Baseline', 330], ['Current', 450], ['Progress', 570]].forEach(([h, x]) => (t += text(x, 106, h, { size: 11, fill: 'var(--v-mute)' })));
  [['Water use efficiency', '0.31', '0.27', '48%'], ['Total withdrawals', '4.2 Mm³', '3.6 Mm³', '42%'], ['Total discharges', '3.1 Mm³', '2.8 Mm³', '39%'], ['Reuse rate', '8%', '12%', '40%'], ['Leak reduction', '19%', '16%', '40%'], ['Basin protection', '3 sites', '5 sites', '50%']].forEach((r, i) => {
    const y = 124 + i * 40;
    t += line(34, y, 718, y);
    r.forEach((c, j) => (t += text([34, 330, 450, 570][j], y + 25, c, { size: 13, weight: j === 0 ? 600 : 500, fill: j === 0 ? 'var(--v-ink)' : 'var(--v-mute2)' })));
  });
  s += g('opacity: calc(1 - var(--t2, 1)); translate: 0 calc(var(--t2, 1) * -10px)', t);

  // step 2: the same data as a timeline against the target
  const px = 70, pw = 630, py = 118, ph = 178;
  const X = (u) => px + pw * u, Y = (w) => py + ph * (1 - w);
  let c = '';
  for (let i = 0; i < 4; i++) c += line(px, py + (ph / 3) * i, px + pw, py + (ph / 3) * i, { op: 0.7, dash: '2 4' });
  ['FY22', 'FY24', 'FY26', 'FY28', 'FY30'].forEach((l, i) => (c += text(px + (pw / 4) * i, py + ph + 18, l, { size: 10, fill: 'var(--v-mute)', anchor: 'middle' })));
  [[0.25, 'Baseline'], [0.375, 'Last reported'], [1, 'Target']].forEach(([u, l]) => {
    c += line(X(u), py - 10, X(u), py + ph, { stroke: 'var(--v-mute)', op: 0.8 });
    c += rect(X(u) - (l.length * 2.9 + 8), 80, l.length * 5.8 + 16, 17, { rx: 5, fill: '#fff', stroke: 'var(--v-card-line)' });
    c += text(X(u), 92, l, { size: 9.5, fill: 'var(--v-mute2)', anchor: 'middle', weight: 500 });
  });
  s += g('opacity: var(--t2, 1)', c);
  const sx = X(0.375), sy = Y(0.81);
  s += tl(`M${X(0)} ${Y(0.79)} L${X(0.125)} ${Y(0.82)} L${X(0.25)} ${Y(0.82)} L${sx} ${sy}`, BLUE, 2.6, '--t2');
  s += tl(`M${X(0.25)} ${Y(0.82)} C${X(0.4)} ${Y(0.6)} ${X(0.5)} ${Y(0.5)} ${X(0.62)} ${Y(0.44)} S${X(0.86)} ${Y(0.3)} ${X(1)} ${Y(0.25)}`, INK, 2.6, '--t2b');
  let d = '';
  [0, 0.125, 0.25, 0.375].forEach((u, i) => (d += circle(X(u), Y([0.79, 0.82, 0.82, 0.81][i]), 3.8, { fill: '#fff', stroke: BLUE, sw: 1.8 })));
  s += g('opacity: var(--t2, 1)', d);
  let d2 = '';
  [[0.25, 0.82], [0.5, 0.5], [0.75, 0.33], [1, 0.25]].forEach(([u, w]) => (d2 += circle(X(u), Y(w), 3.8, { fill: '#fff', stroke: INK, sw: 1.8 })));
  s += g('opacity: var(--t2b, 1)', d2);

  // step 3: scenario lines, one by one
  s += tl(`M${sx} ${sy} C${X(0.5)} ${Y(0.74)} ${X(0.75)} ${Y(0.55)} ${X(1)} ${Y(0.42)}`, SLATE, 2.3, '--l1');
  s += tl(`M${sx} ${sy} C${X(0.5)} ${Y(0.66)} ${X(0.72)} ${Y(0.3)} ${X(1)} ${Y(0.16)}`, GREEN, 2.3, '--l2');
  s += tl(`M${sx} ${sy} C${X(0.52)} ${Y(0.72)} ${X(0.78)} ${Y(0.46)} ${X(1)} ${Y(0.34)}`, SKY, 2.3, '--l3');
  // legend
  const leg = [['Historic data', BLUE, '--t2'], ['Target', INK, '--t2b'], ['Scenario 1', SLATE, '--l1'], ['Scenario 2', GREEN, '--l2'], ['Scenario 3', SKY, '--l3']];
  let lx = 34, lg = '';
  leg.forEach(([l, col, vn]) => {
    lg += g(`opacity: var(${vn}, 1)`, rect(lx, 342, 18, 3, { rx: 1.5, fill: col }) + text(lx + 25, 346.5, l, { size: 10, fill: 'var(--v-mute2)', weight: 500 }));
    lx += 25 + l.length * 5.4 + 22;
  });
  s += lg;

  // scenario cards
  [['Scenario 1', 'Low investment', SLATE, 0, 'Short by 2.6M m³', '--c1'], ['Scenario 2', 'Full programme', GREEN, 1, 'Reaches the target in FY2029', '--c2'], ['Scenario 3', 'Phased rollout', SKY, 0, 'Short by 1.1M m³', '--c3']].forEach(([n, sub, col, ok, note, vn], i) => {
    const y = 372 + i * 58;
    let r = rect(34, y, 684, 46, { rx: 10, fill: '#fff', stroke: 'var(--v-card-line)' }) + rect(34, y, 5, 46, { rx: 2.5, fill: col }) + circle(60, y + 23, 5, { fill: col });
    r += text(74, y + 21, n, { size: 12.5, weight: 650 }) + text(74, y + 36, sub, { size: 10.5, fill: 'var(--v-mute2)' });
    r += text(ok ? 436 : 410, y + 27, note, { size: 10.5, fill: ok ? GREEN : RED, anchor: 'end' });
    r += rect(ok ? 448 : 422, y + 13, 68, 20, { rx: 10, fill: ok ? '#e4f6ec' : '#fde9e7' }) + circle(ok ? 460 : 434, y + 23, 3, { fill: ok ? GREEN : RED }) + text(ok ? 468 : 442, y + 27, ok ? 'On track' : 'Off track', { size: 10.5, weight: 600, fill: ok ? GREEN : RED });
    r += ok ? rect(560, y + 10, 146, 26, { rx: 7, fill: '#fff', stroke: '#c9c9c4' }) + text(633, y + 27, 'View scenario', { size: 10.5, weight: 600, anchor: 'middle' }) : rect(560, y + 10, 146, 26, { rx: 7, fill: INK }) + text(633, y + 27, 'How to reach the target?', { size: 10.5, weight: 600, fill: '#fff', anchor: 'middle' });
    s += g(`opacity: var(${vn}, 1); translate: 0 calc((1 - var(${vn}, 1)) * 14px)`, r);
  });
  return wrap(s, 'Target tracking evolving from a plain table of values into a timeline of actual progress against the target, with three scenario lines and three scenario cards', 560, 752);
}
