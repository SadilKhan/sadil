/* ============================================================
   PUBLICATIONS PAGE — SCRIPT + STATS DASHBOARD
   Charts powered by Chart.js 4.4.1 + chartjs-plugin-datalabels
   ============================================================ */
let publications = [];
let chartInstances = {};
let activeFilter = 'all';

function esc(value) {
  return String(value || '').replace(/[&<>"']/g, function(char) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char];
  });
}

function attr(value) {
  return esc(value).replace(/`/g, '&#96;');
}

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
  return pub.authors.split(',').map(function(a) {
    return a.trim().replace(/\{dagger\}/g, '').replace(/\*/g, '').trim();
  }).filter(function(a) { return !a.toLowerCase().includes('sadil'); });
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
  const mount = document.getElementById('pub-stats-zone');
  const total   = pubs.length;
  const years   = [...new Set(pubs.map(function(p) { return p.year; }))].length;
  const venues  = [...new Set(pubs.map(function(p) { return cleanVenue(p.conference); }))].length;
  const coauths = [...new Set(pubs.flatMap(getCoauthors))].length;
  const panel = document.createElement('div');
  panel.id = 'stats-panel';
  panel.innerHTML =
    '<div class="stats-header">' +
      '<div>' +
        '<p class="stats-eyebrow">Research Stats</p>' +
        '<h2 class="stats-title">Publication Overview</h2>' +
      '</div>' +
      '<button class="stats-toggle" id="statsToggleBtn" onclick="toggleStats()" aria-expanded="false" aria-controls="statsBody">' +
        '<i class="fa-solid fa-chart-bar"></i> Details' +
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
  if (mount) {
    mount.innerHTML = '';
    mount.appendChild(panel);
  } else {
    const list = document.getElementById('publication-list');
    list.parentNode.insertBefore(panel, list);
  }
}
function toggleStats() {
  const body  = document.getElementById('statsBody');
  const arrow = document.getElementById('statsArrow');
  const btn = document.getElementById('statsToggleBtn');
  const nowCollapsed = body.classList.toggle('stats-body--collapsed');
  arrow.style.transform = nowCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
  if (btn) btn.setAttribute('aria-expanded', nowCollapsed ? 'false' : 'true');
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
  const countHtml = searchText
    ? '<span class="results-count">' + count + '</span> result' + (count !== 1 ? 's' : '') + ' for "<em>' + esc(searchText) + '</em>"'
    : '<span class="results-count">' + count + '</span> publication' + (count !== 1 ? 's' : '');
  const legendHtml =
    '<div class="results-legend" aria-label="Author marker legend">' +
      '<span class="legend-item"><span class="legend-mark legend-star">&ast;</span>Equal contribution</span>' +
      '<span class="legend-item"><span class="legend-mark legend-dagger">&dagger;</span>Joint supervision</span>' +
    '</div>';
  meta.innerHTML = '<div class="results-count-wrap">' + countHtml + '</div>' + legendHtml;
}
function initSlideshows(root) {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  (root || document).querySelectorAll('.paper-image.has-slideshow').forEach(function(box) {
    if (box.dataset.slideshowInit) return;
    box.dataset.slideshowInit = '1';

    const stage   = box.querySelector('.paper-slides');
    const slides  = Array.prototype.slice.call(box.querySelectorAll('.paper-slide'));
    const dots    = Array.prototype.slice.call(box.querySelectorAll('.paper-slide-dot'));
    const currEl  = box.querySelector('.paper-slide-current');
    const card    = box.closest('.publication');
    const total   = slides.length;
    if (total < 2) return;

    let idx = 0;
    let timer = null;
    let scanTimer = null;
    const INTERVAL = 2600;
    const SCAN_MS  = 720;

    function show(n) {
      const nextIdx = (n + total) % total;
      if (nextIdx === idx && slides[idx].classList.contains('is-active')) return;
      idx = nextIdx;
      // Trigger the scan animation by restarting the `is-transitioning` class.
      if (stage) {
        stage.classList.remove('is-transitioning');
        // Force a reflow so a new animation iteration plays from scratch.
        void stage.offsetWidth;
        stage.classList.add('is-transitioning');
        if (scanTimer) window.clearTimeout(scanTimer);
        scanTimer = window.setTimeout(function() {
          stage.classList.remove('is-transitioning');
        }, SCAN_MS);
      }
      slides.forEach(function(s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function(d, i)   { d.classList.toggle('is-active', i === idx); });
      if (currEl) currEl.textContent = String(idx + 1);
    }
    function next() { show(idx + 1); }
    function prev() { show(idx - 1); }
    function play() {
      if (timer || reduceMotion) return;
      timer = window.setInterval(next, INTERVAL);
    }
    function pause() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    function restart() { pause(); play(); }

    // Auto-play whenever the card is engaged
    if (card) {
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', pause);
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', pause);
      card.addEventListener('click', play);          // tap starts on touch devices
    }

    const prevBtn = box.querySelector('.paper-slide-prev');
    const nextBtn = box.querySelector('.paper-slide-next');
    if (prevBtn) prevBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); next(); restart(); });

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); show(i); restart(); });
    });

    // Keyboard support when image area is focused
    box.setAttribute('tabindex', '0');
    box.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); restart(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); restart(); }
    });
  });
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
    // Pull markers off the name so they don't pollute search / highlight,
    // then re-attach them as styled superscripts after the name.
    //   *         → Equal contribution
    //   {dagger}  → Joint Supervision
    const hasStar   = /\*/.test(a);
    const hasDagger = /\{dagger\}/i.test(a);
    const plain = a.replace(/\{dagger\}/gi, '').replace(/\*/g, '').trim();
    const clean = esc(plain);
    const html = q ? highlight(clean, q) : clean;
    let marks = '';
    if (hasStar)   marks += '<sup class="paper-star"   title="Equal contribution">&ast;</sup>';
    if (hasDagger) marks += '<sup class="paper-dagger" title="Joint Supervision">&dagger;</sup>';
    const withMarks = html + marks;
    return plain.toLowerCase().includes('sadil')
      ? '<u><b>' + withMarks + '</b></u>'
      : withMarks;
  }).join(' &nbsp;&#183;&nbsp; ');
}
function formatConference(text, q) {
  q = q || '';
  let t = esc(text || '').replace(/(highlight|spotlight|oral)/gi, function(m) { return '<span class="venue-accent">' + m + '</span>'; });
  return q ? highlight(t, q) : t;
}
function highlight(text, term) {
  if (!term) return text;
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp('(' + esc + ')', 'gi'), '<mark>$1</mark>');
}
function buildImageBlock(pub) {
  const list = Array.isArray(pub.images) && pub.images.length
    ? pub.images.filter(Boolean)
    : (pub.image ? [pub.image] : []);

  if (list.length === 0) {
    return { html: '<div class="paper-image-placeholder"><i class="fa-regular fa-file-lines"></i></div>', isSlideshow: false };
  }
  if (list.length === 1) {
    return { html: '<img src="' + attr(list[0]) + '" alt="' + attr(pub.title) + '" loading="lazy">', isSlideshow: false };
  }

  const slides = list.map(function(src, i) {
    return '<img class="paper-slide' + (i === 0 ? ' is-active' : '') + '" ' +
      'src="' + attr(src) + '" alt="' + attr(pub.title) + (i ? ' — image ' + (i + 1) : '') + '" ' +
      (i === 0 ? 'loading="eager"' : 'loading="lazy"') + ' draggable="false">';
  }).join('');
  const dots = list.map(function(_, i) {
    return '<button class="paper-slide-dot' + (i === 0 ? ' is-active' : '') + '" ' +
      'type="button" data-idx="' + i + '" aria-label="Show image ' + (i + 1) + ' of ' + list.length + '"></button>';
  }).join('');
  const html =
    '<div class="paper-slides" aria-live="polite">' + slides + '</div>' +
    '<button class="paper-slide-nav paper-slide-prev" type="button" aria-label="Previous image">' +
      '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>' +
    '<button class="paper-slide-nav paper-slide-next" type="button" aria-label="Next image">' +
      '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>' +
    '<div class="paper-slide-count" aria-hidden="true"><span class="paper-slide-current">1</span> / ' + list.length + '</div>' +
    '<div class="paper-slide-dots">' + dots + '</div>';
  return { html: html, isSlideshow: true };
}

function buildCard(pub, q) {
  q = q || '';
  const el = document.createElement('div');
  el.classList.add('publication');
  const cats = getCategories(pub);
  const isFeatured = /(spotlight|highlight|oral)/i.test(pub.conference || '');
  if (isFeatured) el.classList.add('publication-featured');
  const imgBlock = buildImageBlock(pub);
  const imgHtml = imgBlock.html;
  const imgWrapClass = 'paper-image' + (imgBlock.isSlideshow ? ' has-slideshow' : '');
  const captionHtml = pub.metadata ? '<div class="paper-metadata">' + esc(pub.metadata) + '</div>' : '';
  const tagHtml = cats.slice(0, 5).map(function(cat) {
    return '<span class="paper-tag">' + esc(cat) + '</span>';
  }).join('');
  const btns = [
    pub.paperLink && btn('<i class="fa-solid fa-file-lines" style="color: rgb(17, 19, 172);"></i>&nbsp;Paper',     pub.paperLink),
    pub.arxiv     && btn('<i class="fa-solid fa-scroll"></i>&nbsp;arXiv',           pub.arxiv),
    pub.project   && btn('<i class="fa-solid fa-globe"></i>&nbsp;Project',          pub.project),
    pub.codeLink  && btn('<i class="fa-brands fa-github"></i>&nbsp;Code',           pub.codeLink),
    pub.dataset   && btn('<i class="fa-solid fa-database"></i>&nbsp;Dataset',       pub.dataset),
    pub.poster    && btn('<i class="fa-regular fa-image"></i>&nbsp;Poster',         pub.poster),
    pub.video     && btn('<i class="fa-brands fa-youtube"></i>&nbsp;Video',         pub.video),
    pub.bibtex    && bibtexBtn(pub.bibtex)
  ].filter(Boolean).join('');
  const titleClean = esc(pub.title);
  const titleHtml = q ? highlight(titleClean, q) : titleClean;
  el.innerHTML =
    '<div class="publication-content">' +
      '<div class="' + imgWrapClass + '">' +
        '<div class="paper-year-ribbon">' + esc(pub.year) + '</div>' +
        imgHtml +
        captionHtml +
      '</div>' +
      '<div class="paper-body">' +
        '<div class="paper-info">' +
          '<div class="paper-topline">' +
            '<span class="paper-venue-pill">' + formatConference(pub.conference, q) + '</span>' +
            (isFeatured ? '<span class="paper-featured-pill"><i class="fa-solid fa-star"></i> Featured</span>' : '') +
          '</div>' +
          '<div class="paper-title">' + titleHtml + '</div>' +
          '<div class="paper-authors">' + formatAuthors(pub.authors, q) + '</div>' +
          (tagHtml ? '<div class="paper-tags">' + tagHtml + '</div>' : '') +
        '</div>' +
        '<div class="links">' + btns + '</div>' +
      '</div>' +
    '</div>';
  return el;
}
function btn(label, url) {
  return '<a class="button" href="' + attr(url) + '" target="_blank" rel="noopener">' + label + '</a>';
}
function bibtexBtn(raw) {
  return '<button class="button bibtex-trigger" type="button"><i class="fa-solid fa-quote-left"></i>&nbsp;BibTeX</button>';
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
  pubs.forEach(function(pub) {
    const card = buildCard(pub, q);
    const bib = card.querySelector('.bibtex-trigger');
    if (bib) bib.addEventListener('click', function() { showBibtex(pub.bibtex); });
    inner.appendChild(card);
  });
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
  initSlideshows();
}
function filterPublications(q) {
  const lq = q.toLowerCase();
  return publications.filter(function(p) {
    const filterText = [p.title, p.authors, p.conference, p.categories, p.metadata, p.year].join(' ').toLowerCase();
    const matchesQuickFilter = activeFilter === 'all' || filterText.includes(activeFilter);
    const matchesSearch = !lq ||
           p.title.toLowerCase().includes(lq) ||
           p.authors.toLowerCase().includes(lq) ||
           p.year.toString().includes(lq) ||
           (p.conference || '').toLowerCase().includes(lq) ||
           (p.categories || '').toLowerCase().includes(lq) ||
           (p.metadata || '').toLowerCase().includes(lq);
    return matchesQuickFilter && matchesSearch;
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
  const results = filterPublications(q);
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
document.getElementById('search').addEventListener('input', debounce(updatePublications, 160));
const filterBar = document.getElementById('pub-filter-bar');
if (filterBar) {
  filterBar.addEventListener('click', function(e) {
    const btn = e.target.closest('.pub-filter');
    if (!btn) return;
    activeFilter = btn.dataset.filter || 'all';
    filterBar.querySelectorAll('.pub-filter').forEach(function(item) {
      const pressed = item === btn;
      item.classList.toggle('is-active', pressed);
      item.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
    updatePublications();
  });
}
fetchPublications();
