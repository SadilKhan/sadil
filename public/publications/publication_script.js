/* ============================================================
   PUBLICATIONS PAGE — SCRIPT
   Mohammad Sadil Khan
   ============================================================ */

let publications = [];

// ─── FETCH ────────────────────────────────────────────────
async function fetchPublications() {
  try {
    const res = await fetch('publications.json');
    publications = await res.json();
    displayPublications(publications);
    updateResultsMeta(publications.length);
  } catch (err) {
    console.error('Error fetching publications:', err);
    document.getElementById('publication-list').innerHTML =
      `<div class="no-results">
         <div class="no-results-icon">⚠</div>
         <p>Could not load publications.</p>
         <small>${err.message}</small>
       </div>`;
  }
}

// ─── RESULTS META ─────────────────────────────────────────
function updateResultsMeta(count, searchText = '') {
  let meta = document.getElementById('results-meta');
  if (!meta) {
    meta = document.createElement('div');
    meta.id = 'results-meta';
    const list = document.getElementById('publication-list');
    list.parentNode.insertBefore(meta, list);
  }
  meta.innerHTML = searchText
    ? `<span>${count}</span> result${count !== 1 ? 's' : ''} for "<em>${searchText}</em>"`
    : `<span>${count}</span> publication${count !== 1 ? 's' : ''}`;
}

// ─── FADE-IN OBSERVER ─────────────────────────────────────
function setupFadeIn() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.06, rootMargin: '0px 0px -10px 0px' });

  document.querySelectorAll('.publication').forEach(card => {
    card.classList.remove('visible');
    io.observe(card);
  });
}

// ─── TOGGLE YEAR ──────────────────────────────────────────
function toggleYearContent(year) {
  const content = document.querySelector(`.year-content[data-year="${year}"]`);
  if (!content) return;
  const arrow = content.previousElementSibling?.querySelector('.arrow-icon');
  content.classList.toggle('hide');
  if (arrow) {
    arrow.style.transform = content.classList.contains('hide')
      ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}

// ─── FORMAT AUTHORS ───────────────────────────────────────
function formatAuthors(str, q = '') {
  return str.split(',').map(a => {
    a = a.trim();
    const html = q ? highlight(a, q) : a;
    return a.toLowerCase().includes('sadil')
      ? `<u><b>${html}</b></u>`
      : html;
  }).join(' &nbsp;·&nbsp; ');
}

// ─── FORMAT CONFERENCE ────────────────────────────────────
function formatConference(text, q = '') {
  let t = (text || '').replace(
    /(highlight|spotlight|oral)/gi,
    m => `<span style="color:var(--red);">${m}</span>`
  );
  return q ? highlight(t, q) : t;
}

// ─── HIGHLIGHT ────────────────────────────────────────────
function highlight(text, term) {
  if (!term) return text;
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${esc})`, 'gi'), '<mark>$1</mark>');
}

// ─── BUILD CARD ───────────────────────────────────────────
function buildCard(pub, q = '') {
  const el = document.createElement('div');
  el.classList.add('publication');

  // Image panel content
  const imgHtml = pub.image
    ? `<img src="${pub.image}" alt="${pub.title}" loading="lazy">`
    : `<div class="paper-image-placeholder">◧</div>`;

  const captionHtml = pub.metadata
    ? `<div class="paper-metadata">${pub.metadata}</div>`
    : '';

  // Buttons
  const btns = [
    pub.paperLink && btn('📄 Paper',   pub.paperLink),
    pub.arxiv     && btn('Arxiv',      pub.arxiv),
    pub.project   && btn('🌐 Project', pub.project),
    pub.codeLink  && btn('💻 Code',    pub.codeLink),
    pub.dataset   && btn('🗂 Dataset', pub.dataset),
    pub.poster    && btn('🖼 Poster',  pub.poster),
    pub.video     && btn('▶ Video',    pub.video),
    pub.bibtex    && bibtexBtn(pub.bibtex),
  ].filter(Boolean).join('');

  const titleHtml = q ? highlight(pub.title, q) : pub.title;

  el.innerHTML = `
    <div class="publication-content">
      <div class="paper-image">
        ${imgHtml}
        ${captionHtml}
      </div>
      <div class="paper-body">
        <div class="paper-info">
          <div class="paper-title">${titleHtml}</div>
          <div class="paper-authors">${formatAuthors(pub.authors, q)}</div>
          <div class="paper-conference">${formatConference(pub.conference, q)}</div>
        </div>
        <div class="links">${btns}</div>
      </div>
    </div>`;

  return el;
}

function btn(label, url) {
  return `<button class="button" onclick="window.open('${url}','_blank')">${label}</button>`;
}

function bibtexBtn(raw) {
  const escaped = raw.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
  return `<button class="button" onclick="showBibtex(\`${escaped}\`)">❝ BibTeX</button>`;
}

// ─── BUILD YEAR SECTION ───────────────────────────────────
function buildYearSection(year, pubs, q = '') {
  const section = document.createElement('div');
  section.classList.add('year-section');

  section.innerHTML = `
    <h2 onclick="toggleYearContent(${year})">
      ${year}
      <span class="year-badge">${pubs.length}</span>
      <span class="arrow-icon" style="transform:rotate(180deg);">▾</span>
    </h2>
    <hr class="year-divider">`;

  const yearContent = document.createElement('div');
  yearContent.classList.add('year-content');
  yearContent.setAttribute('data-year', year);

  const inner = document.createElement('div');
  inner.classList.add('year-content-inner');

  pubs.forEach(pub => inner.appendChild(buildCard(pub, q)));

  yearContent.appendChild(inner);
  section.appendChild(yearContent);
  return section;
}

// ─── MAIN DISPLAY ─────────────────────────────────────────
function displayPublications(pubs, q = '') {
  const list = document.getElementById('publication-list');
  list.innerHTML = '';

  if (!pubs || pubs.length === 0) {
    list.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">◻</div>
        <p>No publications found.</p>
        <small>Try a different search term.</small>
      </div>`;
    return;
  }

  // Group by year descending
  const sorted = [...pubs].sort((a, b) => b.year - a.year);
  const byYear = sorted.reduce((acc, pub) => {
    (acc[pub.year] = acc[pub.year] || []).push(pub);
    return acc;
  }, {});

  Object.keys(byYear).sort((a, b) => b - a).forEach(year => {
    list.appendChild(buildYearSection(Number(year), byYear[year], q));
  });

  requestAnimationFrame(() => setTimeout(setupFadeIn, 50));
}

// ─── SEARCH ───────────────────────────────────────────────
function filterPublications(q) {
  const lq = q.toLowerCase();
  return publications.filter(p =>
    p.title.toLowerCase().includes(lq) ||
    p.authors.toLowerCase().includes(lq) ||
    p.year.toString().includes(lq) ||
    (p.conference || '').toLowerCase().includes(lq) ||
    (p.categories || '').toLowerCase().includes(lq)
  );
}

const debounce = (fn, ms) => {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

function updatePublications() {
  const q = document.getElementById('search').value.trim();
  const results = q ? filterPublications(q) : publications;
  updateResultsMeta(results.length, q);
  displayPublications(results, q);
}

// ─── BIBTEX ───────────────────────────────────────────────
function formatBibtex(text) {
  let out = '', depth = 0;
  for (const ch of text) {
    if (ch === '{') { depth++; out += ch; }
    else if (ch === '}') { depth--; out += ch; }
    else if (ch === ',' && depth <= 1) out += ',\n';
    else out += ch;
  }
  return out;
}

function colorizeBibtex(text) {
  const dark = document.body.classList.contains('dark-mode');
  const c = dark
    ? { at: '#f97583', key: '#79c0ff', val: '#d2a8ff' }
    : { at: '#c94040', key: '#1a73e8', val: '#6f42c1' };
  return text
    .replace(/^@(\w+)/gm, `<span style="color:${c.at};font-weight:700;">@$1</span>`)
    .replace(/^(\s*[a-zA-Z]+)\s*=/gm, `<span style="color:${c.key};font-weight:600;">$1</span> =`)
    .replace(/({[^}]+})/gm, `<span style="color:${c.val};">$1</span>`);
}

function showBibtex(raw) {
  document.getElementById('bibtexContent').innerHTML = colorizeBibtex(formatBibtex(raw));
  document.getElementById('bibtexModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeBibtexModal() {
  document.getElementById('bibtexModal').style.display = 'none';
  document.body.style.overflow = '';
}

function copyBibtexFromModal() {
  const text = document.getElementById('bibtexContent').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.copy-btn');
    const orig = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = '#1e8e3e';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1800);
  });
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const m = document.getElementById('bibtexModal');
    if (m?.style.display === 'flex') closeBibtexModal();
  }
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    document.getElementById('search')?.focus();
  }
});

document.addEventListener('click', e => {
  const m = document.getElementById('bibtexModal');
  if (m && e.target === m) closeBibtexModal();
});

// ─── INIT ─────────────────────────────────────────────────
document.getElementById('search').addEventListener('input', debounce(updatePublications, 200));
fetchPublications();
