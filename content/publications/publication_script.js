
let publications = []; // Define the publications array in the global scope

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


// Function to toggle year content visibility
function toggleYearContent(year) {
    const yearContent = document.querySelector(`.year-content[data-year="${year}"]`);
    const arrowIcon = yearContent.previousElementSibling.querySelector('.arrow-icon');

    if (yearContent.classList.contains('show')) {
        arrowIcon.textContent = '▼';
        yearContent.classList.remove('show');
    } else {
        arrowIcon.textContent = '▲';
        yearContent.classList.add('show');
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
    activeTooltip.innerHTML = `<p><b> Abstract: <br> </b> ${content}</p>`;

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
            yearSection.innerHTML = `<h2 style="color:black;" onclick="toggleYearContent(${publication.year})">
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

        const publicationContent = document.createElement('div');
        publicationContent.classList.add('publication');

        publicationContent.innerHTML = `
                    <div class="paper-info">
                        <div class="paper-title"><b>${publication.title}</b></div>
                        <div class="paper-authors">${publication.authors}</div>
                        <div class="paper-conference"><i>${publication.conference}</i></div>
                    </div>
                    <div class="links">
                        ${publication.codeLink ? `<a href="${publication.codeLink}" target="_blank">Code</a>` : ''}
                        ${publication.paperLink ? `<a href="${publication.paperLink}" target="_blank">Paper</a>` : ''}
                    </div>
                `;
        // Add event listener to show mini pop-up on hover
        publicationContent.addEventListener('mouseover', event => {
            const tooltipContent = `
                ${publication.abstract}
            `;
            showTooltip(event, tooltipContent);
        });

        const yearContent = publicationList.querySelector(`.year-content[data-year="${publication.year}"]`);
        yearContent.appendChild(publicationContent);
    });

}


// Function to filter publications based on search input
function filterPublications(searchText) {
    const filteredPublications = publications.filter(publication =>
        publication.title.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.authors.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.year.toString().includes(searchText) ||
        publication.conference.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.categories.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.abstract.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredPublications;
}

// Function to update the displayed publications
function updatePublications() {
    const searchText = document.getElementById('search').value;
    const filteredPublications = filterPublications(searchText);
    displayFilteredPublications(filteredPublications);

}
// Function to display filtered publications
function displayFilteredPublications(filteredPublications) {
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
                yearSection.innerHTML = `<h2 style="color:black;" onclick="toggleYearContent(${publication.year})">
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

            const publicationContent = document.createElement('div');
            publicationContent.classList.add('publication');

            publicationContent.innerHTML = `
                <div class="paper-info">
                    <div class="paper-title"><b>${publication.title}</b></div>
                    <div class="paper-authors">${publication.authors}</div>
                    <div class="paper-conference"><i>${publication.conference}</i></div>
                </div>
                <div class="links">
                    ${publication.codeLink ? `<a href="${publication.codeLink}" target="_blank">Code</a>` : ''}
                    ${publication.paperLink ? `<a href="${publication.paperLink}" target="_blank">Paper</a>` : ''}
                </div>
            `;

            // Add event listener to show mini pop-up on hover
            publicationContent.addEventListener('mouseover', event => {
                const tooltipContent = `${publication.abstract}`;
                showTooltip(event, tooltipContent);
            });

            const yearContent = publicationList.querySelector(`.year-content[data-year="${publication.year}"]`);
            yearContent.appendChild(publicationContent);
        });
    }
}

fetchPublications();
// Initial display of publications
//displayPublications();

// Attach event listener to the search input
document.getElementById('search').addEventListener('input', updatePublications);
