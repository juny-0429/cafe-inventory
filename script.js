const search = document.getElementById("search");
const result = document.getElementById("searchResult");
const locationView = document.getElementById("locationView");

const items = [];

// inventory를 검색용 배열로 변환
for (const location in inventory) {
  inventory[location].forEach((name) => {
    items.push({
      name,
      location,
    });
  });
}

// 위치별 카드 출력
function drawLocations() {
  let html = "";

  for (const location in inventory) {
    html += `
      <div class="card">
        <h2>📍 ${location}</h2>

        <ul>
          ${inventory[location].map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  locationView.innerHTML = html;
}

// 처음 화면 출력
drawLocations();

// 검색
search.addEventListener("input", () => {
  const keyword = search.value.trim().toLowerCase();

  if (keyword === "") {
    result.style.display = "none";
    locationView.style.display = "grid";
    return;
  }

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(keyword),
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

  result.innerHTML = filtered
    .map(
      (item) => `
      <div class="result-item">
        <div>📦 ${item.name}</div>
        <div class="location">${item.location}</div>
      </div>
    `,
    )
    .join("");
});
