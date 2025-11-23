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
  --line: rgba(136, 170, 255, 0.3);
}

body {
  color: var(--fg);
  margin: 0;
  overflow-x: hidden;
}

h2 {
  text-align: center;
  font-size: 2rem;
  color: var(--accent);
  font-weight: 700;
  margin: 3rem 0 2rem;
}

button.download {
  display: block;
  margin: 2rem auto;
  background: var(--accent);
  border: none;
  color: white;
  padding: 12px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(136, 170, 255, 0.3);
}

button.download:hover {
  background: var(--highlight);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 111, 145, 0.4);
}

/* Tree Structure */
.tree {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;
}

/* Main trunk */
.tree::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--line), transparent);
  transform: translateX(-50%);
  z-index: 0;
}

/* Branch container */
.branch {
  position: relative;
  margin: 3rem 0;
  opacity: 0;
  animation: branchGrow 0.8s ease forwards;
}

.branch:nth-child(odd) {
  padding-right: 55%;
}

.branch:nth-child(even) {
  padding-left: 55%;
}

.branch:nth-child(1) { animation-delay: 0.2s; }
.branch:nth-child(2) { animation-delay: 0.4s; }
.branch:nth-child(3) { animation-delay: 0.6s; }
.branch:nth-child(4) { animation-delay: 0.8s; }
.branch:nth-child(5) { animation-delay: 1s; }
.branch:nth-child(6) { animation-delay: 1.2s; }

@keyframes branchGrow {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Branch line connecting to trunk */
.branch::before {
  content: '';
  position: absolute;
  top: 50%;
  width: 60px;
  height: 2px;
  background: var(--line);
  z-index: 0;
}

.branch:nth-child(odd)::before {
  right: 0;
  transform: translateY(-50%);
}

.branch:nth-child(even)::before {
  left: 0;
  transform: translateY(-50%);
}

/* Node dot at trunk connection */
.branch::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 15px var(--accent);
  z-index: 1;
  transform: translateY(-50%);
}

.branch:nth-child(odd)::after {
  right: -6px;
}

.branch:nth-child(even)::after {
  left: -6px;
}

/* Card styling */
.node {
  background: rgba(20, 20, 30, 0.9);
  border: 2px solid var(--accent);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;
}

.node:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(136, 170, 255, 0.4);
  border-color: var(--highlight);
}

.node h3 {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: var(--accent);
}

.node p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.node p strong {
  color: var(--highlight);
}

.node p em {
  color: rgba(238, 238, 238, 0.7);
  font-style: normal;
  font-size: 0.9rem;
}

/* Education section - simpler vertical tree */
.tree.education::before {
  background: linear-gradient(to bottom, transparent, var(--line), transparent);
}

.tree.education .branch {
  padding: 0;
  margin: 2rem auto;
  max-width: 500px;
}

.tree.education .branch::before,
.tree.education .branch::after {
  display: none;
}

@media (max-width: 768px) {
  .tree::before {
    left: 30px;
  }
  
  .branch:nth-child(odd),
  .branch:nth-child(even) {
    padding-left: 80px;
    padding-right: 0;
  }
  
  .branch::before {
    left: 0;
    right: auto;
    width: 40px;
  }
  
  .branch::after {
    left: -6px;
    right: auto;
  }
  
  .tree.education .branch {
    padding-left: 0;
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
    <p><em>May 2025 – Present</em></p>
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
