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

export const ratio = { targetTracking: '752 / 552', siteSelection: '860 / 500' };

// 2. Civarea site selection ---------------------------------------------------

// Civarea site selection: an illustrated site map read through toggled layers ----
// One site is evaluated. Layers switch on and off over the map (power grid, flood,
// wetlands, critical habitat, protected areas) while the assessment checklist loads
// row by row, ending in "Site shortlisted". stage 1 = map, 2 = layers + pending list, 3 = done.
const SM_LAYERS = [['Power grid', '#141414'], ['Flood maps', '#3566d6'], ['Wetlands', '#1f8f86'], ['Critical habitat', '#2f8a5b'], ['Protected areas', '#6b8f2a']];
const SM_ROWS = [['Land & constructability', 'Suitable'], ['Zoning & permitting', 'Compliant'], ['Water', 'Secured'], ['Natural resources', 'Clear'], ['Natural hazards', 'Low risk']];

function siteSelection(stage, float = false) {
  const GREEN = '#2f8a5b', RED = '#d6453d', INK = '#141414';
  const MX = 40, MY = 28, MW = 520, MH = 444;
  const r = rng(11);
  const lay = (n, inner) => `<g class="sm sm-l${n}" style="opacity:${stage === 1 ? 0 : n < 3 ? 0.9 : 0}">${inner}</g>`;
  let s = `<defs><clipPath id="smclip"><rect x="${MX}" y="${MY}" width="${MW}" height="${MH}" rx="16"/></clipPath>
    <pattern id="smhatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="6" stroke="#1f8f86" stroke-width="1.4" opacity=".7"/></pattern>
    <pattern id="smdot" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="#2f8a5b" opacity=".6"/></pattern></defs>`;
  s += rect(MX, MY, MW, MH, { rx: 16, fill: '#ebe9e3', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += `<g clip-path="url(#smclip)">`;
  // fields
  s += `<path d="M${MX} ${MY} H${MX + 300} C 330 70 280 90 250 60 S 120 90 ${MX} 100 Z" fill="#e0e4d6"/><path d="M${MX + MW} 330 C 480 350 440 420 380 ${MY + MH} H${MX + MW} Z" fill="#e0e4d6"/><path d="M${MX} 380 C 90 370 130 410 150 ${MY + MH} H${MX} Z" fill="#e0e4d6"/>`;
  // industrial blocks (buildings), rotated to the street grid
  s += `<g transform="rotate(-16 300 250)">`;
  for (let gx = 0; gx < 9; gx++) for (let gy = 0; gy < 8; gy++) {
    const bx = -20 + gx * 76, by = 40 + gy * 62;
    if (r() < 0.12) continue;
    const n = 1 + Math.floor(r() * 3);
    for (let k = 0; k < n; k++) {
      const w = 22 + r() * 26, h = 14 + r() * 18, x = bx + 4 + (k % 2) * 34 + r() * 4, y = by + 4 + Math.floor(k / 2) * 26 + r() * 4;
      s += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="1.5" fill="${['#d8d5cd', '#cfccc3', '#dedbd3', '#c8c5bc'][Math.floor(r() * 4)]}"/>`;
    }
  }
  s += `</g>`;
  // roads
  const road = (d, w = 7) => `<path d="${d}" fill="none" stroke="#cdc9bf" stroke-width="${w + 2.4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fbfaf7" stroke-width="${w}" stroke-linecap="round"/>`;
  s += road(`M${MX - 10} 150 C 160 190 300 170 ${MX + MW + 10} 250`, 9)
    + road(`M${MX - 10} 340 C 160 310 360 350 ${MX + MW + 10} 300`, 7)
    + road(`M210 ${MY - 10} C 230 160 250 280 300 ${MY + MH + 10}`, 7)
    + road(`M420 ${MY - 10} C 410 200 440 330 470 ${MY + MH + 10}`, 6)
    + road(`M${MX - 10} 250 C 120 240 170 270 250 262`, 5);
  s += `<path d="M${MX - 10} 440 C 200 400 380 440 ${MX + MW + 10} 395" fill="none" stroke="#a8a59c" stroke-width="1.6" stroke-dasharray="7 3"/>`;
  // layers
  s += lay(1, `<g fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="6 4"><path d="M${MX} 90 C 190 120 330 100 ${MX + MW} 70"/><path d="M330 104 C 360 170 400 190 ${MX + MW} 200"/><path d="M330 104 C 300 70 280 ${MY}  270 ${MY}"/></g>`
    + [[100, 106], [190, 118], [262, 112], [330, 104], [400, 178], [480, 192]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`).join('')
    + `<rect x="316" y="90" width="28" height="28" rx="6" fill="${INK}"/><path d="M331 95 l-6 12 h5 l-2 10 l8 -13 h-5 l2 -9 z" fill="#fff"/>`);
  s += lay(2, `<path d="M${MX} 390 C 140 330 200 420 290 372 S 450 330 ${MX + MW} 372" fill="none" stroke="#3566d6" stroke-opacity=".22" stroke-width="64" stroke-linecap="round"/><path d="M${MX} 390 C 140 330 200 420 290 372 S 450 330 ${MX + MW} 372" fill="none" stroke="#3566d6" stroke-opacity=".3" stroke-width="30" stroke-linecap="round"/><path d="M${MX} 390 C 140 330 200 420 290 372 S 450 330 ${MX + MW} 372" fill="none" stroke="#3566d6" stroke-width="3" stroke-linecap="round"/>`);
  s += lay(3, `<path d="M70 130 q40 -26 80 -4 q24 22 -6 42 q-50 16 -74 -8 z" fill="url(#smhatch)" stroke="#1f8f86" stroke-width="1.3"/><path d="M440 270 q40 -20 70 6 q10 32 -30 38 q-44 -4 -40 -44 z" fill="url(#smhatch)" stroke="#1f8f86" stroke-width="1.3"/><path d="M110 270 q26 -14 52 2 q4 24 -22 28 q-30 -6 -30 -30 z" fill="url(#smhatch)" stroke="#1f8f86" stroke-width="1.3"/>`);
  s += lay(4, `<path d="M400 50 L 520 44 L 540 140 L 430 150 Z" fill="url(#smdot)" stroke="#2f8a5b" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M80 300 L 190 292 L 200 350 L 90 360 Z" fill="url(#smdot)" stroke="#2f8a5b" stroke-width="1.5" stroke-dasharray="3 3"/>`);
  s += lay(5, `<path d="M${MX + 14} 210 C 120 150 240 180 360 150 S 520 230 ${MX + MW - 14} 240 L ${MX + MW - 14} 330 C 420 300 300 340 200 320 S 70 330 ${MX + 14} 320 Z" fill="rgba(107,143,42,.1)" stroke="#6b8f2a" stroke-width="1.6" stroke-dasharray="8 5"/>`);
  // the site
  const P = [[-34, -78], [34, -78], [34, 78], [-34, 78]].map(([x, y]) => { const a = 0.38, c = Math.cos(a), sn = Math.sin(a); return [300 + x * c - y * sn, 250 + x * sn + y * c]; });
  const sp = P.map((p) => p.map(f).join(' ')).join(' L ');
  s += `<g class="sm-site"><path d="M${sp} Z" fill="rgba(214,69,61,.14)" stroke="${RED}" stroke-width="2.4" stroke-linejoin="round"/><path class="sm-ring" d="M${sp} Z" fill="none" stroke="${GREEN}" stroke-width="3.2" stroke-linejoin="round"/>`
    + circle(300, 250, 10, { fill: '#fff', stroke: RED, sw: 3.5 }) + circle(300, 250, 3.4, { fill: RED }) + `</g>`;
  s += `</g>`;
  s += rect(MX + 372, MY + 20, 130, 26, { rx: 13, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' }) + circle(MX + 388, MY + 33, 4, { fill: RED }) + text(MX + 398, MY + 37, 'Site under evaluation', { size: 9.5, weight: 600 });
  // active layer chip
  SM_LAYERS.forEach(([n, col], i) => {
    const w = n.length * 6.2 + 34;
    s += `<g class="sm sm-ch sm-c${i + 1}" style="opacity:${stage === 1 ? 0 : i < 2 ? 1 : 0}">` + rect(MX + 16, MY + MH - 42, w, 26, { rx: 13, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' }) + circle(MX + 32, MY + MH - 29, 4.5, { fill: col }) + text(MX + 43, MY + MH - 25, n, { size: 10, weight: 600 }) + `</g>`;
  });
  // assessment checklist
  const CX = 584, CY = 44, CW = 252, CH = 412;
  s += rect(CX, CY, CW, CH, { rx: 16, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += text(CX + 22, CY + 36, 'Site assessment', { size: 13.5, weight: 650 }) + text(CX + 22, CY + 54, '5 categories · analysing…', { size: 10, fill: 'var(--v-mute2)' });
  SM_ROWS.forEach(([n, res], i) => {
    const y = CY + 92 + i * 46, done = stage === 3;
    s += `<g class="sm-row sm-r${i + 1}">` + line(CX + 22, y - 22, CX + CW - 22, y - 22, { stroke: 'rgba(0,0,0,.06)' })
      + circle(CX + 34, y, 9, { fill: 'none', stroke: 'rgba(0,0,0,.14)', sw: 1.6 })
      + `<circle class="sm-spin" cx="${CX + 34}" cy="${y}" r="9" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="16 41" style="opacity:0"/>`
      + `<g class="sm-ok" style="opacity:${done ? 1 : 0}">` + circle(CX + 34, y, 9, { fill: GREEN }) + `<path d="M${CX + 29.5} ${y + 0.5} l3.2 3.2 l6 -6.6" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></g>`
      + `<g class="sm-lbl" style="opacity:${done ? 1 : 0.5}">` + text(CX + 54, y + 4, n, { size: 11.5, weight: 600 }) + `</g>`
      + `<g class="sm-res" style="opacity:${done ? 1 : 0}">` + text(CX + CW - 22, y + 4, res, { size: 10, weight: 600, anchor: 'end', fill: GREEN }) + `</g></g>`;
  });
  s += `<g class="sm-final" style="opacity:${stage === 3 ? 1 : 0}">` + rect(CX + 14, CY + CH - 98, CW - 28, 82, { rx: 12, fill: 'rgba(47,138,91,.1)' })
    + circle(CX + 40, CY + CH - 68, 11, { fill: GREEN }) + `<path d="M${CX + 34.5} ${CY + CH - 68} l4 4 l7 -8" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    + text(CX + 62, CY + CH - 64, 'Site shortlisted', { size: 12.5, weight: 650 })
    + text(CX + 30, CY + CH - 34, 'Suitability', { size: 10, fill: 'var(--v-mute2)' }) + text(CX + CW - 30, CY + CH - 34, '86', { size: 12, weight: 700, anchor: 'end', fill: GREEN })
    + rect(CX + 30, CY + CH - 26, CW - 60, 6, { rx: 3, fill: 'rgba(0,0,0,.08)' }) + `<rect class="sm-bar" x="${CX + 30}" y="${CY + CH - 26}" width="${f((CW - 60) * 0.86)}" height="6" rx="3" fill="${GREEN}"/></g>`;
  return wrap(s, 'An illustrated site map where layers such as power grid, flood maps, wetlands, critical habitat and protected areas switch on and off while an assessment checklist completes and the site is shortlisted', 500, 860);
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
  const iw = w - 48;
  s += text(px, y + 40, 'Hi, María', { size: 11.5, fill: 'var(--v-mute)' });
  s += circle(px + iw - 11, y + 35, 11, { fill: 'var(--v-ink)', op: 0.1 }) + text(px + iw - 11, y + 39, 'M', { size: 10, weight: 700, anchor: 'middle' });
  s += text(px, y + 74, '$12,480.20', { size: 28, weight: 600 });
  // cards: one behind, one in front
  s += rect(px + 12, y + 92, iw - 12, 92, { rx: 14, fill: 'var(--v-accent)', op: 0.55 });
  s += rect(px, y + 100, iw - 12, 92, { rx: 14, fill: 'var(--v-ink)', cls: 'fl' });
  s += rect(px + 14, y + 114, 22, 16, { rx: 4, fill: 'none', stroke: 'var(--v-card)', sw: 1.2, op: 0.7 }) + line(px + 14, y + 122, px + 36, y + 122, { stroke: 'var(--v-card)', op: 0.5 });
  s += text(px + 14, y + 168, '•••• •••• •••• 4821', { size: 11, weight: 500, fill: 'var(--v-card)' }) + text(px + 14, y + 183, 'MARÍA BERROCAL', { size: 7.5, fill: 'var(--v-card)', op: 0.6 });
  s += text(px + iw - 24, y + 125, 'VISA', { size: 12, weight: 700, anchor: 'end', fill: 'var(--v-card)' });
  // primary actions
  [['Send', 'M7 17 L17 7 M9 7 h8 v8'], ['Pay', 'M6 12 h12 M12 6 v12'], ['Move', 'M7 9 h10 l-3 -3 M17 15 H7 l3 3'], ['Cards', 'M5 9 h14 M5 14 h14 M6 7 h12 v10 H6 z']].forEach(([n, d], i) => {
    const cx = px + 22 + i * 54;
    s += circle(cx, y + 222, 17, { fill: i === 0 ? 'var(--v-ink)' : 'none', stroke: i === 0 ? 'none' : 'var(--v-ink)', sw: 1.2 });
    s += `<path d="${d}" transform="translate(${cx - 12} ${y + 210})" fill="none" stroke="${i === 0 ? 'var(--v-card)' : 'var(--v-ink)'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += text(cx, y + 255, n, { size: 9.5, weight: 600, anchor: 'middle', fill: 'var(--v-mute2)' });
  });
  s += text(px, y + 284, 'Movements', { size: 11.5, weight: 600 }) + text(px + iw, y + 284, 'See all', { size: 10, anchor: 'end', fill: 'var(--v-accent)', weight: 600 });
  [
    ['Coffee Lab', 'Food · 9:14', '−4.80', 0],
    ['Salary · Acme', 'Deposit · 8:00', '+3,200.00', 1],
    ['Rent', 'Autopay · Mon', '−1,150.00', 0],
  ].forEach(([n, sub, v, pos], i) => {
    const ry = y + 294 + i * 36;
    s += circle(px + 13, ry + 17, 12, { fill: 'var(--v-ink)', op: pos ? 1 : 0.08 });
    s += text(px + 13, ry + 21, n[0], { size: 10, weight: 700, fill: pos ? 'var(--v-card)' : 'var(--v-ink)', anchor: 'middle' });
    s += text(px + 34, ry + 14, n, { size: 11.5, weight: 500 }) + text(px + 34, ry + 27, sub, { size: 8.5, fill: 'var(--v-mute)' });
    s += text(px + iw, ry + 19, v, { size: 11.5, weight: 600, anchor: 'end', fill: pos ? 'var(--v-accent)' : 'var(--v-ink)' });
  });
  s += line(x + 16, y + 404, x + w - 16, y + 404);
  ['Home', 'Cards', 'Pay', 'More'].forEach((n, i) => {
    const tx = px + 22 + i * 54;
    s += circle(tx, y + 416, 3.5, { fill: i === 0 ? 'var(--v-ink)' : 'var(--v-mute)', op: i === 0 ? 1 : 0.5 }) + text(tx, y + 430, n, { size: 7.5, anchor: 'middle', fill: i === 0 ? 'var(--v-ink)' : 'var(--v-mute)', weight: i === 0 ? 650 : 500 });
  });

  // accounts (left)
  s += card(40, 80, 208, 150, 18);
  s += text(60, 108, 'Accounts', { size: 13, weight: 600 });
  [['Checking', '•••• 2207', '$8,270.20'], ['Savings', '•••• 9910', '$4,210.00']].forEach(([n, m, v], i) => {
    const ay = 124 + i * 48;
    s += line(60, ay, 228, ay) + rect(60, ay + 10, 26, 26, { rx: 8, fill: 'var(--v-ink)', op: i ? 0.1 : 0.9 });
    s += text(96, ay + 24, n, { size: 12, weight: 500 }) + text(96, ay + 37, m, { size: 8.5, fill: 'var(--v-mute)' }) + text(228, ay + 29, v, { size: 12, weight: 600, anchor: 'end' });
  });

  // send-money step (left)
  s += card(40, 250, 208, 176, 18);
  s += text(60, 280, 'Send money', { size: 13, weight: 600 });
  s += rect(60, 294, 168, 30, { rx: 8, fill: 'none', stroke: 'var(--v-card-line)' });
  s += circle(76, 309, 8, { fill: 'var(--v-ink)', op: 0.12 }) + text(92, 313, 'Ana Pérez', { size: 11.5, fill: 'var(--v-mute2)' });
  s += text(60, 356, '$250.00', { size: 22, weight: 600 }) + text(228, 356, 'USD', { size: 10, anchor: 'end', fill: 'var(--v-mute)' });
  s += rect(60, 380, 168, 30, { rx: 15, fill: 'var(--v-ink)' });
  s += text(144, 399.5, 'Continue', { size: 12, weight: 600, fill: 'var(--v-card)', anchor: 'middle' });

  // month summary (right)
  s += card(552, 60, 208, 170, 18);
  s += text(572, 90, 'This month', { size: 13, weight: 600 }) + text(740, 90, '$2,430', { size: 12, weight: 600, anchor: 'end' });
  [['Housing', 0.78], ['Food', 0.46], ['Transport', 0.22]].forEach(([n, v], i) => {
    const by = 122 + i * 34;
    s += text(572, by, n, { size: 11.5, fill: 'var(--v-mute2)' });
    s += rect(572, by + 9, 168, 6, { rx: 3, fill: 'var(--v-line)' });
    s += rect(572, by + 9, 168 * v, 6, { rx: 3, fill: i === 0 ? 'var(--v-accent)' : 'var(--v-ink)', op: i === 0 ? 1 : 0.75, cls: 'grow' });
  });
  // credit card payment (right)
  s += card(552, 250, 208, 176, 18);
  s += text(572, 280, 'Credit card', { size: 13, weight: 600 }) + text(740, 280, 'Due Jul 12', { size: 10, anchor: 'end', fill: 'var(--v-mute)' });
  s += rect(572, 294, 168, 52, { rx: 10, fill: 'var(--v-ink)' }) + text(584, 316, 'VISA', { size: 10, weight: 700, fill: 'var(--v-card)' }) + text(584, 336, '•••• 4821', { size: 10.5, fill: 'var(--v-card)', op: 0.8 }) + text(728, 336, '$340.00', { size: 11, weight: 600, anchor: 'end', fill: 'var(--v-card)' });
  s += text(572, 368, 'Limit used', { size: 10, fill: 'var(--v-mute)' }) + text(740, 368, '34%', { size: 10, weight: 600, anchor: 'end' });
  s += rect(572, 376, 168, 6, { rx: 3, fill: 'var(--v-line)' }) + rect(572, 376, 57, 6, { rx: 3, fill: 'var(--v-accent)', cls: 'grow' });
  s += rect(572, 394, 168, 22, { rx: 11, fill: 'none', stroke: 'var(--v-ink)', sw: 1.2 }) + text(656, 409, 'Pay now', { size: 10.5, weight: 600, anchor: 'middle' });
  return wrap(s, 'A task-first banking home with balance, three primary actions and recent activity, beside a send-money step');
}

// 4. Waterplan platform navigation -------------------------------------------
// The platform today: a grouped sidebar, a personalised home, and the admin controls that make it configurable.

const BLUE_A = '#d9e7fa', BLUE_B = '#f3f7fd';
const SIDE = [['Monitor', ['Overview', 'Global Risks Map', 'Site Details', 'Risks By Site']], ['Measure', ['Dashboards', 'Scenario Analyses', 'Meters']], ['Respond', ['Water Stewardship', 'Projects']]];

function sidebar(x, y, w, h, o = {}) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 18}" fill="url(#navg)" stroke="var(--v-card-line)" ${o.fl === false ? '' : 'class="fl"'}/>`;
  let yy = y + 30;
  SIDE.forEach(([g, items]) => {
    s += text(x + 18, yy, g, { size: 8.5, weight: 600, fill: 'var(--v-mute2)' });
    yy += 10;
    items.forEach((it) => {
      const act = it === 'Overview';
      if (act) s += rect(x + 10, yy - 2, w - 20, 24, { rx: 8, fill: '#fff', stroke: 'var(--v-card-line)' });
      s += rect(x + 20, yy + 5, 11, 11, { rx: 3, fill: 'none', stroke: 'var(--v-ink)', sw: 1.3, op: 0.7 });
      s += text(x + 38, yy + 15, it, { size: 10.5, weight: act ? 650 : 500 });
      yy += 28;
    });
    yy += 12;
  });
  return s;
}
const navDefs = `<defs><linearGradient id="navg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BLUE_A}"/><stop offset="1" stop-color="${BLUE_B}"/></linearGradient></defs>`;

function homeTiles(x, y, w) {
  const cols = [['CLIMATE ACTION', 'Energy & Net Zero Carbon'], ['WATER SECURITY', 'Global Risks Map'], ['WATER ACCOUNTING', 'Water Accounting Dashboard'], ['EFFICIENCY', 'Production']];
  let s = '';
  const tw = (w - 10) / 2;
  cols.forEach(([c, n], i) => {
    const tx = x + (i % 2) * (tw + 10), ty = y + Math.floor(i / 2) * 60;
    s += rect(tx, ty, tw, 50, { rx: 10, fill: '#fff', stroke: 'var(--v-card-line)' });
    s += text(tx + 12, ty + 19, c, { size: 7, weight: 650, fill: 'var(--v-mute)' }) + rect(tx + 12, ty + 27, 11, 11, { rx: 3, fill: 'none', stroke: 'var(--v-ink)', sw: 1.2 }) + text(tx + 29, ty + 37, n.length > 22 ? n.slice(0, 21) + '…' : n, { size: 9.5, weight: 600 });
  });
  return s;
}

function navigation(stage, float = false) {
  let s = navDefs;
  s += sidebar(40, 30, 214, 440);
  s += rect(40, 30, 214, 0, {});
  // home (centre)
  s += card(270, 40, 340, 246, 18);
  s += text(440, 82, 'Hi María', { size: 20, weight: 650, anchor: 'middle' }) + text(440, 102, 'What do you want to do today?', { size: 10.5, anchor: 'middle', fill: 'var(--v-mute2)' });
  s += homeTiles(292, 126, 296);
  s += text(440, 262, 'Set up Home Page', { size: 9.5, weight: 600, anchor: 'middle', fill: 'var(--v-mute2)' });
  // appearance (centre bottom)
  s += card(270, 302, 340, 168, 18);
  s += text(290, 330, 'Appearance', { size: 12.5, weight: 650 }) + rect(364, 319, 58, 16, { rx: 8, fill: 'var(--v-line)' }) + text(393, 330.5, 'Admin only', { size: 7.5, weight: 600, anchor: 'middle', fill: 'var(--v-mute2)' });
  [['Waterplan', '#cfe0fa'], ['Mist', '#e4e4e6'], ['Glacier', '#c9e8ee'], ['Lagoon', '#bfe9df'], ['Moss', '#d3e8c9'], ['Midnight', '#26272c']].forEach(([n, c], i) => {
    const sx = 290 + i * 50;
    s += rect(sx, 346, 42, 44, { rx: 8, fill: c, stroke: i === 0 ? '#3566d6' : 'var(--v-card-line)', sw: i === 0 ? 1.8 : 1 }) + rect(sx + 6, 354, 14, 3, { rx: 1.5, fill: i === 5 ? '#fff' : 'var(--v-ink)', op: 0.5 }) + rect(sx + 6, 361, 11, 3, { rx: 1.5, fill: i === 5 ? '#fff' : 'var(--v-ink)', op: 0.3 }) + rect(sx + 22, 354, 14, 30, { rx: 3, fill: '#fff', op: i === 5 ? 0.9 : 0.75 });
    s += text(sx + 21, 403, n, { size: 6.5, weight: 600, anchor: 'middle', fill: 'var(--v-mute2)' });
  });
  s += line(290, 418, 590, 418) + text(290, 440, 'Show company logo on Home', { size: 10, weight: 600 }) + rect(558, 430, 32, 17, { rx: 8.5, fill: 'var(--v-accent)' }) + circle(581, 438.5, 6.5, { fill: '#fff' });
  s += text(290, 457, 'Applies to everyone in the workspace', { size: 8, fill: 'var(--v-mute)' });
  // custom names (right top)
  s += card(626, 40, 140, 222, 18);
  s += text(644, 68, 'Custom names', { size: 12, weight: 650 });
  [['Sites', 'Facilities'], ['Meters', 'Gauges'], ['Risks By Site', 'Exposure'], ['Projects', 'Initiatives']].forEach(([o, n], i) => {
    const yy = 92 + i * 40;
    s += text(644, yy, o, { size: 8.5, fill: 'var(--v-mute)' }) + line(644, yy - 3.5, 644 + o.length * 4.6, yy - 3.5, { stroke: 'var(--v-mute)' }) + rect(644, yy + 6, 104, 20, { rx: 6, fill: 'var(--v-bg)', op: 0.0 }) + rect(644, yy + 6, 104, 20, { rx: 6, fill: 'none', stroke: 'var(--v-card-line)' }) + text(652, yy + 20, n, { size: 10, weight: 600 });
  });
  // company logo (right bottom)
  s += card(626, 278, 140, 192, 18);
  s += text(644, 306, 'Company logo', { size: 12, weight: 650 });
  s += rect(644, 318, 104, 52, { rx: 10, fill: 'none', stroke: 'var(--v-card-line)', sw: 1.2 }) + `<rect x="644" y="318" width="104" height="52" rx="10" fill="none" stroke="var(--v-mute)" stroke-dasharray="4 3"/>`;
  s += rect(668, 332, 22, 22, { rx: 6, fill: 'var(--v-ink)' }) + text(679, 348, 'A', { size: 12, weight: 700, anchor: 'middle', fill: '#fff' }) + text(696, 347, 'Acme', { size: 10.5, weight: 650 });
  s += text(696, 396, 'Shown on Home', { size: 8.5, fill: 'var(--v-mute)', anchor: 'middle' }) + text(644, 396, '', {});
  s += rect(644, 410, 104, 24, { rx: 12, fill: 'var(--v-ink)' }) + text(696, 426, 'Save changes', { size: 9.5, weight: 600, anchor: 'middle', fill: 'var(--v-card)' });
  return wrap(s, 'The platform today: a grouped sidebar, a personalised home with the company name, and appearance, naming and logo settings', H, W);
}

// Platform navigation, "The evolution": a topbar out of room → a FigJam of the whole project → the configurable platform
function navEvolve(stage) {
  const INK = '#141414';
  const r = rng(stage === 1 ? 3 : 14);
  let s = navDefs + `<defs><pattern id="nvdot" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#000" opacity=".16"/></pattern></defs>`;

  if (stage === 1) {
    s += rect(0, 0, W, H, { fill: '#e4e5e8' });
    // wide viewport: a topbar with too many items, misaligned
    s += rect(24, 22, 520, 300, { rx: 8, fill: '#f6f7f9', stroke: 'rgba(0,0,0,.18)' });
    s += rect(24, 22, 520, 46, { rx: 8, fill: '#fff', stroke: 'rgba(0,0,0,.14)' });
    s += circle(44, 45, 9, { fill: 'none', stroke: INK, sw: 1.6 }) + text(58, 49, 'waterplan', { size: 11, weight: 650 });
    const tabs = ['Overview', 'Catchments', 'Measure', 'Risks', 'Responses', 'Reporting', 'Sites', 'Targets', 'Projects', 'Meters', 'Dash'];
    let tx = 126;
    tabs.forEach((t, i) => {
      const w = t.length * 5.6 + 8, yy = 38 + (i % 3 === 1 ? 4 : i % 4 === 2 ? -3 : 0);
      if (tx + w < 500) { s += text(tx, yy + 11, t, { size: 8.5, weight: i === 0 ? 650 : 500, fill: i === 0 ? INK : '#666' }); tx += w + (i % 2 ? 4 : 11); }
    });
    s += `<g><rect x="486" y="30" width="46" height="24" rx="5" fill="#fff" stroke="rgba(0,0,0,.2)"/><text x="492" y="46" font-size="8" fill="#444">Search</text><circle cx="516" cy="42" r="3" fill="none" stroke="#444"/></g>`;
    s += text(470, 48, '…', { size: 14, weight: 700 }) + circle(534, 42, 7, { fill: '#2b2b2b' }) + rect(430, 28, 28, 18, { rx: 4, fill: 'none', stroke: 'rgba(0,0,0,.25)' }) + text(444, 40, '▾', { size: 9, anchor: 'middle' });
    // second row of tabs overlapping
    s += rect(24, 68, 520, 30, { fill: '#e8edf5' });
    s += rect(30, 73, 96, 20, { rx: 4, fill: '#fff', stroke: 'rgba(0,0,0,.2)' }) + text(38, 87, 'Schrute Beets Farm', { size: 8 });
    ['SWAT', 'Supply & Demand', 'IPCC Climate Proj', 'Complementary', 'Catchment Inf', 'Share'].forEach((t, i) => { s += text(138 + i * 66 - (i > 3 ? 14 : 0), 87 + (i % 2 ? 2 : 0), t, { size: 8, fill: '#555' }); });
    // clipped, uneven content
    s += rect(36, 112, 244, 80, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' }) + rect(292, 108, 236, 90, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' }) + rect(40, 206, 150, 100, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' }) + rect(204, 212, 334, 96, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' });
    for (let k = 0; k < 7; k++) s += rect(48 + k * 6, 232 + (k % 3) * 22, 80 - k * 4, 5, { rx: 2, fill: INK, op: 0.25 }) + rect(218, 228 + k * 11, 100 + (k * 37) % 150, 4, { rx: 2, fill: INK, op: 0.2 });
    // narrow viewport: breakpoint breaks
    s += rect(574, 22, 202, 300, { rx: 8, fill: '#f6f7f9', stroke: 'rgba(0,0,0,.18)' });
    s += rect(574, 22, 202, 74, { rx: 8, fill: '#fff', stroke: 'rgba(0,0,0,.14)' });
    s += circle(592, 40, 8, { fill: 'none', stroke: INK, sw: 1.5 }) + text(604, 44, 'waterplan', { size: 10, weight: 650 }) + rect(726, 30, 40, 20, { rx: 4, fill: '#fff', stroke: 'rgba(0,0,0,.2)' });
    ['Overview', 'Catchm', 'Measu', 'Risks', 'Resp', 'Repor'].forEach((t, i) => { s += text(584 + (i % 3) * 62, 66 + Math.floor(i / 3) * 14 + (i % 2) * 2, t, { size: 8, fill: '#555' }); });
    s += rect(574, 96, 202, 20, { fill: '#e8edf5' }) + text(582, 109, 'Schrute Beets Fa  SWAT An  Repo…', { size: 7.5, fill: '#555' });
    s += rect(560, 126, 150, 76, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' }) + rect(584, 214, 210, 90, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' });
    // annotations
    s += `<g stroke="#d6453d" stroke-width="1.6" fill="none" stroke-dasharray="4 3"><rect x="118" y="30" width="400" height="30" rx="4"/><rect x="578" y="56" width="190" height="34" rx="4"/></g>`;
    s += rect(130, 332, 200, 24, { rx: 12, fill: '#fff', stroke: '#d6453d' }) + text(142, 348, 'No room for new products', { size: 10, weight: 600, fill: '#d6453d' });
    s += rect(560, 332, 190, 24, { rx: 12, fill: '#fff', stroke: '#d6453d' }) + text(572, 348, 'Breakpoints break', { size: 10, weight: 600, fill: '#d6453d' });
    // bottom: stacked request notes
    ['New: Carbon module', 'Customer: rename “Sites”', 'Where does this go?'].forEach((t, i) => { s += rect(40 + i * 236, 384, 210, 74, { rx: 8, fill: '#fff', stroke: 'rgba(0,0,0,.14)' }) + rect(40 + i * 236, 384, 5, 74, { fill: ['#f5a623', '#d6453d', '#3566d6'][i] }) + text(58 + i * 236, 412, t, { size: 11, weight: 650 }) + rect(58 + i * 236, 424, 140, 5, { rx: 2, fill: INK, op: 0.2 }) + rect(58 + i * 236, 436, 96, 5, { rx: 2, fill: INK, op: 0.14 }); });
    return wrap(s, 'A crowded topbar with too many items, misaligned padding and breakpoints that break', H, W);
  }

  if (stage === 2) {
    // a FigJam with many platform screenshots, notes and transcripts
    s += rect(0, 0, W, H, { fill: '#f6f6f8' }) + rect(0, 0, W, H, { fill: 'url(#nvdot)' });
    const shot = (x, y, w, h, k) => {
      let o = rect(x + 2, y + 3, w, h, { rx: 4, fill: '#000', op: 0.1 }) + rect(x, y, w, h, { rx: 4, fill: '#fff', stroke: 'rgba(0,0,0,.16)' }) + rect(x, y, w, 9, { rx: 4, fill: '#eef1f6' });
      if (k === 0) o += rect(x + 6, y + 14, w * 0.38, h - 22, { rx: 2, fill: '#2c4a5a', op: 0.9 }) + rect(x + w * 0.44, y + 16, w * 0.5, 4, { fill: INK, op: 0.4 }) + rect(x + w * 0.44, y + 26, w * 0.4, 4, { fill: INK, op: 0.25 });
      else if (k === 1) for (let i = 0; i < 6; i++) o += rect(x + 6, y + 15 + i * ((h - 20) / 6), w - 12, 3.5, { fill: ['#e8a15a', '#d6453d', '#f2c14e', '#e8a15a', '#d6453d', '#f2c14e'][i], op: 0.55 });
      else if (k === 2) o += rect(x + 6, y + 14, 18, h - 20, { fill: '#dce6f5' }) + rect(x + 30, y + 16, w - 38, h * 0.4, { rx: 2, fill: '#e9edf3' }) + rect(x + 30, y + 16 + h * 0.46, w - 38, h * 0.3, { rx: 2, fill: '#e9edf3' });
      else o += rect(x + 6, y + 15, w - 12, h * 0.5, { rx: 2, fill: '#dbe4ee' }) + rect(x + 6, y + 20 + h * 0.5, w * 0.4, 4, { fill: INK, op: 0.3 }) + rect(x + 6, y + 28 + h * 0.5, w * 0.55, 4, { fill: INK, op: 0.2 });
      return o;
    };
    const pill = (x, y, w, t) => rect(x, y, w, 15, { rx: 7.5, fill: INK }) + text(x + w / 2, y + 10.5, t, { size: 8, weight: 650, anchor: 'middle', fill: '#fff' });
    const note = (x, y, c, l1, l2, rot = 0) => `<g transform="rotate(${rot} ${x + 40} ${y + 32})">` + rect(x + 2, y + 3, 80, 66, { rx: 3, fill: '#000', op: 0.12 }) + rect(x, y, 80, 66, { rx: 3, fill: c }) + text(x + 7, y + 22, l1, { size: 8.5, weight: 650, fill: INK }) + (l2 ? text(x + 7, y + 34, l2, { size: 8.5, weight: 650, fill: INK }) : '') + rect(x + 7, y + 48, 40, 4, { rx: 2, fill: INK, op: 0.25 }) + `</g>`;
    s += rect(28, 24, 744, 26, { rx: 4, fill: '#0d99ff' }) + text(40, 41, 'Platform navigation · discovery', { size: 11, weight: 650, fill: '#fff' });
    s += pill(40, 64, 90, 'Current platform') + pill(300, 64, 90, 'Customer calls') + pill(560, 64, 120, 'Configurations');
    for (let i = 0; i < 4; i++) s += shot(40 + i * 64, 86 + (i % 2) * 8, 58, 56, i % 4);
    s += `<path d="M130 122 C 200 110 240 120 300 130" stroke="#9747ff" stroke-width="1.4" fill="none"/>`;
    // transcript cards
    const tr = [[300, 86, 'Gong · Customer call', '“We want it to feel like our own platform.”'], [420, 86, 'Gong · Customer call', '“Can we call it Facilities, not Sites?”'], [300, 150, 'Meeting transcript', '“Where does the new module go?”']];
    tr.forEach(([x, y, h, q], i) => { s += rect(x + 2, y + 3, 112, 56, { rx: 6, fill: '#000', op: 0.1 }) + rect(x, y, 112, 56, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.14)' }) + circle(x + 14, y + 14, 6, { fill: ['#9747ff', '#ff7262', '#0d99ff'][i] }) + text(x + 24, y + 17, h, { size: 7.5, weight: 650 }) + text(x + 8, y + 33, q.slice(0, 22), { size: 7.5, fill: '#444' }) + text(x + 8, y + 44, q.slice(22), { size: 7.5, fill: '#444' }); });
    s += note(40, 160, '#ffe27a', 'Rename modules', 'per customer', -3) + note(130, 168, '#ffb9c8', 'Menu is out', 'of room', 2) + note(220, 156, '#b8d8ff', 'New products', 'every quarter', -2);
    for (let i = 0; i < 3; i++) s += shot(560 + i * 70, 86 + (i % 2) * 10, 62, 58, (i + 1) % 4);
    s += note(560, 160, '#c3eec0', 'Branding,', 'logo, theme', 3) + note(650, 166, '#ffc9a0', 'Same logic,', 'different labels', -2);
    // second band: the whole module map
    s += rect(28, 262, 744, 20, { rx: 4, fill: '#0d99ff' }) + text(40, 276, 'Monitor module · site access & navigation', { size: 9.5, weight: 650, fill: '#fff' });
    for (let i = 0; i < 9; i++) s += shot(40 + i * 80, 296 + (i % 3) * 6, 68, 64, (i * 3) % 4);
    for (let i = 0; i < 8; i++) s += `<path d="M${108 + i * 80} ${326 + (i % 3) * 3} H${120 + i * 80}" stroke="#9747ff" stroke-width="1.4"/>`;
    for (let i = 0; i < 5; i++) s += shot(60 + i * 140, 384 + (i % 2) * 8, 80, 60, (i + 2) % 4);
    s += `<path d="M100 360 V 384 M240 360 V 392 M380 360 V 384 M520 360 V 392 M660 360 V 384" stroke="#9747ff" stroke-width="1.4" fill="none"/>`;
    s += note(150, 410, '#ffe27a', 'Dev: can this', 'be configured?', -4) + note(290, 416, '#c3eec0', 'Sidebar groups:', 'Monitor/Measure', 3) + note(432, 410, '#ffb9c8', 'Legacy tabs', 'to migrate', -2) + note(572, 414, '#dcc8ff', 'Admin theme', 'settings', 4);
    s += circle(760, 462, 14, { fill: '#9747ff' }) + text(760, 467, 'M', { size: 13, weight: 700, anchor: 'middle', fill: '#fff' });
    return wrap(s, 'A FigJam board with screenshots of the platform, customer call transcripts and sticky notes', H, W);
  }

  // stage 3: the platform today, configurable
  s += rect(0, 0, W, H, { fill: '#e6edf8' });
  s += rect(24, 20, 752, 460, { rx: 16, fill: '#f4f8fe', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += circle(50, 46, 11, { fill: 'none', stroke: INK, sw: 1.8 }) + text(68, 51, 'waterplan', { size: 14, weight: 650 });
  s += rect(150, 38, 14, 12, { rx: 3, fill: 'none', stroke: INK, sw: 1.3, op: 0.6 });
  [660, 690, 720].forEach((x) => { s += circle(x, 45, 7, { fill: 'none', stroke: INK, sw: 1.3, op: 0.7 }); });
  s += text(748, 49, 'English', { size: 9.5, anchor: 'middle', fill: 'var(--v-mute2)' });
  s += rect(24, 70, 200, 410, { fill: 'none' });
  let yy = 92;
  SIDE.forEach(([g, items]) => {
    s += text(44, yy, g, { size: 8.5, weight: 600, fill: 'var(--v-mute2)' }); yy += 10;
    items.forEach((it) => { const act = it === 'Overview'; if (act) s += rect(34, yy - 2, 176, 24, { rx: 8, fill: '#fff', stroke: 'var(--v-card-line)' }); s += rect(44, yy + 5, 11, 11, { rx: 3, fill: 'none', stroke: INK, sw: 1.3, op: 0.7 }) + text(62, yy + 15, it, { size: 10.5, weight: act ? 650 : 500 }); yy += 28; });
    yy += 12;
  });
  s += rect(228, 62, 536, 406, { rx: 14, fill: '#fff' });
  s += text(496, 168, 'Hi María', { size: 28, weight: 650, anchor: 'middle' }) + text(496, 194, 'What do you want to do today?', { size: 12.5, anchor: 'middle', fill: 'var(--v-mute2)' });
  s += rect(448, 128, 0, 0, {}) + rect(418, 214, 0, 0, {});
  s += homeTiles(318, 230, 356);
  s += text(496, 372, 'Set up Home Page', { size: 10, weight: 600, anchor: 'middle', fill: 'var(--v-mute2)' });
  // customer-specific: name, logo and theme
  s += rect(250, 80, 108, 26, { rx: 13, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' }) + rect(260, 86, 14, 14, { rx: 4, fill: INK }) + text(267, 97, 'A', { size: 8, weight: 700, anchor: 'middle', fill: '#fff' }) + text(280, 97, 'Acme Foods', { size: 9.5, weight: 650 });
  s += rect(572, 396, 176, 58, { rx: 14, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' }) + text(588, 416, 'Theme', { size: 9.5, weight: 650 });
  ['#cfe0fa', '#e4e4e6', '#c9e8ee', '#bfe9df', '#d3e8c9', '#26272c'].forEach((c, i) => { s += circle(592 + i * 26, 436, 9, { fill: c, stroke: i === 2 ? '#3566d6' : 'var(--v-card-line)', sw: i === 2 ? 2 : 1 }); });
  s += rect(250, 396, 168, 58, { rx: 14, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' }) + text(266, 416, 'Custom names', { size: 9.5, weight: 650 }) + text(266, 438, 'Sites', { size: 9, fill: 'var(--v-mute)' }) + line(266, 434.5, 288, 434.5, { stroke: 'var(--v-mute)' }) + text(294, 438, '→  Facilities', { size: 10, weight: 650 });
  return wrap(s, 'The platform today: a grouped sidebar and a personalised home, with the company logo, custom names and theme set per customer', H, W);
}

// Civarea, "The evolution": messy first iteration → structured evaluation → insight (three scroll-wiped frames)
function siteEvolve(stage) {
  const GREEN = '#2f8a5b', RED = '#d6453d', INK = 'var(--v-ink)';
  const r = rng(5);
  let s = '';
  if (stage === 1) {
    // fragmented: overlapping panels, dense tables, mismatched type
    s += rect(0, 0, W, H, { fill: '#e4e3de' });
    const panels = [[18, 20, 300, 210, -1.5], [300, 44, 260, 190, 1.2], [530, 14, 250, 230, -0.8], [40, 250, 270, 220, 0.9], [290, 262, 230, 210, -1.1], [500, 252, 280, 226, 1.4]];
    panels.forEach(([x, y, w, h, a], i) => {
      s += `<g transform="rotate(${a} ${x + w / 2} ${y + h / 2})">` + rect(x, y, w, h, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.2)' }) + rect(x, y, w, 18, { rx: 6, fill: ['#c9cfd6', '#d9d2c0', '#cdd8cf'][i % 3] });
      for (let k = 0; k < 11; k++) {
        const yy = y + 30 + k * 15;
        if (yy > y + h - 10) break;
        s += rect(x + 10, yy, 38 + r() * 40, 5, { rx: 2, fill: 'rgba(0,0,0,.35)' });
        for (let c = 0; c < 3; c++) s += rect(x + 110 + c * 52, yy, 20 + r() * 22, 5, { rx: 2, fill: 'rgba(0,0,0,.16)' });
      }
      s += `</g>`;
    });
    s += rect(210, 150, 150, 70, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.25)', cls: 'fl' }) + text(222, 172, 'Layer_v2_FINAL', { size: 10, weight: 600 }) + text(222, 190, 'raster: 142 / vector: 96', { size: 9, fill: 'var(--v-mute2)' }) + rect(222, 200, 90, 5, { rx: 2, fill: 'rgba(214,69,61,.5)' });
    s += rect(420, 120, 170, 60, { rx: 6, fill: '#fff', stroke: 'rgba(0,0,0,.25)', cls: 'fl' }) + text(432, 144, 'ERR 404 – source?', { size: 10, weight: 600, fill: RED }) + text(432, 162, 'dataset_09b.geojson', { size: 9, fill: 'var(--v-mute2)' });
    return wrap(s, 'The first iteration: overlapping tables and panels with no clear journey', H, W);
  }
  // structured product shell
  s += rect(0, 0, W, H, { fill: '#ecece8' });
  s += rect(24, 24, 752, 452, { rx: 18, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += text(48, 58, 'Site evaluation', { size: 14, weight: 650 }) + rect(640, 40, 112, 26, { rx: 13, fill: '#141414' }) + text(696, 57, 'Export', { size: 10.5, weight: 600, anchor: 'middle', fill: '#fff' });
  // journey nav
  ['Land & constructability', 'Zoning & permitting', 'Water', 'Natural resources', 'Natural hazards'].forEach((n, i) => {
    const y = 96 + i * 44, on = i === 4;
    s += rect(40, y - 14, 196, 34, { rx: 10, fill: on ? 'rgba(47,138,91,.12)' : 'none' }) + circle(58, y + 3, 6, { fill: on ? GREEN : 'none', stroke: on ? GREEN : 'rgba(0,0,0,.25)', sw: 1.6 }) + text(74, y + 7, n, { size: 11, weight: on ? 650 : 500, fill: on ? INK : 'var(--v-mute2)' });
  });
  s += text(48, 336, 'Map layers', { size: 10, weight: 650, fill: 'var(--v-mute2)' });
  [['Flood maps', '#3566d6', 1], ['Wetlands', '#1f8f86', 0], ['Critical habitat', GREEN, 0]].forEach(([n, c, on], i) => {
    const y = 360 + i * 32;
    s += text(48, y + 4, n, { size: 10.5, weight: 500 }) + rect(180, y - 8, 36, 18, { rx: 9, fill: on ? c : 'rgba(0,0,0,.14)' }) + circle(on ? 207 : 189, y + 1, 7, { fill: '#fff' });
  });
  // map
  const MX = 256, MY = 84, MW = 500, MH = 376;
  s += `<defs><clipPath id="evclip"><rect x="${MX}" y="${MY}" width="${MW}" height="${MH}" rx="12"/></clipPath></defs>`;
  s += rect(MX, MY, MW, MH, { rx: 12, fill: '#ebe9e3' });
  s += `<g clip-path="url(#evclip)"><g transform="rotate(-16 500 280)">`;
  for (let gx = 0; gx < 8; gx++) for (let gy = 0; gy < 7; gy++) { if (r() < 0.15) continue; s += rect(250 + gx * 68, 80 + gy * 58, 22 + r() * 26, 14 + r() * 18, { rx: 1.5, fill: ['#d8d5cd', '#cfccc3', '#dedbd3'][Math.floor(r() * 3)] }); }
  s += `</g><path d="M${MX - 10} 190 C 400 230 560 200 ${MX + MW + 10} 270" fill="none" stroke="#fbfaf7" stroke-width="9"/><path d="M450 ${MY - 10} C 470 220 490 330 520 ${MY + MH + 10}" fill="none" stroke="#fbfaf7" stroke-width="7"/>`;
  s += `<path d="M${MX} 400 C 360 350 440 430 540 380 S 700 350 ${MX + MW} 392" fill="none" stroke="#3566d6" stroke-opacity=".28" stroke-width="46" stroke-linecap="round"/><path d="M${MX} 400 C 360 350 440 430 540 380 S 700 350 ${MX + MW} 392" fill="none" stroke="#3566d6" stroke-width="2.6"/>`;
  const sp = [[-26, -58], [26, -58], [26, 58], [-26, 58]].map(([x, y]) => { const a = 0.38; return `${f(500 + x * Math.cos(a) - y * Math.sin(a))} ${f(290 + x * Math.sin(a) + y * Math.cos(a))}`; }).join(' L ');
  s += `<path d="M${sp} Z" fill="rgba(214,69,61,.14)" stroke="${RED}" stroke-width="2.2"/>` + circle(500, 290, 8, { fill: '#fff', stroke: RED, sw: 3 }) + `</g>`;
  if (stage === 2) return wrap(s, 'The redesigned evaluation: a journey of five categories beside a map with toggleable layers', H, W);
  // stage 3: a report pops up over the map with insights for the site evaluation
  s += circle(606, 334, 20, { fill: 'rgba(214,69,61,.18)' }) + circle(606, 334, 8, { fill: RED, stroke: '#fff', sw: 2.5 });
  s += rect(24, 24, 752, 452, { rx: 18, fill: 'rgba(20,20,20,.34)' });
  s += rect(150, 56, 500, 392, { rx: 18, fill: '#fff', stroke: 'var(--v-card-line)', cls: 'fl' });
  s += text(180, 92, 'Site evaluation report', { size: 15, weight: 650 }) + text(180, 110, 'Key insights · 3 to investigate', { size: 10.5, fill: 'var(--v-mute2)' });
  s += rect(580, 74, 50, 24, { rx: 12, fill: 'rgba(47,138,91,.14)' }) + text(605, 90, '86', { size: 11.5, weight: 700, anchor: 'middle', fill: GREEN });
  s += line(180, 124, 620, 124, { stroke: 'rgba(0,0,0,.08)' });
  [
    ['High', RED, 'Flood exposure', 'Part of the site sits in a 100-year flood zone, which can add cost and delay to permitting.'],
    ['Medium', '#c98a1b', 'Grid capacity', 'The nearest substation is close, but available capacity may limit the first phase.'],
    ['Low', GREEN, 'Protected habitat', 'A habitat area borders the site. Worth confirming setbacks early.'],
  ].forEach(([sev, col, h, d], i) => {
    const y = 142 + i * 92;
    s += rect(180, y, 440, 80, { rx: 12, fill: i === 0 ? 'rgba(214,69,61,.06)' : '#f6f6f3' }) + circle(202, y + 24, 5, { fill: col });
    s += text(216, y + 28, h, { size: 12.5, weight: 650 }) + text(600, y + 28, sev, { size: 10, weight: 650, anchor: 'end', fill: col });
    s += text(196, y + 46, 'Why it matters', { size: 9, weight: 650, fill: 'var(--v-mute2)', op: 1 });
    const words = d.split(' '); let l1 = '', l2 = '';
    words.forEach((w) => { if ((l1 + ' ' + w).length < 62 && !l2) l1 += (l1 ? ' ' : '') + w; else l2 += (l2 ? ' ' : '') + w; });
    s += text(196, y + 62, l1, { size: 10 }) + (l2 ? text(196, y + 75, l2, { size: 10 }) : '');
  });
  s += rect(180, 416, 130, 22, { rx: 11, fill: '#141414' }) + text(245, 431, 'Investigate next', { size: 10, weight: 600, anchor: 'middle', fill: '#fff' });
  return wrap(s, 'A report pops up with insights for the site evaluation, each explaining why it matters', H, W);
}

// EY Digital Banking, "The evolution": a messy FigJam of journeys → many wireframes → the app
function bankEvolve(stage) {
  if (stage === 3) return banking(3);
  const INK = '#141414';
  const r = rng(stage === 1 ? 21 : 8);
  let s = `<defs><pattern id="bedot" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#000" opacity=".16"/></pattern></defs>`;
  s += rect(0, 0, W, H, { fill: '#f1f0ec' }) + rect(0, 0, W, H, { fill: 'url(#bedot)' });

  if (stage === 1) {
    // a FigJam board: many sticky notes, grouped into customer journeys, messy
    const COL = ['#ffe27a', '#ffb9c8', '#b8d8ff', '#c3eec0', '#ffc9a0', '#dcc8ff'];
    const WORDS = ['Can’t find “pay a bill”', 'Checks balance first', 'Transfers feel risky', 'Wants a receipt', 'Too many menus', 'Calls the branch', 'Unsure it went through', 'Forgot password', 'Prefers going in person', 'Needs help with OTP', 'Mostly on mobile', 'Afraid of mistakes'];
    const lanes = ['Check balance', 'Pay a bill', 'Transfer money', 'Manage account'];
    // lane labels
    lanes.forEach((n, i) => {
      const y = 38 + i * 118;
      s += rect(20, y - 8, n.length * 6.2 + 20, 22, { rx: 11, fill: INK }) + text(30, y + 7, n, { size: 9.5, weight: 650, fill: '#fff' });
    });
    // notes along each lane, connected by curved arrows
    let prev = null;
    for (let i = 0; i < 4; i++) {
      prev = null;
      const n = 6 + (i % 2);
      for (let k = 0; k < n; k++) {
        const x = 24 + k * (n === 7 ? 108 : 124) + (r() - 0.5) * 22, y = 56 + i * 118 + (r() - 0.5) * 26, rot = (r() - 0.5) * 14;
        const c = COL[Math.floor(r() * COL.length)], w = 74 + r() * 8, h = 60 + r() * 8;
        if (prev) s += `<path d="M${f(prev[0] + 40)} ${f(prev[1] + 34)} C ${f(prev[0] + 70)} ${f(prev[1] + 10 + (r() - 0.5) * 40)} ${f(x - 20)} ${f(y + 30 + (r() - 0.5) * 40)} ${f(x + 6)} ${f(y + 32)}" fill="none" stroke="${INK}" stroke-opacity=".45" stroke-width="1.3" stroke-dasharray="4 3"/>`;
        s += `<g transform="rotate(${f(rot)} ${f(x + w / 2)} ${f(y + h / 2)})">` + rect(x + 2, y + 3, w, h, { rx: 3, fill: '#000', op: 0.12 }) + rect(x, y, w, h, { rx: 3, fill: c });
        const word = WORDS[Math.floor(r() * WORDS.length)], parts = word.split(' ');
        const l1 = parts.slice(0, 2).join(' '), l2 = parts.slice(2).join(' ');
        s += text(x + 7, y + 20, l1, { size: 8.5, weight: 650, fill: INK }) + (l2 ? text(x + 7, y + 32, l2, { size: 8.5, weight: 650, fill: INK }) : '') + rect(x + 7, y + h - 18, 30 + r() * 24, 4, { rx: 2, fill: INK, op: 0.28 }) + rect(x + 7, y + h - 10, 18 + r() * 20, 4, { rx: 2, fill: INK, op: 0.2 }) + `</g>`;
        prev = [x, y];
      }
    }
    // stray notes piled on top
    for (let k = 0; k < 9; k++) {
      const x = 30 + r() * 700, y = 30 + r() * 410, rot = (r() - 0.5) * 24, c = COL[Math.floor(r() * COL.length)], w = 66, h = 56;
      s += `<g transform="rotate(${f(rot)} ${f(x + w / 2)} ${f(y + h / 2)})">` + rect(x + 2, y + 3, w, h, { rx: 3, fill: '#000', op: 0.14 }) + rect(x, y, w, h, { rx: 3, fill: c }) + rect(x + 7, y + 12, 40, 4, { rx: 2, fill: INK, op: 0.5 }) + rect(x + 7, y + 22, 50, 4, { rx: 2, fill: INK, op: 0.35 }) + rect(x + 7, y + 32, 28, 4, { rx: 2, fill: INK, op: 0.3 }) + `</g>`;
    }
    return wrap(s, 'A messy FigJam board: many customer journeys built from sticky notes', H, W);
  }

  // stage 2: many wireframes, from sketchy low-resolution to polished high-resolution
  const kinds = [['lo', 'lo', 'lo', 'mid', 'hi', 'hi'], ['lo', 'mid', 'mid', 'hi', 'hi', 'hi']];
  const pw = 96, ph = 200, gx = 124, x0 = 40;
  const lo = (x, y, v) => {
    let o = rect(x + 8, y + 12, pw - 16, 10, { rx: 2, fill: '#c9c8c2' });
    if (v % 3 === 0) { o += rect(x + 8, y + 32, pw - 16, 46, { fill: 'none', stroke: '#9b9a94', sw: 1 }) + line(x + 8, y + 32, x + pw - 8, y + 78, { stroke: '#9b9a94' }) + line(x + pw - 8, y + 32, x + 8, y + 78, { stroke: '#9b9a94' }); }
    for (let k = 0; k < 4; k++) o += rect(x + 8, y + (v % 3 === 0 ? 90 : 36) + k * 26, pw - 16, 18, { fill: 'none', stroke: '#9b9a94', sw: 1, rx: 1 }) + rect(x + 12, y + (v % 3 === 0 ? 96 : 42) + k * 26, 30 + (k * 11) % 26, 4, { fill: '#b9b8b2' });
    return o + rect(x + 14, y + ph - 34, pw - 28, 20, { fill: '#c9c8c2', stroke: '#9b9a94', sw: 1 });
  };
  const mid = (x, y, v) => {
    let o = text(x + 10, y + 26, ['Home', 'Pay', 'Send', 'Review', 'Cards', 'Accounts'][v % 6], { size: 9.5, weight: 650, fill: INK });
    for (let k = 0; k < 4; k++) o += rect(x + 10, y + 40 + k * 28, pw - 20, 22, { rx: 5, fill: '#fff', stroke: '#b5b4ae', sw: 1 }) + circle(x + 21, y + 51 + k * 28, 5, { fill: '#cfcec8' }) + rect(x + 32, y + 48 + k * 28, 30 + (k * 9) % 22, 4, { rx: 2, fill: '#bdbcb6' });
    return o + rect(x + 10, y + ph - 36, pw - 20, 24, { rx: 12, fill: '#8d8c86' });
  };
  const hi = (x, y, v) => {
    let o = text(x + 10, y + 26, ['Total balance', 'Pay a bill', 'Send money', 'Review', 'My cards', 'Accounts'][v % 6], { size: 9.5, weight: 650, fill: INK });
    if (v % 2 === 0) o += rect(x + 10, y + 36, pw - 20, 50, { rx: 8, fill: INK }) + text(x + 18, y + 58, 'VISA', { size: 8, weight: 700, fill: '#fff' }) + text(x + 18, y + 76, '•••• 4821', { size: 8, fill: '#fff', op: 0.8 });
    else o += text(x + 10, y + 62, '$250.00', { size: 20, weight: 650, fill: INK });
    for (let k = 0; k < 3; k++) o += line(x + 10, y + 100 + k * 28, x + pw - 10, y + 100 + k * 28, { stroke: 'rgba(0,0,0,.1)' }) + circle(x + 20, y + 114 + k * 28, 7, { fill: INK, op: 0.1 }) + rect(x + 34, y + 110 + k * 28, 34, 4, { rx: 2, fill: INK, op: 0.55 }) + rect(x + pw - 36, y + 110 + k * 28, 26, 4, { rx: 2, fill: k === 1 ? '#2f8a5b' : INK, op: 0.7 });
    return o + rect(x + 10, y + ph - 36, pw - 20, 24, { rx: 12, fill: INK }) + text(x + pw / 2, y + ph - 20, 'Continue', { size: 8.5, weight: 650, anchor: 'middle', fill: '#fff' });
  };
  kinds.forEach((row, ri) => row.forEach((kind, ci) => {
    const x = x0 + ci * gx + (r() - 0.5) * 4, y = 34 + ri * 232 + (r() - 0.5) * 6, v = ri * 6 + ci;
    const rx = kind === 'lo' ? 8 : 14;
    if (kind === 'hi') s += rect(x + 2, y + 6, pw, ph, { rx, fill: '#000', op: 0.14 });
    s += kind === 'lo' ? `<rect x="${x}" y="${y}" width="${pw}" height="${ph}" rx="${rx}" fill="#f8f7f3" stroke="#8d8c86" stroke-width="1.4" stroke-dasharray="5 3"/>` : rect(x, y, pw, ph, { rx, fill: kind === 'mid' ? '#f6f5f1' : '#fff', stroke: kind === 'mid' ? '#9b9a94' : 'rgba(0,0,0,.14)', sw: 1.2 });
    s += kind === 'lo' ? lo(x, y, v) : kind === 'mid' ? mid(x, y, v) : hi(x, y, v);
    if (ci < 5) s += `<path d="M${x + pw + 6} ${y + ph / 2} h${gx - pw - 12}" stroke="${INK}" stroke-opacity=".4" stroke-width="1.3" stroke-dasharray="3 3" fill="none"/>`;
  }));
  s += rect(40, 8, 74, 18, { rx: 9, fill: INK }) + text(77, 20, 'Low-res', { size: 8.5, weight: 650, anchor: 'middle', fill: '#fff' }) + rect(686, 8, 74, 18, { rx: 9, fill: '#2f8a5b' }) + text(723, 20, 'High-res', { size: 8.5, weight: 650, anchor: 'middle', fill: '#fff' });
  return wrap(s, 'Many wireframes, from sketchy low-resolution to polished high-resolution screens', H, W);
}

export const visuals = { targetTracking, siteSelection, siteEvolve, bankEvolve, navEvolve, banking, navigation };
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
