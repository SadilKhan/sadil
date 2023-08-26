---
title: Mohammad Sadil Khan
subtitle: PhD in 3D Computer Vision
description: 
author: "Mohammad Sadil Khan"
publishDate: "2022-12-21"
---

<style>
:root {
  --timeline-line-color-light: #F27121;
  --timeline-line-color-dark: #8A2387;
  --timeline-circle-color-light: #F27121;
  --timeline-circle-color-dark: #8A2387;
  /* ... other CSS variables ... */
}
.design-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 0;
}

.design {
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline {
  width: 100%;
  height: auto;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.timeline-content {
  padding: 10px;
  background-color: #ebeef2;
  -webkit-box-shadow: 5px 5px 10px #1b3f7d, -5px -5px 10px #c7d6ed;
          box-shadow: 5px 5px 10px #1b3f7d, -5px -5px 10px #c7d6ed;
  border-radius: 5px;
  padding: 1.75rem;
  transition: 0.4s ease;
  margin: 1rem;
  color: black;
  margin-bottom: 20px;
  border-radius: 20px;
  font-size: 16px;
}

.dark-mode .timeline-component {
  background-color: #1f1f1f;
}

.dark-mode .timeline-content {
  background-color: #1f1f1f;
  color: white;
-webkit-box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #242424;
          box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #242424;
}

.timeline-component {
  margin: 0px 10px 20px 20px;
  width: calc(100% + 50px); /* Adjust the width as needed */
  margin-left: -20px; /* To center-align the expanded component *
}


.timeline-content li {
  display: inline; /* Display list items inline */
  width: 100%;
}


.cv-list {
  margin: 0;
  padding: 0;
  padding-left: 30px;
}

.cv-list-item {
  display: flex; /* Display items in a row */
  align-items: center; /* Vertically center-align content */
  gap: 10px; /* Space between icon and content */
  margin-bottom: -30px; /* Adjust the margin between list items */
}

.cv-list-item::before {
  content: ">>"; /* Unicode bullet character */
  font-size: 0.9em; /* Adjust the bullet size */
  color: #5b8bde;
}
</style>

 <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js"></script>
<body>
<section class="design-section">
    <!-- Experience -->
  <div class="timeline">
    <h2> Experience</h2>
        <!-- First Component -->
        <div class="timeline-component timeline-content">
            <h4><b>Doctoral Researcher</b></h4>
            <p> CVI2 Lab, University of Luxembourg, Kirchberg, Luxembourg </p>
            <p> Jan 2022-Present</p>
            <div class="cv-list">
        <div class="cv-list-item">
            <p>Currently working on Vision-Language modeling for transforming Point Cloud into CAD design. </p>
        </div>
    </div>
        </div>
        <div class="timeline-component timeline-content">
            <h4><b>Research Intern</b></h4>
            <p>Creatis Lab, INSA Lyon, Lyon, France</p>
            <p> Feb 2022 - Jul 2022</p>
            <div class="cv-list">
        <div class="cv-list-item">
            <p> <a href="Thesis Link - https://mdsadilkhan.onrender.com/papers/data/report.pdf">Project : Learning Shapes For The Effective Segmentation of 3D Medical Images using Point Cloud.</a> </p>
        </div>
        <div class="cv-list-item">
            <p> Developed a novel approach for 3D medical image segmentation utilizing point clouds. </p>
        </div>
        <div class="cv-list-item"><p>Modified RandLaNet, an attention-based point cloud segmentation network, by incorporating a Feature
Extraction Layer to capture local spatial information.</p></div>
<div class="cv-list-item"><p>Proposed a model-independent step to leverage the trained RandLaNet for accurate 3D voxel segmentation.</p></div>
<div class="cv-list-item"><p><b>Grade</b>: 16.5/20</p></div>
<div class="cv-list-item"><p>Proposed a model-independent step to leverage the trained RandLaNet for accurate 3D voxel segmentation.</p></div>
    </div>
        </div>
        <div class="timeline-component timeline-content">
            <h4><b>Research Intern</b></h4>
            <p>Laboratoire Hubert Curien, UJM, Saint-Etienne, France</p>
            <p> Apr 2021 - Aug 2021</p>
        </div>
        <div class="timeline-component timeline-content">
            <h4><b>Data Analyst Intern</b></h4>
            <p>Accenture Digital, India</p>
            <p> May 2020 – Jul 2020</p>
        </div>
      </div>
  </section>
  <section>
    <!-- Education -->
    <div class="timeline">
    <h2> Education</h2>
        <!-- First Component -->
        <div class="timeline-component timeline-content">
            <h4><b>PhD in Computer Vision</b></h4>
            <p> University of Luxembourg, Kirchberg, Luxembourg</p>
            <p> 2022-Present</p>
        </div>
        <div class="timeline-component timeline-content">
            <h4><b>M.Sc in Machine Learning and Data Mining</b></h4>
            <p>University Jean Monnet, Saint-Etienne, France</p>
            <p> 2020-2022</p>
        </div>
        <div class="timeline-component timeline-content">
            <h4><b>M1 in Data Science</b></h4>
            <p>Chennai Mathematical Institute, Siruseri, India</p>
            <p> 2019-2020</p>
        </div>
        <div class="timeline-component timeline-content">
            <h4><b>B.Sc in Mathematics</b></h4>
            <p>Ramakrishna Mission Residential College (Autonomous)</p>
            <p> 2016-2019</p>
        </div>
        </div>
</section>
</body>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const timelineComponents = document.querySelectorAll(".timeline-component");
  const timelineCircles = document.querySelectorAll(".timeline-circle");
  const timelineLine = document.querySelector(".timeline-middle");

  timelineComponents.forEach((component, index) => {
    if (index == 0) {
      component.style.opacity = "1";
    } else {
      component.style.opacity = "0";
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  timelineComponents.forEach((component, index) => {
    if (index > 0) {
      gsap.to(component, {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: component,
          start: "top 80%", // Adjust the start point as needed
          end: "bottom 60%", // Adjust the end point as needed
          scrub: true, // Animation follows scroll smoothly
          toggleActions: "play none reverse none", // Animation direction on scroll
        },
      });
    }
  });

  
});
</script>


