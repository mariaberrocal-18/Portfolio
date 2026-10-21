// Behaviour, accessibility and performance checks.
//   node tools/test.mjs http://127.0.0.1:4180 [path/to/axe.min.js]
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright', { paths: [process.cwd(), '/opt/node-tools/node_modules'] }));
const base = process.argv[2] || 'http://127.0.0.1:4180';
const axePath = process.argv[3];

let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) failures++; };
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });

const state = (page) => page.evaluate(() => ({
  shell: document.querySelector('.trace__shell').dataset.claim,
  checked: [...document.querySelectorAll('.claim')].findIndex((c) => c.getAttribute('aria-checked') === 'true') + 1,
  activeEv: [...document.querySelectorAll('.ev')].findIndex((e) => e.classList.contains('is-active')) + 1,
  live: document.getElementById('trace-live').textContent,
  focus: document.activeElement?.id || document.activeElement?.className || '',
  plate: document.getElementById('trace-plate').dataset.claim,
}));

/* ───────────── Desktop: pointer + keyboard ───────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  // Playwright's own scrolling would animate under the site's smooth scroll and move content under the pointer.
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await page.locator('#trace').scrollIntoViewIfNeeded();
  let s = await state(page);
  ok(s.checked === 1 && s.activeEv === 1 && s.plate === '1', 'desktop: claim 1 selected on arrival, evidence and plate agree');

  await page.hover('#claim-2');
  await page.waitForTimeout(150);
  s = await state(page);
  ok(s.shell === '2' && s.activeEv === 2 && s.plate === '2' && s.checked === 1, 'desktop: hover previews claim 2 without pinning it');
  ok(s.live === '', 'desktop: hover preview is not announced');
  await page.mouse.move(5, 5);
  await page.waitForTimeout(150);
  s = await state(page);
  ok(s.shell === '1' && s.activeEv === 1, 'desktop: leaving the claims returns to the pinned claim');

  await page.hover('#ev-3 .ev__head');
  await page.waitForTimeout(150);
  s = await state(page);
  ok(s.shell === '1', 'desktop: hovering an evidence row does not change the state (rows resize, so it would flicker)');
  await page.mouse.move(5, 5);

  await page.click('#claim-3');
  await page.waitForTimeout(150);
  s = await state(page);
  ok(s.checked === 3 && s.shell === '3' && s.plate === '3', `desktop: click pins claim 3 ${JSON.stringify(s)}`);
  ok(/Claim 3 of 3 selected/.test(s.live), `desktop: pin is announced ("${s.live.slice(0, 48)}…")`);

  await page.keyboard.press('ArrowLeft');
  s = await state(page);
  ok(s.checked === 2 && s.focus === 'claim-2', 'keyboard: ArrowLeft moves to claim 2 and moves focus');
  await page.keyboard.press('Home');
  s = await state(page);
  ok(s.checked === 1, 'keyboard: Home selects claim 1');
  await page.keyboard.press('End');
  await page.keyboard.press('ArrowRight');
  s = await state(page);
  ok(s.checked === 3, 'keyboard: End selects claim 3 and does not wrap');

  const tab = await page.evaluate(() => [...document.querySelectorAll('.claim')].map((c) => c.tabIndex));
  ok(tab.join() === '-1,-1,0', `keyboard: roving tabindex follows the pinned claim (${tab})`);

  // leaders: three distinct paths, none empty
  const leaders = await page.evaluate(() => [...document.querySelectorAll('.leader')].map((p) => p.getAttribute('d')));
  ok(leaders.length === 3 && leaders.every((d) => d && d.startsWith('M')) && new Set(leaders).size === 3, 'desktop: three leaders drawn');

  // hero jump links select a claim
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.click('.hero__strip [data-claim-jump="2"]');
  await page.waitForTimeout(400);
  s = await state(page);
  ok(s.checked === 2, 'hero: strip link selects claim 2 in the Trace');

  // deep link
  await page.goto(`${base}/index.html?claim=3`, { waitUntil: 'networkidle' });
  s = await state(page);
  ok(s.checked === 3 && s.plate === '3', 'deep link ?claim=3 starts on claim 3');
  await ctx.close();
}

/* ───────────── Mobile: touch, dock, swipe vs scroll ───────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelector('#trace-root').scrollIntoView());
  await page.tap('#claim-2');
  await page.waitForTimeout(200);
  let s = await state(page);
  ok(s.checked === 2, 'mobile: tap selects claim 2');
  const vis = await page.evaluate(() => [...document.querySelectorAll('.ev')].map((e) => getComputedStyle(e).display !== 'none'));
  ok(vis.join() === 'false,true,false', `mobile: only the selected claim's evidence is shown (${vis})`);

  await page.tap('.dock__next');
  await page.waitForTimeout(200);
  s = await state(page);
  ok(s.checked === 3, 'mobile: Next moves to claim 3');
  ok(await page.getAttribute('.dock__next', 'aria-disabled') === 'true', 'mobile: Next is disabled on the last claim');
  await page.dispatchEvent('.dock__next', 'click');
  s = await state(page);
  ok(s.checked === 3, 'mobile: Next at the end does nothing');
  await page.tap('.dock__prev');
  await page.tap('.dock__dot[data-claim="1"]');
  s = await state(page);
  ok(s.checked === 1, 'mobile: dock numerals jump to a claim');
  ok(await page.getAttribute('.dock__prev', 'aria-disabled') === 'true', 'mobile: Previous is disabled on claim 1');

  // Swipe over the evidence card: horizontal changes claim; vertical scrolls the page.
  const cdp = await ctx.newCDPSession(page);
  const touch = async (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
  await page.locator('.ev.is-active .ev__head').scrollIntoViewIfNeeded();
  const box = await page.locator('.ev.is-active .ev__head').boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + 40;
  await touch('touchStart', cx + 110, cy);
  for (let i = 1; i <= 6; i++) await touch('touchMove', cx + 110 - i * 36, cy + 2);
  await touch('touchEnd');
  await page.waitForTimeout(250);
  s = await state(page);
  ok(s.checked === 2, 'mobile: swiping left over the evidence goes to the next claim');

  const y0 = await page.evaluate(() => scrollY);
  await touch('touchStart', cx, cy + 200);
  for (let i = 1; i <= 8; i++) await touch('touchMove', cx + 4, cy + 200 - i * 40);
  await touch('touchEnd');
  await page.waitForTimeout(500);
  const y1 = await page.evaluate(() => scrollY);
  s = await state(page);
  ok(y1 > y0 + 100 && s.checked === 2, `mobile: vertical swipe still scrolls the page (${y0} → ${y1}) and keeps the claim`);
  await ctx.close();
}

/* ───────────── Reduced motion ───────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  const d = await page.evaluate(() => ({
    arc: getComputedStyle(document.querySelector('.arc--base')).transitionDuration,
    ev: getComputedStyle(document.querySelector('.ev__body')).transitionDuration,
    ring: getComputedStyle(document.querySelector('.hero__rosette .ring')).opacity,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  ok(parseFloat(d.arc) < 0.001 && parseFloat(d.ev) < 0.001 && d.ring === '1' && d.scroll === 'auto', `reduced motion: transitions off, rosette visible, no smooth scroll (${JSON.stringify(d)})`);
  await ctx.close();
}

/* ───────────── Overflow across widths ───────────── */
{
  const widths = [320, 360, 390, 430, 600, 768, 900, 1024, 1100, 1280, 1440, 1920, 2560];
  const bad = [];
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    for (const n of [1, 2, 3]) {
      await page.goto(`${base}/index.html?claim=${n}`, { waitUntil: 'networkidle' });
      const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (o > 0) bad.push(`${w}px claim ${n}: +${o}px`);
    }
    await ctx.close();
  }
  ok(bad.length === 0, `no horizontal overflow at ${widths.join(', ')} for all claims ${bad.join('; ')}`);
}

/* ───────────── Type floor and touch targets ───────────── */
for (const [w, touch] of [[1440, false], [820, true], [390, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, hasTouch: touch, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const small = new Set();
  const tiny = new Set();
  for (const n of [1, 2, 3]) {
    await page.goto(`${base}/index.html?claim=${n}`, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const out = { small: [], tiny: [], essential: [] };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      while (walker.nextNode()) {
        const t = walker.currentNode;
        if (!t.textContent.trim()) continue;
        const el = t.parentElement;
        if (seen.has(el)) continue;
        seen.add(el);
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (cs.display === 'none' || cs.visibility === 'hidden' || r.width === 0 || r.height === 0) continue;
        if (el.closest('svg')) continue;
        if (el.closest('.sr-only') || el.closest('[aria-hidden="true"]')) continue;
        const fs = parseFloat(cs.fontSize);
        if (fs < 12) out.small.push(`${el.className || el.tagName} ${fs}px "${t.textContent.trim().slice(0, 24)}"`);
      }
      for (const sel of ['.claim__text', '.ev__desc', '.read__text', '.ev__title', '.ev__value', '.lede', '.hero__sentence', '.ledger__row p']) {
        const e = document.querySelector(sel);
        if (e && e.getClientRects().length) out.essential.push(`${sel} ${parseFloat(getComputedStyle(e).fontSize)}`);
      }
      return out;
    });
    r.small.forEach((x) => small.add(x));
    r.essential.forEach((x) => { const [sel, px] = x.split(' '); if (+px < 14) tiny.add(x); });
  }
  ok(small.size === 0, `${w}px: no visible text under 12px ${[...small].slice(0, 4).join(' | ')}`);
  ok(tiny.size === 0, `${w}px: essential text at 14px or more ${[...tiny].join(' | ')}`);

  if (touch) {
    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    const small44 = await page.evaluate(() => {
      const res = [];
      document.querySelectorAll('a[href], button, summary').forEach((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (cs.display === 'none' || r.width === 0) return;
        if (el.closest('.skip')) return;
        if (el.matches('.kp, .outcomes__for a')) return; // inline links inside a sentence
        if (r.width < 44 || r.height < 44) res.push(`${el.className || el.tagName} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || '').trim().slice(0, 18)}"`);
      });
      return res;
    });
    ok(small44.length === 0, `${w}px: touch targets at least 44px ${small44.slice(0, 6).join(' | ')}`);
  }
  await ctx.close();
}

/* ───────────── axe ───────────── */
if (axePath && existsSync(axePath)) {
  const axeSrc = readFileSync(axePath, 'utf8');
  for (const w of [1440, 820, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    for (const n of [1, 2, 3]) {
      await page.goto(`${base}/index.html?claim=${n}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.addScriptTag({ content: axeSrc });
      const res = await page.evaluate(async () => {
        const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } });
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0].target.join(' ').slice(0, 90) }));
      });
      ok(res.length === 0, `axe ${w}px claim ${n}: ${res.length ? JSON.stringify(res) : 'no violations'}`);
    }
    await ctx.close();
  }
}

/* ───────────── Performance ───────────── */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let bytes = 0;
  const reqs = [];
  page.on('response', async (r) => { try { const b = (await r.body()).length; bytes += b; reqs.push([r.url().split('/').slice(3).join('/') || '/', b]); } catch { /* ignore */ } });
  await page.addInitScript(() => {
    window.__cls = 0; window.__long = [];
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__long.push(Math.round(e.duration)); }).observe({ type: 'longtask', buffered: true });
  });
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const nav = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), cls: +window.__cls.toFixed(4), long: window.__long };
  });
  console.log('perf: load', JSON.stringify(nav), 'transfer', (bytes / 1024).toFixed(0) + ' KB uncompressed, ' + reqs.length + ' requests');
  ok(nav.cls < 0.1, `CLS ${nav.cls} (< 0.1)`);

  // Frame times while switching claims with all transitions running
  await page.locator('#trace').scrollIntoViewIfNeeded();
  const frames = await page.evaluate(async () => {
    const times = [];
    let last = performance.now();
    let run = true;
    const loop = (t) => { times.push(t - last); last = t; if (run) requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    const click = (id) => document.getElementById(id).click();
    for (const id of ['claim-2', 'claim-3', 'claim-1', 'claim-3', 'claim-2']) { click(id); await new Promise((r) => setTimeout(r, 1300)); }
    run = false;
    times.sort((a, b) => a - b);
    return { n: times.length, p50: +times[Math.floor(times.length * 0.5)].toFixed(1), p95: +times[Math.floor(times.length * 0.95)].toFixed(1), max: +times[times.length - 1].toFixed(1) };
  });
  console.log('perf: frame times during five claim changes', JSON.stringify(frames));
  ok(frames.p95 < 24, `frame time p95 ${frames.p95}ms (< 24ms) in headless software rendering`);
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
