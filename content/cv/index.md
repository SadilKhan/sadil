---
title: ""
subtitle: ""
description: "CV"
author: "Mohammad Sadil Khan"
publishDate: "2025-10-10"
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<style>
/* ── CV — inherits Hugo Apero theme, blue/teal accents ── */

:root {
  --cv-accent:       #0ea5e9;   /* sky-500  */
  --cv-accent-teal:  #006494;   /* teal-500 */
  --cv-accent-bg:    rgba(14, 165, 233, 0.07);
  --cv-accent-glow:  rgba(14, 165, 233, 0.18);
  --cv-accent-border:rgba(14, 165, 233, 0.25);
}

.cv-wrap {
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem 0 5rem;
  font-family: 'DM Sans', sans-serif;
}

/* Download button */
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
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
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

/* Section */
.cv-section {
  margin-bottom: 3rem;
}

.cv-section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.55rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 1.1rem;
  padding-bottom: 0.55rem;
  /* Two-tone underline: accent color fades to transparent */
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, var(--cv-accent) 0%, var(--cv-accent-teal) 50%, transparent 100%) 1;
  opacity: 0.9;
}

/* Card */
.cv-card {
  border: 1px solid rgba(128,128,128,0.16);
  border-radius: 12px;
  padding: 1.3rem 1.5rem 1.3rem 1.7rem;
  margin-bottom: 0.85rem;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
  animation: cvFadeUp 0.4s ease both;
}

/* Left accent bar — teal/blue gradient */
.cv-card::before {
  content: '';
  position: absolute;
  left: 0; top: 20px; bottom: 20px;
  width: 3px;
  background: linear-gradient(180deg, var(--cv-accent) 0%, var(--cv-accent-teal) 100%);
  border-radius: 0 2px 2px 0;
  opacity: 0.35;
  transition: opacity 0.22s ease, top 0.22s ease, bottom 0.22s ease;
}

.cv-card:hover {
  box-shadow: 0 4px 24px var(--cv-accent-glow);
  border-color: var(--cv-accent-border);
  transform: translateY(-2px);
}
.cv-card:hover::before {
  opacity: 0.85;
  top: 0; bottom: 0;
}

/* Card inner: body | date */
.cv-card-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
}

.cv-card-body { flex: 1; min-width: 0; }

/* Date badge */
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

/* Content */
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
.cv-loc i {
  font-size: 0.7rem;
  margin-right: 0.25rem;
  color: var(--cv-accent);
  opacity: 0.7;
}

.cv-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  opacity: 0.72;
  margin: 0;
}

/* Education cards: vertically centered, no description */
.cv-card--edu .cv-card-inner { align-items: center; }
.cv-card--edu .cv-loc { margin-bottom: 0; }

/* Staggered fade-in */
.cv-section:nth-child(2) .cv-card:nth-child(1) { animation-delay: 0.05s; }
.cv-section:nth-child(2) .cv-card:nth-child(2) { animation-delay: 0.10s; }
.cv-section:nth-child(2) .cv-card:nth-child(3) { animation-delay: 0.15s; }
.cv-section:nth-child(2) .cv-card:nth-child(4) { animation-delay: 0.20s; }
.cv-section:nth-child(2) .cv-card:nth-child(5) { animation-delay: 0.25s; }
.cv-section:nth-child(2) .cv-card:nth-child(6) { animation-delay: 0.30s; }
.cv-section:nth-child(3) .cv-card:nth-child(1) { animation-delay: 0.35s; }
.cv-section:nth-child(3) .cv-card:nth-child(2) { animation-delay: 0.40s; }
.cv-section:nth-child(3) .cv-card:nth-child(3) { animation-delay: 0.45s; }

@keyframes cvFadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 520px) {
  .cv-card { padding: 1.1rem 1.2rem 1.1rem 1.5rem; }
  .cv-card-inner { flex-direction: column; gap: 0.35rem; }
  .cv-card-date { order: -1; font-size: 0.68rem; }
  .cv-role { font-size: 1rem; }
  .cv-section-title { font-size: 1.35rem; }
}
</style>

<div class="cv-wrap">

  <button class="cv-download" onclick="window.open('resume.pdf','_blank')">
    <i class="fa-solid fa-file-arrow-down"></i> Download PDF
  </button>

  <!-- Work Experience -->
  <div class="cv-section">
    <h2 class="cv-section-title">Work Experience</h2>
    <div class="cv-card">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">Research Intern</div>
          <div class="cv-org">Huawei Noah's Ark Lab</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>London, UK</div>
          <p class="cv-desc">3D Reconstruction and Parametric Surface Modeling.</p>
        </div>
        <div class="cv-card-date">May 2025 – Present</div>
      </div>
    </div>
    <div class="cv-card">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">Research Assistant</div>
          <div class="cv-org">DFKI, RPTU</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>Kaiserslautern, Germany</div>
          <p class="cv-desc">Vision-Language Architectures for 3D Scene and Shape Reconstruction.</p>
        </div>
        <div class="cv-card-date">Jun 2024 – Apr 2025</div>
      </div>
    </div>
    <div class="cv-card">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">Student Researcher</div>
          <div class="cv-org">SnT, University of Luxembourg</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>Kirchberg, Luxembourg</div>
          <p class="cv-desc">3D Shape Modelling with Deep Geometric-Language Models.</p>
        </div>
        <div class="cv-card-date">Jan 2023 – Feb 2024</div>
      </div>
    </div>
    <div class="cv-card">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">Research Intern</div>
          <div class="cv-org">Creatis, INSA Lyon</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>Lyon, France</div>
          <p class="cv-desc">3D Medical Image Segmentation using Point Clouds.</p>
        </div>
        <div class="cv-card-date">Feb 2022 – Jul 2022</div>
      </div>
    </div>
    <div class="cv-card">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">Research Intern</div>
          <div class="cv-org">Laboratoire Hubert Curien, Université Jean Monnet</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>Saint-Étienne, France</div>
          <p class="cv-desc">Reconstructing historical ornament vignettes under Prof. Rémi Emonet and Prof. Thierry Fournel.</p>
        </div>
        <div class="cv-card-date">Apr 2021 – Aug 2021</div>
      </div>
    </div>
    <div class="cv-card">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">Data Analyst Intern</div>
          <div class="cv-org">Accenture Digital</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>India</div>
          <p class="cv-desc">Intelligent Inventory Planning — automatic forecast hedging to cover demand gaps using AI.</p>
        </div>
        <div class="cv-card-date">May 2020 – Jul 2020</div>
      </div>
    </div>
  </div>

  <!-- Education -->
  <div class="cv-section">
    <h2 class="cv-section-title">Education</h2>
    <div class="cv-card cv-card--edu">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">PhD in Computer Science</div>
          <div class="cv-org">RPTU</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>Germany</div>
        </div>
        <div class="cv-card-date">2024 – Present</div>
      </div>
    </div>
    <div class="cv-card cv-card--edu">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">M.Sc. Machine Learning &amp; Data Mining</div>
          <div class="cv-org">Université Jean Monnet</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>France</div>
        </div>
        <div class="cv-card-date">2020 – 2022</div>
      </div>
    </div>
    <div class="cv-card cv-card--edu">
      <div class="cv-card-inner">
        <div class="cv-card-body">
          <div class="cv-role">B.Sc. Mathematics</div>
          <div class="cv-org">Ramakrishna Mission College</div>
          <div class="cv-loc"><i class="fa-solid fa-location-dot"></i>India</div>
        </div>
        <div class="cv-card-date">2016 – 2019</div>
      </div>
    </div>
  </div>

</div>
