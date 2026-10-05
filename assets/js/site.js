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

  // bridge: floating tiles that become the selected work ----------------------
  const bridge = document.querySelector('[data-bridge]');
  const grid = document.querySelector('[data-grid]');
  const tiles = bridge ? [...bridge.querySelectorAll('.tile')] : [];
  const reals = grid ? [...grid.querySelectorAll('.work__media')] : [];
  const starts = [
    { x: 0.17, y: 0.62, r: -7, dx: -40 },
    { x: 0.4, y: 0.3, r: 5, dx: 20 },
    { x: 0.63, y: 0.68, r: -4, dx: -10 },
    { x: 0.84, y: 0.34, r: 8, dx: 40 },
  ];
  let fly = false, geo = [], tw = 0, th = 0, bTop = 0, bH = 0;

  const measure = () => {
    if (!fly) return;
    const vh = innerHeight, vw = innerWidth, sy = scrollY;
    const br = bridge.getBoundingClientRect();
    bTop = br.top + sy; bH = br.height;
    const endScroll = bTop + bH - vh;
    geo = reals.map((m) => {
      const r = m.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + sy - endScroll + r.height / 2, w: r.width, h: r.height };
    });
    tw = geo[0].w; th = geo[0].h;
    bridge.style.setProperty('--tw', `${tw}px`);
    bridge.style.setProperty('--th', `${th}px`);
    tiles.forEach((t, i) => { t.dataset.s0 = clamp(vw * 0.2, 200, 300) / tw; });
  };

  const setFly = () => {
    const on = !!bridge && !reduce && wide.matches;
    if (on === fly) return;
    fly = on;
    root.classList.toggle('is-fly', fly);
    if (fly) {
      // real cards are already revealed: they simply take over from the tiles
      grid.querySelectorAll('.v[data-reveal]').forEach((v) => v.classList.add('is-in'));
      measure();
    } else {
      grid.classList.remove('is-landed');
      bridge.style.removeProperty('--hp');
    }
  };

  const updateBridge = () => {
    if (!fly || !geo.length) return;
    const vh = innerHeight, vw = innerWidth;
    const rect = bridge.getBoundingClientRect();
    const p = clamp(-rect.top / (rect.height - vh));
    const t = easeInOut(clamp((p - 0.2) / 0.62)); // travel 0..1
    const f = easeInOut(clamp((t - 0.35) / 0.4)); // flip 0..1
    tiles.forEach((el, i) => {
      const s = starts[i], g = geo[i];
      const s0 = parseFloat(el.dataset.s0);
      const sx = s.x * vw + s.dx * p;
      const sy = s.y * vh - p * 70 * (i % 2 ? 1 : -1);
      const x = lerp(sx, g.cx, t);
      const y = lerp(sy, g.cy, t);
      const rot = lerp(s.r + p * 6, 0, t);
      const sc = lerp(s0, 1, easeOut(t));
      el.style.transform = `translate3d(${x - tw / 2}px, ${y - th / 2}px, 0) rotate(${rot}deg) scale(${sc})`;
      el.style.setProperty('--sx', Math.max(0.001, Math.abs(Math.cos(f * Math.PI))).toFixed(3));
      el.classList.toggle('is-back', f >= 0.5);
      el.style.setProperty('--b', (1 - t).toFixed(3));
      el.classList.toggle('is-hidden', p >= 0.985);
    });
    bridge.style.setProperty('--hp', clamp((p - 0.45) / 0.3).toFixed(3));
    grid.classList.toggle('is-landed', p >= 0.985);
  };

  setFly();
  wide.addEventListener('change', () => { setFly(); measure(); update(); });
  addEventListener('resize', () => { measure(); update(); });
  addEventListener('load', () => { measure(); update(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); update(); });

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
