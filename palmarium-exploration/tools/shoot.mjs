// Visual QA: renders the hero, each Trace claim state and the full page at
// every breakpoint. Reduced motion is emulated so screenshots show final states.
//   node tools/shoot.mjs http://localhost:4180 ./shots [widths=1440,1280,1024,820,390]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright', { paths: [process.cwd(), '/opt/node-tools/node_modules'] }));

const [base = 'http://localhost:4180', out = './shots', widthsArg] = process.argv.slice(2);
const widths = (widthsArg || '1440,1280,1100,1024,820,390').split(',').map(Number);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  proxy: process.env.HTTPS_PROXY && !/^https?:\/\/(localhost|127\.)/.test(base) ? { server: process.env.HTTPS_PROXY } : undefined,
});

for (const w of widths) {
  const h = w >= 1100 ? 900 : w >= 720 ? 1000 : 844;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', deviceScaleFactor: 1, hasTouch: w < 1100 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  // A sticky bar renders oddly in full-page captures: pin it to its natural place.
  const shotEl = async (sel, path) => {
    await page.addStyleTag({ content: '.dock{position:static!important}' });
    const box = await page.evaluate((q) => {
      const r = document.querySelector(q).getBoundingClientRect();
      return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height };
    }, sel);
    await page.screenshot({ path, fullPage: true, clip: box });
  };
  await page.screenshot({ path: `${out}/${w}-hero.png`, fullPage: true, clip: { x: 0, y: 0, width: w, height: Math.min(h + 140, 1100) } });
  for (const n of [1, 2, 3]) {
    await page.goto(`${base}/index.html?claim=${n}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(450);
    await shotEl('#trace', `${out}/${w}-trace-${n}.png`);
  }
  await shotEl('#outcomes', `${out}/${w}-outcomes.png`);
  await shotEl('#about', `${out}/${w}-about.png`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(`${w}px  horizontal overflow: ${overflow}px  console: ${errors.length ? errors.join(' | ') : 'clean'}`);
  await ctx.close();
}
await browser.close();
