// Engraved rosette geometry. One ring per portfolio sleeve; line count is
// derived from the data model (one line is about ten points of capital).

export const NS = 'http://www.w3.org/2000/svg';
export const TAU = Math.PI * 2;

// R: base radius, n: waves, a: wave amplitude, step: spacing between hatch lines
export const RINGS = [
  { id: 'cash',     R: 60,  n: 7,  a: 8,  step: 0 },
  { id: 'bonds',    R: 104, n: 9,  a: 11, step: 0.04 },
  { id: 'credit',   R: 150, n: 11, a: 9,  step: 0.03 },
  { id: 'equities', R: 200, n: 13, a: 14, step: 0.025 },
  { id: 'alts',     R: 254, n: 16, a: 10, step: 0 },
];

export function el(name, attrs = {}, parent) {
  const node = document.createElementNS(NS, name);
  for (const key in attrs) {
    const v = attrs[key];
    if (v !== null && v !== undefined) node.setAttribute(key, v);
  }
  if (parent) parent.appendChild(node);
  return node;
}

export function ringPath(ring) {
  const N = 170;
  let d = '';
  for (let k = 0; k < N; k++) {
    const t = (TAU * k) / N;
    const r = ring.R + ring.a * Math.sin(ring.n * t) + 0.35 * ring.a * Math.sin(2 * ring.n * t + 1);
    d += (k ? 'L' : 'M') + (r * Math.cos(t)).toFixed(1) + ' ' + (r * Math.sin(t)).toFixed(1);
  }
  return d + 'Z';
}

function lineUse(parent, prefix, ring, i, attrs) {
  const scale = 1 + ring.step * i;
  return el('use', {
    href: `#${prefix}-${ring.id}`,
    transform: i ? `scale(${scale.toFixed(3)})` : null,
    'data-ring': ring.id,
    'data-i': i,
    ...attrs,
  }, parent);
}

/**
 * Build the five rings.
 * now / next: { ringId: lineCount }. A line that exists now but not next is
 * "removed" (gets a ghost twin); one that exists next but not now is "added".
 */
export function buildRings(parent, { prefix, now, next = now }) {
  const defs = el('defs', {}, parent);
  RINGS.forEach((r) => el('path', { id: `${prefix}-${r.id}`, d: ringPath(r), 'vector-effect': 'non-scaling-stroke' }, defs));
  const g = el('g', { class: 'rosette' }, parent);
  RINGS.forEach((r, idx) => {
    const rg = el('g', { class: 'ring', 'data-ring': r.id, style: `--i:${idx}` }, g);
    const a = now[r.id];
    const b = next[r.id];
    for (let i = 0; i < Math.max(a, b); i++) {
      lineUse(rg, prefix, r, i, {
        class: 'ln',
        'data-now': i < a ? '' : null,
        'data-next': i < b ? '' : null,
        'data-added': i >= a && i < b ? '' : null,
      });
    }
    for (let i = b; i < a; i++) lineUse(rg, prefix, r, i, { class: 'ln ln--ghost' });
  });
  return g;
}

export const polar = (angle, radius) => [radius * Math.sin(angle), -radius * Math.cos(angle)];
