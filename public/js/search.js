var searchElem = document.getElementById("search-input-page");
var posts = [];
var lastQuery = '';
var target = document.getElementById('list');
var postsByTitle = {};

function loadSearch() {
    var xhr = new XMLHttpRequest();
    var url = "../index.json";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data) {
                    posts = data;
                    postsByTitle = posts.reduce((acc, curr) => {
                        acc[curr.title] = curr;
                        return acc;
                    }, {});
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', url);
    xhr.send();
}
loadSearch();

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString(undefined, { month: 'long' });
    const year = date.getFullYear();

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${month} ${day}${getDaySuffix(day)}, ${year}`;
}

function showSearchResults() {
    var query = searchElem.value || '';
    var searchString = query.replace(/[^\w\s]/gi, '');

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(function () {
        if (searchString === lastQuery) {
            return;
        }
        lastQuery = searchString;

        if (searchString && searchString !== '') {
            var index = lunr(function () {
                this.ref('title');
                this.field('content');
                posts.forEach(function (doc) {
                    this.add(doc);
                }, this);
            });

            var matches = index.search(searchString);
            var matchPosts = [];
            matches.forEach((m) => {
                matchPosts.push(postsByTitle[m.ref]);
            });

            if (matchPosts.length > 0) {
                target.innerHTML = matchPosts.map(function (p) {
                    if (p !== undefined) {
                        return `<li>
                            ${formatDate(p.date)} -
                            <a href="${p.url}"> ${p.title}</a>
                            </li>`;
                    }
                }).join('');
            } else {
                target.innerHTML = `<br><h2 style="text-align:center">No search results found</h2>`;
            }
        } else {
            target.innerHTML = '';
        }
    }, 300);
}

searchElem.addEventListener('input', showSearchResults);
