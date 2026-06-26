const search = document.getElementById("search");
const result = document.getElementById("searchResult");
const locationView = document.getElementById("locationView");

let items = [];

async function loadData() {
    const response = await fetch("data.json");
    items = await response.json();

    drawLocations();
}

function drawLocations() {

    const locations = {};

    items.forEach(item => {

        if (!locations[item.location]) {
            locations[item.location] = [];
        }

        locations[item.location].push(item.name);

    });

    let html = "";

    for (const location in locations) {

        html += `
        <div class="card">
            <h2>📍 ${location}</h2>
            <ul>
                ${locations[location]
                    .map(name => `<li>${name}</li>`)
                    .join("")}
            </ul>
        </div>
        `;
    }

    locationView.innerHTML = html;

}

search.addEventListener("input", () => {

    const keyword = search.value.trim().toLowerCase();

    if (keyword === "") {

        result.style.display = "none";
        locationView.style.display = "grid";

        return;

    }

    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );

    result.style.display = "block";
    locationView.style.display = "none";

    if (filtered.length === 0) {

        result.innerHTML = `
            <div class="result-item">
                검색 결과가 없습니다.
            </div>
        `;

        return;
    }

    result.innerHTML = filtered.map(item => `
        <div class="result-item">
            <div>📦 ${item.name}</div>
            <div class="location">📍 ${item.location}</div>
        </div>
    `).join("");

});

loadData();