/* ==========================================================================
   main.js — shared behaviour for every page
   --------------------------------------------------------------------------
   Each block below guards on the elements it needs, so this one file can be
   loaded by index.html, about.html, playground.html and the project pages
   without anything blowing up on the pages that do not use it.

   Contents
   01. helpers
   02. themes + konami code
   03. confetti button
   04. repel engine (shared by the hero letters and the drifting shapes)
   05. hero: floating letters
   06. hero: drifting geometric shapes
   07. hero: rotating tagline
   08. featured projects deck
   09. playground marquee
   10. playground archive: grid, filters, modal
   11. about page: say hi
   12. scroll reveal
   13. tap-to-flip on touch devices
   ========================================================================== */

/* 01. helpers ---------------------------------------------------------- */
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Escape text before it goes anywhere near innerHTML. */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Render an array of tag strings as chips. */
function tagChips(tags, extraClass = '') {
  if (!tags || !tags.length) return '';
  return tags
    .map((tag) => `<li class="chip ${extraClass}">${esc(tag)}</li>`)
    .join('');
}

const canHover = window.matchMedia('(hover: hover)').matches;

/* 02. themes + konami code -------------------------------------------- */
const THEMES = [
  { id: 'default', emoji: '🦕', label: 'the usual', from: '#64b496', to: '#7ec8e3' },
  { id: 'sunset', emoji: '🌅', label: 'sunset', from: '#ff6b6b', to: '#ffa07a' },
  { id: 'purple', emoji: '🪻', label: 'purple', from: '#a78bfa', to: '#c084fc' },
  { id: 'ocean', emoji: '🌊', label: 'ocean', from: '#4a9eff', to: '#0ea5e9' },
  { id: 'forest', emoji: '🌲', label: 'forest', from: '#52b788', to: '#95d5b2' },
  { id: 'rose', emoji: '🌸', label: 'rose', from: '#fb6f92', to: '#fda4af' },
  { id: 'monochrome', emoji: '⚙️', label: 'monochrome', from: '#6b7280', to: '#9ca3af' },
  { id: 'cmu', emoji: '🐕‍🦺', label: 'cmu', from: '#c41230', to: '#8c8b8b' },
];

function applyTheme(id) {
  if (id === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', id);
  }
  try {
    localStorage.setItem('theme', id);
  } catch (err) {
    /* private browsing — the theme just will not persist, which is fine */
  }
}

/* Restore the saved theme immediately so there is no colour flash. */
(function restoreTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved && saved !== 'default') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (err) {
    /* ignore */
  }
})();

/**
 * The picker is injected rather than duplicated into all four html files.
 * It is a pure easter egg, so it is fine for it to be JS-only.
 */
function buildThemePicker() {
  const picker = document.createElement('div');
  picker.className = 'theme-picker';
  picker.id = 'theme-picker';
  picker.setAttribute('role', 'dialog');
  picker.setAttribute('aria-modal', 'false');
  picker.setAttribute('aria-label', 'Colour theme picker');
  picker.innerHTML = `
    <h3 class="heading-3">you found it!</h3>
    <p>congrats, pick a vibe now:</p>
    <div class="theme-grid">
      ${THEMES.map(
        (theme) => `
        <button class="theme-btn" type="button" data-theme-id="${theme.id}" title="${esc(theme.label)}"
          aria-label="${esc(theme.label)} theme"
          style="background: linear-gradient(135deg, ${theme.from}, ${theme.to});">${theme.emoji}</button>`
      ).join('')}
    </div>
    <button class="btn btn--sm" type="button" data-close-picker>close</button>
  `;
  document.body.appendChild(picker);

  picker.addEventListener('click', (event) => {
    const themeBtn = event.target.closest('[data-theme-id]');
    if (themeBtn) {
      applyTheme(themeBtn.dataset.themeId);
      throwConfetti(0.8);
      return;
    }
    if (event.target.closest('[data-close-picker]')) {
      picker.classList.remove('is-open');
    }
  });

  return picker;
}

function initKonami() {
  const picker = buildThemePicker();
  const sequence = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let buffer = [];

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      picker.classList.remove('is-open');
      return;
    }
    buffer.push(event.key.toLowerCase());
    buffer = buffer.slice(-sequence.length);
    if (buffer.join(',') === sequence.join(',')) {
      picker.classList.add('is-open');
      throwConfetti();
      qs('.theme-btn', picker)?.focus();
    }
  });
}

/* 03. confetti button ------------------------------------------------- */
/** Reads the current theme colours so confetti always matches the skin. */
function throwConfetti(seconds = 2.4) {
  if (typeof window.confetti !== 'function') return;

  const styles = getComputedStyle(document.documentElement);
  const colors = ['--color-primary', '--color-secondary', '--color-text', '--accent-pop']
    .map((token) => styles.getPropertyValue(token).trim())
    .filter(Boolean);

  const end = Date.now() + seconds * 1000;
  (function frame() {
    window.confetti({ particleCount: 3, angle: 60, spread: 58, origin: { x: 0 }, colors });
    window.confetti({ particleCount: 3, angle: 120, spread: 58, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function burstConfettiAt(x, y) {
  if (typeof window.confetti !== 'function') return;
  const styles = getComputedStyle(document.documentElement);
  const colors = ['--color-primary', '--color-secondary', '--accent-pop', '--accent-peach', '--accent-lilac']
    .map((token) => styles.getPropertyValue(token).trim())
    .filter(Boolean);

  window.confetti({
    particleCount: 110,
    spread: 88,
    startVelocity: 42,
    scalar: 1.05,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors,
  });
}

function initPartyButton() {
  const button = document.createElement('button');
  button.className = 'party-button';
  button.type = 'button';
  button.setAttribute('aria-label', 'Throw some confetti');
  button.textContent = '🎉';
  button.addEventListener('click', () => throwConfetti());
  document.body.appendChild(button);
}

/* 04. repel engine ---------------------------------------------------- */
/**
 * Springs a set of elements away from the cursor and back to rest.
 * Used for both the hand-lettered name and the drifting hero shapes.
 *
 * Each element keeps its authored CSS transform; the spring offset is
 * appended, so margin nudges and drift animations are never clobbered.
 */
function createRepelField(elements, options = {}) {
  const config = {
    radius: 200,
    strength: 1.7,
    spring: 0.08,
    damping: 0.5,
    maxSpeedInfluence: 18,
    speedScale: 6,
    ...options,
  };

  const states = elements.map((el) => ({
    el,
    base: el.style.transform || '',
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  }));

  let mouseX = -9999;
  let mouseY = -9999;
  let lastMouseX = -9999;
  let lastMouseY = -9999;
  let running = false;

  document.addEventListener(
    'mousemove',
    (event) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = event.clientX;
      mouseY = event.clientY;
    },
    { passive: true }
  );

  function snapshotBase() {
    states.forEach((state) => {
      state.base = state.el.style.transform || '';
    });
  }

  function tick() {
    const speed = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
    const speedMultiplier = 1 + Math.min(speed / 10, config.maxSpeedInfluence);

    states.forEach((state) => {
      const rect = state.el.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - mouseX;
      const dy = rect.top + rect.height / 2 - mouseY;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist < config.radius) {
        const force = (config.radius - dist) / config.radius;
        const push = force * config.strength * speedMultiplier * config.speedScale;
        state.vx += (dx / dist) * push;
        state.vy += (dy / dist) * push;
      }

      state.vx += -state.x * config.spring;
      state.vy += -state.y * config.spring;
      state.vx *= config.damping;
      state.vy *= config.damping;
      state.x += state.vx;
      state.y += state.vy;

      state.el.style.transform = `${state.base} translate(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px)`;
    });

    if (running) requestAnimationFrame(tick);
  }

  return {
    start() {
      if (running) return;
      snapshotBase();
      running = true;
      requestAnimationFrame(tick);
    },
  };
}

/* 05. hero: floating letters ------------------------------------------ */
function initHeroLetters() {
  const letters = qsa('.name-letter');
  if (!letters.length) return;

  /* Staggered fall-in, then hand off to the spring field. */
  let lastDelay = 0;
  letters.forEach((letter) => {
    const delay = Math.random() * 800;
    lastDelay = Math.max(lastDelay, delay);
    const base = letter.style.transform || '';

    letter.style.transition = 'none';
    letter.style.opacity = '0';
    letter.style.transform = `${base} translateY(-2.5em)`;

    setTimeout(() => {
      letter.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease';
      letter.style.opacity = '1';
      letter.style.transform = base;
    }, delay);

    setTimeout(() => {
      letter.style.transition = 'none';
    }, delay + 700);
  });

  if (!canHover) return; /* no cursor to run away from */

  const field = createRepelField(letters, { radius: 200, strength: 1.7 });
  setTimeout(() => field.start(), lastDelay + 800);
}

/* 05.5. doodle path for scroll */
function initScrollDoodle() {
  const path = qs('#doodle-path');
  if (!path) return;

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    path.style.strokeDashoffset = 1 - p;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* 06. hero: drifting svg shapes ---------------------------------------- */
const HERO_SHAPES = [
  { src: 'shapes/star.png',     size: 74, left: '6%',  top: '18%', rot: -12, dur: 15, delay: 0 },
  { src: 'shapes/asterisk.png', size: 92, left: '3%',  top: '46%', rot: 8,   dur: 17, delay: 0.8 },
  { src: 'shapes/exclaim.png',   size: 52, left: '15%', top: '70%', rot: 15,  dur: 19, delay: 1.5 },
  { src: 'shapes/heart.png',     size: 66, left: '23%', top: '11%', rot: -6,  dur: 21, delay: 2 },

  { src: 'shapes/star.png',     size: 80, left: '80%',  top: '18%', rot: -12, dur: 15, delay: 0 },
  { src: 'shapes/exclaim.png', size: 90, left: '85%',  top: '33%', rot: 8,   dur: 17, delay: 0.8 },
  { src: 'shapes/heart.png',     size: 90, left: '87%', top: '54%', rot: -6,  dur: 21, delay: 2 },
  { src: 'shapes/asterisk.png',   size: 60, left: '75%', top: '77%', rot: 15,  dur: 19, delay: 1.5 }
];

function initHeroShapes() {
  const layer = qs('.hero__shapes');
  if (!layer) return;

  const nodes = HERO_SHAPES.map((def) => {
    const wrap = document.createElement('div');
    wrap.className = 'shape-wrap';
    wrap.style.left = def.left;
    wrap.style.top = def.top;
    wrap.style.animationDuration = `${def.dur}s`;
    wrap.style.animationDelay = `${def.delay}s`;

    const shape = document.createElement('img');
    shape.className = 'shape shape--svg';
    shape.src = def.src;
    shape.alt = '';
    shape.draggable = false;
    shape.style.width = `${def.size}px`;
    shape.style.rotate = `${def.rot}deg`;   // `rotate`, not `transform`, so it doesn't fight the repel spring

    wrap.appendChild(shape);
    layer.appendChild(wrap);
    return shape;
  });

  if (!canHover) return;
  createRepelField(nodes, {
    radius: 180,
    strength: 1.1,
    spring: 0.06,
    damping: 0.62,
    speedScale: 4,
  }).start();
}

/* 07. hero: rotating tagline ------------------------------------------ */
const TAGLINES = [
  'mechanical engineering + hci',
  'designer and builder',
  'creating for good works',
  'engineering for humans',
];

function initTagline() {
  const el = qs('#rotating-tagline');
  if (!el) return;

  let phrase = 0;
  let chars = 0;
  let deleting = false;

  function tick() {
    const current = TAGLINES[phrase];
    if (!deleting) {
      chars += 1;
      el.textContent = current.slice(0, chars);
      if (chars === current.length) {
        deleting = true;
        setTimeout(tick, 1900);
        return;
      }
    } else {
      chars -= 1;
      el.textContent = current.slice(0, chars);
      if (chars === 0) {
        deleting = false;
        phrase = (phrase + 1) % TAGLINES.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 105);
  }

  tick();
}

/* 08. featured projects deck ----------------------------------------- */
function initFeaturedDeck() {
  const deck = qs('#featured-deck');
  if (!deck || typeof projects === 'undefined') return;

  deck.innerHTML = projects
    .map(
      (project) => `
      <li>
        <article class="pcard" tabindex="0" aria-label="${esc(project.title)} — focus or hover to read more">
          <div class="pcard__inner">
            <div class="pcard__face pcard__face--front">
              <span class="pcard__index">${esc(project.year)}</span>
              <span class="pcard__suit" aria-hidden="true">${esc(project.suit || '♠')}</span>
              <div class="pcard__media">
                <img src="${esc(project.image)}" alt="${esc(project.alt)}" loading="lazy" />
              </div>
              <div class="pcard__caption">
                <h3 class="pcard__title">${esc(project.title)}</h3>
                <ul class="tag-list pcard__tags">${tagChips(project.tags)}</ul>
              </div>
            </div>
            <div class="pcard__face pcard__face--back">
              <div class="pcard__back-body">
                <h3 class="pcard__title">${esc(project.title)}</h3>
                <p class="pcard__blurb">${esc(project.blurb)}</p>
                <p class="pcard__meta">${esc(project.role)} · ${esc(project.year)}</p>
                <a class="btn btn--sm btn--primary" href="${esc(project.url)}">
                  see more <span class="btn__arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </li>`
    )
    .join('');
}

/* 09. playground marquee --------------------------------------------- */
/* Two belts running in opposite directions. Each track holds the same set
   twice so the -50% translate loops seamlessly. */
function marqueeCard(item) {
  return `
    <a class="mcard" href="playground.html#${esc(item.slug)}">
      <img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy" />
      <div class="mcard__reveal">
        <p class="mcard__name">${esc(item.name)}</p>
        <p class="mcard__desc">${esc(item.short)}</p>
      </div>
    </a>`;
}

function initMarquees() {
  const rows = qsa('[data-marquee-row]');
  if (!rows.length || typeof playgroundItems === 'undefined') return;

  const half = Math.ceil(playgroundItems.length / 2);
  const groups = [playgroundItems.slice(0, half), playgroundItems.slice(half)];

  rows.forEach((row, index) => {
    const items = groups[index] && groups[index].length ? groups[index] : playgroundItems;
    const cards = items.map(marqueeCard).join('');
    /* duplicated on purpose — the second copy is what makes the loop seamless */
    row.innerHTML = cards + cards;
    qsa('.mcard', row)
      .slice(items.length)
      .forEach((clone) => {
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
      });
  });
}

/* 10. playground archive --------------------------------------------- */
function archiveCard(item) {
  return `
    <li>
      <article class="pcard" data-slug="${esc(item.slug)}" data-tags="${esc((item.tags || []).join('|'))}" tabindex="0"
        aria-label="${esc(item.name)} — focus or hover to read more">
        <div class="pcard__inner">
          <div class="pcard__face pcard__face--front">
            <span class="pcard__index">${esc(item.when)}</span>
            <div class="pcard__media">
              <img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy" />
            </div>
            <div class="pcard__caption">
              <h3 class="pcard__title">${esc(item.name)}</h3>
              <ul class="tag-list pcard__tags">${tagChips((item.tags || []).slice(0, 3))}</ul>
            </div>
          </div>
          <div class="pcard__face pcard__face--back">
            <div class="pcard__back-body">
              <h3 class="pcard__title">${esc(item.name)}</h3>
              <p class="pcard__blurb">${esc(item.short)}</p>
              <button class="btn btn--sm btn--primary" type="button" data-open="${esc(item.slug)}">
                see more <span class="btn__arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </li>`;
}

function initArchive() {
  const grid = qs('#archive-grid');
  if (!grid || typeof playgroundItems === 'undefined') return;

  const filterRow = qs('#filter-row');
  const countEl = qs('#filter-count');
  const emptyEl = qs('#archive-empty');
  const modal = qs('#playground-modal');

  /* --- grid ------------------------------------------------------------ */
  grid.innerHTML = playgroundItems.map(archiveCard).join('');

  /* --- filters -------------------------------------------------------- */
  /* Built from the tags actually in use, ordered by the PLAYGROUND_TAGS
     vocabulary so the bar reads in a deliberate order rather than randomly. */
  const used = new Set();
  playgroundItems.forEach((item) => (item.tags || []).forEach((tag) => used.add(tag)));

  const order = typeof PLAYGROUND_TAGS !== 'undefined' ? PLAYGROUND_TAGS : [];
  const tags = Array.from(used).sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const active = new Set();

  if (filterRow) {
    filterRow.innerHTML =
      `<button class="chip chip-button" type="button" data-filter-all aria-pressed="true">everything</button>` +
      tags
        .map(
          (tag) =>
            `<button class="chip chip-button" type="button" data-filter="${esc(tag)}" aria-pressed="false">${esc(tag)}</button>`
        )
        .join('') +
      `<span class="filter-bar__count" id="filter-count"></span>`;
  }

  const countTarget = qs('#filter-count') || countEl;

  /** Cards match if they carry at least one active tag (OR logic). */
  function applyFilters() {
    let visible = 0;
    qsa('.pcard', grid).forEach((card) => {
      const cardTags = (card.dataset.tags || '').split('|').filter(Boolean);
      const match = active.size === 0 || cardTags.some((tag) => active.has(tag));
      card.closest('li').classList.toggle('is-hidden', !match);
      if (match) visible += 1;
    });

    if (countTarget) {
      countTarget.textContent =
        visible === playgroundItems.length
          ? `${visible} things`
          : `${visible} of ${playgroundItems.length} things`;
    }
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  filterRow?.addEventListener('click', (event) => {
    const allBtn = event.target.closest('[data-filter-all]');
    if (allBtn) {
      active.clear();
      qsa('[data-filter]', filterRow).forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      allBtn.setAttribute('aria-pressed', 'true');
      applyFilters();
      return;
    }

    const btn = event.target.closest('[data-filter]');
    if (!btn) return;

    const tag = btn.dataset.filter;
    if (active.has(tag)) {
      active.delete(tag);
      btn.setAttribute('aria-pressed', 'false');
    } else {
      active.add(tag);
      btn.setAttribute('aria-pressed', 'true');
    }
    qs('[data-filter-all]', filterRow)?.setAttribute('aria-pressed', active.size === 0 ? 'true' : 'false');
    applyFilters();
  });

  applyFilters();

  /* --- modal ---------------------------------------------------------- */
  if (!modal) return;

  let lastFocused = null;

  function openModal(slug) {
    const item = playgroundItems.find((entry) => entry.slug === slug);
    if (!item) return;

    lastFocused = document.activeElement;

    qs('#modal-title', modal).textContent = item.name;
    qs('#modal-tags', modal).innerHTML = tagChips(item.tags);

    qs('#modal-qa', modal).innerHTML = [
      ['who', item.who],
      ['what', item.what],
      ['when', item.when],
      ['why', item.why],
      ['how', item.how],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `<div><h3>${label}</h3><p>${esc(value)}</p></div>`)
      .join('');

    const gallery = qs('#modal-gallery', modal);
    const parts = [];

    if (item.embed && item.embed.src) {
      parts.push(`
        <div class="modal__embed" style="${item.embed.height
                                          ? `height: ${esc(item.embed.height)};`
                                          : `aspect-ratio: ${esc(item.embed.ratio || '16 / 9')};`}"
        >
          <iframe src="${esc(item.embed.src)}"
            title="${esc(item.embed.title || item.name)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>`);
    }

    if (item.gallery && item.gallery.length) {
      parts.push(
        item.gallery
          .map((src, i) => `<img src="${esc(src)}" alt="${esc(item.name)} — image ${i + 1}" loading="lazy" />`)
          .join('')
      );
    }

    gallery.innerHTML = parts.length
      ? parts.join('')
      : `<div class="modal__gallery-empty">no photos of this one yet</div>`;

    const linkSlot = qs('#modal-link', modal);
    linkSlot.innerHTML = item.link
      ? `<a class="btn btn--primary" href="${esc(item.link.url)}" target="_blank" rel="noopener">
           ${esc(item.link.label)} <span class="btn__arrow" aria-hidden="true">→</span></a>`
      : '';

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    qs('.modal__close', modal).focus();

    if (history.replaceState) history.replaceState(null, '', `#${item.slug}`);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    qs('#modal-gallery', modal).innerHTML = '';
    if (history.replaceState) history.replaceState(null, '', window.location.pathname);
    lastFocused?.focus();
  }

  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open]');
    if (trigger) openModal(trigger.dataset.open);
  });

  /* Keyboard users flip with focus, then hit enter on the card itself. */
  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const card = event.target.closest('.pcard');
    if (card && event.target === card) openModal(card.dataset.slug);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-close-modal]')) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* Deep link: playground.html#slug opens straight into that entry, which is
     what the marquee cards on the home page link to. */
  const hash = window.location.hash.replace('#', '');
  if (hash) openModal(hash);
}

/* 11. about page: say hi --------------------------------------------- */
function initSayHi() {
  const block = qs('#hi-block');
  if (!block) return;

  const word = qs('.hi-word', block);
  const greetings = ['hi!', 'hey!', 'hello!', 'what\'s up!', 'hi again!', 'hiya!'];

  const cursor = document.createElement('div');
  cursor.className = 'hi-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = 'hi!';
  document.body.appendChild(cursor);

  let index = 0;

  if (canHover) {
    let lastX = -1, lastY = -1;

    const setActive = (on) => {
      block.classList.toggle('is-hovered', on);
      block.classList.toggle('is-cursor-hidden', on);
      cursor.classList.toggle('is-visible', on);
    };

    /* Ask the browser what is actually under the pointer right now. */
    const update = () => {
      const el = document.elementFromPoint(lastX, lastY);
      const over = Boolean(el && el.closest('#hi-block')) && !el.closest('.site-nav');
      setActive(over);
      if (over) {
        cursor.style.left = `${lastX}px`;
        cursor.style.top = `${lastY}px`;
      }
    };

    document.addEventListener('mousemove', (event) => {
      lastX = event.clientX;
      lastY = event.clientY;
      update();
    }, { passive: true });

    /* Re-check on scroll instead of hiding, so the bubble stays correct. */
    window.addEventListener('scroll', update, { passive: true });

    document.documentElement.addEventListener('mouseleave', () => setActive(false));
  }

  function celebrate(x, y) {
    index = (index + 1) % greetings.length;
    cursor.textContent = greetings[index];
    word.animate(
      [
        { transform: 'scale(1.04) rotate(-1.5deg)' },
        { transform: 'scale(1.12) rotate(2deg)' },
        { transform: 'scale(1.04) rotate(-1.5deg)' },
      ],
      { duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
    );
    burstConfettiAt(x, y);
  }

  block.addEventListener('click', (event) => celebrate(event.clientX, event.clientY));

  /* Keyboard equivalent — the word itself is focusable in the markup. */
  word.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const rect = word.getBoundingClientRect();
    celebrate(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
}

/* 12. scroll reveal -------------------------------------------------- */
function initReveal() {
  const items = qsa('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  items.forEach((el) => observer.observe(el));

  /* Fail-safe: content must never be permanently invisible because of a
     decorative animation. Anything still hidden after 3s gets revealed. */
  setTimeout(() => {
    qsa('.reveal:not(.is-in)').forEach((el) => el.classList.add('is-in'));
  }, 3000);
}

/* 13. sliding navigation indicator ----------------------------------- */
function initNavIndicator() {
  qsa('.site-nav__links').forEach((menu) => {
    const links = qsa('a', menu);
    const current = links.find((link) => link.getAttribute('aria-current') === 'page');
    const indicator = document.createElement('span');
    indicator.className = 'site-nav__indicator';
    indicator.setAttribute('aria-hidden', 'true');
    menu.prepend(indicator);

    const moveTo = (link) => {
      const menuRect = menu.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const left = linkRect.left - menuRect.left - menu.clientLeft;
      const top = linkRect.top - menuRect.top - menu.clientTop;
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.height = `${linkRect.height}px`;
      indicator.style.transform = `translate(${left}px, ${top}px)`;
      indicator.classList.add('is-visible');
    };

    const reset = () => {
      if (current) moveTo(current);
      else indicator.classList.remove('is-visible');
    };

    menu.addEventListener('pointerover', (event) => {
      const link = event.target.closest('a');
      if (link && menu.contains(link)) moveTo(link);
    });
    menu.addEventListener('pointerleave', reset);
    menu.addEventListener('focusin', (event) => {
      const link = event.target.closest('a');
      if (link && menu.contains(link)) moveTo(link);
    });
    menu.addEventListener('focusout', (event) => {
      if (!menu.contains(event.relatedTarget)) reset();
    });
    window.addEventListener('resize', () => {
      const selected = menu.querySelector('a:hover, a:focus') || current;
      if (selected) moveTo(selected);
    });

    if (current) moveTo(current);
  });
}

/* 13. tap-to-flip ---------------------------------------------------- */
/* Hover-to-flip is useless on a phone, so a first tap flips the card and a
   second tap on the button follows the link. */
function initTapFlip() {
  if (canHover) return;

  document.addEventListener('click', (event) => {
    const card = event.target.closest('.pcard');
    if (!card) {
      qsa('.pcard.is-flipped').forEach((el) => el.classList.remove('is-flipped'));
      return;
    }
    if (event.target.closest('a, button')) return;

    qsa('.pcard.is-flipped').forEach((el) => {
      if (el !== card) el.classList.remove('is-flipped');
    });
    card.classList.toggle('is-flipped');
  });
}

/* 13. polaroid ---------------------------------------------------- */
(() => {
  const modal = document.getElementById('photo-modal');
  if (!modal) return;
  const img = modal.querySelector('img');
  const closeBtn = modal.querySelector('.modal__close');
  let opener = null;

  const open = btn => {
    opener = btn;
    img.src = btn.dataset.full;
    img.alt = btn.querySelector('img').alt;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  };

  document.querySelectorAll('.polaroid').forEach(btn =>
    btn.addEventListener('click', () => open(btn))
  );
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
})();

/* boot --------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavIndicator();
  initPartyButton();
  initKonami();

  initHeroLetters();
  initHeroShapes();
  initScrollDoodle();
  initTagline();

  initFeaturedDeck();
  initMarquees();
  initArchive();

  initSayHi();

  initReveal();
  initTapFlip();
});
