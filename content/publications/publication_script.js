
let publications = []; // Define the publications array in the global scope
let authorsWithUnderline = '';
let bibtexHtml= '';

// Sample publication data
async function fetchPublications() {
    try {
        const response = await fetch('publications.json');
        publications = await response.json();
        displayPublications(publications);
    } catch (error) {
        console.error('Error fetching publications:', error);
    }
}
function setupFadeInAnimation() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.publication').forEach(card => {
        observer.observe(card);
    });
}



// Function to toggle year content visibility
function toggleYearContent(year) {
  const yearContent = document.querySelector(`.year-content[data-year="${year}"]`);
  const arrowIcon = yearContent.previousElementSibling.querySelector('.arrow-icon');

  // Toggle the 'hide' class (since CSS uses .hide)
  yearContent.classList.toggle('hide');

  if (yearContent.classList.contains('hide')) {
    arrowIcon.textContent = '▼';
  } else {
    arrowIcon.textContent = '▲';
  }
}


let activeTooltip = null;

// Function to create and show the mini pop-up window
function showTooltip(event, content) {
    // Create the tooltip if it doesn't exist
    if (!activeTooltip) {
        activeTooltip = document.createElement('div');
        activeTooltip.classList.add('tooltip');
        document.body.appendChild(activeTooltip);

        // Listen for mouseleave event on the publication content
        const publicationContent = event.currentTarget;
        publicationContent.addEventListener('mouseleave', () => {
            document.body.removeChild(activeTooltip);
            activeTooltip = null;
        });
    }

    // Update the tooltip content and position
    activeTooltip.innerHTML = `<p> ${content}</p>`;

    const xOffset = 10; // Adjust this value to set the horizontal offset
    const yOffset = -80; // Adjust this value to set the vertical offset
    const tooltipWidth = Math.min(600, activeTooltip.scrollWidth); // Set a maximum width of 400px
    const tooltipHeight = activeTooltip.scrollHeight;
    const adjustedTop = event.clientY - tooltipHeight - yOffset + window.scrollY;
    const adjustedLeft = event.clientX + xOffset + tooltipWidth > window.innerWidth
        ? event.clientX - tooltipWidth + window.scrollX
        : event.clientX + xOffset;

    activeTooltip.style.maxWidth = `${tooltipWidth}px`;
    activeTooltip.style.left = `${adjustedLeft}px`;
    activeTooltip.style.top = `${adjustedTop}px`;
}




function displayPublications() {
  document.querySelectorAll('.publication').forEach(card => card.classList.remove('visible'));
    const publicationList = document.getElementById('publication-list');
    publicationList.innerHTML = ''; // Clear previous content

    // Sort publications by year in descending order (latest first)
    const sortedPublications = publications.sort((a, b) => b.year - a.year);

    let currentYear = null;

    let paperCount = 0; // Initialize paper count
    sortedPublications.forEach(publication => {
        if (publication.year !== currentYear) {
            // Create a new section for each year
            const yearSection = document.createElement('div');
            yearSection.classList.add('year-section');
            yearSection.innerHTML = `<h2 onclick="toggleYearContent(${publication.year})">
    ${publication.year} <span class="arrow-icon">▼</span>
</h2>
`; publicationList.appendChild(yearSection);

            const yearContent = document.createElement('div');
            yearContent.classList.add('year-content');
            yearContent.setAttribute('data-year', publication.year);
            yearSection.appendChild(yearContent);

            currentYear = publication.year;
            paperCount = 1; // Reset paper count for the new year
        }
        else {
            paperCount++; // Increment paper count for the same year
        }
        
        // Highlight "highlight," "spotlight," or "oral" in red in the conference text
        let conferenceText = publication.conference || '';
        conferenceText = conferenceText.replace(/(highlight|spotlight|oral)/gi, match => `<span style="color: red;">${match}</span>`);

        
        // Split authors by comma and trim any extra spaces
        const authors = publication.authors.split(',').map(author => author.trim());
        
        // Create a new array to hold authors with underlining applied to Mohammad Sadil Khan
        authorsWithUnderline = authors.map(author => {
                if (author.toLowerCase().includes('sadil')) {
                    return `<u><b>${author}</b></u>`;
                } else {
                    return author;
                }
            }).join(' &nbsp;·&nbsp; ');
        
        
        const publicationContent = document.createElement('div');
        publicationContent.classList.add('publication');
        
        bibtexHtml = publication.bibtex ? `<button class="button" onclick="showBibtex(\`${publication.bibtex}\`)">BibTeX</button>` : '';
        let paperImageHtml = ''; // Initialize an empty string for the paper image HTML
        // Check if publication.image exists
        if (publication.image) {
            // If publication.image exists, add the <div class="paper-image"> with the image
            paperImageHtml = `
                <div class="paper-image">
                    <img src="${publication.image}" alt="Publication Image">
                </div>
            `;
        }

        publicationContent.innerHTML = `
  <div class="publication-content">
      <div class="paper-image">
          ${publication.image ? `<img src="${publication.image}" alt="Publication Image">` : ''}
          ${publication.metadata ? `<div class="paper-metadata">${publication.metadata}</div>` : ''}
      </div>

      <div>
          <div class="paper-info">
              <div class="paper-title">${publication.title}</div>
              <div class="paper-authors">${authorsWithUnderline}</div>
              <div class="paper-conference">${conferenceText}</div>
          </div>
          <div class="links">
              ${publication.paperLink ? `<button class="button" onclick="window.open('${publication.paperLink}', '_blank')">Paper</button>` : ''}
              ${publication.arxiv ? `<button class="button" onclick="window.open('${publication.arxiv}', '_blank')">Arxiv</button>` : ''}
              ${publication.project ? `<button class="button" onclick="window.open('${publication.project}', '_blank')">Project</button>` : ''}
              ${publication.codeLink ? `<button class="button" onclick="window.open('${publication.codeLink}', '_blank')">Code</button>` : ''}
              ${publication.dataset ? `<button class="button" onclick="window.open('${publication.dataset}', '_blank')">Dataset</button>` : ''}
              ${publication.poster ? `<button class="button" onclick="window.open('${publication.poster}', '_blank')">Poster</button>` : ''}
              ${publication.video ? `<button class="button" onclick="window.open('${publication.video}', '_blank')">Video</button>` : ''}
              ${bibtexHtml}
          </div>
          
      </div>
  </div>
`;

        // Add event listener to show mini pop-up on hover
        /*publicationContent.addEventListener('mouseover', event => {
            const tooltipContent = `
                ${publication.image}
            `;
            showTooltip(event, tooltipContent);
        });*/

        const yearContent = publicationList.querySelector(`.year-content[data-year="${publication.year}"]`);
        yearContent.appendChild(publicationContent);
    });
    
    setupFadeInAnimation(); 
}


function colorizeBibtex(text) {
  // Detect if the page is in dark mode
  const isDark = document.body.classList.contains('dark-mode');

  // Define theme colors
  const colors = isDark
    ? { // 🌙 Dark Mode Palette
        at: '#ff7b72',      // pink-red
        key: '#79c0ff',     // cyan-blue
        value: '#d2a8ff'    // violet
      }
    : { // ☀️ Light Mode Palette
        at: '#d73a49',      // red
        key: '#005cc5',     // blue
        value: '#6f42c1'    // purple
      };

  // Apply regex-based highlighting
  return text
    .replace(
      /^@(\w+)/gm,
      `<span style="color:${colors.at}; font-weight:600;">@$1</span>`
    )
    .replace(
      /^(\s*[a-zA-Z]+)\s*=/gm,
      `<span style="color:${colors.key}; font-weight:500;">$1</span> =`
    )
    .replace(
      /({[^}]+})/gm,
      `<span style="color:${colors.value};">$1</span>`
    );
}

// Function to show BibTeX text in a modal or container
function showBibtex(bibtexText) {
    // Create a container for displaying BibTeX text
    const modal = document.getElementById('bibtexModal');
    const content = document.getElementById('bibtexContent');
    content.innerHTML = colorizeBibtex(formatBibtex(bibtexText));
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // disable background scroll
}

// Close modal
function closeBibtexModal() {
    const modal = document.getElementById('bibtexModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // re-enable scroll
}

// Copy button inside modal
function copyBibtexFromModal() {
    const content = document.getElementById('bibtexContent').textContent;
    navigator.clipboard.writeText(content);
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => copyBtn.textContent = "📋 Copy", 1200);
}
// Function to copy BibTeX text
function copyBibtex(bibtexText) {
    // Create a temporary textarea element to copy text
    const textarea = document.createElement('textarea');
    textarea.value = formatBibtex(bibtexText); // Format BibTeX text
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    document.execCommand('copy');
    
    // Remove the temporary textarea
    document.body.removeChild(textarea);
    
    // Alert message with the copied content
    alert(`BibTeX copied:\n\n${textarea.value}`);
}

function formatBibtex(bibtexText) {
    let insideBraces = false;
    let formattedText = '';
    let num_bracket=0

    for (let i = 0; i < bibtexText.length; i++) {
        const char = bibtexText[i];

        if (char === '{') {
          if (num_bracket>0) {
            insideBraces = true;
            formattedText += char;
          }
          else {
            formattedText += char;
            num_bracket++;
          }
        } else if (char === '}') {
            insideBraces = false;
            formattedText += char;
        } else if (char === ',' && !insideBraces) {
            formattedText += char + '\n';
        } else {
            formattedText += char;
        }
    }

    return formattedText;
}




// Function to filter publications based on search input
function filterPublications(searchText) {
    const filteredPublications = publications.filter(publication =>
        publication.title.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.authors.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.year.toString().includes(searchText) ||
        publication.conference.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.categories.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredPublications;
}

// Function to update the displayed publications
function updatePublications() {
    const searchText = document.getElementById('search').value;
    const filteredPublications = filterPublications(searchText);
    displayFilteredPublications(filteredPublications, searchText);

}



// Highlight search term in text (case-insensitive)
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text; // If no search input, return plain text
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Function to display filtered publications
function displayFilteredPublications(filteredPublications, searchText) {
  document.querySelectorAll('.publication').forEach(card => card.classList.remove('visible'));
  
    const publicationList = document.getElementById('publication-list');
    publicationList.innerHTML = ''; // Clear previous content
    

    if (filteredPublications.length === 0) {
        publicationList.innerHTML = '<p>No matching publications found.</p>';
    } else {
        let currentYear = null;
        let paperCount = 0; // Initialize paper count
        

        filteredPublications.forEach(publication => {
            if (publication.year !== currentYear) {
                // Create a new section for each year
                const yearSection = document.createElement('div');
                yearSection.classList.add('year-section');
                yearSection.innerHTML = `<h2 onclick="toggleYearContent(${publication.year})">
                    ${publication.year} <span class="arrow-icon">▼</span>
                </h2>`;
                publicationList.appendChild(yearSection);

                const yearContent = document.createElement('div');
                yearContent.classList.add('year-content');
                yearContent.setAttribute('data-year', publication.year);
                yearSection.appendChild(yearContent);

                currentYear = publication.year;
                paperCount = 1; // Reset paper count for the new year
            } else {
                paperCount++; // Increment paper count for the same year
            }
            
            // Highlight "highlight," "spotlight," or "oral" in red in the conference text
          let conferenceText = publication.conference || '';
          conferenceText = conferenceText.replace(/(highlight|spotlight|oral)/gi, match => `<span style="color: red;">${match}</span>`);

            const publicationContent = document.createElement('div');
            publicationContent.classList.add('publication');
            
            let paperImageHtml = ''; // Initialize an empty string for the paper image HTML
           
            
            const authors = publication.authors.split(',').map(author => author.trim());
             // Create a new array to hold authors with underlining applied to Mohammad Sadil Khan
            authorsWithUnderline = authors.map(author => {
                // Check if the author's name contains "Sadil", and if so, apply underlining
                if (author.toLowerCase().includes('sadil')) {
                    return `<u><b>${author}</b></u>`;
                } else {
                    return author;
                }
            }).join(', '); // Join the authors back into a string separated by comma
            
          // Check if publication.image exists
          if (publication.image) {
              // If publication.image exists, add the <div class="paper-image"> with the image
              paperImageHtml = `
                  <div class="paper-image">
                      <img src="${publication.image}" alt="Publication Image">
                  </div>
              `;
          }
           bibtexHtml = publication.bibtex ? `<button class="button" onclick="showBibtex(\`${publication.bibtex}\`)">BibTeX</button>` : '';
            publicationContent.innerHTML = `
  <div class="publication-content">
      <div class="paper-image">
          ${publication.image ? `<img src="${publication.image}" alt="Publication Image">` : ''}
          ${publication.metadata ? `<div class="paper-metadata">${publication.metadata}</div>` : ''}
      </div>

      <div>
          <div class="paper-info">
              <div class="paper-title">${highlightSearchTerm(publication.title, searchText)}</div>
<div class="paper-authors">${highlightSearchTerm(authorsWithUnderline, searchText)}</div>
<div class="paper-conference">${highlightSearchTerm(conferenceText, searchText)}</div>

          </div>
          <div class="links">
              ${publication.paperLink ? `<button class="button" onclick="window.open('${publication.paperLink}', '_blank')">Paper</button>` : ''}
              ${publication.arxiv ? `<button class="button" onclick="window.open('${publication.arxiv}', '_blank')">Arxiv</button>` : ''}
              ${publication.project ? `<button class="button" onclick="window.open('${publication.project}', '_blank')">Project</button>` : ''}
              ${publication.codeLink ? `<button class="button" onclick="window.open('${publication.codeLink}', '_blank')">Code</button>` : ''}
              ${publication.dataset ? `<button class="button" onclick="window.open('${publication.dataset}', '_blank')">Dataset</button>` : ''}
              ${publication.poster ? `<button class="button" onclick="window.open('${publication.poster}', '_blank')">Poster</button>` : ''}
              ${publication.video ? `<button class="button" onclick="window.open('${publication.video}', '_blank')">Video</button>` : ''}
              ${bibtexHtml}
          </div>
      </div>
  </div>
`;


            // Add event listener to show mini pop-up on hover
            /*publicationContent.addEventListener('mouseover', event => {
                const tooltipContent = `${publication.abstract}`;
                showTooltip(event, tooltipContent);
            });*/

            const yearContent = publicationList.querySelector(`.year-content[data-year="${publication.year}"]`);
            yearContent.appendChild(publicationContent);
        });
    }

  
  setupFadeInAnimation(); 
}

fetchPublications();
// Initial display of publications
//displayPublications();

// Attach event listener to the search input
document.getElementById('search').addEventListener('input', updatePublications);
