// Shared page structure for the Web & Visual Design case studies (see visualcases.mjs for the data).
// Seven sections: Opening · The original project · Reimagined with AI · The new visual direction ·
// Bringing it to life · Behind the exploration · Closing.
// Every slot that has no verified content renders a clearly labelled "Pending" box. Nothing is invented.
import { scene, evolution, webHero, webSection, phone, motion, poster, social, report, typeSpecimen, palette, layerKit } from './wpart.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const arrow = `<svg class="ico" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 13.5l9-9M6 4.5h7.5V12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const pend = (label, ar = '16 / 10', kind = 'Pending') =>
  `<div class="vc-pend" style="--ar:${ar}" role="img" aria-label="${esc(kind)}: ${esc(label)}"><span class="vc-pend__k">${esc(kind)}</span><span class="vc-pend__t">${esc(label)}</span></div>`;
const pendText = (label) => `<p class="vc-pendtext"><b>Pending</b> ${esc(label)}</p>`;
const tag = (t, cls = '') => `<span class="vc-chip${cls ? ' ' + cls : ''}">${esc(t)}</span>`;
const rv = 'data-reveal';

const frame = (inner, label, kind, ar = '16 / 9', extra = '') =>
  `<figure class="vc-fig ${extra}" ${rv}><div class="vc-fig__m" style="--ar:${ar}">${inner}</div><figcaption>${tag(kind, kind === 'Original design' ? 'is-orig' : kind === 'New exploration' ? 'is-new' : 'is-re')}<span>${esc(label)}</span></figcaption></figure>`;

export function vcasePage(c, next, p = '../') {
  const t = c.theme || {};
  const style = Object.entries({ '--vt-dark': t.dark, '--vt-tide': t.tide, '--vt-clear': t.clear, '--vt-tint': t.tint, '--vt-accent': t.accent, '--vt-accent-ink': t.accentInk }).filter(([, v]) => v).map(([k, v]) => `${k}:${v}`).join(';');
  return c.pilot ? pilot(c, next, p, style) : skeleton(c, next, p);
}

// ---------------------------------------------------------------------------------------------------------------
const BADGES = ['Independent exploration', 'Web design', 'AI visual design'];
function opening(c, phrase) {
  const meta = [['Shipped', c.shipped], ['Project duration', c.duration]]
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v ? esc(v) : '<em class="vc-pendinline">Pending</em>'}</dd></div>`).join('');
  return `<header class="vc-open wrap">
    <div class="vc-open__top">
      <a class="vc-back" href="../index.html#visual"><svg class="ico" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M14 9H4m4.5-4.5L4 9l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Web &amp; Visual Design</span></a>
    </div>
    <div class="vc-open__grid">
    <div class="vc-open__stack">
      <h1 class="vc-open__phrase">${phrase}</h1>
      <div class="vc-open__who"><p class="vc-open__name">${esc(c.name)}</p><ul class="tags" aria-label="Project type">${BADGES.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <p class="vc-open__desc">This is an independent exploration of what was actually shipped. As tools and AI evolve, my approach to this kind of project has changed, so here is what I would do today instead of what I did.</p>
      <dl class="vc-open__facts">${meta}</dl>
    </div>
    <figure class="vc-fig vc-open__fig" ${rv}><div class="vc-fig__m" style="--ar:4 / 3">${pend('Visual of the reimagined concept', '4 / 3', 'Pending asset')}</div><figcaption>${tag('Reimagined concept', 'is-re')}</figcaption></figure>
    </div>
  </header>`;
}

function sectionHead(n, title, kind, lede = '') {
  return `<div class="vc-sh" ${rv}><h2 class="vc-sh__t">${esc(title)}</h2>${kind ? `<div class="vc-sh__k">${tag(kind, kind === 'Original project' ? 'is-orig' : kind === 'Exploration process' ? 'is-proc' : 'is-re')}</div>` : ''}${lede ? `<p class="vc-sh__l">${esc(lede)}</p>` : ''}</div>`;
}

function nextCard(next, p) {
  return `<a class="vc-next" href="${next.slug}.html"><p class="vc-next__k">Next project</p><p class="vc-next__n">${esc(next.name)}${arrow}</p><ul class="tags">${next.tags.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></a>`;
}

// ---------------------------------------------------------------------------------------------------------------
function pilot(c, next, p, style) {
  const w = c.life.web, o = c.original, r = c.reimagined, d = c.direction, pr = c.process;
  const s2 = `<section class="vc-s vc-s--orig wrap" id="original" aria-labelledby="h-orig">
    ${sectionHead('01', 'The original project')}
    <div class="vc-orig__grid">
      <div class="vc-orig__t" ${rv}><h3>The brand and its audience</h3><p>${esc(o.about)}</p><p>${esc(o.audience)}</p></div>
      <div class="vc-orig__t" ${rv}><h3>Needs and constraints</h3>${Array.isArray(o.needs) ? `<ul class="vc-bullets">${o.needs.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : o.needs ? `<p>${esc(o.needs)}</p>` : pendText('The needs and constraints that defined the original work.')}</div>
    </div>
    <div class="vc-orig__m">${o.materials.map((m, i) => `<figure class="vc-fig vc-fig--o vc-fig--o-${m.key}" ${rv}><div class="vc-fig__m" style="--ar:${m.ar}">${m.src ? `<img src="../${m.src}" alt="${esc(m.alt || m.label)}" loading="lazy" decoding="async">` : pend(m.label, m.ar, 'Pending asset')}</div><figcaption>${tag('Original design', 'is-orig')}<span>${esc(m.label)}</span></figcaption></figure>`).join('')}</div>
    ${o.sourceNote ? `<p class="vc-source">${esc(o.sourceNote)}</p>` : ''}
  </section>`;

  const ba = r.q1.shifts.map((x) => {
    const m = o.materials.find((q) => q.key === x.before);
    const before = m && m.src ? `<img src="../${m.src}" alt="${esc(m.alt || x.today)}" loading="lazy" decoding="async">` : pend(x.today, '16 / 10', 'Pending asset');
    return `<article class="vc-ba__row" ${rv}>
      <figure class="vc-ba__side vc-ba__side--a"><div class="vc-ba__m">${before}</div><figcaption>${tag('Today', 'is-orig')}<p>${esc(x.today)}</p></figcaption></figure>
      <i class="vc-ba__arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12h14m-5-5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></i>
      <figure class="vc-ba__side vc-ba__side--b"><div class="vc-ba__m">${scene({ id: 'ba' + x.before, layers: x.after, label: false })}</div><figcaption>${tag('What I would change', 'is-re')}<p>${esc(x.change)}</p></figcaption></figure>
      <p class="vc-ba__why"><b>Why</b>${esc(x.why)}</p>
    </article>`;
  }).join('') + `<article class="vc-ba__row vc-ba__row--kept" ${rv}><p class="vc-ba__kept">${tag('Kept', 'is-orig')}<em class="vc-pendinline on-dark">Pending: what carries over from the original, and why</em></p></article>`;
  const _evo = evolution.map((e, i) => `<li ${rv}><div class="vc-evo__m">${scene({ id: 'e' + i, layers: e.layers, split: e.split, label: false })}<span>${i + 1}</span></div><h4>${esc(e.title)}</h4><p>${esc(e.text)}</p></li>`).join('');
  const pairs = r.q3.pairs.map((x, i) => {
    const art = { hero: `<div class="vc-b vc-b--hero">${webHero(w)}</div>`, section: `<div class="vc-b vc-b--sec">${webSection(w)}</div>`, motion: `<div class="vc-b vc-b--mo">${motion(w)}</div>` }[x.reimagined];
    const ar = x.reimagined === 'section' ? '16 / 9' : x.reimagined === 'motion' ? '16 / 8.4' : '16 / 9';
    return `<div class="vc-pair vc-pair--${x.kind}" ${rv}>
      ${x.kind === 'pair' ? `<figure class="vc-fig vc-pair__o"><div class="vc-fig__m" style="--ar:${ar}">${(() => { const m = o.materials.find((q) => q.key === x.originalKey); return m && m.src ? `<img src="../${m.src}" alt="${esc(m.alt || x.original)}" loading="lazy" decoding="async">` : pend(x.original, ar, 'Pending asset'); })()}</div><figcaption>${tag('Original design', 'is-orig')}<span>${esc(x.original)}</span></figcaption></figure>` : ''}
      <figure class="vc-fig vc-pair__r"><div class="vc-fig__m" style="--ar:${ar}">${art}</div><figcaption>${tag(x.kind === 'new' ? 'New exploration' : 'Reimagined concept', x.kind === 'new' ? 'is-new' : 'is-re')}<span>${esc(x.caption)}</span></figcaption></figure>
    </div>`;
  }).join('');

  const s3 = `<section class="vc-s vc-s--re" id="reimagined" aria-labelledby="h-re">
    <div class="vc-re__intro wrap">
      <p class="vc-re__k" ${rv}>${tag('Reimagined concept', 'is-re on-dark')}</p>
      <h2 class="vc-re__t" id="h-re" ${rv}>Reimagined<br>with AI</h2>
      <p class="vc-re__l" ${rv}>${esc(r.intro)}</p>
    </div>
    <div class="vc-re__q wrap">
      <div class="vc-q" ${rv}><p class="vc-q__n">1</p><div><h3>${esc(r.q1.title)}</h3><p>${esc(r.q1.text)}</p></div></div>
      <div class="vc-ba">${ba}</div>
    </div>
    <div class="vc-re__q wrap">
      <div class="vc-q" ${rv}><p class="vc-q__n">2</p><div><h3>${esc(r.q3.title)}</h3><p>${esc(r.q3.text)}</p></div></div>
      <div class="vc-pairs">${pairs}</div>
    </div>
  </section>`;

  const pal = palette.map(([n, hex, use, share, fg]) => `<li style="--s:${share};background:${hex};color:${fg}"><b>${n}</b><em>${hex}</em><span>${esc(use)}</span></li>`).join('');
  const s4 = `<section class="vc-s vc-s--dir" id="direction" aria-labelledby="h-dir">
    <div class="wrap">
      ${sectionHead('03', 'The new visual direction', 'Reimagined concept', d.intro)}
      <div class="vc-dir">
        <article class="vc-d vc-d--type" ${rv}><h3>Typography and hierarchy</h3>${typeSpecimen(w.type ? w : { ...w, type: d.type })}<ul class="vc-notes">${d.typeNotes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></article>
        <article class="vc-d vc-d--pal" ${rv}><h3>Palette and use of colour</h3><div class="vc-bar" aria-hidden="true">${palette.map(([n, hex, , share]) => `<i style="flex:${share};background:${hex}"></i>`).join('')}</div><ul class="vc-pal">${pal}</ul><p class="vc-note">${esc(d.paletteNotes)}</p></article>
        <article class="vc-d vc-d--img" ${rv}><h3>Image direction</h3><div class="vc-d__img">${scene({ id: 'di', layers: ['contours'], label: false })}</div><ul class="vc-notes">${d.imageryNotes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></article>
        <article class="vc-d vc-d--comp" ${rv}><h3>Composition and graphic resources</h3>${layerKit()}<ul class="vc-notes">${d.compositionNotes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></article>
        <article class="vc-d vc-d--mo" ${rv}><h3>Interaction and motion principles</h3><ol class="vc-mo">${d.motionNotes.map((n, i) => `<li><b>${i + 1}</b>${esc(n)}</li>`).join('')}</ol></article>
      </div>
    </div>
  </section>`;

  const s5 = `<section class="vc-s vc-s--life wrap" id="life" aria-labelledby="h-life">
    ${sectionHead('04', 'Bringing it to life', 'Reimagined concept')}
    ${frame(`<div class="vc-b vc-b--hero">${webHero(w)}</div>`, 'Website · hero', 'Reimagined concept', '16 / 9', 'vc-fig--full')}
    <div class="vc-life__duo">
      ${frame(`<div class="vc-b vc-b--phone">${phone(w)}</div>`, 'Mobile adaptation', 'Reimagined concept', '9 / 14', 'vc-fig--phone')}
      <div class="vc-life__side">
        <p class="vc-note vc-note--l" ${rv}>${esc(c.life.mobileNote)}</p>
        ${frame(`<div class="vc-b vc-b--sec">${webSection(w)}</div>`, 'Website · key section: comparing scenarios', 'Reimagined concept', '16 / 9')}
      </div>
    </div>
    <div class="vc-life__mo">
      <p class="vc-note vc-note--l" ${rv}>${esc(c.life.motionNote)}</p>
      ${frame(`<div class="vc-b vc-b--mo">${motion(w)}</div>`, 'Motion sequence · scenario A to B', 'New exploration', '16 / 8.4', 'vc-fig--full')}
    </div>
    <div class="vc-life__comms">
      <p class="vc-note vc-note--l" ${rv}>${esc(c.life.commsNote)}</p>
      <div class="vc-comms">
        ${frame(`<div class="vc-b vc-b--q">${poster(w)}</div>`, 'Poster', 'New exploration', '3 / 4', 'vc-c1')}
        ${frame(`<div class="vc-b vc-b--q">${social(w)}</div>`, 'Social post', 'New exploration', '1 / 1', 'vc-c2')}
        ${frame(`<div class="vc-b vc-b--q">${report(w)}</div>`, 'Report cover', 'New exploration', '3 / 4', 'vc-c3')}
      </div>
    </div>
  </section>`;

  const s7 = `<section class="vc-s vc-s--close" aria-labelledby="h-close">
    <div class="vc-close__img" ${rv}>${scene({ id: 'cl', layers: ['contours', 'signals', 'relations', 'scenario', 'priorities'], split: true, label: false })}<i></i></div>
    <div class="wrap vc-close__in">
      <div class="vc-close__t" ${rv}><p class="vc-close__k">${tag('Independent exploration', 'is-ind on-dark')}</p><h2 id="h-close">${esc(c.closing.reflection)}</h2></div>
      <div ${rv}>${nextCard(next, p)}</div>
    </div>
  </section>`;

  return `<main class="vc" style="${style}">
  <article>
    ${opening(c, esc(c.phrase))}
    <nav class="vc-toc" aria-label="On this page" data-toc><div class="vc-toc__in"><a href="#original">Original project</a><a href="#reimagined">Reimagined with AI</a><a href="#direction">Visual direction</a><a href="#life">Bringing it to life</a></div></nav>
    ${s2}${s3}${s4}${s5}${s7}
  </article>
</main>`;
}

// ---------------------------------------------------------------------------------------------------------------
// Template for projects whose content is not defined yet: the same seven sections, every slot marked pending.
function skeleton(c, next, p) {
  const P = (label, ar = '16 / 10', kind = 'Pending asset') => `<div class="vc-fig__m" style="--ar:${ar}">${pend(label, ar, kind)}</div>`;
  const q = (n, title) => `<div class="vc-q" ${rv}><p class="vc-q__n">${n}</p><div><h3>${title}</h3>${pendText('Written once the project is defined.').replace('<p class="vc-pendtext">', '<p class="vc-pendtext on-dark">')}</div></div>`;
  return `<main class="vc">
  <article>
    ${opening(c, `<span class="vc-pendinline">Pending · one sentence that sums up the new vision</span>`)}
    <nav class="vc-toc" aria-label="On this page" data-toc><div class="vc-toc__in"><a href="#original">Original project</a><a href="#reimagined">Reimagined with AI</a><a href="#direction">Visual direction</a><a href="#life">Bringing it to life</a></div></nav>
    <section class="vc-s vc-s--orig wrap" id="original" aria-labelledby="h-orig">
      ${sectionHead('01', 'The original project')}
      <div class="vc-orig__grid">
        <div class="vc-orig__t"><h3>The brand and its audience</h3>${pendText('What the brand or product is and who it is for.')}</div>
        <div class="vc-orig__t"><h3>Needs and constraints</h3>${pendText('What shaped the original work.')}</div>
      </div>
      <div class="vc-orig__m">${['16 / 9', '4 / 5', '1 / 1'].map((ar, i) => `<figure class="vc-fig vc-fig--o${i}"><div class="vc-fig__m" style="--ar:${ar}">${pend('Original material', ar, 'Pending asset')}</div><figcaption>${tag('Original design', 'is-orig')}<span>Pending</span></figcaption></figure>`).join('')}</div>
    </section>
    <section class="vc-s vc-s--re" id="reimagined" aria-labelledby="h-re">
      <div class="vc-re__intro wrap"><p class="vc-re__k">${tag('Reimagined concept', 'is-re on-dark')}</p><h2 class="vc-re__t" id="h-re">Reimagined<br>with AI</h2></div>
      <div class="vc-re__q wrap">${q(1, 'What would I rethink today?')}</div>
      <div class="vc-re__q wrap">${q(2, 'What does that become?')}<div class="vc-pairs"><div class="vc-pair vc-pair--pair"><figure class="vc-fig"><div class="vc-fig__m" style="--ar:16 / 9">${pend('Original design', '16 / 9')}</div><figcaption>${tag('Original design', 'is-orig')}</figcaption></figure><figure class="vc-fig"><div class="vc-fig__m" style="--ar:16 / 9">${pend('Reimagined concept', '16 / 9')}</div><figcaption>${tag('Reimagined concept', 'is-re')}</figcaption></figure></div></div></div>
    </section>
    <section class="vc-s vc-s--dir" id="direction" aria-labelledby="h-dir"><div class="wrap">${sectionHead('03', 'The new visual direction', 'Reimagined concept')}<div class="vc-dir vc-dir--p">${['Typography and hierarchy', 'Palette and use of colour', 'Image direction', 'Composition and graphic resources', 'Interaction and motion principles'].map((t) => `<article class="vc-d"><h3>${t}</h3>${P('Applied example with short annotations', '16 / 10')}</article>`).join('')}</div></div></section>
    <section class="vc-s vc-s--life wrap" id="life" aria-labelledby="h-life">${sectionHead('04', 'Bringing it to life', 'Reimagined concept')}
      <div class="vc-life__skel">${['Website · hero and key sections', 'Mobile adaptation', 'Motion or interaction', 'Communication piece'].map((t, i) => `<figure class="vc-fig"><div class="vc-fig__m" style="--ar:${i === 1 ? '9 / 14' : '16 / 10'}">${pend(t, i === 1 ? '9 / 14' : '16 / 10')}</div><figcaption>${tag('Reimagined concept', 'is-re')}<span>${t}</span></figcaption></figure>`).join('')}</div></section>
    <section class="vc-s vc-s--close" aria-labelledby="h-close"><div class="wrap vc-close__in vc-close__in--p"><div class="vc-close__t"><p class="vc-close__k">${tag('Independent exploration', 'is-ind on-dark')}</p><h2 id="h-close"><span class="vc-pendinline">Pending · a short reflection on the exploration</span></h2></div><div>${nextCard(next, p)}</div></div></section>
  </article>
</main>`;
}
