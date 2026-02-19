---
## Configure header of page
text_align_right: false
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root {
  --ab-accent: #0ea5e9;
  --ab-accent2: #14b8a6;
  --ab-accent-bg: rgba(14,165,233,0.08);
  --ab-accent-glow: rgba(14,165,233,0.18);
  --ab-accent-bdr: rgba(14,165,233,0.22);
  --ab-amber: rgba(251,146,60,0.9);
  --ab-amber-bg: rgba(251,146,60,0.08);
  --ab-amber-bdr: rgba(251,146,60,0.22);
  --ab-ease: cubic-bezier(0.22,1,0.36,1);
}
.ab-wrap {
  max-width: 820px;
  margin: 0 auto;
  padding: 0.5rem 0 5rem;
  font-family: 'DM Sans', sans-serif;
}
.ab-hero {
  margin-bottom: 3rem;
  animation: abFadeUp 0.6s var(--ab-ease) both;
}
.ab-hero-wave {
  font-size: 2.8rem;
  display: inline-block;
  animation: abWave 2s ease 0.5s 2;
  transform-origin: 70% 70%;
  margin-bottom: 0.4rem;
}
@keyframes abWave {
  0%,60%,100% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
}
.ab-hero-name {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}
.ab-hero-name em {
  font-style: italic;
  background: linear-gradient(90deg, var(--ab-accent), var(--ab-accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ab-hero-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.4rem;
}
.ab-role-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.28rem 0.85rem;
  border-radius: 20px;
  border: 1.5px solid var(--ab-accent-bdr);
  color: var(--ab-accent);
  background: var(--ab-accent-bg);
}
.ab-hero-bio {
  font-size: 1rem;
  line-height: 1.75;
  opacity: 0.82;
  max-width: 680px;
}
.ab-hero-bio a {
  color: var(--ab-accent);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
.ab-hero-bio a:hover { border-bottom-color: var(--ab-accent); }
.ab-looking {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.1rem 1.3rem;
  border-radius: 12px;
  border: 1.5px solid var(--ab-amber-bdr);
  background: var(--ab-amber-bg);
  margin: 1.8rem 0 2.5rem;
  animation: abFadeUp 0.6s var(--ab-ease) 0.15s both;
}
.ab-looking-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
}
.ab-looking-text {
  font-size: 0.9rem;
  line-height: 1.65;
  opacity: 0.85;
}
.ab-looking-text strong {
  color: var(--ab-amber);
  opacity: 1;
}
.ab-section {
  margin-bottom: 2.5rem;
  animation: abFadeUp 0.6s var(--ab-ease) 0.2s both;
}
.ab-section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'DM Serif Display', serif;
  font-size: 1.45rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 1.1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, var(--ab-accent), var(--ab-accent2), transparent 80%) 1;
}
.ab-section-label em {
  font-style: italic;
  background: linear-gradient(90deg, var(--ab-accent), var(--ab-accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ab-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.ab-acc-item {
  border: 1px solid rgba(128,128,128,0.15);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.22s ease, box-shadow 0.22s ease;
}
.ab-acc-item.open {
  border-color: var(--ab-accent-bdr);
  box-shadow: 0 4px 20px var(--ab-accent-glow);
}
.ab-acc-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.95rem 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: inherit;
  text-align: left;
  gap: 1rem;
  transition: background 0.18s ease;
}
.ab-acc-trigger:hover { background: rgba(128,128,128,0.05); }
.ab-acc-trigger-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ab-acc-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--ab-accent-bg);
  border: 1px solid var(--ab-accent-bdr);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.85rem;
  color: var(--ab-accent);
}
.ab-acc-chevron {
  font-size: 0.7rem;
  color: var(--ab-accent);
  opacity: 0.6;
  transition: transform 0.3s var(--ab-ease), opacity 0.2s ease;
  flex-shrink: 0;
}
.ab-acc-item.open .ab-acc-chevron {
  transform: rotate(90deg);
  opacity: 1;
}
.ab-acc-body {
  padding: 0 1.25rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.38s var(--ab-ease), padding 0.3s ease;
}
.ab-acc-item.open .ab-acc-body {
  max-height: 600px;
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid rgba(128,128,128,0.1);
}
.ab-acc-body p {
  font-size: 0.875rem;
  line-height: 1.7;
  opacity: 0.72;
  margin-bottom: 0.75rem;
  margin-top: 0.85rem;
}
.ab-acc-body h4 {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ab-accent2);
  margin-bottom: 0.55rem;
}
.ab-acc-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.ab-acc-body li {
  font-size: 0.875rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  opacity: 0.82;
  line-height: 1.5;
}
.ab-acc-body li::before {
  content: '→';
  font-size: 0.72rem;
  color: var(--ab-accent);
  opacity: 0.7;
  flex-shrink: 0;
}
.ab-acc-body a {
  color: var(--ab-accent);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
.ab-acc-body a:hover { border-bottom-color: var(--ab-accent); }
.ab-pub-venue {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--ab-accent2);
  background: rgba(20,184,166,0.1);
  border: 1px solid rgba(20,184,166,0.2);
  padding: 0.1rem 0.5rem;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}
.ab-reviewer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.ab-rev-chip {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.28rem 0.7rem;
  border-radius: 6px;
  border: 1px solid rgba(128,128,128,0.18);
  opacity: 0.7;
  transition: opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.ab-rev-chip:hover {
  opacity: 1;
  border-color: var(--ab-accent-bdr);
  color: var(--ab-accent);
}
.ab-events {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.ab-event {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(128,128,128,0.1);
  animation: abFadeUp 0.5s var(--ab-ease) both;
}
.ab-event:last-child { border-bottom: none; }
.ab-event:nth-child(1) { animation-delay: 0.05s; }
.ab-event:nth-child(2) { animation-delay: 0.1s; }
.ab-event:nth-child(3) { animation-delay: 0.15s; }
.ab-event-date {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ab-accent);
  background: var(--ab-accent-bg);
  border: 1px solid var(--ab-accent-bdr);
  border-radius: 6px;
  padding: 0.22rem 0.6rem;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 90px;
  text-align: center;
}
.ab-event-text {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
}
.ab-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}
.ab-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  border: 1.5px solid var(--ab-accent-bdr);
  color: var(--ab-accent);
  background: var(--ab-accent-bg);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.ab-link-btn:hover {
  background: var(--ab-accent);
  color: #fff;
  border-color: var(--ab-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px var(--ab-accent-glow);
}
@keyframes abFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 540px) {
  .ab-hero-name { font-size: 2rem; }
  .ab-section-label { font-size: 1.25rem; }
  .ab-acc-trigger { padding: 0.85rem 1rem; }
  .ab-acc-item.open .ab-acc-body { padding: 0 1rem 1rem; }
  .ab-event { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
}
.ab-card-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ab-card-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(128,128,128,0.13);
  background: rgba(128,128,128,0.03);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.ab-card-row:hover {
  border-color: var(--ab-accent-bdr);
  background: var(--ab-accent-bg);
}
.ab-card-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--ab-accent-bg);
  border: 1px solid var(--ab-accent-bdr);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--ab-accent);
  flex-shrink: 0;
}
.ab-card-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.ab-card-title {
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.3;
}
.ab-card-sub {
  font-size: 0.78rem;
  opacity: 0.55;
  letter-spacing: 0.01em;
}
</style>
<div class="ab-wrap">
<div class="ab-hero">
<h1 class="ab-hero-name">Mohammad Sadil <em> Khan</em></h1>
<div class="ab-hero-roles">
<span class="ab-role-pill"><i class="fa-solid fa-graduation-cap"></i> PhD Researcher</span>
<span class="ab-role-pill"><i class="fa-solid fa-flask"></i> Research Intern · Huawei Noah's Ark</span>
<span class="ab-role-pill"><i class="fa-solid fa-cube"></i> 3D Vision &amp; Generative CAD</span>
</div>
<p class="ab-hero-bio">I am a PhD student at <a href="https://rptu.de/en/home-1" target="_blank">RPTU Kaiserslautern</a> and <a href="https://av.dfki.de/members/sadil-khan/" target="_blank">DFKI</a>, supervised by <a href="https://scholar.google.com/citations?user=ImhXfxgAAAAJ&hl=en" target="_blank">Prof. Dr. Didier Stricker</a>. I am currently a research intern at Huawei's Noah's Ark Lab, London, working with <a href="https://therevanchist.github.io/" target="_blank">Ismail Elezi</a> and <a href="https://jiankangdeng.github.io/" target="_blank">Jiankang Deng</a>.</p>
</div>
<div class="ab-section">
<h2 class="ab-section-label"><em>Research</em> Domains</h2>
<div class="ab-accordion" id="abAccordion">
<div class="ab-acc-item open" data-acc>
<button class="ab-acc-trigger" aria-expanded="true">
<span class="ab-acc-trigger-left"><span class="ab-acc-icon"><i class="fa-solid fa-pen-ruler"></i></span>CAD Generative AI</span>
<i class="fa-solid fa-chevron-right ab-acc-chevron"></i>
</button>
<div class="ab-acc-body">
<p>Leveraging AI to accelerate computer-aided design by creating parametric and editable 3D models from multimodal inputs.</p>
<h4>Key Publications</h4>
<ul>
<li><span><a href="" target="_blank">NURBGen</a> — NURBS-based CAD generation from text</span><span class="ab-pub-venue">AAAI 2026</span></li>
<li><span><a href="https://sadilkhan.github.io/text2cad-project/" target="_blank">TextCAD</a> — Text-to-Editable CAD generation</span><span class="ab-pub-venue">NeurIPS 2024 Spotlight</span></li>
<li><span><a href="http://skazizali.com/cadsignet.github.io/" target="_blank">CAD-SIGNet</a> — CAD design history from point clouds</span><span class="ab-pub-venue">CVPR 2024 Highlight</span></li>
</ul>
</div>
</div>
<div class="ab-acc-item" data-acc>
<button class="ab-acc-trigger" aria-expanded="false">
<span class="ab-acc-trigger-left"><span class="ab-acc-icon"><i class="fa-solid fa-cubes"></i></span>3D Reconstruction</span>
<i class="fa-solid fa-chevron-right ab-acc-chevron"></i>
</button>
<div class="ab-acc-body">
<p>Generating high-fidelity 3D models and scenes from multimodal inputs — text, images, video — focusing on scalability and realism.</p>
<h4>Key Publications</h4>
<ul>
<li><span><a href="https://arxiv.org/abs/2411.17945" target="_blank">MARVEL-40M+</a> — Largest 3D captioning dataset</span><span class="ab-pub-venue">CVPR 2025</span></li>
</ul>
</div>
</div>
<div class="ab-acc-item" data-acc>
<button class="ab-acc-trigger" aria-expanded="false">
<span class="ab-acc-trigger-left"><span class="ab-acc-icon"><i class="fa-solid fa-brain"></i></span>3D Understanding</span>
<i class="fa-solid fa-chevron-right ab-acc-chevron"></i>
</button>
<div class="ab-acc-body">
<p>Bridging geometry, perception, and semantics to enable AI systems to reason about and interact with 3D environments. Current work focuses on geometric-semantic alignment.</p>
<p style="opacity:0.5;font-size:0.82rem;">🚧 Coming soon</p>
</div>
</div>
<div class="ab-acc-item" data-acc>
<button class="ab-acc-trigger" aria-expanded="false">
<span class="ab-acc-trigger-left"><span class="ab-acc-icon"><i class="fa-solid fa-microchip"></i></span>Efficient 3D Representation</span>
<i class="fa-solid fa-chevron-right ab-acc-chevron"></i>
</button>
<div class="ab-acc-body">
<p>Exploring compact and efficient 3D representations — e.g., parametric surfaces — for high-resolution mesh generation.</p>
<p style="opacity:0.5;font-size:0.82rem;">🚧 Coming soon</p>
</div>
</div>
</div>
</div>
<div class="ab-section" style="animation-delay:0.3s;">
<h2 class="ab-section-label"><em>Academic</em> Service</h2>
<p style="font-size:0.88rem;opacity:0.6;margin-bottom:0.85rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">Reviewer</p>
<div class="ab-reviewer">
<span class="ab-rev-chip">ICML '26</span>
<span class="ab-rev-chip">ECCV '26</span>
<span class="ab-rev-chip">CVPR '26</span>
<span class="ab-rev-chip">AAAI '26</span>
<span class="ab-rev-chip">NeurIPS '25</span>
<span class="ab-rev-chip">SIGGRAPH Asia '25</span>
<span class="ab-rev-chip">ICPR '24</span>
</div>
<p style="font-size:0.88rem;opacity:0.6;margin-bottom:0.85rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;padding-top:1.85rem">Courses</p>
<div class="ab-card-list">
<div class="ab-card-row">
<span class="ab-card-badge"><i class="fa-solid fa-chalkboard-teacher"></i></span>
<div class="ab-card-info">
<span class="ab-card-title">Very Deep Learning 2025 — 3D Computer Vision</span>
<span class="ab-card-sub">RPTU Kaiserslautern</span>
</div>
</div>
</div>

<p style="font-size:0.88rem;opacity:0.6;margin-bottom:0.85rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;padding-top:1.85rem">Mentored Students</p>
<div class="ab-card-list">
<div class="ab-card-row">
<span class="ab-card-badge"><i class="fa-solid fa-user-graduate"></i></span>
<div class="ab-card-info">
<span class="ab-card-title">Benjamin Dinkelmann</span>
<span class="ab-card-sub">Master Thesis · MSc Computer Science · RPTU Kaiserslautern · 2025–2026</span>
</div>
</div>
<div class="ab-card-row">
<span class="ab-card-badge"><i class="fa-solid fa-user-graduate"></i></span>
<div class="ab-card-info">
<span class="ab-card-title">Muhammad Usama</span>
<span class="ab-card-sub">Master Thesis · MSc Computer Science · RPTU Kaiserslautern · 2025–2026</span>
</div>
</div>
</div>



</div>
<div class="ab-section" style="animation-delay:0.35s;">
<h2 class="ab-section-label"><em>Recent</em> Events</h2>
<div class="ab-events">
<div class="ab-event">
<span class="ab-event-date">Nov 2025</span>
<p class="ab-event-text">🎉 <strong>NURBGen</strong> accepted at <strong>AAAI 2026</strong>. Check paper <a href="https://arxiv.org/abs/2511.06194" target="_blank"> here </a> .</p>
</div>
<div class="ab-event">
<span class="ab-event-date">May 2025</span>
<p class="ab-event-text">Started summer research internship at <strong>Huawei Noah's Ark Lab</strong>, London.</p>
</div>
</div>
</div>
</div>
<script>
document.querySelectorAll('[data-acc] .ab-acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('[data-acc]');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('[data-acc]').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.ab-acc-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
</script>
