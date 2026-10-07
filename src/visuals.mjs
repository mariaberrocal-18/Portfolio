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
const card = (x, y, w, h, rx = 16) => rect(x, y, w, h, { rx, fill: 'var(--v-card)', stroke: 'var(--v-card-line)' });
const draw = (d, o = {}) =>
  `<path d="${d}" pathLength="1" class="${o.dash ? 'fade' : 'draw'}" fill="none" stroke="${o.stroke ?? 'var(--v-ink)'}" stroke-width="${o.sw ?? 2}" stroke-linecap="round" stroke-linejoin="round" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} style="--d:${o.delay ?? 0}ms"/>`;

const wrap = (inner, label) =>
  `<svg class="v-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--v-ink)" stroke-width="1" opacity=".28"/></pattern></defs>${inner}</svg>`;

// 1. Waterplan target tracking -------------------------------------------------

function targetTracking(stage) {
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

  return ttShipped();
}

// Shipped state, inspired by how the real tool is organised: KPI strip, one evolution
// chart with Baseline / Last reported / Target markers, and per-target status rows.
function ttShipped() {
  let s = card(36, 26, 728, 448, 18);
  // KPI strip
  const kpis = [['Status to target', 'On track', 1], ['Target value', '0.246 hl/hl', 0], ['Expected impact', '5.1M hl', 0], ['Scenario cost', '$2.8M', 0]];
  kpis.forEach(([k, v, hi], i) => {
    const x = 56 + i * 172;
    s += rect(x, 44, 160, 54, { rx: 10, fill: hi ? 'rgba(52,112,80,.10)' : '#fff', stroke: hi ? 'var(--v-accent)' : 'var(--v-card-line)' });
    s += text(x + 12, 63, k, { size: 10.5, fill: 'var(--v-mute2)' });
    s += text(x + 12, 85, v, { size: hi ? 15 : 14.5, weight: 650, fill: hi ? 'var(--v-accent)' : 'var(--v-ink)' });
  });
  // chart frame
  const cx = 56, cy = 112, cw = 688, ch = 214;
  s += rect(cx, cy, cw, ch, { rx: 12, fill: '#fff', stroke: 'var(--v-card-line)' });
  s += text(cx + 16, cy + 24, 'Water usage efficiency', { size: 12.5, weight: 650 });
  const px = cx + 56, pw = cw - 92, py = cy + 52, ph = ch - 86;
  for (let i = 0; i < 4; i++) s += line(px, py + (ph / 3) * i, px + pw, py + (ph / 3) * i, { op: 0.7, dash: '2 4' });
  ['FY22', 'FY24', 'FY26', 'FY28', 'FY30'].forEach((l, i) => (s += text(px + (pw / 4) * i, py + ph + 18, l, { size: 10, fill: 'var(--v-mute)', anchor: 'middle' })));
  const X = (t) => px + pw * t; // t 0..1 across FY22..FY30
  const Y = (v) => py + ph * (1 - v); // v 0..1
  // markers
  [[0.25, 'Baseline'], [0.375, 'Last reported'], [1, 'Target']].forEach(([t, l]) => {
    s += line(X(t), py - 6, X(t), py + ph, { stroke: 'var(--v-mute)', op: 0.8 });
    s += rect(X(t) - (l.length * 2.9 + 8), cy + 30, l.length * 5.8 + 16, 17, { rx: 5, fill: '#fff', stroke: 'var(--v-card-line)' });
    s += text(X(t), cy + 42, l, { size: 9.5, fill: 'var(--v-mute2)', anchor: 'middle', weight: 500 });
  });
  // target path (dark) and reported (accent)
  s += draw(`M${X(0.25)} ${Y(0.82)} C${X(0.4)} ${Y(0.6)} ${X(0.5)} ${Y(0.5)} ${X(0.62)} ${Y(0.44)} S${X(0.86)} ${Y(0.3)} ${X(1)} ${Y(0.25)}`, { sw: 2.6, delay: 150 });
  s += draw(`M${X(0)} ${Y(0.79)} L${X(0.125)} ${Y(0.82)} L${X(0.25)} ${Y(0.82)} L${X(0.375)} ${Y(0.81)}`, { stroke: 'var(--v-accent)', sw: 2.4, delay: 50 });
  s += draw(`M${X(0.375)} ${Y(0.81)} C${X(0.44)} ${Y(0.7)} ${X(0.52)} ${Y(0.4)} ${X(0.6)} ${Y(0.12)}`, { stroke: 'var(--v-accent)', sw: 2, dash: '0.03 0.02', delay: 700 });
  [0, 0.125, 0.25, 0.375].forEach((t, i) => (s += circle(X(t), Y([0.79, 0.82, 0.82, 0.81][i]), 3.6, { fill: '#fff', stroke: 'var(--v-accent)', sw: 1.6 })));
  [[0.25, 0.82], [0.5, 0.5], [0.75, 0.33], [1, 0.25]].forEach(([t, v]) => (s += circle(X(t), Y(v), 3.6, { fill: '#fff', stroke: 'var(--v-ink)', sw: 1.6 })));
  // status rows
  const rows = [['Water usage efficiency', 'On track', 1, ''], ['Total discharges', 'Off track', 0, 'Short by 2.6M m³'], ['Total withdrawals', 'Off track', 0, 'Short by 12.0M m³']];
  rows.forEach(([n, st, ok, note], i) => {
    const y = 338 + i * 44;
    s += rect(56, y, 688, 36, { rx: 10, fill: '#fff', stroke: 'var(--v-card-line)' });
    s += rect(68, y + 8, 20, 20, { rx: 6, fill: 'rgba(52,112,80,.12)' });
    s += `<path d="M78 12.5c-2.6 3.2-4 5-4 6.8a4 4 0 0 0 8 0c0-1.8-1.4-3.6-4-6.8z" transform="translate(0 ${y - 4.5})" fill="none" stroke="var(--v-accent)" stroke-width="1.3" stroke-linejoin="round"/>`;
    s += text(100, y + 22, n, { size: 12.5, weight: 600 });
    if (note) s += text(560, y + 22, note, { size: 10.5, fill: '#b3332b', anchor: 'end' });
    s += rect(574, y + 8, 78, 20, { rx: 10, fill: ok ? 'rgba(52,112,80,.12)' : 'rgba(179,51,43,.10)' });
    s += circle(586, y + 18, 3, { fill: ok ? 'var(--v-accent)' : '#b3332b' });
    s += text(594, y + 22, st, { size: 10.5, weight: 600, fill: ok ? 'var(--v-accent)' : '#b3332b' });
    s += rect(664, y + 7, 68, 22, { rx: 6, fill: 'var(--v-ink)' });
    s += text(698, y + 22, 'Scenario', { size: 10.5, weight: 600, fill: '#fff', anchor: 'middle' });
  });
  return wrap(s, 'Target tracking: KPI strip, an evolution chart with baseline, last reported value and target markers, and per-target on-track and off-track status rows');
}

// 2. Civarea site selection ---------------------------------------------------

function heat(i, j, cols, rows, centers, r) {
  let v = 0;
  for (const [ci, cj, w, sg] of centers) v += w * Math.exp(-(((i - ci) ** 2 + (j - cj) ** 2) / (2 * sg * sg)));
  return Math.min(1, v + r() * 0.22);
}

function siteSelection(stage) {
  const r = rng(11);
  let s = '';
  const mx = 56, my = 44, mw = 456, mh = 430;
  s += card(mx, my, mw, mh, 18);

  if (stage === 1) {
    for (let i = 0; i < 190; i++) {
      const x = mx + 24 + r() * (mw - 48);
      const y = my + 24 + r() * (mh - 48);
      if (r() > 0.55) {
        s += `<path d="M${f(x - 3)} ${f(y)}H${f(x + 3)}M${f(x)} ${f(y - 3)}V${f(y + 3)}" stroke="var(--v-ink)" stroke-width="1.3" opacity="${f(0.25 + r() * 0.55)}"/>`;
      } else {
        s += circle(x, y, 2 + r() * 2.4, { fill: r() > 0.8 ? 'var(--v-accent)' : 'var(--v-ink)', op: 0.18 + r() * 0.5 });
      }
    }
    s += text(mx + 24, my + 40, '412 signals', { size: 13, weight: 600 });
    return wrap(s, 'Hundreds of unstructured location signals scattered across a region');
  }

  const cols = 26, rows = 24, gx = (mw - 56) / (cols - 1), gy = (mh - 96) / (rows - 1);
  const centers = [
    [8, 9, 1, 3.4],
    [18, 6, 0.9, 3],
    [14, 17, 0.85, 3.6],
    [4, 19, 0.35, 3],
  ];
  const cells = [];
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const v = heat(i, j, cols, rows, centers, r);
      const x = mx + 28 + i * gx;
      const y = my + 70 + j * gy;
      cells.push([x, y, v]);
    }
  s += text(mx + 28, my + 40, 'Overall suitability', { size: 13, weight: 600 });
  cells.forEach(([x, y, v]) => {
    const hi = v > 0.55;
    s += circle(x, y, hi ? 2.2 + v * 2.2 : 1.8, { fill: hi ? 'var(--v-accent)' : 'var(--v-ink)', op: hi ? 0.4 + v * 0.6 : 0.12 + v * 0.3 });
  });

  if (stage === 2) {
    return wrap(s, 'The same signals rolled into criteria: a heat grid showing where conditions are strong');
  }

  const pts = [
    [mx + 28 + 8 * gx, my + 70 + 9 * gy, '1'],
    [mx + 28 + 18 * gx, my + 70 + 6 * gy, '2'],
    [mx + 28 + 14 * gx, my + 70 + 17 * gy, '3'],
  ];
  pts.forEach(([x, y, n], i) => {
    s += circle(x, y, 17, { stroke: 'var(--v-ink)', sw: 1.5, op: 0.9 });
    s += circle(x, y, 9, { fill: 'var(--v-ink)' });
    s += text(x, y + 3.7, n, { size: 10.5, weight: 700, fill: 'var(--v-card)', anchor: 'middle' });
  });

  // shortlist
  const lx = 540, ly = 70, lw = 214;
  s += card(lx, ly, lw, 372, 18);
  s += text(lx + 22, ly + 38, 'Shortlist', { size: 14, weight: 600 });
  const rowsList = [
    ['Site 14', 86],
    ['Site 07', 81],
    ['Site 22', 77],
  ];
  rowsList.forEach(([n, v], i) => {
    const y = ly + 76 + i * 52;
    s += circle(lx + 30, y + 2, 9, { fill: i === 0 ? 'var(--v-ink)' : 'none', stroke: 'var(--v-ink)', sw: 1.2 });
    s += text(lx + 30, y + 5.5, String(i + 1), { size: 10.5, weight: 700, fill: i === 0 ? 'var(--v-card)' : 'var(--v-ink)', anchor: 'middle' });
    s += text(lx + 52, y + 6, n, { size: 13.5, weight: 600 });
    s += text(lx + lw - 22, y + 6, String(v), { size: 13.5, weight: 600, anchor: 'end' });
    s += rect(lx + 52, y + 16, lw - 74, 4, { rx: 2, fill: 'var(--v-line)' });
    s += rect(lx + 52, y + 16, (lw - 74) * (v / 100), 4, { rx: 2, fill: i === 0 ? 'var(--v-accent)' : 'var(--v-ink)', op: i === 0 ? 1 : 0.7, cls: 'grow' });
  });
  s += line(lx + 22, ly + 238, lx + lw - 22, ly + 238);
  s += text(lx + 22, ly + 264, 'Weights', { size: 12, weight: 600 });
  [
    ['Grid access', 0.7],
    ['Water', 0.45],
    ['Permitting', 0.6],
  ].forEach(([n, v], i) => {
    const y = ly + 292 + i * 26;
    s += text(lx + 22, y + 4, n, { size: 11.5, fill: 'var(--v-mute2)' });
    s += line(lx + 104, y, lx + lw - 22, y, { stroke: 'var(--v-line)', sw: 3 });
    s += line(lx + 104, y, lx + 104 + (lw - 126) * v, y, { stroke: 'var(--v-ink)', sw: 3 });
    s += circle(lx + 104 + (lw - 126) * v, y, 5.5, { fill: 'var(--v-card)', stroke: 'var(--v-ink)', sw: 1.6 });
  });
  return wrap(s, 'Site selection: a heat map with three ringed candidates beside a ranked shortlist and adjustable weights');
}

// 3. EY digital banking -------------------------------------------------------

function banking(stage) {
  let s = '';
  const x = 272, y = 34, w = 256, h = 520;
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
  s += card(56, 34, 238, 470, 20);
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
  s += card(cx, 34, 420, 470, 20);
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
export const render = (name, stage = 3) => visuals[name](stage);
