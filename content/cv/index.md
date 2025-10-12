---
title: ""
subtitle: ""
description: "CV"
author: "Mohammad Sadil Khan"
publishDate: "2025-10-10"
---

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

<style>
:root {
  --bg: #0f0f0f;
  --fg: #eee;
  --accent: #88aaff;
  --highlight: #ff6f91;
  --line: rgba(136, 170, 255, 0.4);
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: 'Inter', sans-serif;
  margin: 0;
  text-align: center;
  overflow-x: hidden;
}

/* Section title */
h2 {
  margin-top: 3rem;
  font-size: 1.9rem;
  color: var(--accent);
  font-weight: 700;
}

/* Horizontal timeline */
.timeline {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  margin: 4rem auto;
  padding: 2rem 0;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
  max-width: 100%;
  scroll-padding: 3rem; /* ensures ends are visible */
}

/* Padding elements on each end */
.timeline::before,
.timeline::after {
  content: "";
  flex: 0 0 3rem; /* same as scroll-padding */
}

/* Timeline line */
.timeline::after,
.timeline::before {
  background: none; /* keeps clean, only for spacing */
}

/* Horizontal line behind nodes */
.timeline-track {
  position: absolute;
  top: 50%;
  left: 0;
  height: 3px;
  width: 100%;
  background: var(--line);
  transform: translateY(-50%);
  z-index: 0;
}

/* Node cards */
.node {
  position: relative;
  background: var(--bg);
  border: 2px solid var(--accent);
  color: var(--fg);
  border-radius: 12px;
  padding: 1.2rem 1.4rem;
  width: 260px;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  z-index: 1;
  opacity: 0;
  transform: translateY(25px);
  animation: fadeInSeq 0.8s ease forwards;
}
.node:nth-child(1) { animation-delay: 0.2s; }
.node:nth-child(2) { animation-delay: 0.5s; }
.node:nth-child(3) { animation-delay: 0.8s; }
.node:nth-child(4) { animation-delay: 1.1s; }

@keyframes fadeInSeq {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

/* === Education Timeline (softer aesthetic) === */
.timeline.education {
  gap: 3rem;
  margin: 3rem auto 6rem auto;
  padding: 2rem 1rem;
  max-width: 900px;
  justify-content: align;
  position: relative;
}

.timeline.education .timeline-track {
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(136, 170, 255, 0.1),
    rgba(136, 170, 255, 0.6),
    rgba(136, 170, 255, 0.1)
  );
  transform: translateY(-50%);
  border-radius: 2px;
  z-index: 0;
}

/* smaller, lighter connector dots */
.timeline.education .node::before {
  width: 10px;
  height: 10px;
  background: var(--accent);
  opacity: 0.8;
  box-shadow: 0 0 6px var(--accent);
}
.timeline.education .node:first-child::before {
  display: none;
}

/* slightly slower fade for academic calmness */
.timeline.education .node {
  animation: fadeInSeq 1s ease forwards;
}
.timeline.education .node:nth-child(1) { animation-delay: 0.3s; }
.timeline.education .node:nth-child(2) { animation-delay: 0.6s; }
.timeline.education .node:nth-child(3) { animation-delay: 0.9s; }


/* Connector dots */
.node::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -25px;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent);
  z-index: 2;
}
.node:first-child::before { display: none; }

/* Node content */
.node h3 {
  margin: 0.3em 0;
  font-size: 1.1rem;
  color: var(--accent);
}
.node p {
  margin: 0.2em 0;
  padding-bottom: 20px;
  font-size: 0.9rem;
}

/* Button */
button.download {
  background: var(--accent);
  border: none;
  color: white;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s ease;
}
button.download:hover {
  background: var(--highlight);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
    gap: 2rem;
    overflow-x: visible;
  }
  .timeline-track {
    width: 3px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .node {
    width: 85%;
    text-align: center;
    animation: fadeInSeq 0.8s ease forwards;
  }
  .node::before {
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
  }
}
</style>

<body>
<button class="download" onclick="window.open('resume.pdf','_blank')">📄 Download Resume</button>

<h2>🌿 Work Experience</h2>

<div class="timeline">
  <div class="timeline-track"></div>

  <div class="node">
    <h3>Research Intern</h3>
    <p><strong>Huawei Noah’s Ark Lab</strong></p>
    <p>London, UK</p>
    <p><em>May 2025 – Nov 2025</em></p>
    <p>3D Reconstruction and Parametric Surface Modeling.</p>
  </div>

  <div class="node">
    <h3>Research Assistant</h3>
    <p><strong>DFKI, RPTU</strong></p>
    <p>Kaiserslautern, Germany</p>
    <p><em>Feb 2024 – Apr 2025</em></p>
    <p>Vision-Language Architectures for 3D Scene and Shape Reconstruction.</p>
  </div>

  <div class="node">
    <h3>Student Researcher</h3>
    <p><strong>SnT, University of Luxembourg</strong></p>
    <p>Kirchberg, Luxembourg</p>
    <p><em>Jan 2023 – Feb 2024</em></p>
    <p>3D Shape Modelling with Deep Geometric-Language Models.</p>
  </div>

  <div class="node">
    <h3>Research Intern</h3>
    <p><strong>Creatis, INSA Lyon</strong></p>
    <p>Lyon, France</p>
    <p><em>Feb 2022 – Jul 2022</em></p>
    <p>3D Medical Image Segmentation using Point Clouds.</p>
  </div>
  <div class="node">
    <h3>Research Intern</h3>
    <p><strong>Laboratoire Hubert Curien, Université Jean Monnet</strong></p>
    <p>Saint-Étienne, France</p>
    <p><em>Apr 2021 – Aug 2021</em></p>
    <p>Worked on reconstructing historical ornament vignettes under Prof. Rémi Emonet and Prof. Thierry Fournel.</p>
  </div>

  <div class="node">
    <h3>Data Analyst Intern</h3>
    <p><strong>Accenture Digital</strong></p>
    <p>India</p>
    <p><em>May 2020 – Jul 2020</em></p>
    <p><strong>Project:</strong> Intelligent Inventory Planning.</p>
    <p>Worked on automatic forecast hedging to cover demand gaps using AI.</p>
  </div>
  
</div>
</body>

<h2>🎓 Education</h2>


<div class="timeline education">
  <div class="timeline-track"></div>

  <div class="node">
    <h3>PhD in Computer Science</h3>
    <p><strong>RPTU</strong>, Germany</p>
    <p><em>2024 – Present</em></p>
  </div>

  <div class="node">
    <h3>M.Sc. in Machine Learning & Data Mining</h3>
    <p><strong>Université Jean Monnet</strong>, France</p>
    <p><em>2020 – 2022</em></p>
  </div>

  <div class="node">
    <h3>B.Sc. in Mathematics</h3>
    <p><strong>Ramakrishna Mission College</strong>, India</p>
    <p><em>2016 – 2019</em></p>
  </div>
</div>

</body>
