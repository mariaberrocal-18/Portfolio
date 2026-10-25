// Narrative bridge between Product Design and Visual Design (follows María's sketch):
//   brace + green thread → "Every product has a purpose." → "And a story to tell." + a collection of materials
//   → the same materials build a website (pinned, scroll-driven) → Visual Design.
// Resona is a FICTIONAL product used only as a demonstration. It is not a project.
// Materials: 3 product screens, an identity board, an art-direction piece. Replace with final assets if wanted.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// deterministic "audio" so the waveform is stable between builds
const bars = (n) => Array.from({ length: n }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.55) * 0.55 + Math.sin(i * 1.9 + 1.3) * 0.3 + Math.sin(i * 0.17) * 0.25);
  return Math.max(0.16, Math.min(1, 0.22 + v * 0.7));
});
const wave = (n, played, cls = '') =>
  `<span class="bwave ${cls}">${bars(n).map((h, i) => `<i class="${i / n < played ? 'on' : ''}" style="--h:${h.toFixed(2)};--d:${(i * 37) % 900}ms"></i>`).join('')}</span>`;
const cover = (n, cls = '') => `<span class="cv cv--${n}${cls ? ' ' + cls : ''}"><i></i></span>`;

// ----- the five materials -------------------------------------------------------------------------------------
function library(b) {
  const albums = b.albums.slice(0, 8).map(([t, a], i) => `<div class="bps__al${i === 0 ? ' sel' : ''}">${cover(i + 1)}<p>${esc(t)}</p><span>${esc(a)}</span></div>`).join('');
  const pl = ['Late focus', 'Rainy day', 'Road trip'].map((t, i) => `<li>${cover(i + 3, 'mini')}${esc(t)}</li>`).join('');
  return `<div class="scr bps"><div class="bps__body">
      <aside class="bps__side"><p class="bps__brand"><u></u><u></u><u></u>${esc(b.brand)}</p><ul class="bps__nav"><li>Home</li><li>Search</li><li class="on">Library</li></ul><p class="bps__h">Playlists</p><ul class="bps__pl">${pl}</ul></aside>
      <header class="bps__top"><h5>Your library</h5><div class="bps__chips"><span class="on">Albums</span><span>Artists</span><span>Playlists</span></div></header>
      <div class="bps__grid">${albums}</div>
      <aside class="bps__np"><span class="bps__cslot">${cover(1)}</span><p class="t">${esc(b.albums[0][0])}</p><p class="a">${esc(b.albums[0][1])}</p><div class="bps__act"><i></i><i></i><i></i></div></aside>
      <div class="bps__bar"><span class="ctl"><i></i><i class="play"></i><i></i></span><em>1:24</em>${wave(46, 0.42, 'bps__wave')}<em class="r">3:48</em><span class="vol"><i></i></span></div>
    </div></div>`;
}

function player(b) {
  return `<div class="scr pl"><span class="pl__glow"></span>
      <p class="pl__k">Now playing</p><span class="pl__dots"><i></i><i></i><i></i></span>
      <div class="pl__cover">${cover(1)}</div>
      <div class="pl__meta"><h5>${esc(b.albums[0][0])}</h5><p>${esc(b.albums[0][1])} · Single</p><div class="pl__act"><i></i><i></i><i></i></div></div>
      ${wave(54, 0.38, 'pl__wave')}
      <div class="pl__time"><em>1:24</em><em>3:48</em></div>
      <div class="pl__ctl"><i></i><i></i><i class="play"></i><i></i><i></i></div>
    </div>`;
}

function discover(b) {
  const row = b.albums.slice(1, 5).map(([t, a], i) => `<div class="dc__al">${cover(i + 2)}<p>${esc(t)}</p><span>${esc(a)}</span></div>`).join('');
  return `<div class="scr dc">
      <h5 class="dc__t">Discover</h5><span class="dc__s"></span>
      <div class="dc__chips"><span class="on">For you</span><span>New</span><span>Charts</span><span>Moods</span></div>
      <p class="dc__h">New this week</p>
      <div class="dc__row">${row}</div>
    </div>`;
}

function identity(b) {
  const sw = [['Indigo', '#17112E', '#17112e', '#fff'], ['Coral', '#FF5D4A', '#ff5d4a', '#fff'], ['Lime', '#D6F55A', '#d6f55a', '#17112e'], ['Lilac', '#B9A7FF', '#b9a7ff', '#17112e'], ['Amber', '#FFB347', '#ffb347', '#17112e']]
    .map(([n, hex, bg, fg]) => `<li style="background:${bg};color:${fg}"><span>${n}</span><em>${hex}</em></li>`).join('');
  return `<div class="scr idb"><p class="idb__k">Brand identity</p>
      <div class="idb__logo"><span class="idb__bars"><u></u><u></u><u></u></span><b>${esc(b.brand)}</b></div>
      <p class="idb__aa">Aa</p><p class="idb__f">Inter Tight · 650</p>
      <ul class="idb__sw">${sw}</ul>
    </div>`;
}

function art(b) {
  return `<div class="scr art"><span class="art__rings"></span><span class="art__sun"></span>
      <p class="art__l">${esc(b.brand)}</p><p class="art__r">High fidelity<br>24-bit</p>
      ${wave(40, 0.5, 'art__wave')}
      <span class="art__badge"><b>Lossless</b><small>every sound</small></span>
    </div>`;
}

// desktop (frame 100 x 45.5 cqw) and mobile (frame 100 x 125 cqw): collection position [x, y, w, rotation] and website position [x, y, w]
const items = (b) => [
  { id: 'lib', ar: 1.6, z: 3, a: [3, 5, 36, -2], b: [47, 8.5, 49], m: { a: [4, 6, 70, -2], b: [6, 72, 88] }, html: library(b) },
  { id: 'art', ar: 1, z: 4, a: [41, 2.5, 19, 4], b: [6, 51.5, 36], m: { a: [56, 36, 38, 4], b: [6, 140, 88] }, html: art(b) },
  { id: 'dc', ar: 1.6, z: 3, a: [63, 3.5, 33, 2], b: [53, 106, 41], m: null, html: discover(b) },
  { id: 'pl', ar: 1.6, z: 4, a: [26, 24, 31, -1.5], b: [6, 106, 41], m: null, html: player(b) },
  { id: 'id', ar: 1.6, z: 5, a: [62, 25.5, 31, 1.5], b: [28, 143, 44], m: { a: [8, 70, 62, 1.5], b: [6, 238, 88] }, html: identity(b) },
];

const itemHtml = (c) => {
  const m = c.m ? `;--max:${c.m.a[0]};--may:${c.m.a[1]};--maw:${c.m.a[2]};--mr0:${c.m.a[3]};--mbx:${c.m.b[0]};--mby:${c.m.b[1]};--mbw:${c.m.b[2]}` : '';
  return `<div class="bxi bxi--${c.id}${c.m ? '' : ' bxi--d'}" data-bxi style="--ar:${c.ar};--z:${c.z};--dax:${c.a[0]};--day:${c.a[1]};--daw:${c.a[2]};--dr0:${c.a[3]};--dbx:${c.b[0]};--dby:${c.b[1]};--dbw:${c.b[2]}${m}">${c.html}</div>`;
};

function frame(kind, b) {
  const live = kind === 'c';
  const rv = (t, tag = '') => `data-rv${tag ? '="' + tag + '"' : ''} data-t="${t}"`;
  return `<div class="bxf bxf--${kind}"${live ? ` data-bxf role="img" aria-label="${esc(`Concept: the product screens, identity and art direction of a fictional music app assemble into its website. ${b.headline.join(' ')}`)}"` : ' aria-hidden="true"'}>
      <span class="bxedge"></span>
      <div class="bxpage" data-bxpage>
        <div class="bxbg">
          <i class="bxsec bxs1"><u class="bxglow"></u><u class="bxrings"></u></i><i class="bxsec bxs2"></i><i class="bxsec bxs3"></i><i class="bxsec bxs4"></i>
        </div>
        <div class="bxtx">
          <nav class="bxnav" ${rv(0.46)}><span class="bxnav__logo"><u></u><u></u><u></u>${esc(b.brand)}</span><span class="bxnav__links">${b.nav.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="bxnav__cta">${esc(b.navCta)}</span></nav>
          <h3 class="bxh">${b.headline.map((t, i) => `<span class="bxh__l" ${rv(0.48 + i * 0.03, 'line')}><b>${esc(t)}</b></span>`).join('')}</h3>
          <p class="bxsub" ${rv(0.53)}>${esc(b.sub)}</p>
          <div class="bxctas" ${rv(0.56)}><span class="bxcta">${esc(b.cta)}</span><span class="bxghost">${esc(b.ghost)}</span></div>
          <div class="bxat"><p class="bxk" ${rv(0.6)}>${esc(b.art.kicker)}</p><h4 class="bxh2" ${rv(0.6)}>${esc(b.art.title)}</h4><p class="bxp" ${rv(0.6)}>${esc(b.art.text)}</p><span class="bxlink" ${rv(0.6)}>${esc(b.art.link)} →</span></div>
          <h4 class="bxft" ${rv(0.6)}>${esc(b.features.title)}</h4>
          <p class="bxcap bxcap--1" ${rv(0.6)}>${esc(b.features.captions[0])}</p><p class="bxcap bxcap--2" ${rv(0.6)}>${esc(b.features.captions[1])}</p>
          <h4 class="bxit" ${rv(0.6)}>${esc(b.identity.title)}</h4><p class="bxip" ${rv(0.6)}>${esc(b.identity.text)}</p>
          <div class="bxfoot" ${rv(0.6)}><span class="bxnav__logo"><u></u><u></u><u></u>${esc(b.brand)}</span><span>${b.footer.map((t) => `<em>${esc(t)}</em>`).join('')}</span></div>
        </div>
        ${items(b).map(itemHtml).join('')}
      </div>
    </div>`;
}

export function bridgeSection(b) {
  // brace: drawn in JS at pixel size (so strokes stay uniform); this static fallback is the same shape
  const brace = `<svg class="bxbrace bxdraw" data-brace viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 0C2 58 32 90 130 94L430 100C478 102 500 108 500 120"/><path pathLength="1" d="M998 0C998 58 968 90 870 94L570 100C522 102 500 108 500 120"/></svg>`;
  return `<section class="bx" data-bx aria-label="From product design to visual design">
    <div class="bxa wrap">
      ${brace}
      <i class="bxl bxl--1 bxdraw" aria-hidden="true"></i>
      <p class="bxp1" data-bxrv><b>${esc(b.text[0])}</b></p>
      <i class="bxl bxl--2 bxdraw" aria-hidden="true"></i>
    </div>
    <div class="bxb" data-bxb>
      <div class="bxstage">
        <p class="bxt2"><b>${esc(b.text[1])}</b></p>
        ${frame('c', b)}
        ${frame('w', b)}
      </div>
    </div>
  </section>`;
}
