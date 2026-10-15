/* cursor-fx.js — blueprint flashlight (hero) + shape trail (playground) */
(() => {
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduce) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- A. blueprint flashlight ---------- */

  function gearPath(teeth, rOut, rIn) {
    const step = (Math.PI * 2) / teeth;
    const pts = [];
    for (let i = 0; i < teeth; i++) {
      [[0, rIn], [0.2, rOut], [0.5, rOut], [0.7, rIn]].forEach(([f, r]) => {
        const t = i * step + f * step;
        pts.push(`${(Math.cos(t) * r).toFixed(1)},${(Math.sin(t) * r).toFixed(1)}`);
      });
    }
    return `M${pts.join('L')}Z`;
  }

  function initBlueprint() {
    const hero = $('.hero');
    if (!hero) return;

    const overlay = document.createElement('div');
    overlay.className = 'blueprint';
    overlay.setAttribute('aria-hidden', 'true');
    hero.appendChild(overlay);

    let gears = [];

    /* Drawn from the letters' real positions, so rebuilt on first hover + resize. */
    function build() {
        const hr = hero.getBoundingClientRect();
        const rects = $$('.name-letter')
        .map((el) => el.getBoundingClientRect())
        .filter((q) => q.width > 1 && q.height > 1);   /* ignore letters that haven't loaded */
        if (!rects.length) return;

        const l = Math.min(...rects.map((q) => q.left)) - hr.left;
        const r = Math.max(...rects.map((q) => q.right)) - hr.left;
        const t = Math.min(...rects.map((q) => q.top)) - hr.top;
        const b = Math.max(...rects.map((q) => q.bottom)) - hr.top;
        const cx = (l + r) / 2, cy = (t + b) / 2;

        if (location.search.includes('bpdebug')) {
        console.log('blueprint box', { l, r, t, b, hero: [hr.width, hr.height], letters: rects.length });
        }

      overlay.innerHTML = `
        <svg width="${hr.width}" height="${hr.height}" viewBox="0 0 ${hr.width} ${hr.height}">
          <g class="bp-lines">
            <!-- centerlines + construction circle -->
            <line x1="${l - 40}" y1="${cy}" x2="${r + 40}" y2="${cy}" stroke-dasharray="14 5 3 5"/>
            <line x1="${cx}" y1="${t - 40}" x2="${cx}" y2="${b + 40}" stroke-dasharray="14 5 3 5"/>
            <circle cx="${cx}" cy="${cy}" r="${(b - t) / 2}" stroke-dasharray="4 6"/>
            <!-- horizontal dimension -->
            <line x1="${l}" y1="${t - 22}" x2="${r}" y2="${t - 22}"/>
            <path d="M${l} ${t - 30}v16M${r} ${t - 30}v16M${l} ${t - 22}l9 -4v8zM${r} ${t - 22}l-9 -4v8z"/>
            <text x="${cx}" y="${t - 30}" text-anchor="middle">joy ± 0.01</text>
            <!-- vertical dimension -->
            <line x1="${l - 26}" y1="${t}" x2="${l - 26}" y2="${b}"/>
            <path d="M${l - 34} ${t}h16M${l - 34} ${b}h16M${l - 26} ${t}l-4 9h8zM${l - 26} ${b}l-4 -9h8z"/>
            <text transform="translate(${l - 34} ${cy}) rotate(-90)" text-anchor="middle">hand-lettered</text>
            <!-- meshing gear pair -->
            <g transform="translate(${l + 10} ${b + 70})"><g class="gear" data-ratio="1"><path d="${gearPath(12, 48, 40)}"/><circle r="10"/></g></g>
            <g transform="translate(${l + 10 + 77} ${b + 70 - 12})"><g class="gear" data-ratio="-1.5" data-offset="13"><path d="${gearPath(8, 32, 25)}"/><circle r="7"/></g></g>
            <!-- lone gear, top right -->
            <g transform="translate(${r - 10} ${t - 80})"><g class="gear" data-ratio="0.8"><path d="${gearPath(10, 38, 31)}"/><circle r="8"/></g></g>
          </g>
        </svg>`;

      gears = $$('.gear', overlay).map((el) => ({
        el,
        ratio: parseFloat(el.dataset.ratio),
        offset: parseFloat(el.dataset.offset || 0),
      }));
    }

    let tx = 0, ty = 0, x = 0, y = 0, angle = 0, running = false;

    function frame() {
      const nx = x + (tx - x) * 0.14;
      const ny = y + (ty - y) * 0.14;
      angle += (nx - x) * 0.6 + (ny - y) * 0.2; /* gears turn as the light moves */
      x = nx; y = ny;
      overlay.style.setProperty('--bx', `${x}px`);
      overlay.style.setProperty('--by', `${y}px`);
      gears.forEach((g) => { g.el.style.transform = `rotate(${angle * g.ratio + g.offset}deg)`; });
      if (running) requestAnimationFrame(frame);
    }

    /* ---- on/off toggle + jiggly hint ---- */
    let enabled = false;
    const HINT_OFF = 'click to see behind the scenes';
    const HINT_ON = '';

    const hint = document.createElement('p');
    hint.className = 'fx-hint';
    hint.setAttribute('aria-hidden', 'true');
    hero.appendChild(hint);

    function setHint(text) {
    hint.innerHTML = [...text]
        .map((ch, i) =>
        ch === ' '
            ? '<span class="fx-hint__space"></span>'
            : `<span style="animation-delay:${(-i * 0.20).toFixed(2)}s">${ch}</span>`
        )
        .join('');
    }
    setHint(HINT_OFF);

    function lightOn(e) {
        build();
        const hr = hero.getBoundingClientRect();
        tx = x = e.clientX - hr.left;
        ty = y = e.clientY - hr.top;
        overlay.classList.add('is-on');
        if (!running) { running = true; requestAnimationFrame(frame); }
    }

    function lightOff() {
        overlay.classList.remove('is-on');
        setTimeout(() => { if (!overlay.classList.contains('is-on')) running = false; }, 450);
        }

    hero.addEventListener('mouseenter', (e) => { if (enabled) lightOn(e); });

    hero.addEventListener('mousemove', (e) => {
        const hr = hero.getBoundingClientRect();
        tx = e.clientX - hr.left;
        ty = e.clientY - hr.top;
    }, { passive: true });

    hero.addEventListener('mouseleave', lightOff);

    hero.addEventListener('click', (e) => {
        if (e.target.closest('a, button')) return;   /* don't toggle when using the scroll arrow */
        enabled = !enabled;
        setHint(enabled ? HINT_ON : HINT_OFF);
        if (enabled) lightOn(e); else lightOff();
    });

    window.addEventListener('resize', build);
    setTimeout(build, 1800);
  }

  /* ---------- B. playground shape trail ---------- */

  function initShapeTrail() {
    const zones = $$('[data-shape-trail], #playground');
    if (!zones.length) return;

    const SRCS = ['shapes/star.png', 'shapes/asterisk.png', 'shapes/exclaim.png', 'shapes/heart.png'];
    const POOL = 8, STEP = 50;

    const pool = Array.from({ length: POOL }, () => {
      const img = new Image();
      img.className = 'trail-shape';
      img.alt = '';
      img.draggable = false;
      document.body.appendChild(img);
      return img;
    });

    let i = 0, lx = null, ly = null;
    const rand = (a, b) => a + Math.random() * (b - a);

    function spawn(x, y) {
      const el = pool[i++ % POOL];
      el.getAnimations().forEach((a) => a.cancel());
      el.src = SRCS[Math.floor(Math.random() * SRCS.length)];
      el.style.width = `${rand(22, 34)}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      const r = rand(-30, 30), dx = rand(-14, 14), dy = rand(-34, -12);
      el.animate(
        [
          { opacity: 0, transform: `translate(-50%,-50%) scale(0) rotate(${r}deg)` },
          { opacity: 1, offset: 0.25, transform: `translate(-50%,-50%) scale(1.15) rotate(${r + 10}deg)` },
          { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.5) rotate(${r + 45}deg)` },
        ],
        { duration: 650, easing: 'ease-out' }
      );
    }

    zones.forEach((zone) => {
        zone.addEventListener('mouseenter', (e) => { lx = e.clientX; ly = e.clientY; });
        zone.addEventListener('mouseleave', () => { lx = null; });
        zone.addEventListener('mousemove', (e) => {
            if (lx === null) { lx = e.clientX; ly = e.clientY; return; }
            if (Math.hypot(e.clientX - lx, e.clientY - ly) < STEP) return;
            lx = e.clientX; ly = e.clientY;
            spawn(lx, ly);
        }, { passive: true });
    });
  }

  initBlueprint();
  initShapeTrail();
})();