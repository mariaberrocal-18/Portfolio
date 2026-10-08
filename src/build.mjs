// Static site generator: `node src/build.mjs` writes index.html and work/*.html.
// No dependencies. Copy lives in content.mjs, drawings in visuals.mjs.
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, hero, journey, toolkit, about, contact, projects } from './content.mjs';
import { render, ratio, ttEvolve } from './visuals.mjs';
import { mini } from './mini.mjs';
import { marks } from './logos.mjs';
import { existsSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// cache-busting: asset URLs change whenever their content does
const hash = (f) => createHash('md5').update(readFileSync(join(root, f))).digest('hex').slice(0, 8);
const V = { css: hash('assets/css/site.css'), js: hash('assets/js/site.js') };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const arrow = `<svg class="ico" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 13.5l9-9M6 4.5h7.5V12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const back = `<svg class="ico" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M14 9H4m4.5-4.5L4 9l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// logos: an official file in assets/logos/<slug>.svg|png wins; otherwise a brand mark, otherwise a monogram
const logoFile = (slug) => ['svg', 'png', 'webp'].map((e) => `assets/logos/${slug}.${e}`).find((f) => existsSync(join(root, f)));
const toolMark = (name, slug) => {
  const f = logoFile(slug);
  if (f) return `<img class="mark" src="${f}" alt="" width="20" height="20" loading="lazy">`;
  if (marks[slug]) return `<svg class="mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="${marks[slug]}"/></svg>`;
  return `<span class="mark mark--mono" aria-hidden="true">${esc(name[0])}</span>`;
};
const orgLogo = (slug, org, p = '') => {
  const f = logoFile(slug);
  if (f) return `<img class="org-logo org-logo--${slug}" src="${p}${f}" alt="${esc(org)} logo" loading="lazy">`;
  return `<span class="org-logo org-logo--text org-logo--${slug}" aria-label="${esc(org)}">${slug === 'ey' ? 'EY' : slug === 'ey-design-studio' ? 'EY <i>Design Studio</i>' : 'waterplan'}</span>`;
};
const lessonIcons = [
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/></svg>`,
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>`,
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/></svg>`,
];
const label = (t) => `<span class="roll" data-text="${esc(t)}"><span>${esc(t)}</span></span>`;

function head({ title, desc, p, noindex, path = '' }) {
  const abs = (f) => (site.url ? `${site.url}/${f}` : `${p}${f}`);
  const pageUrl = site.url ? `${site.url}/${path}` : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#fefefe">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="preload" href="${p}assets/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${pageUrl ? `<link rel="canonical" href="${pageUrl}">\n` : ''}<link rel="icon" href="${p}assets/brand/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="${p}assets/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="${p}assets/brand/icon-512.png">
<link rel="apple-touch-icon" href="${p}assets/brand/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${pageUrl ? `<meta property="og:url" content="${pageUrl}">\n` : ''}<meta property="og:image" content="${abs('assets/brand/og.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)}, Product Designer">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${abs('assets/brand/og.png')}">
<link rel="stylesheet" href="${p}assets/css/site.css?v=${V.css}">
<script>document.documentElement.classList.add('js');setTimeout(function(){window.__ok||document.documentElement.classList.add('failsafe')},3500)</script>
</head>`;
}

function header(p, home) {
  const h = home ? '' : `${p}index.html`;
  return `<header class="nav" id="nav">
  <a class="nav__avatar" href="${home ? '#top' : p + 'index.html'}" aria-label="${site.name}, home"><img src="${p}assets/photos/maria-avatar.jpg" alt="" width="44" height="44"></a>
  <nav class="nav__links" aria-label="Primary">
    <a href="${h}#projects">Work</a>
    <a href="${h}#journey">Journey</a>
    <a class="nav__more" href="${h}#about">About me</a>
    <a class="nav__cta" href="${h}#contact">Get in touch</a>
  </nav>
</header>`;
}

function footer(p) {
  return `<div class="contact-spacer" id="contact"></div>
<footer class="contact">
  <div class="contact__stage">
    <div class="contact__copy">
      <h2 class="contact__title" data-lines><span class="line"><span>Let’s work</span></span><span class="line"><span>together.</span></span></h2>
      <p class="contact__lede">${esc(contact.lede)}</p>
      <a class="contact__mail" href="mailto:${site.email}">${esc(site.email)}</a>
      <nav class="contact__nav" aria-label="Footer">
        <div>
          <p class="contact__h">Site</p>
          <a href="${p}index.html#projects">Work</a>
          <a href="${p}index.html#journey">Journey</a>
          <a href="${p}index.html#about">About me</a>
        </div>
        <div>
          <p class="contact__h">Elsewhere</p>
          <a href="${site.linkedin}" rel="noopener">LinkedIn</a>
          <a href="${site.whatsapp}" rel="noopener" target="_blank">Message me</a>
        </div>
      </nav>
    </div>
    <figure class="contact__photo"><img src="${p}assets/photos/maria-contact.webp" alt="Black-and-white portrait of María Berrocal, smiling and looking to her left" width="1500" height="2000" loading="lazy"></figure>
    <div class="contact__base">
      <p>© ${site.year} ${site.name}</p>
      <a href="#top" data-top>Back to top</a>
    </div>
  </div>
</footer>`;
}

function scripts(p) {
  return `<script src="${p}assets/vendor/lenis.min.js"></script>
<script src="${p}assets/js/site.js?v=${V.js}" defer></script>
</body>
</html>`;
}

const media = (proj, stage = 3, extra = '', fit = 'slice', float = false) =>
  `<div class="v v--${proj.tone} v--loop${float ? ' v--float' : ''} ${extra}" style="--ar:${ratio[proj.visual] || '16 / 10'}" data-reveal>${render(proj.visual, stage, float).replace('xMidYMid slice', `xMidYMid ${fit}`)}</div>`;

// Home -----------------------------------------------------------------------

function workCard(proj, i, all) {
  const href = `work/${proj.slug}.html`;
  const n = String(i + 1).padStart(2, '0');
  return `<a class="work" href="${href}" data-cursor="View case study" style="--i:${i}">
    <div class="work__text">
      <p class="work__n"><span>${n}</span> / ${String(all.length).padStart(2, '0')}</p>
      <h3 class="work__title">${esc(proj.title)}</h3>
      <p class="work__desc">${esc(proj.blurb)}</p>
      <ul class="tags" aria-label="Disciplines">${proj.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <span class="work__go">View case study${arrow}</span>
    </div>
    <div class="work__media v v--${proj.tone} v--loop v--float" style="--ar:${ratio[proj.visual] || '16 / 10'}" data-reveal="stack">${render(proj.visual, 3, true).replace('xMidYMid slice', 'xMidYMid meet')}</div>
  </a>`;
}

function chars(text) {
  // split into words → characters so the headline can animate letter by letter
  let i = 0;
  return text
    .split(' ')
    .map((w) => `<span class="w">${[...w].map((c) => `<span class="ch" style="--c:${i++}">${esc(c)}</span>`).join('')}</span>`)
    .join(' ');
}

function home() {
  const strengths = hero.strengths
    .map(([t, d], i) => `<li><div class="strength__art" aria-hidden="true">${mini[i]()}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`)
    .join('');
  const lcards = hero.strengths
    .map(([t, d], i) => `<div class="lcard" data-lcard="${i}"><div class="lcard__bob"><div class="lcard__in">
        <div class="lcard__art">${mini[i]()}</div>
        <h3>${esc(t)}</h3><p>${esc(d)}</p>
      </div></div></div>`)
    .join('');
  const say = hero.loop.say.map((w, i) => `<span class="say__w" data-say="${i}">${esc(w)}</span>`).join('');
  const steps = journey.steps
    .map(
      (s) => `<li class="step${s.current ? ' step--current' : ''}">
        <span class="step__n">${s.n}</span>
        <span class="step__dot" aria-hidden="true"></span>
        <div class="step__card">
          <div class="step__top"><p class="step__dates">${esc(s.dates)}</p>${orgLogo(s.logo, s.org)}</div>
          <h3 class="step__org">${esc(s.org)}</h3>
          <p class="step__role">${esc(s.role)}${s.unit ? ` · ${esc(s.unit)}` : ''}</p>
          <p class="step__focus">${esc(s.focus)}</p>
          <p class="step__text">${esc(s.body)}</p>
        </div>
      </li>`,
    )
    .join('');
  const tools = toolkit.groups
    .map(([g, list]) => `<div class="tool"><dt>${esc(g)}</dt><dd>${list.map(([n, slug]) => `<span class="chip">${toolMark(n, slug)}${esc(n)}</span>`).join('')}</dd></div>`)
    .join('');
  const heroLabel = `${hero.greeting} ${hero.name} ${hero.title}`;

  return `${head({
    title: `${site.name.replace('í', 'i')}’s Portfolio | Product Designer`,
    desc: hero.lede,
    p: '',
    path: '',
  })}
<body class="home">
<a class="skip" href="#work">Skip to selected work</a>
${header('', true)}
<main id="top">
  <section class="hero">
    <div class="hero__copy">
      <h1 class="hero__title" data-lines aria-label="${esc(heroLabel)}">
        <span class="line line--soft" aria-hidden="true"><span>${chars(hero.greeting)}</span></span>
        <span class="line" aria-hidden="true"><span>${chars(hero.name)}</span></span>
        <span class="line" aria-hidden="true"><span>${chars(hero.title)}</span></span>
      </h1>
      <p class="hero__lede">${esc(hero.lede)}</p>
      <a class="btn" href="#work">${label(hero.cta)}</a>
    </div>
    <figure class="hero__photo"><img src="assets/photos/maria-hero.webp" alt="Black-and-white portrait of María Berrocal, smiling and looking to her left" width="1500" height="2000" fetchpriority="high"></figure>
    <span class="hero__rule" aria-hidden="true"></span>
  </section>

  <section class="work-section" id="work" aria-labelledby="work-h">
    <div class="bridge" data-bridge>
      <div class="bridge__stage">
        <ul class="strengths wrap">${strengths}</ul>
        <div class="loop" aria-hidden="true">
          <svg class="loop__svg"></svg>
          <div class="loop__say"><p class="say">${say}</p><p class="loop__lede">${esc(hero.loop.lede)}</p></div>
          ${lcards}
        </div>
      </div>
    </div>
    <div class="wrap work-wrap">
      <header class="sec-head work-head">
        <h2 id="work-h" class="h2">${esc(hero.loop.title)}</h2>
        <p class="sec-head__lede">${esc(hero.loop.bridge)}</p>
      </header>
      <div class="work-grid" id="projects" data-grid>
        ${projects.map(workCard).join('\n')}
      </div>
    </div>
  </section>

  <section class="journey curtain" id="journey" aria-labelledby="journey-h">
    <div class="wrap journey__grid">
      <div class="journey__intro">
        <h2 id="journey-h" class="h2">${esc(journey.title)}</h2>
        <p class="journey__lede">${esc(journey.lede)}</p>
        <div class="toolkit">
          <h3 class="toolkit__h">${esc(toolkit.title)}</h3>
          <dl class="tools">${tools}</dl>
        </div>
      </div>
      <ol class="timeline" data-timeline>${steps}</ol>
    </div>
  </section>

  <section class="about" id="about" aria-labelledby="about-h" data-about>
    <div class="about__stage">
      <h2 id="about-h" class="about__label">${esc(about.title)}</h2>
      <div class="about__center">
        <svg class="about__web" aria-hidden="true"><path class="about__path"/></svg>
        <blockquote class="about__quote">${about.quote.split(' ').map((w) => `<span class="aw">${esc(w)}</span>`).join(' ')}</blockquote>
        <p class="about__by">${esc(about.by)}</p>
      </div>
      <ul class="about__beliefs">${about.beliefs.map(([h, d]) => `<li><h3>${esc(h)}</h3><p>${esc(d)}</p></li>`).join('')}</ul>
    </div>
  </section>
</main>
${footer('')}
<div class="cursor" aria-hidden="true"><span></span></div>
${scripts('')}`;
}

// Case study -----------------------------------------------------------------

function caseStudy(proj, i) {
  const p = '../';
  const para = (arr) => arr.map((t) => `<p>${esc(t)}</p>`).join('');
  const decisions = proj.decisions
    .map(
      (d, n) => `<li class="decision">
        <h3 class="decision__title">${esc(d.title)}</h3>
        <dl class="decision__pair">
          <div class="pair__a"><dt>Decision</dt><dd>${esc(d.chose)}</dd></div>
          <div><dt>Over</dt><dd>${esc(d.over)}</dd></div>
        </dl>
        <p class="decision__why">${esc(d.why)}</p>
      </li>`,
    )
    .join('');
  const steps = proj.stages
    .map(([t, d], n) => `<li data-step="${n}"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`)
    .join('');

  return `${head({
    title: `${proj.short}: ${site.name}`,
    desc: proj.lede,
    p,
    noindex: proj.draft,
    path: `work/${proj.slug}.html`,
  })}
<body class="case">
<a class="skip" href="#story">Skip to the story</a>
${header(p, false)}
<main>
  <article>
    <header class="case-top"><div class="case-hero wrap">
      <div class="case-hero__head">
        <p class="case-hero__kicker">Case study</p>
        <h1 class="case-hero__title">${esc(proj.title)}</h1>
      </div>
      <div class="case-hero__copy">
        <dl class="meta">
          <div class="meta__row"><dt>Company</dt><dd>${proj.companyLogos ? `<span class="logos">${proj.companyLogos.map(([s, n]) => orgLogo(s, n, p)).join('')}</span>` : proj.companyLogo ? orgLogo(proj.companyLogo, proj.company, p) : esc(proj.company)}</dd></div>
          ${proj.clients ? `<div class="meta__row"><dt>Built for</dt><dd><ul class="clients">${proj.clients.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></dd></div>` : ''}
          <div class="meta__row"><dt>Scope</dt><dd>${esc(proj.scope)}</dd></div>
          <div class="meta__row"><dt>Worked with</dt><dd>${esc(proj.team)}</dd></div>
        </dl>
        <p class="case-note">Interfaces are reconstructed to respect client confidentiality.</p>
      </div>
      <div class="case-hero__media"><div class="mesh" aria-hidden="true"><i></i><i></i><i></i><i></i></div>${media(proj, 3, 'case-media', 'meet', true)}
      </div>
    </div></header>
    <div class="case-sheet">
      <div class="thread wrap" aria-hidden="true"><i class="thread__track"></i><i class="thread__fill"></i><i class="thread__dot"></i></div>

    <div id="story" class="story wrap">
      ${proj.sections
        ? proj.sections.map(([h, paras]) => `<section class="blk"><h2 class="blk__h">${esc(h)}</h2><div class="prose">${para(paras)}</div></section>`).join('\n      ')
        : `${proj.context ? `<section class="blk"><h2 class="blk__h">The context</h2><div class="prose">${para(proj.context)}</div></section>` : ''}
      <section class="blk"><h2 class="blk__h">The problem</h2><div class="prose">${para(proj.problem)}</div></section>
      <section class="blk"><h2 class="blk__h">Why it was hard</h2><div class="prose">${para(proj.hard)}</div></section>
      <section class="blk"><h2 class="blk__h">My role</h2><div class="prose">${para(proj.role_body)}</div></section>`}
      <section class="blk"><h2 class="blk__h">The decisions that shaped the product</h2><ol class="decisions">${decisions}</ol></section>
    </div>

    <section class="evolve" data-evolve aria-labelledby="evolve-h">
      <div class="evolve__track">
        <div class="wrap">
          <div class="evolve__stick">
          <h2 id="evolve-h" class="h3 evolve__h"><span>The evolution</span></h2>
          <div class="evolve__pin">
            ${proj.visual === 'targetTracking'
              ? `<div class="evolve__stage evolve__stage--tt">${ttEvolve()}</div>`
              : `<div class="evolve__stage v v--${proj.tone}">${[1, 2, 3].map((s) => `<div class="layer" data-layer="${s - 1}">${render(proj.evolveVisual || proj.visual, s)}</div>`).join('')}</div>`}
            <ol class="evolve__steps">${steps}</ol>
          </div>
          </div>
        </div>
      </div>
      <div class="evolve__after"><div class="wrap">
        <section class="blk"><h2 class="blk__h">Outcome</h2><div class="prose">${para(proj.outcome)}</div></section>
      </div></div>
    </section>

    ${proj.lessons ? `<section class="lessons wrap" aria-labelledby="lessons-h">
      <div class="lessons__in"><h2 id="lessons-h" class="lessons__h">Lessons learned</h2>
        <ol class="lesson-list">${proj.lessons.map(([h, t], i) => `<li><span class="lesson__ico">${lessonIcons[i % 3]}</span><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join('')}</ol>
      </div>
    </section>` : ''}
    </div>
  </article>

  <section class="next" aria-labelledby="next-h">
    <div class="wrap">
      <h2 id="next-h" class="next__h">More case studies</h2>
      <div class="next__grid">
        ${[1, 2].map((k) => projects[(i + k) % projects.length]).map((n) => `<a class="next__card" href="${n.slug}.html" data-cursor="View case study">
          ${media(n, 3, 'next__media', 'meet')}
          <p class="next__title">${esc(n.title)}</p>
          <p class="next__sub"><span>${esc(n.short)}</span>${arrow}</p>
        </a>`).join('')}
      </div>
    </div>
  </section>
</main>
${footer(p)}
<div class="cursor" aria-hidden="true"><span></span></div>
${scripts(p)}`;
}

// Write ---------------------------------------------------------------------

function notFound() {
  return `${head({ title: `Page not found | ${site.name}`, desc: hero.lede, p: '/', noindex: true, path: '404.html' })}
<body class="nf">
<main class="nf__main"><p class="nf__code">404</p><h1 class="nf__title">This page wandered off.</h1><p class="nf__lede">The link may be old or mistyped.</p><a class="btn" href="/">${label('Back to home')}</a></main>
<script>window.__ok=1</script>
</body>
</html>`;
}

mkdirSync(join(root, 'work'), { recursive: true });
writeFileSync(join(root, 'index.html'), home());
projects.forEach((proj, i) => writeFileSync(join(root, 'work', `${proj.slug}.html`), caseStudy(proj, i)));

writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n${site.url ? `Sitemap: ${site.url}/sitemap.xml\n` : ''}`);
if (site.url) writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['', ...projects.filter((x) => !x.draft).map((x) => `work/${x.slug}.html`)].map((u) => `  <url><loc>${site.url}/${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(root, '404.html'), notFound());
const drafts = projects.filter((x) => x.draft).map((x) => x.slug);
console.log(`Built index.html + ${projects.length} case studies.`);
if (drafts.length) console.warn(`DRAFT copy (noindex) needs María's review: ${drafts.join(', ')}`);

// dist/: only what the public site needs (deploy this folder; the repo's working files stay private)
rmSync(join(root, 'dist'), { recursive: true, force: true });
mkdirSync(join(root, 'dist'), { recursive: true });
for (const f of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'work', 'assets']) {
  if (existsSync(join(root, f))) cpSync(join(root, f), join(root, 'dist', f), { recursive: true, filter: (s) => !s.endsWith('README.md') });
}
