/**
 * theme-toggle.js
 * Self-contained light / dark mode toggle for AI blog posts.
 * Syncs with the Hugo site's global theme: reads/writes the same
 * 'darkMode' localStorage key the Hugo apero toggle uses.
 *
 * To add to a new post: <script src="./theme-toggle.js"></script> before </body>
 * No other changes needed — button is injected automatically into .nav-inner / .nav-in.
 */
(function () {
  'use strict';

  const KEY = 'darkMode'; // matches Hugo apero toggle.html

  /* ─── Light-mode CSS overrides ─────────────────────────────────────────────
   * Covers all CSS variable names used across the six blog posts.
   * Code blocks intentionally stay dark — they look like display panels.
   * Canvas figures draw their own backgrounds and are unaffected.
   * ────────────────────────────────────────────────────────────────────────── */
  const LIGHT_CSS = `
html.light {
  color-scheme: light;

  /* ── Neutral backgrounds — medium blue-slate, not white ── */
  --bg:  #d6e2f0; --bg2: #c8d8ec; --bg3: #bacee8; --bg4: #aac0da; --bg5: #98b0cc;
  --s1:  #c8d8ec; --s2:  #bacee8; --s3:  #aac0da; --s4:  #98b0cc; --s5:  #88a0bc;

  /* ── Borders ── */
  --bdr:    #90a8c4; --bdr2:   #7898b8;
  --border: #90a8c4; --border2: #7898b8;

  /* ── Text ── */
  --text:  #06101e; --text2: #102440;
  --text3: #1e3a5c; --text4: #304e6a;

  /* ── Accent colours — significantly darkened for medium-blue bg ── */
  --blue:    #0e4ea0; --blue2:  #1560bc; --blue3:  #08204e;
  --green:   #0a5820; --green2: #0d6e28;
  --red:     #880808; --red2:   #9e0808;
  --yellow:  #5e4800; --yellow2:#706000;
  --amber:   #6a3a00; --amber2: #824800;
  --purple:  #481898; --purple2:#5820b0;
  --teal:    #086058; --teal2:  #0a7870;
  --cyan:    #087088; --cyan2:  #0a88a8;
  --orange:  #7a3200; --orange2:#9a4800;
  /* 1_beyond_ppo specific (g-prefixed) */
  --gblue:   #0e4ea0; --gblue2: #1560bc; --gblue3: #08204e;
  --ggreen:  #0a5820; --ggreen2:#0d6e28;
  --gred:    #880808; --gred2:  #9e0808;
  --gyellow: #5e4800; --gyellow2:#706000;
  /* llm_parallelism specific */
  --elec:    #006880; --elec2:  #00809a; --elec3:  #003040;
  --g1:  #0e4ea0; --g2:  #0a5820; --g3:  #880808; --g4: #5e4800; --g5: #481898;
  --g1l: #1560bc; --g2l: #0d6e28; --g3l: #9e0808; --g4l:#706000; --g5l:#5820b0;
  /* moe specific */
  --em:  #087088; --em2: #0a88a8;
}

/* ── Body / page ── */
html.light body {
  background: var(--bg);
  color: var(--text);
}

/* ── Nav ── */
html.light nav,
html.light nav.nav {
  background: rgba(196, 216, 236, 0.97) !important;
  border-bottom-color: var(--bdr) !important;
}
html.light .nav-links a,
html.light nav .nav-links a {
  color: var(--text3);
}

/* ── Main content wrapper ── */
html.light main {
  background: transparent;
}

/* ── Hero ── */
html.light .hero {
  background: transparent !important;
}
html.light .hero h1 {
  color: var(--text) !important;
}
/* 0_ppo_rl: hero word highlight colours — darken for light bg */
html.light .hero h1 .w-blue   { color: #1558c0 !important; }
html.light .hero h1 .w-red    { color: #c42020 !important; }
html.light .hero h1 .w-yellow { color: #b07000 !important; }
html.light .hero h1 .w-green  { color: #167832 !important; }
html.light .hero h1 span,
html.light .hero-eyebrow { color: var(--text2); }
html.light .hero-sub, html.light .hero-sub p { color: var(--text2) !important; }
html.light .hero-meta, html.light .hero-meta span { color: var(--text3) !important; }

/* ── Section headings — hardcoded color:#fff in source ── */
html.light .sec h2,
html.light .section h2 { color: var(--text) !important; }
html.light .sec h3,
html.light .section h3 { color: var(--blue2) !important; }

/* ── Sections ── */
html.light .section { border-top-color: var(--bdr) !important; }

/* ── SVG / canvas figures — keep dark so internal white/light text stays legible ── */
html.light .fig,
html.light .svgfig {
  background: #0e1525 !important;
  border-color: #1e2d47 !important;
}
html.light .fig svg,
html.light .svgfig svg {
  background: transparent;
}
html.light .fig-title,
html.light .svgfig-title,
html.light .fig-cap,
html.light .svgfig-cap {
  color: #8a9bb8 !important;
}
html.light .fig-title,
html.light .svgfig-title {
  border-color: #1e2d47 !important;
}

/* ── Surface cards / info blocks ── */
html.light .card,
html.light .box,
html.light .fbox,
html.light .fcbox,
html.light .mblock,
html.light .callout,
html.light .derive,
html.light .cmp-card,
html.light .tl-item,
html.light .step-box,
html.light .step,
html.light .cw,
html.light .rl-note,
html.light .info-box,
html.light .ov-grid > div,
html.light .chip-row .chip,
html.light .diff-row,
html.light .compare-table,
html.light .algo-box {
  background: var(--bg3) !important;
  border-color: var(--bdr) !important;
}

/* ── Timeline items ── */
html.light .tl-year { color: var(--blue) !important; }

/* ── Inline code ── */
html.light .ic,
html.light code:not(.hljs) {
  background: var(--bg4) !important;
  color: var(--blue2) !important;
  border-color: var(--bdr) !important;
}

/* ── Code blocks — kept dark intentionally ── */
html.light .cw,
html.light pre,
html.light pre code,
html.light code.hljs {
  background: #161b27 !important;
}
html.light .code-lang,
html.light .cl { color: #7a90b0 !important; }

/* ── Math blocks ── */
html.light .math-d,
html.light .mblock {
  background: var(--bg3) !important;
  border-color: var(--bdr) !important;
}
html.light .katex { color: var(--text) !important; }
html.light .meq-label { color: var(--text3) !important; }

/* ── Tables ── */
html.light table { border-color: var(--bdr) !important; }
html.light table thead th {
  background: var(--bg4) !important;
  color: var(--text) !important;
  border-color: var(--bdr) !important;
}
html.light table tbody td { border-color: var(--bdr) !important; }
html.light table tbody tr:nth-child(even) { background: var(--bg3) !important; }
html.light table tbody tr:nth-child(even) td { background: var(--bg3) !important; }

/* ── Badges / status chips — override hardcoded rgba backgrounds ── */
html.light .badge,   html.light .bdg   { filter: none; }

html.light .badge.r, html.light .bdg.r { background: rgba(100,0,0,.10) !important;    color: var(--red2)    !important; }
html.light .badge.y, html.light .bdg.y { background: rgba(80,55,0,.10)  !important;   color: var(--amber2)  !important; }
html.light .badge.g, html.light .bdg.g { background: rgba(0,60,20,.10)  !important;   color: var(--green2)  !important; }
html.light .badge.b, html.light .bdg.b { background: rgba(0,50,130,.10) !important;   color: var(--blue2)   !important; }
html.light .badge.p, html.light .bdg.p { background: rgba(50,0,140,.10) !important;   color: var(--purple2) !important; }
html.light .badge.a, html.light .bdg.a { background: rgba(80,40,0,.10)  !important;   color: var(--amber2)  !important; }
html.light .badge.t, html.light .bdg.t { background: rgba(0,80,80,.10)  !important;   color: var(--teal2)   !important; }
html.light .bdg.e                       { background: rgba(0,70,100,.10) !important;   color: var(--elec2)   !important; }

/* sec-badge light tints */
html.light .sec-badge.red    { background: rgba(100,0,0,.10) !important;    color: var(--gred2)    !important; border-color: rgba(100,0,0,.25) !important; }
html.light .sec-badge.yellow { background: rgba(80,55,0,.10)  !important;   color: var(--gyellow2) !important; border-color: rgba(80,55,0,.25) !important; }
html.light .sec-badge.green  { background: rgba(0,60,20,.10)  !important;   color: var(--ggreen2)  !important; border-color: rgba(0,60,20,.25) !important; }
html.light .sec-badge.blue   { background: rgba(0,50,130,.10) !important;   color: var(--gblue2)   !important; border-color: rgba(0,50,130,.25) !important; }

/* diff rows */
html.light .diff-row.rm  { color: var(--gred2)   !important; }
html.light .diff-row.add { color: var(--ggreen2) !important; }

/* ── Overview number cards ── */
html.light .ov-num { opacity: 0.9; }

/* ── Scrollbar (webkit) ── */
html.light ::-webkit-scrollbar-track { background: var(--bg2); }
html.light ::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 4px; }

/* ── normalization.html specific ── */
html.light .norm-card {
  background: var(--bg2) !important;
  border-color: var(--bdr) !important;
}
html.light .norm-card .card-title { color: var(--text) !important; }
html.light .norm-card .used-by {
  background: var(--bg4) !important;
  border-color: var(--bdr) !important;
  color: var(--text3) !important;
}
html.light .formula-box {
  background: var(--bg3) !important;
  border-color: var(--bdr) !important;
}
/* badge inline color overrides (BN/LN/RMS/GN/IN labels) */
html.light .norm-card .badge { color: var(--text) !important; }
/* dim-tag active inline color */
html.light .dim-tag.active { color: var(--text) !important; }
html.light .dim-tag:not(.active) { color: var(--text2) !important; }
/* comparison table inline colors */
html.light .cmp-table strong { color: var(--text) !important; }
html.light .cmp-table .tag {
  color: var(--text2) !important;
  background: var(--bg4) !important;
}
/* control buttons */
html.light .nbtn {
  background: var(--bg3) !important;
  border-color: var(--bdr) !important;
  color: var(--text2) !important;
}
html.light .nbtn.play {
  background: rgba(0,100,120,.12) !important;
  border-color: rgba(0,100,120,.4) !important;
  color: var(--teal) !important;
}
html.light .step-ind {
  background: rgba(0,80,100,.08) !important;
  border-color: rgba(0,80,100,.3) !important;
  color: var(--teal) !important;
}
/* tensor label */
html.light .tensor-label {
  background: var(--bg3) !important;
  border-color: var(--bdr) !important;
  color: var(--teal) !important;
}
/* hero sub text */
html.light .hero p { color: var(--text2) !important; }
`;

  /* ─── Icon SVGs ─────────────────────────────────────────────────────────── */
  const SUN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`;
  const MOON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  /* ─── Button styles (injected once) ────────────────────────────────────── */
  const BTN_CSS = `
#tt-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; flex-shrink: 0;
  background: transparent;
  border: 1.2px solid rgba(138,180,248,.30);
  border-radius: 7px;
  color: var(--text3, #8a9bb8);
  cursor: pointer; padding: 0;
  transition: color .15s, background .15s, border-color .15s;
}
#tt-btn:hover {
  color: var(--blue2, #8ab4f8);
  border-color: var(--blue2, #8ab4f8);
  background: rgba(138,180,248,.08);
}
html.light #tt-btn {
  border-color: rgba(21,88,192,.22);
  color: var(--text3, #365070);
}
html.light #tt-btn:hover {
  color: var(--blue, #1558c0);
  border-color: var(--blue, #1558c0);
  background: rgba(21,88,192,.06);
}
`;

  /* ─── Helpers ───────────────────────────────────────────────────────────── */

  // Hugo apero stores darkMode='true' for dark, removes the key for light.
  // Fall back to OS prefers-color-scheme when the key has never been set.
  function savedTheme() {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'true') return 'dark';
      if (v !== null) return 'light'; // key present but not 'true' → explicitly light
      // Key absent: respect OS preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch { return 'dark'; }
  }

  function apply(theme) {
    document.documentElement.classList.toggle('light', theme === 'light');
    const btn = document.getElementById('tt-btn');
    if (!btn) return;
    btn.innerHTML = theme === 'light' ? MOON : SUN;
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    btn.title = btn.getAttribute('aria-label');
  }

  function toggle() {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    try {
      if (next === 'dark') {
        localStorage.setItem(KEY, 'true');
      } else {
        localStorage.removeItem(KEY); // mirrors Hugo apero behavior
      }
    } catch {}
    apply(next);
  }

  /* ─── Init ──────────────────────────────────────────────────────────────── */
  function init() {
    // 1. Light-mode override styles
    if (!document.getElementById('tt-styles')) {
      const s = document.createElement('style');
      s.id = 'tt-styles';
      s.textContent = LIGHT_CSS;
      document.head.appendChild(s);
    }

    // 2. Button styles
    if (!document.getElementById('tt-btn-styles')) {
      const s = document.createElement('style');
      s.id = 'tt-btn-styles';
      s.textContent = BTN_CSS;
      document.head.appendChild(s);
    }

    // 3. Create button
    const btn = document.createElement('button');
    btn.id = 'tt-btn';
    btn.type = 'button';
    btn.addEventListener('click', toggle);

    // 4. Inject into nav — pages use either .nav-inner or .nav-in
    const navInner = document.querySelector('.nav-inner, .nav-in');
    if (navInner) {
      navInner.appendChild(btn);
    } else {
      btn.style.cssText = 'position:fixed;top:10px;right:14px;z-index:9999;';
      document.body.appendChild(btn);
    }

    // 5. Apply saved preference (reads Hugo's darkMode key)
    apply(savedTheme());

    // 6. React to Hugo theme changes in other tabs (StorageEvent)
    window.addEventListener('storage', function (e) {
      if (e.key === KEY) {
        apply(e.newValue === 'true' ? 'dark' : 'light');
      }
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
