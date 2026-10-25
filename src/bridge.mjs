// Bridge between Product Design and Visual Design: a fictional audio product ("Resona") whose interface
// becomes the hero of its own landing page. Purely a transition piece: nothing here is a project.
// The same two objects travel through the whole move: the album cover and the waveform.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// deterministic "audio" so the waveform is stable between builds
const bars = (n) => Array.from({ length: n }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.55) * 0.55 + Math.sin(i * 1.9 + 1.3) * 0.3 + Math.sin(i * 0.17) * 0.25);
  return Math.max(0.16, Math.min(1, 0.22 + v * 0.7));
});

const waveform = (n = 72, played = 0.42) =>
  `<span class="bwave" data-bwave>${bars(n).map((h, i) => `<i class="${i / n < played ? 'on' : ''}" style="--h:${h.toFixed(2)};--d:${(i * 37) % 900}ms"></i>`).join('')}</span>`;

const cover = (n, cls = '') => `<span class="cv cv--${n}${cls ? ' ' + cls : ''}"><i></i></span>`;

export function bridgeScene(b) {
  const albums = b.albums
    .map(([t, a], i) => `<div class="bps__al">${cover(i + 1)}<p>${esc(t)}</p><span>${esc(a)}</span></div>`)
    .join('');
  const playlists = ['Late focus', 'Rainy day', 'Road trip'].map((t, i) => `<li>${cover(i + 3, 'mini')}${esc(t)}</li>`).join('');
  const alt = `Concept: a music app interface that becomes the hero of its landing page. ${b.headline.join(' ')}`;
  return `<div class="bxf" data-bxf role="img" aria-label="${esc(alt)}">
      <span class="bxedge"></span>
      <div class="bxw">
        <div class="bxsite">
          <div class="bxrings"></div>
          <nav class="bxnav"><span class="bxnav__logo"><u></u><u></u><u></u>${esc(b.brand)}</span><span class="bxnav__links">${b.nav.map((t) => `<em>${esc(t)}</em>`).join('')}</span><span class="bxnav__cta">${esc(b.navCta)}</span></nav>
          <h3 class="bxh">${b.headline.map((t) => `<span><b>${esc(t)}</b></span>`).join('')}</h3>
          <p class="bxsub">${esc(b.sub)}</p>
          <div class="bxctas"><span class="bxcta">${esc(b.cta)}</span><span class="bxghost">${esc(b.ghost)}</span></div>
          <span class="bxbadge"><b>Lossless</b><small>24-bit audio</small></span>
        </div>
        <div class="bps" data-bps>
          <div class="bps__body">
            <aside class="bps__side"><p class="bps__brand"><u></u><u></u><u></u>${esc(b.brand)}</p><ul class="bps__nav"><li>Home</li><li>Search</li><li class="on">Library</li></ul><p class="bps__h">Playlists</p><ul class="bps__pl">${playlists}</ul></aside>
            <header class="bps__top"><h5>Your library</h5><div class="bps__chips"><span class="on">Albums</span><span>Artists</span><span>Playlists</span></div></header>
            <div class="bps__grid">${albums}</div>
            <aside class="bps__np"><span class="bps__cslot"></span><p class="t">${esc(b.albums[0][0])}</p><p class="a">${esc(b.albums[0][1])}</p><div class="bps__act"><i></i><i></i><i></i></div></aside>
            <div class="bps__bar"><span class="ctl"><i></i><i class="play"></i><i></i></span><em>1:24</em><span class="wslot"></span><em class="r">3:48</em><span class="vol"><i></i></span></div>
          </div>
        </div>
        <div class="bxex bxex--1">${cover(2)}</div>
        <div class="bxex bxex--2">${cover(5)}</div>
        <div class="bcover" data-bcover>${cover(1)}</div>
        <div class="bwavewrap" data-bwavewrap>${waveform()}</div>
      </div>
    </div>`;
}
