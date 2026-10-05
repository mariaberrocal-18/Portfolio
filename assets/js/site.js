// Interaction layer. Everything degrades to a static, fully readable page.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
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
        lenis.scrollTo(target, { offset: target === 0 ? 0 : -24, duration: 1.4 });
      });
    });
  }

  // page-load sequence ----------------------------------------------------
  const ready = () => {
    root.classList.add('is-ready');
    document.querySelectorAll('.hero [data-lines]').forEach((el) => el.classList.add('is-in'));
  };
  (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]) : Promise.resolve()).then(() => requestAnimationFrame(ready));

  // reveal on view (media, drawn lines, contact headline) ------------------
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

  // scroll-driven: hero parallax, timeline, evolve -------------------------
  const hero = document.querySelector('.hero__photo img');
  const tl = document.querySelector('[data-timeline]');
  const ev = document.querySelector('[data-evolve]');
  const evMQ = matchMedia('(min-width: 960px)');
  let layers = [], steps = [];
  if (ev) {
    layers = [...ev.querySelectorAll('.layer')];
    steps = [...ev.querySelectorAll('.evolve__steps li')];
  }
  const pinned = () => ev && !reduce && evMQ.matches;
  const syncPin = () => {
    if (!ev) return;
    ev.classList.toggle('evolve--pinned', pinned());
    if (!pinned()) { layers.forEach((l) => l.style.removeProperty('--r')); steps.forEach((s) => s.classList.remove('is-active')); }
  };
  syncPin();
  evMQ.addEventListener('change', syncPin);

  const nav = document.querySelector('.nav');
  let lastY = scrollY;
  const update = () => {
    const vh = innerHeight;
    if (nav) {
      const dy = scrollY - lastY;
      if (Math.abs(dy) > 6) { nav.classList.toggle('is-hidden', dy > 0 && scrollY > 160); lastY = scrollY; }
    }
    if (hero && !reduce && scrollY < vh * 1.2) hero.style.setProperty('--py', `${scrollY * 0.05}px`);

    if (tl) {
      const r = tl.getBoundingClientRect();
      const vertical = getComputedStyle(tl).gridTemplateColumns.split(' ').length === 1;
      const p = vertical ? clamp((vh * 0.7 - r.top) / r.height) : clamp((vh * 0.82 - r.top) / (vh * 0.4));
      tl.style.setProperty('--tl', reduce ? 1 : p.toFixed(3));
      const items = [...tl.children];
      items.forEach((s, i) => s.classList.toggle('is-on', reduce || p >= (i / items.length) + 0.04));
    }

    if (pinned()) {
      const r = ev.getBoundingClientRect();
      const total = r.height - vh * 0.86;
      const p = clamp(-r.top / total) * 2; // 0..2
      layers.forEach((l, i) => { if (i > 0) l.style.setProperty('--r', clamp(p - (i - 1)).toFixed(3)); });
      const active = Math.min(2, Math.round(p));
      steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
    }
  };
  if (lenis) lenis.on('scroll', update);
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
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
