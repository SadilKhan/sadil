/* Table of Contents */
window.addEventListener('DOMContentLoaded', () => {
    const tocObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          clearActiveStates();
          const link = document.querySelector(`aside div nav li a[href="#${id}"]`);
          if (link) link.parentElement.classList.add('active');
        }
      });
    });

    document.querySelectorAll('h1[id],h2[id],h3[id],h4[id]').forEach((section) => {
      tocObserver.observe(section);
    });
  });

function clearActiveStates() {
    document.querySelectorAll('aside div nav li a').forEach((section) => {
      section.parentElement.classList.remove('active');
    });
}
