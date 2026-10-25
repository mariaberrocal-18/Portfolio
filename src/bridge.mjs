// Narrative bridge between Product Design and Visual Design (follows María's sketch):
//   brace + green thread → "Every product has a purpose." → "And a story to tell." + a collection of materials
//   → the same materials build a website (pinned, scroll-driven) → Visual Design.
// "Basin" is a FICTIONAL B2B platform for environmental intelligence and operational risk, used only as a
// demonstration. It is not a project, and it shares no name, logo, copy or screens with any real product.
// Materials: 3 product screens (portfolio overview, site analysis, scenario comparison), a territory
// art-direction piece, and an identity board. All figures are illustrative and consistent across screens:
//   Halden Plant · exposure index 78 (High) on the current trajectory, 49 (Medium) in the adapted scenario.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const INK = '#0c1713', FOREST = '#123d30', MOSS = '#2f7a5a', MIST = '#bfe3c9', LIME = '#c8f169', WARM = '#f5f2ea';
const mark = '<i class="bmark"></i>';

// ----- shared drawing helpers ---------------------------------------------------------------------------------
const contours = (n, base, ampl, stroke, sw = 0.4) =>
  Array.from({ length: n }, (_, i) => {
    const y = base + i * (90 / n);
    return `<path d="M-4 ${y.toFixed(1)} C30 ${(y - ampl).toFixed(1)} 52 ${(y + ampl).toFixed(1)} 84 ${(y - ampl * 0.4).toFixed(1)} S132 ${(y + ampl * 0.8).toFixed(1)} 164 ${(y - ampl * 0.3).toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
  }).join('');

const dot = ([x, y, l]) =>
  l === 'h'
    ? `<circle cx="${x}" cy="${y}" r="5.4" fill="none" stroke="${FOREST}" stroke-width=".5" stroke-opacity=".55"/><circle cx="${x}" cy="${y}" r="3" fill="${INK}"/><circle cx="${x}" cy="${y}" r="1" fill="${LIME}"/>`
    : l === 'm'
      ? `<circle cx="${x}" cy="${y}" r="2.7" fill="${LIME}" stroke="${FOREST}" stroke-width=".5"/>`
      : `<circle cx="${x}" cy="${y}" r="2.1" fill="${MIST}" stroke="${FOREST}" stroke-width=".5"/>`;

const SITES = [[22, 30, 'h'], [48, 22, 'm'], [60, 50, 'l'], [84, 34, 'h'], [104, 58, 'm'], [120, 26, 'l'], [132, 52, 'h'], [40, 64, 'l'], [72, 70, 'm'], [96, 18, 'l'], [28, 52, 'm'], [140, 74, 'l'], [112, 76, 'h'], [58, 34, 'l']];

const portfolioMap = () => `<svg viewBox="0 0 160 90" aria-hidden="true">
    <rect width="160" height="90" fill="#e6eee2"/>
    <path d="M0 64 C30 54 52 68 84 58 S132 40 160 46 V90 H0Z" fill="#d5e4d0"/>
    <path d="M0 30 C24 22 46 30 70 20 S120 12 160 18 V0 H0Z" fill="#dbe9d7"/>
    ${contours(7, 6, 5, '#bdd1b9')}
    <path d="M168 8 C132 20 118 14 100 34 S70 50 56 62 S26 80 8 100" fill="none" stroke="${MIST}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M168 8 C132 20 118 14 100 34 S70 50 56 62 S26 80 8 100" fill="none" stroke="#e9f6ec" stroke-width=".8" stroke-linecap="round" opacity=".8"/>
    ${SITES.map(dot).join('')}
    <g font-size="4.2" font-weight="650" fill="${INK}"><rect x="28" y="22.5" width="25" height="7.5" rx="3.75" fill="#fff" stroke="${FOREST}" stroke-width=".3"/><text x="31" y="27.6">Halden Plant</text></g>
  </svg>`;

const siteMap = (id) => `<svg viewBox="0 0 160 90" aria-hidden="true">
    <defs><pattern id="${id}" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="${LIME}" fill-opacity=".35"/><line x1="0" y1="0" x2="0" y2="3" stroke="${FOREST}" stroke-width=".55" stroke-opacity=".7"/></pattern></defs>
    <rect width="160" height="90" fill="#dfeadb"/>
    ${contours(11, 2, 6, '#b5cdb0', 0.45)}
    <path d="M-6 74 C26 60 44 76 76 62 S126 40 166 44" fill="none" stroke="${MIST}" stroke-width="7" stroke-linecap="round"/>
    <path d="M-6 74 C26 60 44 76 76 62 S126 40 166 44" fill="none" stroke="#eef8f0" stroke-width="1.2" stroke-linecap="round" opacity=".85"/>
    <path d="M46 56 C58 44 84 46 104 52 S128 66 118 78 S70 86 52 76Z" fill="url(#${id})" stroke="${FOREST}" stroke-width=".7" stroke-dasharray="2 1.4"/>
    <path d="M18 18 L150 30" stroke="${MOSS}" stroke-width=".6" stroke-dasharray="3 2" opacity=".7"/>
    <g fill="${INK}"><rect x="70" y="34" width="22" height="12" rx="1.4"/><rect x="95" y="38" width="12" height="9" rx="1.2"/><rect x="62" y="40" width="7" height="7" rx="1"/></g>
    <g fill="${LIME}"><rect x="73" y="37" width="6" height="2.2" rx=".6"/><rect x="82" y="37" width="6" height="2.2" rx=".6"/></g>
    <circle cx="81" cy="40" r="11" fill="none" stroke="${FOREST}" stroke-width=".5" stroke-dasharray="1.6 1.6" opacity=".7"/>
  </svg>`;

const line = (pts, h, stroke, sw, fill) => {
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');
  return `${fill ? `<path d="${d}L${pts[pts.length - 1][0]} ${h}L${pts[0][0]} ${h}Z" fill="${fill}"/>` : ''}<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const smooth = (ys, x0, x1) => ys.map((y, i) => [Math.round(x0 + (i / (ys.length - 1)) * (x1 - x0)), y]);
const grid = (w, h, n) => Array.from({ length: n }, (_, i) => `<line x1="0" y1="${(((i + 1) * h) / (n + 1)).toFixed(1)}" x2="${w}" y2="${(((i + 1) * h) / (n + 1)).toFixed(1)}" stroke="#0c1713" stroke-opacity=".08" stroke-width=".4"/>`).join('');

// ----- the five materials -------------------------------------------------------------------------------------
function overview(b) {
  const rows = b.sites.map(([n, f, s, l]) => `<li><span class="n">${esc(n)}</span><span class="f">${esc(f)}</span><b>${s}</b><span class="lv lv--${l[0].toLowerCase()}">${l}</span></li>`).join('');
  return `<div class="scr ov">
      <aside class="sb">${mark}<ul><li class="on"></li><li></li><li></li><li></li></ul></aside>
      <header class="hd"><h5>Portfolio overview</h5><div class="chips"><span class="on">All regions</span><span>Flood</span><span>2040</span></div></header>
      <div class="kpis">${b.kpis.map(([l, v]) => `<div><span>${esc(l)}</span><b>${esc(v)}</b></div>`).join('')}</div>
      <div class="ov__map">${portfolioMap()}<ul class="lg"><li><i class="h"></i>High</li><li><i class="m"></i>Medium</li><li><i class="l"></i>Low</li></ul></div>
      <div class="ov__tbl"><p class="th">Needs attention <em>Exposure · 2040</em></p><ul>${rows}</ul></div>
      <span class="ill">Illustrative data</span>
    </div>`;
}

function analysis(b, k) {
  const factors = b.factors.map(([n, v]) => `<li><span>${esc(n)}</span><i style="--w:${v}%"></i><b>${v}</b></li>`).join('');
  const evo = smooth([42, 40, 38, 34, 30, 25, 21, 16, 12], 0, 160);
  return `<div class="scr sa">
      <aside class="sb">${mark}<ul><li></li><li class="on"></li><li></li><li></li></ul></aside>
      <header class="hd"><p class="cr">Portfolio / Halden Plant</p><h5>Halden Plant</h5><span class="pillh">High · 78</span></header>
      <div class="sa__map">${siteMap('ht' + k)}<div class="chips chips--map"><span class="on">Flood</span><span>Heat</span><span>Supply</span></div></div>
      <div class="sa__risk"><p class="th">Risk factors</p><ul>${factors}</ul></div>
      <div class="sa__evo"><p class="th">Exposure index, 2024 – 2040</p>
        <svg viewBox="0 0 160 46" aria-hidden="true">${grid(160, 46, 3)}${line(evo, 46, INK, 1.3, 'rgba(47,122,90,.16)')}<circle cx="160" cy="12" r="2.1" fill="${LIME}" stroke="${INK}" stroke-width=".7"/></svg>
        <span class="end">78</span></div>
      <span class="ill">Illustrative data</span>
    </div>`;
}

function scenarios(b) {
  const a = smooth([40, 38, 33, 29, 24, 20, 17, 14, 12], 6, 154), c = smooth([40, 40, 40, 41, 42, 44, 45, 46, 46], 6, 154);
  const gap = `${a.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('')}${[...c].reverse().map(([x, y]) => `L${x} ${y}`).join('')}Z`;
  const acts = b.actions.map(([n, t, d], i) => `<li><b>${i + 1}</b><span>${esc(t)}</span><em>${esc(d)}</em></li>`).join('');
  return `<div class="scr sc">
      <aside class="sb">${mark}<ul><li></li><li></li><li class="on"></li><li></li></ul></aside>
      <header class="hd"><p class="cr">Halden Plant · 2040</p><h5>Scenario comparison</h5></header>
      <div class="sc__a"><p>A · Current trajectory</p><b>78</b><span class="lv lv--h">High</span></div>
      <div class="sc__b"><p>B · Adapted</p><b>49</b><span class="lv lv--m">Medium</span></div>
      <div class="sc__chart"><p class="th">Exposure index <em>2024 – 2040</em></p>
        <svg viewBox="0 0 160 52" aria-hidden="true">${grid(160, 52, 3)}<path d="${gap}" fill="${LIME}" fill-opacity=".38"/>${line(a, 52, INK, 1.4)}${line(c, 52, MOSS, 1.4)}<circle cx="154" cy="${a[8][1]}" r="2" fill="${INK}"/><circle cx="154" cy="${c[8][1]}" r="2" fill="${MOSS}"/></svg>
        <span class="d">−29 pts</span></div>
      <div class="sc__act"><p class="th">Priority actions</p><ul>${acts}</ul></div>
      <span class="ill">Illustrative data</span>
    </div>`;
}

function territory(b, k) {
  const rid = 'tr' + k;
  return `<div class="scr art"><svg viewBox="0 0 100 100" aria-hidden="true">
      <defs><linearGradient id="${rid}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07100c"/><stop offset=".55" stop-color="#14382c"/><stop offset="1" stop-color="#2f7a5a"/></linearGradient>
        <radialGradient id="${rid}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${LIME}" stop-opacity=".9"/><stop offset="1" stop-color="${LIME}" stop-opacity="0"/></radialGradient></defs>
      <rect width="100" height="100" fill="url(#${rid}s)"/>
      <circle cx="68" cy="30" r="22" fill="url(#${rid}g)"/><circle cx="68" cy="30" r="5.2" fill="#eaf8b8"/>
      <path d="M0 52 L14 40 L26 48 L40 30 L54 44 L68 34 L84 46 L100 38 V100 H0Z" fill="#1b5442" opacity=".85"/>
      <path d="M0 62 L18 50 L34 60 L52 44 L70 58 L86 50 L100 58 V100 H0Z" fill="#17493a"/>
      <path d="M0 74 C20 64 36 76 58 68 S88 62 100 68 V100 H0Z" fill="#0f3328"/>
      <path d="M58 100 C54 88 66 82 60 72 S50 64 58 56 S66 48 62 42" fill="none" stroke="${LIME}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M58 100 C54 88 66 82 60 72 S50 64 58 56 S66 48 62 42" fill="none" stroke="#f1ffc9" stroke-width=".35" stroke-linecap="round"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M-4 ${58 + i * 5.4} C22 ${52 + i * 5} 44 ${64 + i * 5} 70 ${58 + i * 5.2} S96 ${54 + i * 5.4} 104 ${58 + i * 5.4}" fill="none" stroke="#eaf8d9" stroke-opacity="${(0.34 - i * 0.03).toFixed(2)}" stroke-width=".28"/>`).join('')}
      <g stroke="#eaf8d9" stroke-opacity=".18" stroke-width=".25">${[20, 40, 60, 80].map((v) => `<line x1="${v}" y1="46" x2="${v}" y2="100"/>`).join('')}</g>
      <path d="M44 74 L58 70 L62 80 L48 84Z" fill="${LIME}" fill-opacity=".25" stroke="${LIME}" stroke-width=".4" stroke-dasharray="1.2 1"/>
      <g><circle cx="52" cy="77" r="3.4" fill="none" stroke="${LIME}" stroke-width=".5"/><circle cx="52" cy="77" r="1.2" fill="${LIME}"/><circle cx="26" cy="66" r="2.6" fill="none" stroke="#eaf8d9" stroke-width=".4"/><circle cx="26" cy="66" r=".9" fill="#eaf8d9"/><circle cx="79" cy="62" r="2.6" fill="none" stroke="#eaf8d9" stroke-width=".4"/><circle cx="79" cy="62" r=".9" fill="#eaf8d9"/></g>
      <g font-size="2.6" font-weight="650"><rect x="55" y="68.5" width="26" height="6" rx="3" fill="${LIME}"/><text x="58" y="72.6" fill="${INK}">Site 07 · Flood</text><rect x="8" y="58.5" width="26" height="6" rx="3" fill="#0c1713" fill-opacity=".7" stroke="#eaf8d9" stroke-opacity=".5" stroke-width=".25"/><text x="11" y="62.6" fill="#eaf8d9">Site 12 · Heat</text></g>
      <g fill="#eaf8d9" font-size="5" font-weight="700" letter-spacing="-.2"><text x="7" y="10">${esc(b.brand)}</text></g>
      <text x="93" y="9" font-size="2.4" fill="#eaf8d9" fill-opacity=".7" text-anchor="end" font-weight="600">Territory · layers</text>
    </svg><span class="ill ill--lt">Illustrative</span></div>`;
}

function identity(b) {
  const sw = [['Ink', INK, '#fff'], ['Warm white', WARM, INK], ['Forest', FOREST, '#fff'], ['Moss', MOSS, '#fff'], ['Mist', MIST, INK], ['Lime', LIME, INK]]
    .map(([n, hex, fg]) => `<li style="background:${hex};color:${fg}"><span>${n}</span><em>${hex.toUpperCase()}</em></li>`).join('');
  return `<div class="scr idb"><p class="idb__k">Brand identity</p>
      <div class="idb__logo">${mark}<b>${esc(b.brand)}</b></div>
      <p class="idb__aa">Aa</p><p class="idb__f">Inter Tight · 650</p>
      <svg class="idb__pat" viewBox="0 0 100 24" aria-hidden="true">${Array.from({ length: 5 }, (_, i) => `<path d="M-2 ${6 + i * 4} C20 ${i * 4 - 1} 36 ${12 + i * 4} 56 ${6 + i * 4} S88 ${i * 4 + 1} 102 ${6 + i * 4}" fill="none" stroke="${i === 2 ? MOSS : FOREST}" stroke-opacity="${i === 2 ? 1 : 0.35}" stroke-width=".5"/>`).join('')}</svg>
      <ul class="idb__sw">${sw}</ul>
      <span class="ill">Illustrative</span>
    </div>`;
}

// desktop (frame 100 x 45.5 cqw) and mobile (frame 100 x 125 cqw): collection [x, y, w, rotation] and website [x, y, w]
const DZ = { ov: 1, art: 1.5, sc: 0.7, sa: 1.2, id: 1.7 };
const items = (b, k) => [
  { id: 'ov', ar: 1.6, z: 3, a: [3, 5, 36, -2], b: [47, 8.5, 49], m: { a: [4, 6, 70, -2], b: [6, 72, 88] }, html: overview(b) },
  { id: 'art', ar: 1, z: 4, a: [41, 2.5, 19, 4], b: [6, 51.5, 36], m: { a: [56, 36, 38, 4], b: [6, 140, 88] }, html: territory(b, k) },
  { id: 'sc', ar: 1.6, z: 3, a: [63, 3.5, 33, 2], b: [53, 106, 41], m: null, html: scenarios(b) },
  { id: 'sa', ar: 1.6, z: 4, a: [26, 24, 31, -1.5], b: [6, 106, 41], m: null, html: analysis(b, k) },
  { id: 'id', ar: 1.6, z: 5, a: [62, 25.5, 31, 1.5], b: [28, 143, 44], m: { a: [8, 70, 62, 1.5], b: [6, 238, 88] }, html: identity(b) },
];

const itemHtml = (c) => {
  const m = c.m ? `;--max:${c.m.a[0]};--may:${c.m.a[1]};--maw:${c.m.a[2]};--mr0:${c.m.a[3]};--mbx:${c.m.b[0]};--mby:${c.m.b[1]};--mbw:${c.m.b[2]}` : '';
  return `<div class="bxi bxi--${c.id}${c.m ? '' : ' bxi--d'}" data-bxi style="--dz:${DZ[c.id]};--ar:${c.ar};--z:${c.z};--dax:${c.a[0]};--day:${c.a[1]};--daw:${c.a[2]};--dr0:${c.a[3]};--dbx:${c.b[0]};--dby:${c.b[1]};--dbw:${c.b[2]}${m}">${c.html}</div>`;
};

function frame(kind, b) {
  const live = kind === 'c';
  const rv = (t, tag = '') => `data-rv${tag ? '="' + tag + '"' : ''} data-t="${t}"`;
  return `<div class="bxf bxf--${kind}"${live ? ` data-bxf role="img" aria-label="${esc(`Concept: the product screens, territory imagery and identity of a fictional environmental-risk platform assemble into its website. ${b.headline.join(' ')}`)}"` : ' aria-hidden="true"'}>
      <span class="bxedge"></span>
      <div class="bxpage" data-bxpage>
        <div class="bxbg">
          <i class="bxsec bxs1"><u class="bxglow"></u><u class="bxrings"></u></i><i class="bxsec bxs2"></i><i class="bxsec bxs3"></i><i class="bxsec bxs4"></i>
        </div>
        <div class="bxtx">
          <nav class="bxnav" ${rv(0.46)}><span class="bxnav__logo">${mark}${esc(b.brand)}</span><span class="bxnav__links">${b.nav.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="bxnav__cta">${esc(b.navCta)}</span></nav>
          <h3 class="bxh">${b.headline.map((t, i) => `<span class="bxh__l" ${rv(0.48 + i * 0.03, 'line')}><b>${esc(t)}</b></span>`).join('')}</h3>
          <p class="bxsub" ${rv(0.53)}>${esc(b.sub)}</p>
          <div class="bxctas" ${rv(0.56)}><span class="bxcta">${esc(b.cta)}</span><span class="bxghost">${esc(b.ghost)}</span></div>
          <div class="bxat"><p class="bxk" ${rv(0.6)}>${esc(b.art.kicker)}</p><h4 class="bxh2" ${rv(0.6)}>${esc(b.art.title)}</h4><p class="bxp" ${rv(0.6)}>${esc(b.art.text)}</p><span class="bxlink" ${rv(0.6)}>${esc(b.art.link)} →</span></div>
          <h4 class="bxft" ${rv(0.6)}>${esc(b.features.title)}</h4>
          <p class="bxcap bxcap--1" ${rv(0.6)}>${esc(b.features.captions[0])}</p><p class="bxcap bxcap--2" ${rv(0.6)}>${esc(b.features.captions[1])}</p>
          <h4 class="bxit" ${rv(0.6)}>${esc(b.identity.title)}</h4><p class="bxip" ${rv(0.6)}>${esc(b.identity.text)}</p>
          <div class="bxfoot" ${rv(0.6)}><span class="bxnav__logo">${mark}${esc(b.brand)}</span><span>${b.footer.map((t) => `<em>${esc(t)}</em>`).join('')}</span></div>
        </div>
        ${items(b, kind).map(itemHtml).join('')}
      </div>
    </div>`;
}

export function bridgeSection(b) {
  // brace: drawn in JS at pixel size (so strokes stay uniform); this static fallback is the same shape
  const brace = `<svg class="bxbrace bxdraw" data-brace viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 0L2 36C2 62 16 78 42 78L420 78C480 78 500 88 500 100"/><path pathLength="1" d="M998 0L998 36C998 62 984 78 958 78L580 78C520 78 500 88 500 100"/><circle class="bxdot" r="4" cx="2" cy="0"/><circle class="bxdot" r="4" cx="998" cy="0"/></svg>`;
  const thread = (n) => `<svg class="bxl bxl--${n} bxdraw" data-thread="${n}" viewBox="0 0 120 160" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M60 0V160"/><circle class="bxdot" r="4" cx="60" cy="0"/></svg>`;
  return `<section class="bx" data-bx aria-label="From product design to visual design">
    <div class="bxfx" aria-hidden="true"><i class="bxfx__a"></i><i class="bxfx__b"></i><i class="bxfx__c"></i></div>
    <div class="bxa wrap">
      ${brace}
      ${thread(1)}
      <p class="bxp1" data-bxrv><b>${esc(b.text[0])}</b></p>
      ${thread(2)}
    </div>
    <div class="bxb" data-bxb>
      <div class="bxstage">
        <p class="bxt2" data-bxrv><b>${esc(b.text[1])}</b></p>
        ${frame('c', b)}
        ${frame('w', b)}
      </div>
    </div>
  </section>`;
}
