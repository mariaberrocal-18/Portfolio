// Static site generator: `node src/build.mjs` writes index.html and work/*.html.
// No dependencies. Copy lives in content.mjs, drawings in visuals.mjs.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, hero, journey, toolkit, about, contact, projects } from './content.mjs';
import { render } from './visuals.mjs';
import { mini } from './mini.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// cache-busting: asset URLs change whenever their content does
const hash = (f) => createHash('md5').update(readFileSync(join(root, f))).digest('hex').slice(0, 8);
const V = { css: hash('assets/css/site.css'), js: hash('assets/js/site.js') };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const arrow = `<svg class="ico" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 13.5l9-9M6 4.5h7.5V12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const back = `<svg class="ico" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M14 9H4m4.5-4.5L4 9l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const label = (t) => `<span class="roll" data-text="${esc(t)}"><span>${esc(t)}</span></span>`;

function head({ title, desc, p, noindex }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#f7f7f5">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="preload" href="${p}assets/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230c0c0c'/%3E%3Ctext x='16' y='22.5' font-family='Helvetica,Arial,sans-serif' font-weight='700' font-size='19' text-anchor='middle' fill='%23f7f7f5'%3Em%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="${p}assets/css/site.css?v=${V.css}">
<script>document.documentElement.classList.add('js');setTimeout(function(){window.__ok||document.documentElement.classList.add('failsafe')},3500)</script>
</head>`;
}

function header(p, home) {
  const h = home ? '' : p || './';
  return `<header class="nav">
  <a class="nav__brand" href="${home ? '#top' : p + 'index.html'}" aria-label="${site.name}, home">${site.name}</a>
  <nav class="nav__links" aria-label="Primary">
    <a href="${h}${home ? '' : 'index.html'}#work">Work</a>
    <a href="${h}${home ? '' : 'index.html'}#journey">Journey</a>
    <a href="${h}${home ? '' : 'index.html'}#about">About</a>
    <a href="${h}${home ? '' : 'index.html'}#contact">Contact</a>
  </nav>
</header>`;
}

function footer(p) {
  return `<footer class="contact" id="contact">
  <div class="wrap contact__grid">
    <figure class="contact__photo"><img src="${p}assets/photos/maria-contact.jpg" alt="Black-and-white portrait of María Berrocal holding a laptop" width="296" height="424" loading="lazy"></figure>
    <div class="contact__main">
      <h2 class="contact__title" data-lines><span class="line"><span>Let’s work</span></span><span class="line"><span>together.</span></span></h2>
      <p class="contact__lede">${esc(contact.lede)}</p>
      <a class="contact__mail" href="mailto:${site.email}">${esc(site.email)}</a>
    </div>
    <nav class="contact__nav" aria-label="Footer">
      <div>
        <p class="contact__h">Site</p>
        <a href="${p}index.html#work">Work</a>
        <a href="${p}index.html#journey">Journey</a>
        <a href="${p}index.html#about">About</a>
      </div>
      <div>
        <p class="contact__h">Elsewhere</p>
        <a href="${site.linkedin}" rel="noopener">LinkedIn</a>
        <a href="mailto:${site.email}">Email</a>
      </div>
    </nav>
  </div>
  <div class="wrap contact__base">
    <p>© ${site.year} ${site.name}</p>
    <a href="#top" data-top>Back to top</a>
  </div>
</footer>`;
}

function scripts(p) {
  return `<script src="${p}assets/vendor/lenis.min.js"></script>
<script src="${p}assets/js/site.js?v=${V.js}" defer></script>
</body>
</html>`;
}

const media = (proj, stage = 3, extra = '', fit = 'slice') =>
  `<div class="v v--${proj.tone} ${extra}" data-reveal>${render(proj.visual, stage).replace('xMidYMid slice', `xMidYMid ${fit}`)}</div>`;

// Home -----------------------------------------------------------------------

function workCard(proj) {
  const href = `work/${proj.slug}.html`;
  return `<a class="work work--${proj.card}" href="${href}" data-cursor="View case study">
    ${media(proj, 3, 'work__media')}
    <div class="work__meta">
      <ul class="tags" aria-label="Disciplines">${proj.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <h3 class="work__title">${esc(proj.title)}</h3>
      <p class="work__sub"><span>${esc(proj.short)}</span>${arrow}</p>
    </div>
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
    .map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`)
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
          <p class="step__dates">${esc(s.dates)}</p>
          <h3 class="step__org">${esc(s.org)}</h3>
          <p class="step__role">${esc(s.role)}${s.unit ? ` · ${esc(s.unit)}` : ''}</p>
          <p class="step__focus">${esc(s.focus)}</p>
          <p class="step__text">${esc(s.body)}</p>
        </div>
      </li>`,
    )
    .join('');
  const tools = toolkit.groups
    .map(([g, list]) => `<div class="tool"><dt>${esc(g)}</dt><dd>${list.map((t) => `<span>${esc(t)}</span>`).join('')}</dd></div>`)
    .join('');
  const heroLabel = `${hero.greeting} ${hero.name} ${hero.title}`;

  return `${head({
    title: `${site.name}: ${site.role}`,
    desc: `${site.name} is a Senior Product Designer with 8 years across consulting, UX/UI and product design. Selected work from Waterplan, Civarea and EY.`,
    p: '',
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
    <figure class="hero__photo"><img src="assets/photos/maria-hero.webp" alt="Black-and-white portrait of María Berrocal, smiling and looking to her left" width="1122" height="1262" fetchpriority="high"></figure>
    <span class="hero__rule" aria-hidden="true"></span>
  </section>

  <section class="work-section" id="work" aria-labelledby="work-h">
    <div class="bridge" data-bridge>
      <div class="bridge__stage">
        <ul class="strengths wrap">${strengths}</ul>
        <div class="loop" aria-hidden="true">
          <svg class="loop__svg"><path class="loop__ring"/><circle class="loop__dot" r="5"/><line class="loop__drop"/></svg>
          <div class="loop__say"><p class="say">${say}</p><p class="loop__lede">${esc(hero.loop.lede)}</p></div>
          ${lcards}
        </div>
      </div>
    </div>
    <div class="wrap work-wrap">
      <header class="sec-head work-head">
        <h2 id="work-h" class="h2">Selected work.</h2>
        <p class="sec-head__lede">From early questions and messy problems to products that made it into shipped experiences.</p>
      </header>
      <div class="work-grid" data-grid>
        ${projects.map(workCard).join('\n')}
      </div>
    </div>
  </section>

  <section class="journey" id="journey" aria-labelledby="journey-h">
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

  <section class="about" id="about" aria-labelledby="about-h">
    <div class="wrap about__grid">
      <h2 id="about-h" class="about__statement">${esc(about.statement)}</h2>
      <div class="about__body">
        ${about.body.map((t) => `<p>${esc(t)}</p>`).join('')}
        <ul class="beliefs">${about.beliefs.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>
</main>
${footer('')}
<div class="cursor" aria-hidden="true"><span></span></div>
${scripts('')}`;
}

// Case study -----------------------------------------------------------------

function caseStudy(proj, i) {
  const next = projects[(i + 1) % projects.length];
  const p = '../';
  const para = (arr) => arr.map((t) => `<p>${esc(t)}</p>`).join('');
  const decisions = proj.decisions
    .map(
      (d, n) => `<li class="decision">
        <h3 class="decision__title">${esc(d.title)}</h3>
        <dl class="decision__pair">
          <div><dt>Chose</dt><dd>${esc(d.chose)}</dd></div>
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
  })}
<body class="case">
<a class="skip" href="#story">Skip to the story</a>
${header(p, false)}
<main>
  <article>
    <header class="case-hero wrap">
      <a class="case-hero__back" href="${p}index.html#work">${back}<span>All work</span></a>
      <h1 class="case-hero__title">${esc(proj.title)}</h1>
      <p class="case-hero__lede">${esc(proj.lede)}</p>
      <dl class="meta">
        <div><dt>Company</dt><dd>${esc(proj.company)}</dd></div>
        <div><dt>Role</dt><dd>${esc(proj.role)}</dd></div>
        <div><dt>Scope</dt><dd>${esc(proj.scope)}</dd></div>
        <div><dt>Worked with</dt><dd>${esc(proj.team)}</dd></div>
      </dl>
    </header>

    <div class="wrap">${media(proj, 3, 'case-media', 'meet')}
      <p class="case-note">Interfaces are reconstructed from memory to respect client confidentiality.</p>
    </div>

    <div id="story" class="story wrap">
      <section class="blk"><h2 class="blk__h">The problem</h2><div class="prose">${para(proj.problem)}</div></section>
      <section class="blk"><h2 class="blk__h">Why it was hard</h2><div class="prose">${para(proj.hard)}</div></section>
      <section class="blk"><h2 class="blk__h">My role</h2><div class="prose">${para(proj.role_body)}</div></section>
      <section class="blk"><h2 class="blk__h">Decisions and tradeoffs</h2><ol class="decisions">${decisions}</ol></section>
    </div>

    <section class="evolve" data-evolve aria-labelledby="evolve-h">
      <div class="wrap">
        <h2 id="evolve-h" class="h3 evolve__h">How it evolved</h2>
        <div class="evolve__pin">
          <div class="evolve__stage v v--${proj.tone}">
            ${[1, 2, 3].map((s) => `<div class="layer" data-layer="${s - 1}">${render(proj.visual, s)}</div>`).join('')}
          </div>
          <ol class="evolve__steps">${steps}</ol>
        </div>
      </div>
    </section>

    <div class="story story--end wrap">
      <section class="blk"><h2 class="blk__h">What shipped</h2><ul class="ticks">${proj.shipped.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>
      <section class="blk"><h2 class="blk__h">Outcome</h2><div class="prose prose--serif">${para(proj.outcome)}</div></section>
    </div>
  </article>

  <a class="next" href="${next.slug}.html" data-cursor="Next case study">
    <div class="wrap next__grid">
      <div>
        <p class="next__k">Next</p>
        <p class="next__title">${esc(next.title)}</p>
        <p class="next__sub"><span>${esc(next.short)}</span>${arrow}</p>
      </div>
      ${media(next, 3, 'next__media')}
    </div>
  </a>
</main>
${footer(p)}
<div class="cursor" aria-hidden="true"><span></span></div>
${scripts(p)}`;
}

// Write ---------------------------------------------------------------------

mkdirSync(join(root, 'work'), { recursive: true });
writeFileSync(join(root, 'index.html'), home());
projects.forEach((proj, i) => writeFileSync(join(root, 'work', `${proj.slug}.html`), caseStudy(proj, i)));

const drafts = projects.filter((x) => x.draft).map((x) => x.slug);
console.log(`Built index.html + ${projects.length} case studies.`);
if (drafts.length) console.warn(`DRAFT copy (noindex) needs María's review: ${drafts.join(', ')}`);
