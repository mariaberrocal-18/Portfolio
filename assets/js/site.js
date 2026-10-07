// Interaction layer. Everything degrades to a static, fully readable page.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wide = matchMedia('(min-width: 960px)');
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
  window.__ok = true;

  // smooth scroll ---------------------------------------------------------
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href*="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const url = new URL(a.href, location.href);
        if (url.pathname !== location.pathname) return;
        const target = url.hash === '#top' || url.hash === '' ? 0 : url.hash === '#contact' ? document.documentElement.scrollHeight : document.querySelector(url.hash);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -24, duration: 1.5 });
      });
    });
  }

  // page-load sequence ----------------------------------------------------
  const ready = () => {
    root.classList.add('is-ready');
    document.querySelectorAll('.hero [data-lines]').forEach((el) => el.classList.add('is-in'));
  };
  (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]) : Promise.resolve()).then(() => requestAnimationFrame(ready));

  // reveal on view --------------------------------------------------------
  // observe the unclipped parent: some engines ignore clipped targets
  const targets = new Map();
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      targets.get(e.target).forEach((el) => el.classList.add('is-in'));
      io.unobserve(e.target);
    }),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );
  document.querySelectorAll('[data-reveal], .contact [data-lines]').forEach((el) => {
    const host = el.matches('[data-reveal]') ? el.parentElement : el;
    if (!targets.has(host)) { targets.set(host, []); io.observe(host); }
    targets.get(host).push(el);
  });

  // hero: pointer depth + scroll-away ----------------------------------------
  const heroImg = document.querySelector('.hero__photo img');
  const heroCopy = document.querySelector('.hero__copy');
  let ptx = 0, pty = 0, ptxC = 0, ptyC = 0;
  if (heroImg && fine && !reduce) {
    addEventListener('pointermove', (e) => {
      if (scrollY > innerHeight) return;
      ptx = (e.clientX / innerWidth - 0.5) * -22;
      pty = (e.clientY / innerHeight - 0.5) * -14;
    }, { passive: true });
  }

  // loop story ----------------------------------------------------------------
  // Storyboard: cards rise in a row while the hero blurs → each discipline takes the
  // spotlight in turn (Frame it → Craft it → Ship it) while one green line connects
  // them → Repeat closes the line into a loop → the cards pile up, shrink into a
  // single point and that point drops a line down into Selected work.
  const bridge = document.querySelector('[data-bridge]');
  const loop = bridge && bridge.querySelector('.loop');
  const workSection = document.querySelector('.work-wrap');
  const lcards = loop ? [...loop.querySelectorAll('.lcard')] : [];
  const says = loop ? [...loop.querySelectorAll('.say__w')] : [];
  const sayBox = loop && loop.querySelector('.loop__say');
  const lede = loop && loop.querySelector('.loop__lede');
  const svg = loop && loop.querySelector('.loop__svg');
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (cls, parent) => { const el = document.createElementNS(NS, 'path'); el.setAttribute('class', cls); el.setAttribute('pathLength', '1'); parent.appendChild(el); return el; };
  let openBase = [], openGreen = [], closedBase, closedGreen, comet, dot, drop, dropDot, dropHalo, openG, closedG;
  if (loop) {
    svg.innerHTML = '';
    openG = document.createElementNS(NS, 'g'); closedG = document.createElementNS(NS, 'g');
    svg.append(openG, closedG);
    for (let i = 0; i < 4; i++) { openBase.push(mk('loop__ring', openG)); }
    for (let i = 0; i < 4; i++) { openGreen.push(mk('loop__green', openG)); }
    closedBase = mk('loop__ring', closedG); closedGreen = mk('loop__green', closedG); comet = mk('loop__comet', closedG);
    dot = document.createElementNS(NS, 'circle'); dot.setAttribute('class', 'loop__dot'); dot.setAttribute('r', '5'); svg.appendChild(dot);
    drop = document.createElementNS(NS, 'line'); drop.setAttribute('class', 'loop__drop'); svg.appendChild(drop);
    dropHalo = document.createElementNS(NS, 'circle'); dropHalo.setAttribute('class', 'loop__halo'); dropHalo.setAttribute('r', '10.5'); svg.appendChild(dropHalo);
    dropDot = document.createElementNS(NS, 'circle'); dropDot.setAttribute('class', 'loop__start'); dropDot.setAttribute('r', '4.5'); svg.appendChild(dropDot);
  }

  // Layout keys, as fractions of the viewport. i = card index (0 Product thinking,
  // 1 Visual craft, 2 Pace). s = scale, o = opacity, b = beat (0 row … 4 repeat).
  const row = { c: [{ x: 0.2, y: 0.26, s: 0.62, o: 0.6 }, { x: 0.5, y: 0.26, s: 0.62, o: 0.6 }, { x: 0.8, y: 0.26, s: 0.62, o: 0.6 }], t: { x: 0.2, y: 0.62 }, b: 0, po: 0, ta: 0, la: 0 };
  const K = [
    { p: 0.0, ...row },
    { p: 0.11, c: [{ x: 0.2, y: 0.32, s: 1.12, o: 1 }, { x: 0.5, y: 0.75, s: 0.7, o: 1 }, { x: 0.8, y: 0.73, s: 0.7, o: 1 }], t: { x: 0.2, y: 0.66 }, b: 1, po: 1, ta: 1, la: 0 },
    { p: 0.2, c: [{ x: 0.2, y: 0.32, s: 1.12, o: 1 }, { x: 0.5, y: 0.75, s: 0.7, o: 1 }, { x: 0.8, y: 0.73, s: 0.7, o: 1 }], t: { x: 0.2, y: 0.66 }, b: 1, po: 1, ta: 1, la: 0 },
    { p: 0.3, c: [{ x: 0.2, y: 0.74, s: 0.7, o: 1 }, { x: 0.5, y: 0.31, s: 1.12, o: 1 }, { x: 0.8, y: 0.74, s: 0.7, o: 1 }], t: { x: 0.5, y: 0.64 }, b: 2, po: 1, ta: 1, la: 0 },
    { p: 0.39, c: [{ x: 0.2, y: 0.74, s: 0.7, o: 1 }, { x: 0.5, y: 0.31, s: 1.12, o: 1 }, { x: 0.8, y: 0.74, s: 0.7, o: 1 }], t: { x: 0.5, y: 0.64 }, b: 2, po: 1, ta: 1, la: 0 },
    { p: 0.49, c: [{ x: 0.2, y: 0.75, s: 0.7, o: 1 }, { x: 0.5, y: 0.75, s: 0.7, o: 1 }, { x: 0.8, y: 0.32, s: 1.12, o: 1 }], t: { x: 0.8, y: 0.66 }, b: 3, po: 1, ta: 1, la: 0 },
    { p: 0.58, c: [{ x: 0.2, y: 0.75, s: 0.7, o: 1 }, { x: 0.5, y: 0.75, s: 0.7, o: 1 }, { x: 0.8, y: 0.32, s: 1.12, o: 1 }], t: { x: 0.8, y: 0.66 }, b: 3, po: 1, ta: 1, la: 0 },
    { p: 0.69, c: [{ x: 0.22, y: 0.33, s: 0.95, o: 1 }, { x: 0.5, y: 0.76, s: 0.95, o: 1 }, { x: 0.78, y: 0.33, s: 0.95, o: 1 }], t: { x: 0.5, y: 0.36 }, b: 4, po: 1, ta: 1, la: 1 },
    { p: 0.78, c: [{ x: 0.22, y: 0.33, s: 0.95, o: 1 }, { x: 0.5, y: 0.76, s: 0.95, o: 1 }, { x: 0.78, y: 0.33, s: 0.95, o: 1 }], t: { x: 0.5, y: 0.36 }, b: 4, po: 1, ta: 1, la: 1 },
    { p: 0.81, c: [{ x: 0.22, y: 0.33, s: 0.95, o: 1 }, { x: 0.5, y: 0.76, s: 0.95, o: 1 }, { x: 0.78, y: 0.33, s: 0.95, o: 1 }], t: { x: 0.5, y: 0.36 }, b: 4, po: 1, ta: 0, la: 0 },
    { p: 0.865, c: [{ x: 0.5, y: 0.3, s: 0.6, o: 1 }, { x: 0.5, y: 0.405, s: 0.6, o: 1 }, { x: 0.5, y: 0.51, s: 0.6, o: 1 }], t: { x: 0.5, y: 0.36 }, b: 4, po: 0, ta: 0, la: 0 },
    { p: 0.93, c: [{ x: 0.5, y: 0.405, s: 0.08, o: 0 }, { x: 0.5, y: 0.405, s: 0.08, o: 0 }, { x: 0.5, y: 0.405, s: 0.08, o: 0 }], t: { x: 0.5, y: 0.36 }, b: 4, po: 0, ta: 0, la: 0 },
    { p: 1.0, c: [{ x: 0.5, y: 0.405, s: 0.08, o: 0 }, { x: 0.5, y: 0.405, s: 0.08, o: 0 }, { x: 0.5, y: 0.405, s: 0.08, o: 0 }], t: { x: 0.5, y: 0.36 }, b: 4, po: 0, ta: 0, la: 0 },
  ];
  const mix = (A, B, k) => ({
    c: A.c.map((a, i) => ({ x: lerp(a.x, B.c[i].x, k), y: lerp(a.y, B.c[i].y, k), s: lerp(a.s, B.c[i].s, k), o: lerp(a.o, B.c[i].o, k) })),
    t: { x: lerp(A.t.x, B.t.x, k), y: lerp(A.t.y, B.t.y, k) },
    b: lerp(A.b, B.b, k), po: lerp(A.po, B.po, k), ta: lerp(A.ta, B.ta, k), la: lerp(A.la, B.la, k),
  });
  const stateAt = (p) => {
    let i = 0;
    while (i < K.length - 2 && p > K[i + 1].p) i++;
    const A = K[i], B = K[i + 1];
    return mix(A, B, easeSine(clamp((p - A.p) / (B.p - A.p))));
  };

  let fly = false, G = null;
  const layoutLoop = () => {
    if (!fly) return;
    const vw = innerWidth, vh = innerHeight;
    const cw = clamp(vw * 0.21, 250, 330), ch = cw * 0.88;
    G = { vw, vh, cw, ch };
    loop.style.setProperty('--cw', `${cw}px`);
    loop.style.setProperty('--ch', `${ch}px`);
    svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
  };
  const setFly = () => {
    const on = !!bridge && !reduce && wide.matches;
    if (on === fly) return;
    fly = on;
    root.classList.toggle('is-fly', fly);
    if (fly) layoutLoop();
  };

  // Catmull-Rom segment between P[i] and P[i+1] (neighbours clamped or wrapped)
  const seg = (P, i, closed) => {
    const n = P.length, g = (k) => (closed ? P[(k + n) % n] : P[clamp(k, 0, n - 1)]);
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    return `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  };
  const setDraw = (el, prog) => { el.style.strokeDasharray = '1 1'; el.style.strokeDashoffset = (1 - clamp(prog)).toFixed(4); };

  let cometOn = false, tp = 0, ps = 0, psInit = false;
  const updateBridge = () => {
    if (!fly || !G) return;
    const rect = bridge.getBoundingClientRect();
    tp = clamp(-rect.top / (rect.height - G.vh));
    if (!psInit) { ps = tp; psInit = true; renderBridge(ps); }
    follow();
    updateWork();
  };
  // the storyboard follows the scroll with a little inertia, so every move eases in and out
  const follow = () => {
    if (Math.abs(tp - ps) < 0.00015) { if (ps !== tp) { ps = tp; renderBridge(ps); } return; }
    ps += (tp - ps) * 0.085;
    renderBridge(ps);
  };
  const renderBridge = (p) => {
    const S = stateAt(p);
    const { vw, vh, cw, ch } = G;

    // cards: positions come from the storyboard, the current beat takes the spotlight
    const centers = S.c.map((c) => [c.x * vw, c.y * vh]);
    const stacked = p > 0.8;
    lcards.forEach((el, i) => {
      const c = S.c[i];
      el.style.transform = `translate3d(${(c.x * vw - cw / 2).toFixed(1)}px, ${(c.y * vh - ch / 2).toFixed(1)}px, 0) scale(${c.s.toFixed(3)})`;
      el.style.opacity = c.o.toFixed(3);
      const current = Math.abs(S.b - (i + 1)) < 0.5;
      el.classList.toggle('is-active', current || S.b > 3.5);
      el.style.zIndex = stacked ? 3 - i : current ? 4 : 1;
    });

    // headline: one word per beat, riding beside the spotlight card
    says.forEach((w, i) => w.style.setProperty('--wa', clamp(1 - (Math.abs(S.b - (i + 1)) - 0.12) / 0.3).toFixed(3)));
    sayBox.style.transform = `translate3d(${(S.t.x * vw).toFixed(1)}px, ${(S.t.y * vh).toFixed(1)}px, 0) translate(-50%, -50%)`;
    sayBox.style.opacity = S.ta.toFixed(3);
    lede.style.opacity = S.la.toFixed(3);

    // the line: one path through the three cards, drawn beat by beat
    const L = [-40, centers[0][1] + 40], Rr = [vw + 40, centers[2][1] - 30];
    const pts = [L, centers[0], centers[1], centers[2], Rr];
    for (let i = 0; i < 4; i++) {
      const d = seg(pts, i, false);
      openBase[i].setAttribute('d', d); openGreen[i].setAttribute('d', d);
    }
    const b = S.b, loopK = clamp(b - 3);
    setDraw(openGreen[0], b);                      // enters from the left
    setDraw(openGreen[1], b - 1);                  // card 1 → card 2
    setDraw(openGreen[2], b - 2);                  // card 2 → card 3
    setDraw(openGreen[3], (b - 2.5) / 0.5);        // leaves to the right
    const cx0 = centers[0], cx1 = centers[1], cx2 = centers[2];
    const closedPts = [cx0, [vw * 0.5, vh * 0.13], cx2, [vw * 0.72, (cx2[1] + cx1[1]) / 2 + 20], cx1, [vw * 0.28, (cx0[1] + cx1[1]) / 2 + 20]];
    const dc = closedPts.map((_, i) => seg(closedPts, i, true)).map((q, i) => (i ? q.replace(/^M [\d.\-]+ [\d.\-]+ /, '') : q)).join(' ') + ' Z';
    closedBase.setAttribute('d', dc); closedGreen.setAttribute('d', dc); comet.setAttribute('d', dc);
    setDraw(closedGreen, loopK);
    openG.style.opacity = (S.po * (1 - clamp((b - 3.4) / 0.6))).toFixed(3);
    closedG.style.opacity = (S.po * clamp((b - 3) / 0.5)).toFixed(3);
    cometOn = S.po > 0.5 && b > 3.9;
    comet.style.opacity = cometOn ? '1' : '0';
    dot.style.opacity = cometOn ? '1' : '0';
    cometPath = closedGreen;

    // the stack collapses into a point and, from that very moment, drops a line down the page
    const u = easeSine(clamp((p - 0.865) / 0.135));
    const y1 = 0.405 * vh;
    drop.setAttribute('x1', vw / 2); drop.setAttribute('x2', vw / 2);
    drop.setAttribute('y1', y1); drop.setAttribute('y2', y1 + (vh - y1) * u);
    drop.style.opacity = u > 0 ? 1 : 0;
    // a dot marks where the line begins, like the one where it ends
    const sd = clamp((p - 0.84) / 0.04);
    [dropDot, dropHalo].forEach((el) => { el.setAttribute('cx', vw / 2); el.setAttribute('cy', y1); });
    dropDot.style.opacity = sd.toFixed(3);
    dropHalo.style.opacity = (sd * 0.14 / 0.14).toFixed(3);
  };
  const updateWork = () => {
    // continuation: the same line keeps falling until it lands on the section title
    if (workSection) {
      const wr = workSection.getBoundingClientRect();
      const lead = parseFloat(getComputedStyle(workSection).paddingTop) || 200;
      const end = Math.max(0, lead - 22);
      const wl = clamp(G.vh - wr.top + 40, 0, end);
      workSection.style.setProperty('--wl', `${wl.toFixed(0)}px`);
      workSection.style.setProperty('--wd', wl >= end - 1 ? '1' : '0');
    }
    updateStack();
  };
  // work: drawings stay pinned and settle back as the next one slides over; the story text hands over with them
  const stack = [...document.querySelectorAll('.work')];
  const grid = document.querySelector('.work-grid');
  const updateStack = () => {
    if (!stack.length) return;
    const on = wide.matches && !reduce;
    grid.classList.toggle('is-stack', on);
    stack.forEach((el, i) => {
      const media = el.querySelector('.work__media');
      const text = el.querySelector('.work__text');
      if (!on) {
        media.style.transform = ''; media.style.removeProperty('--py');
        text.style.removeProperty('--tv'); text.style.removeProperty('--tt');
        return;
      }
      const top = parseFloat(getComputedStyle(media).top) || 96;
      // parallax: the drawing drifts a little inside its frame
      const r = media.getBoundingClientRect();
      const mid = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      // settle back when the next project covers this one
      const nxt = stack[i + 1] ? stack[i + 1].querySelector('.work__media').getBoundingClientRect().top : Infinity;
      const q = nxt === Infinity ? 0 : clamp((innerHeight - nxt) / (innerHeight - top));
      media.style.transform = `scale(${(1 - 0.05 * easeOut(q)).toFixed(4)})`;
      // text: fade in as its drawing arrives, out as the next one covers it
      const arrive = clamp((innerHeight * 0.92 - r.top) / (innerHeight * 0.4));
      const out = clamp((q - 0.35) / 0.4);
      text.style.setProperty('--tv', (arrive * (1 - out)).toFixed(3));
      text.style.setProperty('--tt', `${((1 - arrive) * 24 - out * 18).toFixed(1)}px`);
    });
  };
  let cometPath = null;
  const orbitLoop = (t) => {
    if (fly && G && psInit) follow();
    if (fly && G && cometOn && cometPath) {
      const len = cometPath.getTotalLength();
      const frac = ((t / 1000) * 0.14) % 1, tail = 0.12;
      const q = cometPath.getPointAtLength(frac * len);
      dot.setAttribute('cx', q.x); dot.setAttribute('cy', q.y);
      comet.style.strokeDasharray = `${tail} ${1 - tail}`;
      comet.style.strokeDashoffset = (((tail - frac) % 1) + 1) % 1;
    }
    requestAnimationFrame(orbitLoop);
  };
  if (bridge && !reduce) requestAnimationFrame(orbitLoop);

  setFly();
  wide.addEventListener('change', () => { setFly(); layoutLoop(); update(); });
  addEventListener('resize', () => { layoutLoop(); update(); });
  addEventListener('load', () => { layoutLoop(); update(); });

  // timeline (vertical) + evolve (case studies) -------------------------------
  const tl = document.querySelector('[data-timeline]');
  const ev = document.querySelector('[data-evolve]');
  let layers = [], steps = [], stageTT = null, track = null;
  if (ev) {
    stageTT = ev.querySelector('.evolve__stage--tt');
    track = ev.querySelector('.evolve__track');
    layers = [...ev.querySelectorAll('.layer')];
    steps = [...ev.querySelectorAll('.evolve__steps li')];
  }
  const pinned = () => ev && !reduce && wide.matches;
  const syncPin = () => {
    if (!ev) return;
    ev.classList.toggle('evolve--pinned', pinned());
    if (!pinned()) {
      layers.forEach((l) => l.style.removeProperty('--r'));
      steps.forEach((s) => s.classList.remove('is-active'));
      if (stageTT) ['--t2', '--t2b', '--l1', '--l2', '--l3', '--c1', '--c2', '--c3'].forEach((k) => stageTT.style.removeProperty(k));
    }
  };
  syncPin();
  wide.addEventListener('change', syncPin);

  // curtains: the black arc flattens as a dark section arrives
  const curtains = [...document.querySelectorAll('.curtain')];
  const updateCurtains = () => {
    curtains.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const jc = reduce ? 1 : clamp(1 - (top - innerHeight * 0.12) / (innerHeight * 0.8));
      el.style.setProperty('--jc', easeOut(jc).toFixed(3));
    });
  };

  // journey blurs out as the about section arrives; the footer lifts into view
  const jGrid = document.querySelector('.journey__grid');
  const jSec = document.querySelector('.journey');
  const footerEl = document.querySelector('.contact');
  const updateEdges = () => {
    if (jGrid && jSec && !reduce) {
      const k = easeOut(clamp((innerHeight * 1.05 - jSec.getBoundingClientRect().bottom) / (innerHeight * 1.0)));
      jGrid.style.setProperty('--jb', `${(k * 14).toFixed(1)}px`);
      jGrid.style.setProperty('--jo', (1 - k * 0.85).toFixed(3));
    }
    if (footerEl) {
      const left = document.documentElement.scrollHeight - innerHeight - scrollY;
      footerEl.style.setProperty('--fr', reduce ? 1 : clamp(1 - left / innerHeight).toFixed(3));
    }
  };

  // about: the quote starts messy and connects itself as you scroll
  const about = document.querySelector('[data-about]');
  const aWords = about ? [...about.querySelectorAll('.aw')] : [];
  const aQuote = about && about.querySelector('.about__quote');
  const aPath = about && about.querySelector('.about__path');
  const aBel = about ? [...about.querySelectorAll('.about__beliefs li')] : [];
  let aBase = [], aScat = [];
  const aPinned = () => about && !reduce && wide.matches;
  const rngA = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const measureAbout = () => {
    if (!about) return;
    about.classList.toggle('about--pinned', aPinned());
    if (!aPinned()) {
      aWords.forEach((w) => { w.style.transform = ''; w.style.filter = ''; w.style.opacity = ''; });
      if (aPath) aPath.style.opacity = 0;
      about.style.removeProperty('--bo');
      return;
    }
    const r = rngA(42);
    aBase = aWords.map((w) => [w.offsetLeft + w.offsetWidth / 2, w.offsetTop + w.offsetHeight / 2]);
    aScat = aWords.map(() => ({ dx: (r() - 0.5) * innerWidth * 0.78, dy: (r() - 0.5) * innerHeight * 0.62, rot: (r() - 0.5) * 46, s: 0.8 + r() * 0.5 }));
    aPath.parentNode.setAttribute('viewBox', `0 0 ${aQuote.offsetWidth} ${aQuote.offsetHeight}`);
  };
  const updateAbout = () => {
    if (!aPinned() || !aBase.length) return;
    const rect = about.getBoundingClientRect();
    const p = clamp(-rect.top / (rect.height - innerHeight));
    const n = aWords.length;
    let d = '';
    aWords.forEach((w, i) => {
      const t = clamp((p / 0.62 - (i / n) * 0.42) / 0.58);
      const e = easeOut(t), k = 1 - e, sc = aScat[i];
      const x = sc.dx * k, y = sc.dy * k;
      w.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(sc.rot * k).toFixed(1)}deg) scale(${(1 + (sc.s - 1) * k).toFixed(3)})`;
      w.style.opacity = (0.16 + 0.84 * easeOut(clamp(t * 1.6))).toFixed(3);
      w.style.filter = k > 0.01 ? `blur(${(k * 6).toFixed(1)}px)` : '';
      if (i % 3 === 0) d += `${d ? ' L' : 'M'} ${(aBase[i][0] + x).toFixed(1)} ${(aBase[i][1] + y).toFixed(1)}`;
    });
    aPath.setAttribute('d', d);
    aPath.style.opacity = (Math.sin(Math.PI * clamp(p / 0.46)) * 0.7).toFixed(3);
    about.style.setProperty('--bo', clamp((p - 0.66) / 0.14).toFixed(3));
    aBel.forEach((li, i) => li.style.setProperty('--bo', clamp((p - 0.7 - i * 0.05) / 0.12).toFixed(3)));
  };
  if (about) {
    measureAbout();
    wide.addEventListener('change', () => { measureAbout(); update(); });
    addEventListener('resize', () => { measureAbout(); update(); });
    addEventListener('load', () => { measureAbout(); update(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureAbout(); update(); });
  }

  // case study: pin the hero's bottom so the sheet slides over it, and soften it as it is covered
  const caseTop = document.querySelector('.case-top');
  const updateCase = () => {
    if (!caseTop) return;
    if (!wide.matches || reduce) { caseTop.style.top = ''; caseTop.style.setProperty('--cp', 0); return; }
    caseTop.style.top = `${Math.min(0, innerHeight - caseTop.offsetHeight)}px`;
    const cover = clamp(scrollY / Math.max(1, caseTop.offsetHeight - innerHeight * 0.1));
    caseTop.style.setProperty('--cp', easeOut(cover).toFixed(3));
  };

  // thread: starts with the story, ends at the "How it evolved" title
  const thread = document.querySelector('.thread');
  const storyEl = document.querySelector('.case-sheet .story');
  const evolveH = document.querySelector('.evolve__h');
  let thTop = 0, thLen = 0;
  const measureThread = () => {
    if (!thread || !storyEl || !evolveH || !wide.matches) return;
    const sheetTop = thread.parentElement.getBoundingClientRect().top + scrollY;
    const st = storyEl.getBoundingClientRect().top + scrollY + parseFloat(getComputedStyle(storyEl).paddingTop);
    const en = evolveH.getBoundingClientRect().top + scrollY + 6;
    thTop = st; thLen = Math.max(0, en - st);
    thread.style.top = `${st - sheetTop}px`;
    thread.style.height = `${thLen}px`;
    thread.style.setProperty('--th', `${thLen}px`);
  };
  const updateThread = () => {
    if (!thread) return;
    if (!wide.matches || reduce) { thread.style.setProperty('--tp', reduce ? 1 : 0); return; }
    const p = clamp((scrollY + innerHeight * 0.55 - thTop) / Math.max(1, thLen));
    thread.style.setProperty('--tp', p.toFixed(4));
    const dot = thread.querySelector('.thread__dot');
    if (dot) dot.classList.toggle('is-end', p >= 0.995);
  };
  if (thread) {
    measureThread();
    wide.addEventListener('change', () => { measureThread(); update(); });
    addEventListener('resize', () => { measureThread(); update(); });
    addEventListener('load', () => { measureThread(); update(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureThread(); update(); });
  }

  const nav = document.querySelector('.nav');
  let lastY = scrollY, hx = 0;
  function update() {
    const vh = innerHeight;
    if (nav) {
      const dy = scrollY - lastY;
      if (Math.abs(dy) > 6) { nav.classList.toggle('is-hidden', dy > 0 && scrollY > 160); lastY = scrollY; }
    }

    if (heroImg && !reduce) {
      const hs = clamp(scrollY / (vh * 0.9));
      hx = hs;
      heroImg.style.setProperty('--ty', `${(ptyC + hs * 70).toFixed(1)}px`);
      heroImg.style.setProperty('--tx', `${ptxC.toFixed(1)}px`);
      if (heroCopy) {
        heroCopy.style.setProperty('--hx', `${(-hs * 60).toFixed(1)}px`);
        heroCopy.style.setProperty('--ho', (1 - hs * 0.9).toFixed(3));
      }
      const hb = easeOut(clamp(scrollY / (vh * 0.62)));
      root.style.setProperty('--hb', `${(hb * 16).toFixed(1)}px`);
      root.style.setProperty('--hbo', (1 - hb * 0.82).toFixed(3));
    }

    updateBridge();
    updateCase();
    updateThread();
    updateCurtains();
    updateEdges();
    updateAbout();

    if (tl) {
      const r = tl.getBoundingClientRect();
      const line = vh * 0.62;
      tl.style.setProperty('--tl', reduce ? 1 : clamp((line - r.top) / r.height).toFixed(3));
      [...tl.children].forEach((s) => s.classList.toggle('is-on', reduce || r.top + s.offsetTop + 40 < line));
    }

    if (pinned()) {
      const r = (track || ev).getBoundingClientRect();
      const total = r.height - vh * 0.86;
      const p = clamp(-r.top / total) * 2; // 0..2
      layers.forEach((l, i) => { if (i > 0) l.style.setProperty('--r', clamp(p - (i - 1)).toFixed(3)); });
      const active = p < 0.55 ? 0 : p < 1.25 ? 1 : 2;
      steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
      if (stageTT) {
        // the product evolves: table → timeline → scenario lines one by one → scenario cards
        const seg = (a, len) => easeInOut(clamp((p - a) / len)).toFixed(3);
        const set = (k, v) => stageTT.style.setProperty(k, v);
        set('--t2', seg(0.5, 0.55)); set('--t2b', seg(0.85, 0.4));
        set('--l1', seg(1.25, 0.2)); set('--l2', seg(1.42, 0.2)); set('--l3', seg(1.59, 0.2));
        set('--c1', seg(1.72, 0.14)); set('--c2', seg(1.8, 0.14)); set('--c3', seg(1.88, 0.12));
      }
    }
  }
  if (lenis) lenis.on('scroll', update);
  addEventListener('scroll', update, { passive: true });

  // eased pointer follow for the hero photo
  if (heroImg && fine && !reduce) {
    const loop = () => {
      ptxC += (ptx - ptxC) * 0.07; ptyC += (pty - ptyC) * 0.07;
      if (Math.abs(ptx - ptxC) > 0.05 || Math.abs(pty - ptyC) > 0.05) update();
      requestAnimationFrame(loop);
    };
    loop();
  }
  update();

  // cursor label ----------------------------------------------------------
  const cur = document.querySelector('.cursor');
  if (cur && fine) {
    const label = cur.querySelector('span');
    let x = 0, y = 0, cx = 0, cy = 0, on = false;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      const t = e.target.closest && e.target.closest('[data-cursor]');
      if (t) { label.textContent = t.dataset.cursor; if (!on) { cx = x; cy = y; } }
      on = !!t;
      cur.classList.toggle('is-on', on);
    }, { passive: true });
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cur.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }
})();
