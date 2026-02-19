/* Neural Network Particles — AI Researcher Theme
   Place this file at: static/js/particles.js
   This calls particlesJS() after the library loads.
*/

particlesJS("particles-js", {
  particles: {
    number: {
      value: 70,
      density: { enable: true, value_area: 900 }
    },
    color: {
      value: ["#0ea5e9", "#14b8a6", "#6366f1", "#0ea5e9"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.55,
      random: true,
      anim: {
        enable: true,
        speed: 0.6,
        opacity_min: 0.15,
        sync: false
      }
    },
    size: {
      value: 3.5,
      random: true,
      anim: {
        enable: true,
        speed: 1.2,
        size_min: 1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 160,
      color: "#0ea5e9",
      opacity: 0.18,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.9,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 1200,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 180,
        line_linked: { opacity: 0.55 }
      },
      push: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
});
