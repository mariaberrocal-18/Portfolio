// Captures a claim change mid-transition (real motion, not reduced) so the
// continuity of the plate, evidence and leaders can be inspected frame by frame.
//   node tools/motion.mjs http://127.0.0.1:4180 ./shots <from> <to> [width]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(require.resolve('playwright', { paths: [process.cwd(), '/opt/node-tools/node_modules'] }));
const [base, out, from = '1', to = '2', width = '1440'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const w = Number(width);
const ctx = await browser.newContext({ viewport: { width: w, height: 1500 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`${base}/index.html?claim=${from}`, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}.dock{position:static!important}' });
await page.evaluate(() => document.querySelector('#trace').scrollIntoView());
await page.waitForTimeout(1800);
const box = await page.evaluate(() => { const r = document.querySelector('#trace').getBoundingClientRect(); return { x: 0, y: Math.max(0, r.top), width: innerWidth, height: Math.min(r.height, 1500 - Math.max(0, r.top)) }; });
const times = [0, 220, 520, 900, 1500];
await page.evaluate((to) => document.getElementById('claim-' + to).click(), to);
let last = 0;
for (const t of times) {
  await page.waitForTimeout(t - last); last = t;
  await page.screenshot({ path: `${out}/motion-${from}to${to}-${w}-${String(t).padStart(4, '0')}.png`, clip: box });
}
await browser.close();
