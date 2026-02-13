---
## Configure header of page
text_align_right: false
---

<style>
/* ===== Hero Section ===== */
.hero {
  text-align: center;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 50% 30%, rgba(136,170,255,0.1), transparent 70%);
  animation: fadeIn 1.4s ease forwards;
}

.hand-wave {
  display: inline-block;
  animation: wave 1.6s infinite;
  transform-origin: 70% 70%;
  font-size: 72px;
}

.welcome {
  font-size: 72px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, var(--accent, #4062bb), var(--highlight, #f45b69));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtext {
  font-size: 1.1rem;
  color: var(--fg-muted, #555);
  margin-top: -10px;
  opacity: 0.9;
}

/* Wave keyframes */
@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60%, 100% { transform: rotate(0deg); }
}

/* ===== Content Section ===== */
.about-content {
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
  font-size: 1.05rem;
  color: var(--fg, #111);
  opacity: 0;
  animation: slideUp 1s ease forwards 0.4s;
}

/* ===== Research Cards ===== */
.research-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 2.5rem auto;
  max-width: 1100px;
}

.research-card {
  width: 300px;
  height: 230px;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
}

.research-card:hover { transform: scale(1.04); }

.research-front, .research-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 1.5rem;
  box-sizing: border-box;
  backface-visibility: hidden;
  transition: transform 0.6s ease;
  overflow: hidden;
}

/* FRONT FACE */
.research-front {
  display: flex;
  flex-direction: column;
  justify-content: center;   /* vertically center */
  align-items: center;       /* horizontally center */
  text-align: center;        /* center text lines */
  background: color-mix(in srgb, var(--bg, #fff) 90%, var(--accent, #4062bb) 5%);
  border: 1px solid color-mix(in srgb, var(--accent, #4062bb) 30%, transparent);
  box-shadow: 0 0 15px rgba(0,0,0,0.05);
  border-radius: 16px;
  padding: 1rem;
  height: 100%;
  box-sizing: border-box;
}
.research-front h3 {
  text-align: center;
}
.research-front p {
  text-align: center;
}

.dark-mode .research-front h3 {
  color: #CA61C3;
}

.dark-mode p {
color: white;
}

.dark-mode .research-front p {
color: black;
}

/* BACK FACE */
.research-back {
  background: color-mix(in srgb, var(--accent, #4062bb) 10%, var(--highlight, #f45b69) 10%, var(--bg, #fff) 80%);
  border: 1px solid color-mix(in srgb, var(--accent, #4062bb) 40%, transparent);
  color: var(--fg, #111);
  transform: rotateY(180deg);
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
  overflow-y: auto;
}
.research-back ul {
  margin: 0.5rem 0 0;
  padding-left: 1rem;
  font-size: 0.9rem;
  list-style-type: square;
}
.research-back li { margin-bottom: 0.4rem; }
.research-back a {
  color: var(--accent, #4062bb);
  text-decoration: none;
  font-weight: 500;
}
.research-back a:hover { text-decoration: underline; }

.dark-mode .research-back li {
color: white;
}

.dark-mode li {
color:white;
}

/* FLIP ANIMATION */
.research-card:hover .research-front { transform: rotateY(180deg); }
.research-card:hover .research-back { transform: rotateY(0deg); }

/* ===== Headings ===== */
h2 {
  margin-top: 3rem;
  color: var(--accent, #4062bb);
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
}

/* ===== Recent Events ===== */
.events {
  background: color-mix(in srgb, var(--bg, #fff) 95%, var(--accent, #4062bb) 5%);
  border: 1px solid color-mix(in srgb, var(--accent, #4062bb) 20%, transparent);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 3rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  animation: fadeIn 1.2s ease forwards;
}
.events ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.events li {
  margin: 0.75rem 0;
  font-size: 1rem;
  color: var(--fg, #111);
}
.events strong {
  color: var(--accent, #4062bb);
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .welcome { font-size: 52px; }
  .hand-wave { font-size: 48px; }
  .subtext { font-size: 1rem; }
  .about-content { font-size: 1rem; padding: 0 1rem; }
  .research-grid { flex-direction: column; align-items: center; }
  .research-card { width: 90%; height: auto; }
  .research-front, .research-back {
    position: relative;
    transform: none !important;
    border-radius: 12px;
    box-shadow: none;
  }
  .research-back { margin-top: 0.8rem; }
}

.collaboration-highlight {
    background-color: rgba(255, 165, 0, 0.1); /* Light orange (FFA500) with 10% opacity */
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 165, 0, 0.2); /* Subtle orange border */
    margin-top: 2rem; /* Add some space above the box */
}
.dark-mode .collaboration-highlight {
    /* 1. Frosted Effect */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* Safari support */
    /* 2. Transparent Background */
    background-color: rgba(255, 165, 0, 0.3); /* Very light orange tint */
    /* 3. Subtle Border & Shadow */
    border: 2px solid rgba(255, 255, 255, 0.4); /* Frosted white border */
    border-radius:20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
}


/* ===== NEW Collapsible Research Sections (Accordion) ===== */
.research-accordion {
    margin: 2rem auto;
    max-width: 900px;
}

.research-accordion details {
    border: 1px solid var(--fg-muted, #ccc);
    border-radius: 8px;
    margin-bottom: 12px;
    background: color-mix(in srgb, var(--bg, #fff) 95%, var(--accent, #4062bb) 3%);
    transition: all 0.3s ease;
}

/* Style for when the section is open */
.research-accordion details[open] {
    border-color: var(--accent, #4062bb);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.research-accordion summary {
    cursor: pointer;
    padding: 1rem 1.5rem;
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--accent, #4062bb);
    outline: none;
    list-style: none; /* Hide default triangle/arrow */
    position: relative;
}

/* Custom arrow icon using content property */
.research-accordion summary::after {
    content: "▶";
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.25s ease;
    color: var(--accent, #4062bb);
    font-size: 0.8rem;
}

.research-accordion details[open] summary::after {
    transform: translateY(-50%) rotate(90deg);
}

/* === MODIFIED for Animation: Default (Closed State) === */
.research-accordion-content {
    padding: 0 1.5rem 0 1.5rem; /* Remove bottom padding in closed state */
    line-height: 1.6;
    color: var(--fg, #111);
    font-size: 1rem;
    /* Animation Properties */
    max-height: 0; 
    overflow: hidden; 
    transition: max-height 0.4s ease-in-out, padding 0.4s ease-in-out;
}

/* === MODIFIED for Animation: Open State === */
.research-accordion details[open] .research-accordion-content {
    /* Set a large enough max-height to ensure all content fits */
    max-height: 1000px; 
    padding: 0 1.5rem 1.5rem 1.5rem; /* Restore bottom padding when open */
    border-top: 1px solid var(--fg-muted, #eee); 
}
.research-accordion-content h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: var(--highlight, #f45b69);
    font-weight: 500;
}

.research-accordion-content ul {
    list-style-type: square;
    padding-left: 1.2rem;
    margin: 0.5rem 0 0;
}
.research-accordion-content li {
    margin-bottom: 0.5rem;
}
.research-accordion-content a {
    color: var(--accent, #4062bb);
    text-decoration: none;
    font-weight: 500;
}
.research-accordion-content a:hover { text-decoration: underline; }

/* Dark Mode Adjustments */
.dark-mode .research-accordion details {
    border-color: color-mix(in srgb, var(--accent) 50%, transparent);
    background: #222; /* Darker background */
}

.dark-mode .research-accordion-content {
    border-top: 1px solid #333;
}

</style>



<!-- ========================= HERO ========================= -->
<div class="hero">
  <div class="heading">
    <span class="welcome">Welcome</span>
    <span class="hand-wave">👋</span>
  </div>
  <p class="subtext">PhD Student • Research Intern • 3D Vision & Generative CAD</p>
</div>

<!-- ========================= ABOUT ========================= -->
<div class="about-content">

<p>Hello, My name is <strong>Mohammad Sadil Khan</strong>. I am a PhD student at <a href="https://rptu.de/en/home-1" target="_blank">RPTU Kaiserslaurern</a> and <a href="https://av.dfki.de/members/sadil-khan/" target="_blank">DFKI</a>, under the supervision of <a href="https://scholar.google.com/citations?user=ImhXfxgAAAAJ&hl=en" target="_blank">Prof. Dr. Didier Stricker</a>. I am currently a research intern at Huawei’s Noah’s Ark Lab, London where I work with <a href="https://therevanchist.github.io/" target="_blank">Ismail Elezi</a> and <a href="https://jiankangdeng.github.io/" target="_blank">Jiankang Deng</a>.</p>

<div class="collaboration-highlight">
<p>🙋 I am looking for 2026 Summer Research Internship or Student Researcher position in 3D Generative AI, Image Generation, Novel View Synthesis, Avatar Generation, Spatial Reasoning, Finetuning LLM for 3D Generation or 3D Editing.
</div>

<h2 style="text-align:center; margin-top:1rem;"> 👨🏻‍💻Research Domains</h2>

<div class="research-accordion">
    <details open>
        <summary>CAD Generative AI</summary>
        <div class="research-accordion-content">
            <p>Leveraging AI to accelerate computer-aided design by creating parametric and editable 3D models from multimodal inputs.</p>
            <h4>Key Publications:</h4>
            <ul>
                <li><a href="" target="_blank">NURBGen</a> — NURBS based CAD from texts (AAAI-2026).</li>
                <li><a href="https://sadilkhan.github.io/text2cad-project/" target="_blank">TextCAD</a> — Text-to-Editable CAD (NeurIPS 2024 Spotlight)</li>
                <li><a href="http://skazizali.com/cadsignet.github.io/" target="_blank">CAD-SIGNet</a> — CAD design history from point clouds (CVPR 2024 Highlight)</li>
            </ul>
        </div>
    </details>
    <details>
        <summary>3D Reconstruction</summary>
        <div class="research-accordion-content">
            <p>Generating high-fidelity 3D models and scenes from multimodal inputs (texts, images, video, etc.) focusing on scalability and realism.</p>
            <h4>Key Publications:</h4>
            <ul>
                <li><a href="https://arxiv.org/abs/2411.17945" target="_blank">MARVEL-40M+</a> — Largest 3D Captioning Dataset (CVPR 2025)</li>
            </ul>
        </div>
    </details>
    <details>
        <summary>3D Understanding</summary>
        <div class="research-accordion-content">
            <p>Bridging geometry, perception, and semantics to enable AI systems to reason about and interact with 3D environments.</p>
            <p>Current work focuses on geometric-semantic alignment. Coming soon 🚧</p>
        </div>
    </details>
    <details>
        <summary>Efficient 3D Representation</summary>
        <div class="research-accordion-content">
            <p>Exploring compact and efficient 3D representations (e.g., parametric surfaces) for high resolution mesh generation.</p>
            <p>Coming soon 🚧</p>
        </div>
    </details>

</div>
<p>Check out my <a href="/projects"><b>Projects</b></a> and <a href="/publications/"><b>Publications</b></a> page.</p>



<p><strong>Reviewer: </strong> ICML'26 &nbsp; ECCV'26 &nbsp; CVPR'26 &nbsp; AAAI'26 &nbsp; NeurIPS'25 &nbsp; SIGGRAPH Asia'25 &nbsp; ICPR'24</p>

<h2>🗓 Recent Events</h2>

<div class="events">
  <ul>
  <li><strong>[08-11-2025]</strong> 🎉 NURBGen accepted in AAAI 2026. Details coming Soon.</li>
    <li><strong>[01-05-2025]</strong> Started my summer research internship at Huawei, London.</li>
  </ul>
</div>

</div>
