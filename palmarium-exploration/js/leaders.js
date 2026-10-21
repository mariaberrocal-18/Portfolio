// Leaders run from each claim's numeral, through the marks lane, to its
// evidence row. Right-angle elbows only. Lane positions are chosen by brute
// force so that no two leaders cross.

import { el } from './rosette.js';

const rel = (node, origin) => {
  const r = node.getBoundingClientRect();
  return { l: r.left - origin.left, r: r.right - origin.left, cy: r.top + r.height / 2 - origin.top };
};

function segmentsFor(p) {
  // p = { sx, sy, lx, ey, ex } → horizontal / vertical segments
  if (Math.abs(p.sy - p.ey) < 2) return [{ h: true, y: p.sy, a: p.sx, b: p.ex }];
  return [
    { h: true, y: p.sy, a: p.sx, b: p.lx },
    { h: false, x: p.lx, a: p.sy, b: p.ey },
    { h: true, y: p.ey, a: p.lx, b: p.ex },
  ];
}

const between = (v, a, b) => v > Math.min(a, b) + 0.5 && v < Math.max(a, b) - 0.5;

const overlap = (a, b, c, d) => Math.min(Math.max(a, b), Math.max(c, d)) - Math.max(Math.min(a, b), Math.min(c, d));

function crosses(s, t) {
  if (s.h === t.h) {
    // Parallel segments that nearly coincide read as one line: count as a conflict.
    if (s.h) return Math.abs(s.y - t.y) < 6 && overlap(s.a, s.b, t.a, t.b) > 2;
    return Math.abs(s.x - t.x) < 10 && overlap(s.a, s.b, t.a, t.b) > 2;
  }
  const h = s.h ? s : t;
  const v = s.h ? t : s;
  return between(v.x, h.a, h.b) && between(h.y, v.a, v.b);
}

function crossingCount(paths) {
  const segs = paths.map(segmentsFor);
  let n = 0;
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      for (const s of segs[i]) for (const t of segs[j]) if (crosses(s, t)) n++;
    }
  }
  return n;
}

function chooseLanes(base) {
  const lo = Math.min(...base.map((p) => p.sx)) + 14;
  const hi = Math.max(...base.map((p) => p.ex)) - 14;
  const cand = [];
  for (let k = 0; k < 7; k++) cand.push(lo + ((hi - lo) * k) / 6);
  let best = null;
  let bestScore = Infinity;
  const n = base.length;
  const pick = (idx, cur) => {
    if (idx === n) {
      const score = crossingCount(cur);
      if (score < bestScore) { bestScore = score; best = cur.map((p) => ({ ...p })); }
      return;
    }
    for (const x of cand) {
      cur[idx] = { ...base[idx], lx: x };
      pick(idx + 1, cur);
    }
  };
  pick(0, []);
  return best;
}

export function createLeaders(svg, body, getEnds) {
  const paths = [];
  const dots = [];
  const count = getEnds().length;
  for (let i = 0; i < count; i++) {
    paths.push(el('path', { class: 'leader', 'data-claim': i + 1, pathLength: 1 }, svg));
    dots.push(el('circle', { class: 'leader-dot', 'data-claim': i + 1, r: 3.5 }, svg));
  }

  function update() {
    const origin = body.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${origin.width} ${origin.height}`);
    const ends = getEnds().map(({ mark, num }) => {
      const m = rel(mark, origin);
      const n = rel(num, origin);
      return { sx: m.r, sy: m.cy, ex: n.l, ey: n.cy };
    });
    const laid = chooseLanes(ends);
    laid.forEach((p, i) => {
      const straight = Math.abs(p.sy - p.ey) < 2;
      paths[i].setAttribute('d', straight
        ? `M${p.sx.toFixed(1)} ${p.sy.toFixed(1)}H${p.ex.toFixed(1)}`
        : `M${p.sx.toFixed(1)} ${p.sy.toFixed(1)}H${p.lx.toFixed(1)}V${p.ey.toFixed(1)}H${p.ex.toFixed(1)}`);
      dots[i].setAttribute('cx', p.sx.toFixed(1));
      dots[i].setAttribute('cy', p.sy.toFixed(1));
    });
  }

  function setActive(id) {
    paths.forEach((p, i) => p.classList.toggle('is-active', i + 1 === id));
    dots.forEach((p, i) => p.classList.toggle('is-active', i + 1 === id));
  }

  return { update, setActive };
}
