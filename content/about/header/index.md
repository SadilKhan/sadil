---
## Configure header of page
text_align_right: false
---

<style>
/* ===== Hero Section ===== */
.hero {
  text-align: center;
  padding: 5rem 1rem 3rem;
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

<p>Hello, My name is <strong>Mohammad Sadil Khan</strong>. I am currently a 2nd year PhD student at <a href="https://av.dfki.de/members/sadil-khan/" target="_blank"><b>DFKI</b></a>, under the supervision of Prof. Dr Didier Stricker. I am also a summer research intern at Huawei’s Noah’s Ark Lab, London where I work with <a href="https://therevanchist.github.io/" target="_blank">Ismail Elezi</a> and <a href="https://jiankangdeng.github.io/" target="_blank">Jiankang Deng</a>.</p>

<p>I am currently working on the following domains:</p>

<h2 style="text-align:center; margin-top:3rem;"> 👨🏻‍💻Research Domains</h2>

<div class="research-grid">
  <!-- Card 1 -->
  <div class="research-card">
    <div class="research-front">
      <h3>3D Reconstruction</h3>
      <p>Generating 3D models from multimodal inputs (texts,images,etc)</p>
    </div>
    <div class="research-back">
      <ul>
        <li><a href="https://arxiv.org/abs/2411.17945" target="_blank">MARVEL-40M+</a> — Largest 3D Captioning Dataset (CVPR 2025)</li>
      </ul>
    </div>
  </div>
  
  <div class="research-card">
    <div class="research-front">
      <h3>3D Understanding</h3>
      <p>Bridging geometry, perception, and semantics.</p>
    </div>
    <div class="research-back">
      <p>Coming soon 🚧</p>
    </div>
  </div>

  <!-- Card 2 -->
  <div class="research-card">
    <div class="research-front">
      <h3>Efficient 3D Representation</h3>
      <p>Exploring compact 3D representation</p>
    </div>
    <div class="research-back">
      <p>Coming soon 🚧</p>
    </div>
  </div>

  <!-- Card 3 -->
  <div class="research-card">
    <div class="research-front">
      <h3>CAD Generative AI</h3>
      <p>Leveraging AI to accelerate computer-aided design</p>
    </div>
    <div class="research-back">
      <ul>
        <li><a href="https://sadilkhan.github.io/text2cad-project/" target="_blank">TextCAD</a> — Text-to-Editable CAD (NeurIPS 2024 Spotlight)</li>
        <li><a href="http://skazizali.com/cadsignet.github.io/" target="_blank">CAD-SIGNet</a> — CAD design history from point clouds (CVPR 2024 Highlight)</li>
      </ul>
    </div>
  </div>
</div>

<p>Check out my <a href="/projects"><b>Projects</b></a> and <a href="/publications/"><b>Publications</b></a> page.</p>

<p>I am open to research collaborations or internship opportunities in:</p>
<ul>
  <li>3D Scene or Shape Reconstruction</li>
  <li>CAD Design History Generation using Multi-modal Inputs</li>
</ul>

<p><strong>Reviewer for:</strong> AAAI'26, NeurIPS'25 (DB Track), SIGGRAPH Asia'25, ICPR'24</p>

<h2>🗓 Recent Events</h2>

<div class="events">
  <ul>
    <li><strong>[01-05-2025]</strong> Started my summer research internship at Huawei's Noah’s Ark Lab, London.</li>
    <li><strong>[26-02-2025]</strong> MARVEL-40M+ accepted at <b>CVPR 2025</b>. 🎉 Check <a href="/publications/">here</a>.</li>
  </ul>
</div>

</div>
