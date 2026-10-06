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
        const target = url.hash === '#top' || url.hash === '' ? 0 : document.querySelector(url.hash);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: target === 0 ? 0 : -24, duration: 1.5 });
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

  // loop story: three disciplines orbit, then unwind into a line down the work ---
  const bridge = document.querySelector('[data-bridge]');
  const loop = bridge && bridge.querySelector('.loop');
  const workSection = document.querySelector('.work-wrap');
  const lcards = loop ? [...loop.querySelectorAll('.lcard')] : [];
  const says = loop ? [...loop.querySelectorAll('.say__w')] : [];
  const ring = loop && loop.querySelector('.loop__ring');
  const dot = loop && loop.querySelector('.loop__dot');
  const drop = loop && loop.querySelector('.loop__drop');
  const svg = loop && loop.querySelector('.loop__svg');
  const ANG = [-60, 60, 180]; // clockwise from the top: Product thinking → Visual craft → Pace
  let fly = false, G = null, orbit = 0, orbitOn = false;

  const layoutLoop = () => {
    if (!fly) return;
    const vw = innerWidth, vh = innerHeight;
    const cw = clamp(vw * 0.21, 250, 330), ch = cw * 0.78;
    const cx = vw / 2, cy = vh * 0.5;
    const rx = Math.min(vw * 0.34, 520), ry = Math.min(vh * 0.27, 240);
    G = { vw, vh, cw, ch, cx, cy, rx, ry };
    loop.style.setProperty('--cw', `${cw}px`);
    loop.style.setProperty('--ch', `${ch}px`);
    svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    ring.setAttribute('d', `M ${cx} ${cy - ry} A ${rx} ${ry} 0 1 1 ${cx} ${cy + ry} A ${rx} ${ry} 0 1 1 ${cx} ${cy - ry}`);
    drop.setAttribute('x1', cx); drop.setAttribute('x2', cx);
    drop.setAttribute('y1', cy + ry);
  };
  const onRing = (deg) => { const r = (deg * Math.PI) / 180; return [G.cx + G.rx * Math.sin(r), G.cy - G.ry * Math.cos(r)]; };

  const setFly = () => {
    const on = !!bridge && !reduce && wide.matches;
    if (on === fly) return;
    fly = on;
    root.classList.toggle('is-fly', fly);
    if (fly) layoutLoop();
  };

  const updateBridge = () => {
    if (!fly || !G) return;
    const rect = bridge.getBoundingClientRect();
    const p = clamp(-rect.top / (rect.height - G.vh));
    // story beats: Frame it → Craft it → Ship it → Repeat → unwind
    const beat = p < 0.07 ? -1 : p < 0.25 ? 0 : p < 0.43 ? 1 : p < 0.61 ? 2 : 3;
    const u = easeInOut(clamp((p - 0.7) / 0.26)); // unwind 0..1
    const drift = Math.sin(p * Math.PI * 2) * 0; // keep the loop calm; motion comes from the beats

    lcards.forEach((el, i) => {
      const [x, y] = onRing(ANG[i]);
      const focus = beat === i ? 1.08 : beat === 3 ? 1 : beat < 0 ? 0.96 : 0.9;
      const tx = lerp(x, G.cx, u), ty = lerp(y, G.cy + G.ry + 10, u);
      const sc = lerp(focus, 0.18, u);
      el.style.transform = `translate3d(${tx - G.cw / 2}px, ${ty - G.ch / 2}px, 0) scale(${sc.toFixed(3)})`;
      el.style.opacity = (beat === i || beat === 3 || beat < 0 ? 1 : 0.55) * (1 - u * u);
      el.style.zIndex = beat === i ? 3 : 1;
      el.classList.toggle('is-active', beat === i || beat === 3);
    });
    says.forEach((w, i) => {
      w.classList.toggle('is-on', i === beat);
      w.classList.toggle('is-past', i < beat);
    });
    loop.querySelector('.loop__say').style.opacity = (1 - clamp(u * 2.5)).toFixed(3);
    ring.style.opacity = (1 - u).toFixed(3);
    dot.style.opacity = (1 - clamp(u * 3)).toFixed(3);
    // the line runs from the bottom of the loop to the bottom of the stage
    drop.setAttribute('y2', G.cy + G.ry + (G.vh - (G.cy + G.ry)) * u);
    drop.style.opacity = u > 0 ? 1 : 0;
    orbitOn = rect.bottom > 0 && rect.top < G.vh;

    // continuation: the same line, in the work section's gutter
    if (workSection) {
      const wr = workSection.getBoundingClientRect();
      workSection.style.setProperty('--wl', `${clamp(G.vh - wr.top + 40, 0, wr.height).toFixed(0)}px`);
    }
  };
  const orbitLoop = (t) => {
    if (fly && G && orbitOn) {
      const [x, y] = onRing(((t / 1000) * 38) % 360);
      dot.setAttribute('cx', x); dot.setAttribute('cy', y);
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
  let layers = [], steps = [];
  if (ev) {
    layers = [...ev.querySelectorAll('.layer')];
    steps = [...ev.querySelectorAll('.evolve__steps li')];
  }
  const pinned = () => ev && !reduce && wide.matches;
  const syncPin = () => {
    if (!ev) return;
    ev.classList.toggle('evolve--pinned', pinned());
    if (!pinned()) { layers.forEach((l) => l.style.removeProperty('--r')); steps.forEach((s) => s.classList.remove('is-active')); }
  };
  syncPin();
  wide.addEventListener('change', syncPin);

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
    }

    updateBridge();

    if (tl) {
      const r = tl.getBoundingClientRect();
      const line = vh * 0.62;
      tl.style.setProperty('--tl', reduce ? 1 : clamp((line - r.top) / r.height).toFixed(3));
      [...tl.children].forEach((s) => s.classList.toggle('is-on', reduce || r.top + s.offsetTop + 40 < line));
    }

    if (pinned()) {
      const r = ev.getBoundingClientRect();
      const total = r.height - vh * 0.86;
      const p = clamp(-r.top / total) * 2; // 0..2
      layers.forEach((l, i) => { if (i > 0) l.style.setProperty('--r', clamp(p - (i - 1)).toFixed(3)); });
      const active = Math.min(2, Math.round(p));
      steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
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
