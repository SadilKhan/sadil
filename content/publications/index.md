---
title: My Publications
author: "Mohammad Sadil Khan"
show_post_date: false
categories: [Publication, Papers, Conferences, Journals]
show_related: true
publishDate: "2023-08-10T00:00:00Z"
---
<link rel="stylesheet" href="styles.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<div class="container">

  <!-- Search bar -->
  <div id="search-container">
    <form onsubmit="return false;">
    <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by title, author, venue, year …"
        autocomplete="off"
        spellcheck="false">
    </form>
  </div>

  <!-- Equal contributions note -->
  <div>
    <p>* <span style="font-weight:600;">Equal Contributions</span></p>
  </div>

  <!-- Publication list rendered by JS -->
  <div id="publication-list"></div>
</div>

<!-- BibTeX Modal -->
<div id="bibtexModal" class="bibtex-modal" role="dialog" aria-modal="true" aria-label="BibTeX Entry">
  <div class="bibtex-card">
    <button class="close-btn" onclick="closeBibtexModal()" aria-label="Close">×</button>
    <h3>BibTeX Entry</h3>
    <pre id="bibtexContent" class="bibtex-text"></pre>
    <button class="copy-btn" onclick="copyBibtexFromModal()">📋 Copy</button>
  </div>
</div>

<script src="publication_script.js"></script>
