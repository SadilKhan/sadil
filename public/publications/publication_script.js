/* ============================================================
   PUBLICATIONS PAGE — SCRIPT + STATS DASHBOARD
   Charts powered by Chart.js 4.4.1 + chartjs-plugin-datalabels
   ============================================================ */
let publications = [];
let chartInstances = {};
function loadChartJs(callback) {
  if (window.Chart && window.ChartDataLabels) { callback(); return; }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
  s.onload = function() {
    const p = document.createElement('script');
    p.src = 'https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.2.0/chartjs-plugin-datalabels.min.js';
    p.onload = callback;
    document.head.appendChild(p);
  };
  document.head.appendChild(s);
}
async function fetchPublications() {
  try {
    const res = await fetch('publications.json');
    publications = await res.json();
    loadChartJs(function() {
      Chart.register(ChartDataLabels);
      buildStatsPanel(publications);
      displayPublications(publications);
      updateResultsMeta(publications.length);
    });
  } catch (err) {
    console.error('Error fetching publications:', err);
    document.getElementById('publication-list').innerHTML =
      '<div class="no-results"><div class="no-results-icon">⚠</div><p>Could not load publications.</p><small>' + err.message + '</small></div>';
  }
}
function countBy(arr, keyFn) {
  return arr.reduce(function(acc, item) {
    const k = keyFn(item);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}
// For bars/KPIs — keep workshop in name but clean decorators
function cleanVenue(conf) {
  return ((conf || 'Other')
    .replace(/\s*(highlight|spotlight|oral|workshop)\s*/gi, '')
    .replace(/\d{4}/g, '')
    .trim()
    .split(' ')[0] || 'Other')
    .toUpperCase();
}
// For donut only — skip workshop papers entirely
function isWorkshop(conf) {
  return /workshop/i.test(conf || '');
}
function getCategories(pub) {
  if (!pub.categories) return [];
  return pub.categories.split(',').map(function(c) { return c.trim(); }).filter(function(c) { return c.length > 0 && c.length < 35; });
}
function getCoauthors(pub) {
  return pub.authors.split(',').map(function(a) { return a.trim().replace(/\*/g, ''); }).filter(function(a) { return !a.toLowerCase().includes('sadil'); });
}
const PALETTE = [
  '#1a73e8','#2dd4bf','#f5a623','#fb7185',
  '#818cf8','#34d399','#f97316','#a78bfa',
  '#38bdf8','#facc15','#ec4899','#f43f5e',
  '#0ea5e9','#84cc16','#d946ef','#14b8a6'
];
function buildStatsPanel(pubs) {
  const existing = document.getElementById('stats-panel');
  if (existing) existing.remove();
  const total   = pubs.length;
  const years   = [...new Set(pubs.map(function(p) { return p.year; }))].length;
  const venues  = [...new Set(pubs.map(function(p) { return cleanVenue(p.conference); }))].length;
  const coauths = [...new Set(pubs.flatMap(getCoauthors))].length;
  const panel = document.createElement('div');
  panel.id = 'stats-panel';
  panel.innerHTML =
    '<div class="stats-header">' +
      '<button class="stats-toggle" id="statsToggleBtn" onclick="toggleStats()">' +
        '<i class="fa-solid fa-chart-bar"></i> Research Stats' +
        '<span class="stats-toggle-arrow" id="statsArrow" style="transform:rotate(0deg);">&#9662;</span>' +
      '</button>' +
    '</div>' +
    '<div id="statsBody" class="stats-body stats-body--collapsed">' +
      '<div class="stats-kpis">' +
        '<div class="kpi-card"><div class="kpi-num">' + total + '</div><div class="kpi-label">Publications</div></div>' +
        '<div class="kpi-card"><div class="kpi-num">' + years + '</div><div class="kpi-label">Years Active</div></div>' +
        '<div class="kpi-card"><div class="kpi-num">' + venues + '</div><div class="kpi-label">Venues</div></div>' +
        '<div class="kpi-card"><div class="kpi-num">' + coauths + '</div><div class="kpi-label">Co-authors</div></div>' +
      '</div>' +
      '<div class="stats-charts-grid">' +
        '<div class="chart-card"><div class="chart-card-title">Publications per Year</div><div class="chart-wrap"><canvas id="chartYear"></canvas></div></div>' +
        '<div class="chart-card"><div class="chart-card-title">Venue Breakdown</div><div class="chart-wrap"><canvas id="chartVenue"></canvas></div></div>' +
        '<div class="chart-card"><div class="chart-card-title">Top Research Topics</div><div class="chart-wrap"><canvas id="chartTopics"></canvas></div></div>' +
        '<div class="chart-card"><div class="chart-card-title">Co-author Frequency</div><div class="chart-wrap"><canvas id="chartCoauth"></canvas></div></div>' +
      '</div>' +
    '</div>';
  const list = document.getElementById('publication-list');
  list.parentNode.insertBefore(panel, list);
}
function toggleStats() {
  const body  = document.getElementById('statsBody');
  const arrow = document.getElementById('statsArrow');
  const nowCollapsed = body.classList.toggle('stats-body--collapsed');
  arrow.style.transform = nowCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
  if (!nowCollapsed) {
    setTimeout(function() { renderCharts(publications); }, 80);
  }
}
function renderCharts(pubs) {
  Object.values(chartInstances).forEach(function(c) { c.destroy(); });
  chartInstances = {};
  const isDark    = document.body.classList.contains('dark-mode');
  const textColor = isDark ? '#a8b0cc' : '#3d4350';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const bgColor   = isDark ? '#1b1f2e' : '#ffffff';
  Chart.defaults.color       = textColor;
  Chart.defaults.font.family = "'Open Sans','Lato',Arial,sans-serif";
  Chart.defaults.font.size   = 12;
  // ── 1. Publications per Year ───────────────────────────
  const byYear   = countBy(pubs, function(p) { return p.year; });
  const yearKeys = Object.keys(byYear).sort();
  chartInstances.year = new Chart(document.getElementById('chartYear'), {
    type: 'bar',
    data: {
      labels: yearKeys,
      datasets: [{
        label: 'Papers',
        data: yearKeys.map(function(y) { return byYear[y]; }),
        backgroundColor: yearKeys.map(function(_, i) { return PALETTE[i % PALETTE.length] + 'cc'; }),
        borderColor:     yearKeys.map(function(_, i) { return PALETTE[i % PALETTE.length]; }),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        datalabels: { display: false },
        tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.raw + ' paper' + (ctx.raw !== 1 ? 's' : ''); } } }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1, precision: 0 }, beginAtZero: true }
      }
    }
  });
  // ── 2. Venue Breakdown — workshops excluded ────────────
  const nonWorkshopPubs = pubs.filter(function(p) { return !isWorkshop(p.conference); });
  const byVenue     = countBy(nonWorkshopPubs, function(p) { return cleanVenue(p.conference); });
  const venueLabels = Object.keys(byVenue).sort(function(a, b) { return byVenue[b] - byVenue[a]; });
  const venueData   = venueLabels.map(function(v) { return byVenue[v]; });
  const venueTotal  = nonWorkshopPubs.length;
  const leaderLinesPlugin = {
    id: 'leaderLines',
    afterDraw: function(chart) {
      const ctx  = chart.ctx;
      const meta = chart.getDatasetMeta(0);
      const cx   = chart.chartArea ? (chart.chartArea.left + chart.chartArea.right) / 2 : chart.width / 2;
      const cy   = chart.chartArea ? (chart.chartArea.top + chart.chartArea.bottom) / 2 : chart.height / 2;
      ctx.save();
      meta.data.forEach(function(arc, i) {
        const val = chart.data.datasets[0].data[i];
        if (val / venueTotal < 0.05) return;
        const angle   = (arc.startAngle + arc.endAngle) / 2;
        const outerR  = arc.outerRadius;
        const x1 = cx + Math.cos(angle) * outerR;
        const y1 = cy + Math.sin(angle) * outerR;
        const x2 = cx + Math.cos(angle) * (outerR + 12);
        const y2 = cy + Math.sin(angle) * (outerR + 12);
        const x3 = cx + Math.cos(angle) * (outerR + 22);
        const y3 = cy + Math.sin(angle) * (outerR + 22);
        const isRight  = Math.cos(angle) >= 0;
        const lineEndX = x3 + (isRight ? 14 : -14);
        const labelX   = x3 + (isRight ? 18 : -18);
        const pct      = Math.round(val / venueTotal * 100);
        const label    = chart.data.labels[i];
        const color    = chart.data.datasets[0].backgroundColor[i];
        ctx.strokeStyle = color;
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(lineEndX, y3);
        ctx.stroke();
        ctx.fillStyle    = textColor;
        ctx.font         = 'bold 10px "Open Sans",sans-serif';
        ctx.textAlign    = isRight ? 'left' : 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(label, labelX, y3);
        ctx.font         = '10px "Open Sans",sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillStyle    = isDark ? '#6e7894' : '#6b7280';
        ctx.fillText(pct + '%', labelX, y3 + 1);
      });
      ctx.restore();
    }
  };
  chartInstances.venue = new Chart(document.getElementById('chartVenue'), {
    type: 'doughnut',
    plugins: [leaderLinesPlugin],
    data: {
      labels: venueLabels,
      datasets: [{
        data: venueData,
        backgroundColor: venueLabels.map(function(_, i) { return PALETTE[i % PALETTE.length] + 'dd'; }),
        borderColor: bgColor,
        borderWidth: 3,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      layout: { padding: 20 },
      animation: { animateRotate: true, duration: 900 },
      plugins: {
        legend: { display: false },
        datalabels: { display: true },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              return ' ' + ctx.label + ': ' + ctx.raw + ' (' + Math.round(ctx.raw / venueTotal * 100) + '%)';
            }
          }
        }
      }
    }
  });
  // ── 3. Top Research Topics ─────────────────────────────
  const topicCount = {};
  pubs.forEach(function(p) {
    getCategories(p).forEach(function(cat) {
      topicCount[cat] = (topicCount[cat] || 0) + 1;
    });
  });
  const topicsSorted = Object.entries(topicCount).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10);
  const topicLabels  = topicsSorted.map(function(e) { return e[0]; });
  const topicData    = topicsSorted.map(function(e) { return e[1]; });
  chartInstances.topics = new Chart(document.getElementById('chartTopics'), {
    type: 'bar',
    data: {
      labels: topicLabels,
      datasets: [{
        label: 'Papers',
        data: topicData,
        backgroundColor: topicLabels.map(function(_, i) { return PALETTE[i % PALETTE.length] + 'cc'; }),
        borderColor:     topicLabels.map(function(_, i) { return PALETTE[i % PALETTE.length]; }),
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutQuart', delay: function(ctx) { return ctx.dataIndex * 60; } },
      plugins: {
        legend: { display: false },
        datalabels: { display: false },
        tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.raw + ' paper' + (ctx.raw !== 1 ? 's' : ''); } } }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, precision: 0 }, beginAtZero: true },
        y: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } }
      }
    }
  });
  // ── 4. Co-author Frequency ─────────────────────────────
  const coauthCount = {};
  pubs.forEach(function(p) {
    getCoauthors(p).forEach(function(a) {
      const parts = a.replace(/\*/g, '').trim().split(' ');
      const short = parts.length > 1 ? parts[parts.length - 1] + ' ' + parts[0][0] + '.' : parts[0];
      coauthCount[short] = (coauthCount[short] || 0) + 1;
    });
  });
  const coSorted = Object.entries(coauthCount).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10);
  const coLabels = coSorted.map(function(e) { return e[0]; });
  const coData   = coSorted.map(function(e) { return e[1]; });
  chartInstances.coauth = new Chart(document.getElementById('chartCoauth'), {
    type: 'bar',
    data: {
      labels: coLabels,
      datasets: [{
        label: 'Papers together',
        data: coData,
        backgroundColor: coLabels.map(function(_, i) { return PALETTE[(i + 4) % PALETTE.length] + 'cc'; }),
        borderColor:     coLabels.map(function(_, i) { return PALETTE[(i + 4) % PALETTE.length]; }),
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutQuart', delay: function(ctx) { return ctx.dataIndex * 60; } },
      plugins: {
        legend: { display: false },
        datalabels: { display: false },
        tooltip: { callbacks: { label: function(ctx) { return ' ' + ctx.raw + ' paper' + (ctx.raw !== 1 ? 's' : '') + ' together'; } } }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, precision: 0 }, beginAtZero: true },
        y: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } }
      }
    }
  });
}
function refreshCharts() {
  if (publications.length) renderCharts(publications);
}
function updateResultsMeta(count, searchText) {
  searchText = searchText || '';
  let meta = document.getElementById('results-meta');
  if (!meta) {
    meta = document.createElement('div');
    meta.id = 'results-meta';
    const list = document.getElementById('publication-list');
    list.parentNode.insertBefore(meta, list);
  }
  meta.innerHTML = searchText
    ? '<span>' + count + '</span> result' + (count !== 1 ? 's' : '') + ' for "<em>' + searchText + '</em>"'
    : '<span>' + count + '</span> publication' + (count !== 1 ? 's' : '');
}
function setupFadeIn() {
  const io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.06, rootMargin: '0px 0px -10px 0px' });
  document.querySelectorAll('.publication').forEach(function(card) {
    card.classList.remove('visible');
    io.observe(card);
  });
}
function toggleYearContent(year) {
  const content = document.querySelector('.year-content[data-year="' + year + '"]');
  if (!content) return;
  const arrow = content.previousElementSibling && content.previousElementSibling.querySelector('.arrow-icon');
  content.classList.toggle('hide');
  if (arrow) arrow.style.transform = content.classList.contains('hide') ? 'rotate(0deg)' : 'rotate(180deg)';
}
function formatAuthors(str, q) {
  q = q || '';
  return str.split(',').map(function(a) {
    a = a.trim();
    const html = q ? highlight(a, q) : a;
    return a.toLowerCase().includes('sadil') ? '<u><b>' + html + '</b></u>' : html;
  }).join(' &nbsp;&#183;&nbsp; ');
}
function formatConference(text, q) {
  q = q || '';
  let t = (text || '').replace(/(highlight|spotlight|oral)/gi, function(m) { return '<span style="color:var(--red);">' + m + '</span>'; });
  return q ? highlight(t, q) : t;
}
function highlight(text, term) {
  if (!term) return text;
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp('(' + esc + ')', 'gi'), '<mark>$1</mark>');
}
function buildCard(pub, q) {
  q = q || '';
  const el = document.createElement('div');
  el.classList.add('publication');
  const imgHtml     = pub.image ? '<img src="' + pub.image + '" alt="' + pub.title + '" loading="lazy">' : '<div class="paper-image-placeholder">&#9703;</div>';
  const captionHtml = pub.metadata ? '<div class="paper-metadata">' + pub.metadata + '</div>' : '';
  const btns = [
    pub.paperLink && btn('<i class="fa-regular fa-file-lines"></i>&nbsp;Paper',     pub.paperLink),
    pub.arxiv     && btn('<i class="fa-solid fa-scroll"></i>&nbsp;arXiv',           pub.arxiv),
    pub.project   && btn('<i class="fa-solid fa-globe"></i>&nbsp;Project',          pub.project),
    pub.codeLink  && btn('<i class="fa-brands fa-github"></i>&nbsp;Code',           pub.codeLink),
    pub.dataset   && btn('<i class="fa-solid fa-database"></i>&nbsp;Dataset',       pub.dataset),
    pub.poster    && btn('<i class="fa-regular fa-image"></i>&nbsp;Poster',         pub.poster),
    pub.video     && btn('<i class="fa-brands fa-youtube"></i>&nbsp;Video',         pub.video),
    pub.bibtex    && bibtexBtn(pub.bibtex)
  ].filter(Boolean).join('');
  const titleHtml = q ? highlight(pub.title, q) : pub.title;
  el.innerHTML =
    '<div class="publication-content">' +
      '<div class="paper-image">' + imgHtml + captionHtml + '</div>' +
      '<div class="paper-body">' +
        '<div class="paper-info">' +
          '<div class="paper-title">' + titleHtml + '</div>' +
          '<div class="paper-authors">' + formatAuthors(pub.authors, q) + '</div>' +
          '<div class="paper-conference">' + formatConference(pub.conference, q) + '</div>' +
        '</div>' +
        '<div class="links">' + btns + '</div>' +
      '</div>' +
    '</div>';
  return el;
}
function btn(label, url) {
  return '<button class="button" onclick="window.open(\'' + url + '\',\'_blank\')">' + label + '</button>';
}
function bibtexBtn(raw) {
  const safe = raw.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return '<button class="button" onclick="showBibtex(\'' + safe + '\')"><i class="fa-solid fa-quote-left"></i>&nbsp;BibTeX</button>';
}
function buildYearSection(year, pubs, q) {
  q = q || '';
  const section = document.createElement('div');
  section.classList.add('year-section');
  section.innerHTML =
    '<h2 onclick="toggleYearContent(' + year + ')">' +
      year +
      '<span class="year-badge">' + pubs.length + '</span>' +
      '<span class="arrow-icon" style="transform:rotate(180deg);">&#9662;</span>' +
    '</h2>' +
    '<hr class="year-divider">';
  const yearContent = document.createElement('div');
  yearContent.classList.add('year-content');
  yearContent.setAttribute('data-year', year);
  const inner = document.createElement('div');
  inner.classList.add('year-content-inner');
  pubs.forEach(function(pub) { inner.appendChild(buildCard(pub, q)); });
  yearContent.appendChild(inner);
  section.appendChild(yearContent);
  return section;
}
function displayPublications(pubs, q) {
  q = q || '';
  const list = document.getElementById('publication-list');
  list.innerHTML = '';
  if (!pubs || pubs.length === 0) {
    list.innerHTML = '<div class="no-results"><div class="no-results-icon">&#9633;</div><p>No publications found.</p><small>Try a different search term.</small></div>';
    return;
  }
  const sorted = [...pubs].sort(function(a, b) { return b.year - a.year; });
  const byYear = sorted.reduce(function(acc, pub) {
    (acc[pub.year] = acc[pub.year] || []).push(pub);
    return acc;
  }, {});
  Object.keys(byYear).sort(function(a, b) { return b - a; }).forEach(function(year) {
    list.appendChild(buildYearSection(Number(year), byYear[year], q));
  });
  requestAnimationFrame(function() { setTimeout(setupFadeIn, 50); });
}
function filterPublications(q) {
  const lq = q.toLowerCase();
  return publications.filter(function(p) {
    return p.title.toLowerCase().includes(lq) ||
           p.authors.toLowerCase().includes(lq) ||
           p.year.toString().includes(lq) ||
           (p.conference || '').toLowerCase().includes(lq) ||
           (p.categories || '').toLowerCase().includes(lq);
  });
}
const debounce = function(fn, ms) {
  let t;
  return function() {
    const args = arguments;
    clearTimeout(t);
    t = setTimeout(function() { fn.apply(null, args); }, ms);
  };
};
function updatePublications() {
  const q = document.getElementById('search').value.trim();
  const results = q ? filterPublications(q) : publications;
  updateResultsMeta(results.length, q);
  displayPublications(results, q);
}
function formatBibtex(text) {
  let out = '', depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') { depth++; out += ch; }
    else if (ch === '}') { depth--; out += ch; }
    else if (ch === ',' && depth <= 1) { out += ',\n'; }
    else { out += ch; }
  }
  return out;
}
function colorizeBibtex(text) {
  const dark = document.body.classList.contains('dark-mode');
  const c = dark
    ? { at: '#f97583', key: '#79c0ff', val: '#d2a8ff' }
    : { at: '#c94040', key: '#1a73e8', val: '#6f42c1' };
  return text
    .replace(/^@(\w+)/gm, '<span style="color:' + c.at + ';font-weight:700;">@$1</span>')
    .replace(/^(\s*[a-zA-Z]+)\s*=/gm, '<span style="color:' + c.key + ';font-weight:600;">$1</span> =')
    .replace(/({[^}]+})/gm, '<span style="color:' + c.val + ';">$1</span>');
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
  navigator.clipboard.writeText(text).then(function() {
    const b = document.querySelector('.copy-btn');
    const orig = b.textContent;
    b.textContent = '\u2705 Copied!';
    b.style.background = '#1e8e3e';
    setTimeout(function() { b.textContent = orig; b.style.background = ''; }, 1800);
  });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const m = document.getElementById('bibtexModal');
    if (m && m.style.display === 'flex') closeBibtexModal();
  }
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    const s = document.getElementById('search');
    if (s) s.focus();
  }
});
document.addEventListener('click', function(e) {
  const m = document.getElementById('bibtexModal');
  if (m && e.target === m) closeBibtexModal();
});
document.getElementById('search').addEventListener('input', debounce(updatePublications, 200));
fetchPublications();
