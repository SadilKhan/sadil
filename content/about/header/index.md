---
## Configure header of page
text_align_right: false
---

<style>
@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

.hand-wave {
  display: inline-block;
  animation: wave 1.5s infinite; /* Infinite looping animation */
  transform-origin: 70% 70%; /* Adjust origin to make it look natural */
  font-size: 72px; /* Default size */
}

.welcome {
  font-size: 72px;
  font-weight: bold;
  margin: 0;
}

.heading {
  margin-top: -60px;
  text-align: center; /* Center-align the heading */
  line-height: 1.2;
}

/* Animation enhancement for the heading */
@keyframes textSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.heading {
  animation: textSlideIn 1.2s ease-in-out; /* Smooth slide-in animation for the text */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .hand-wave {
    font-size: 48px; /* Reduce emoji size */
  }

  .welcome {
    font-size: 48px; /* Reduce text size */
  }

  .heading {
    margin-top: -30px; /* Adjust spacing for smaller screens */
  }
}

/* Additional hover effect for the waving hand */
.hand-wave:hover {
  animation: wave 0.8s infinite; /* Faster waving animation on hover */
  color: #007bff; /* Change emoji color when hovered */
}


/* Styling for the <details> container */
details {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(46, 191, 165, 0.05)); 
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border-radius: 12px; /* Smooth rounded corners */
  margin: 12px 0;
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease-in-out;
}

/* Summary section - clickable title */
summary {
  font-size: 18px;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  transition: color 0.3s ease-in-out;
}

/* Add hover effect on summary */
summary:hover {
  color: #007bff; /* Change color when hovered */
}

/* Add a plus (+) and minus (-) indicator */
summary::after {
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
   
}

/* Change the plus to minus when details are open */
details[open] summary::after {
  transform: rotate(180deg);
  
}

/* Styling for expanded content */
details[open] {
  border: 1px solid #007bff;
}

/* Inside the details (list items) */
details ul {
  margin-top: 8px;
  padding-left: 10%;
  list-style-type: circle;
}

/* Style the list items */
details ul li {
  font-size: 16px;
  padding: 4px 0;
}

/* Fade-in effect when opening */
details[open] > ul, details[open] > p {
  animation: fadeIn 0.4s ease-in-out;
}

/* Keyframe animation for fade-in effect */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const detailsElements = document.querySelectorAll("details");

  detailsElements.forEach((detail) => {
    detail.addEventListener("toggle", function () {
      if (this.open) {
        let content = this.querySelector("ul, p");
        if (content) {
          let maxHeight = content.scrollHeight + "px";
          content.style.maxHeight = maxHeight;
        }
      } else {
        let content = this.querySelector("ul, p");
        if (content) {
          content.style.maxHeight = "0px";
        }
      }
    });
  });
});
</script>



<!-- Subheadline -->
<div class="heading">
  <span class="welcome">Welcome</span>
  <span class="hand-wave">👋</span>
</div>


Hello, My name is Mohammad Sadil Khan. I am currently a 2nd year PhD student at [**DFKI**](https://av.dfki.de/members/sadil-khan/), under the supervision of Prof. Dr Didier Stricker. 

I am currently working on the following domains.

<details><summary><strong> <u>Text-to-3D Reconstruction</u>:</strong> <i> Generating 3D models from detailed textual descriptions. </i> </summary>
<ul>
    <li><a href="https://arxiv.org/abs/2411.17945">MARVEL-40M+</a>: The largest and the most descriptive 3D Captioning Dataset (CVPR 2025). </li>
    </ul>
</details>

<details><summary><strong><u>Efficient 3D Representation</u>:</strong> <i>Exploring efficient 3D representation approaches. </i> </summary>
<p> Coming Soon </p>
</details>

<details><summary><strong><u>Multi-Modal CAD Designing</u>:</strong> <i> Leveraging AI to accelerate computer-aided design processes. </i></summary>
  <ul>
    <li><a href="https://sadilkhan.github.io/text2cad-project/">TextCAD</a>: <span> Generate Editable CAD models from text prompts (NeurIPS 2024 - Spotlight). </span> </li>
    <li><a href="http://skazizali.com/cadsignet.github.io/">CAD-SIGNet</a>: Generate Full CAD design history from point clouds (CVPR 2024 - Highlight)..</li>
  </ul>
</details>


Check out my [**Projects**](/projects) and [**Publications**](/publications/) page.


I am open to research collaboration or internship opportunity on the following domains.

1. 3D scene or shape reconstruction.
2. CAD design history generation using Multi-modal inputs.



# Recent Events


- **[01-05-2025]** I have started my summer research internship at Huawei's Noah Ark Lab, London.

- **[26-02-2025]** Marvel-40M+ has been accepted in **CVPR** 2025. Check [Here](/publications/). 🎉🎉🎉






