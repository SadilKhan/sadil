---
title: ""
subtitle: ""
description: "CV"
author: "Mohammad Sadil Khan"
publishDate: "2025-10-10"
show_details: false
layout: single
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<style>
:root {
  --cv-accent:        #0ea5e9;
  --cv-accent-teal:   #006494;
  --cv-accent-bg:     rgba(14,165,233,0.07);
  --cv-accent-glow:   rgba(14,165,233,0.18);
  --cv-accent-border: rgba(14,165,233,0.25);
}

.cv-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem 0 5rem;
  font-family: 'DM Sans', sans-serif;
}

.cv-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  border: 1.5px solid var(--cv-accent);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--cv-accent);
  background: var(--cv-accent-bg);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  margin-bottom: 2.8rem;
  cursor: pointer;
}
.cv-download:hover {
  background: var(--cv-accent);
  color: #fff;
  box-shadow: 0 4px 16px var(--cv-accent-glow);
  transform: translateY(-1px);
  text-decoration: none;
}

.cv-section { margin-bottom: 3rem; }

.cv-section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.55rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 1.1rem;
  padding-bottom: 0.55rem;
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, var(--cv-accent) 0%, var(--cv-accent-teal) 50%, transparent 100%) 1;
  opacity: 0.9;
}

.cv-card {
  border: 1px solid rgba(128,128,128,0.16);
  border-radius: 12px;
  padding: 1.3rem 1.5rem 1.3rem 1.7rem;
  margin-bottom: 0.85rem;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
  animation: cvFadeUp 0.4s ease both;
}
.cv-card::before {
  content: '';
  position: absolute;
  left: 0; top: 20px; bottom: 20px;
  width: 3px;
  background: linear-gradient(180deg, var(--cv-accent) 0%, var(--cv-accent-teal) 100%);
  border-radius: 0 2px 2px 0;
  opacity: 0.35;
  transition: opacity 0.22s, top 0.22s, bottom 0.22s;
}
.cv-card:hover {
  box-shadow: 0 4px 24px var(--cv-accent-glow);
  border-color: var(--cv-accent-border);
  transform: translateY(-2px);
}
.cv-card:hover::before { opacity: 0.85; top: 0; bottom: 0; }

.cv-card-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
}

/* Logo + text side by side */
.cv-card-left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
  min-width: 0;
}

.cv-logo {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: contain;
  flex-shrink: 0;
  border: 1px solid rgba(128,128,128,0.12);
  padding: 3px;
  background: #fff;
}

.cv-logo-placeholder {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  flex-shrink: 0;
  background: var(--cv-accent-bg);
  border: 1px solid var(--cv-accent-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--cv-accent);
}

.cv-card-body { flex: 1; min-width: 0; }

.cv-card-date {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cv-accent);
  background: var(--cv-accent-bg);
  border: 1px solid var(--cv-accent-border);
  border-radius: 20px;
  padding: 0.2rem 0.7rem;
  white-space: nowrap;
  margin-top: 0.15rem;
}

.cv-role {
  font-family: 'DM Serif Display', serif;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
  line-height: 1.3;
}
.cv-org {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cv-accent-teal);
  margin-bottom: 0.2rem;
}
.cv-loc {
  font-size: 0.8rem;
  opacity: 0.45;
  margin-bottom: 0.65rem;
}
.cv-loc i { font-size: 0.7rem; margin-right: 0.25rem; color: var(--cv-accent); opacity: 0.7; }
.cv-desc { font-size: 0.875rem; line-height: 1.65; opacity: 0.72; margin: 0; }

.cv-card--edu .cv-card-inner { align-items: center; }
.cv-card--edu .cv-card-left  { align-items: center; }
.cv-card--edu .cv-loc        { margin-bottom: 0; }

/* Loading / error states */
.cv-loading {
  text-align: center;
  padding: 2rem;
  opacity: 0.5;
  font-size: 0.9rem;
}

@keyframes cvFadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 520px) {
  .cv-card { padding: 1.1rem 1.2rem 1.1rem 1.5rem; }
  .cv-card-inner { flex-direction: column; gap: 0.35rem; }
  .cv-card-date { order: -1; font-size: 0.68rem; }
  .cv-role { font-size: 1rem; }
  .cv-section-title { font-size: 1.35rem; }
  .cv-logo, .cv-logo-placeholder { width: 36px; height: 36px; }
}
</style>

<div class="cv-wrap">

  <button class="cv-download" onclick="window.open('resume.pdf','_blank')">
    <i class="fa-solid fa-file-arrow-down"></i> Download PDF
  </button>

  <div class="cv-section">
    <h2 class="cv-section-title">Work Experience</h2>
    <div id="cv-experience"><div class="cv-loading">Loading…</div></div>
  </div>

  <div class="cv-section">
    <h2 class="cv-section-title">Education</h2>
    <div id="cv-education"><div class="cv-loading">Loading…</div></div>
  </div>

</div>

<script>
(function () {
  function buildCard(item, isEdu) {
    var logoHtml = item.logo
      ? '<img class="cv-logo" src="' + item.logo + '" alt="' + item.org + ' logo" onerror="this.outerHTML=\'<div class=&quot;cv-logo-placeholder&quot;><i class=&quot;fa-solid fa-building&quot;></i></div>\'">'
      : '<div class="cv-logo-placeholder"><i class="fa-solid fa-building"></i></div>';
    var descHtml = (!isEdu && item.desc)
      ? '<p class="cv-desc">' + item.desc + '</p>'
      : '';
    return '<div class="cv-card' + (isEdu ? ' cv-card--edu' : '') + '">' +
      '<div class="cv-card-inner">' +
        '<div class="cv-card-left">' +
          logoHtml +
          '<div class="cv-card-body">' +
            '<div class="cv-role">' + item.role + '</div>' +
            '<div class="cv-org">'  + item.org  + '</div>' +
            '<div class="cv-loc"><i class="fa-solid fa-location-dot"></i>' + item.location + '</div>' +
            descHtml +
          '</div>' +
        '</div>' +
        '<div class="cv-card-date">' + item.date + '</div>' +
      '</div>' +
    '</div>';
  }
  fetch('cv.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var expEl = document.getElementById('cv-experience');
      var eduEl = document.getElementById('cv-education');
      expEl.innerHTML = data.experience.map(function (item) {
        return buildCard(item, false);
      }).join('');
      eduEl.innerHTML = data.education.map(function (item) {
        return buildCard(item, true);
      }).join('');
    })
    .catch(function (err) {
      document.getElementById('cv-experience').innerHTML =
        '<div class="cv-loading">Could not load CV data. (' + err.message + ')</div>';
    });
})();
</script>
