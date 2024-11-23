const pgListElement = document.getElementById("pg-list");
const priceRange = document.getElementById("price-range");
const priceDisplay = document.getElementById("price-display");
const locationInput = document.getElementById("location");
const searchBtn = document.getElementById("search-btn");
const updateForm = document.getElementById("pg-update-form");

let pgData = [];

// Load PG data from JSON
async function fetchPGs() {
    const response = await fetch("data.json");
    pgData = await response.json();
    displayPGs(pgData);
}

// Display PGs
function displayPGs(pgs) {
    pgListElement.innerHTML = "";
    pgs.forEach(pg => {
        const card = document.createElement("div");
        card.classList.add("pg-card");
        card.innerHTML = `
            <img src="${pg.image}" alt="${pg.name}">
            <h3>${pg.name}</h3>
            <p>Price: ₹${pg.price}</p>
            <p>Location: ${pg.location}</p>
            <p>Owner: ${pg.owner}</p>
            <p>Contact: <a href="tel:${pg.contact}">${pg.contact}</a></p>
        `;
        pgListElement.appendChild(card);
    });
}

// Filter PGs
searchBtn.addEventListener("click", () => {
    const maxPrice = parseInt(priceRange.value);
    const location = locationInput.value.toLowerCase();

    const filteredPGs = pgData.filter(pg =>
        pg.price <= maxPrice &&
        pg.location.toLowerCase().includes(location)
    );

    displayPGs(filteredPGs);
});

// Update PG Details
updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPG = {
        id: parseInt(document.getElementById("pg-id").value),
        name: document.getElementById("pg-name").value,
        price: parseInt(document.getElementById("pg-price").value),
        location: document.getElementById("pg-location").value,
        owner: document.getElementById("pg-owner").value,
        contact: document.getElementById("pg-contact").value,
        image: document.getElementById("pg-image").value
    };

    const existingPGIndex = pgData.findIndex(pg => pg.id === newPG.id);
    if (existingPGIndex !== -1) {
        pgData[existingPGIndex] = newPG; // Update existing PG
    } else {
        pgData.push(newPG); // Add new PG
    }

    displayPGs(pgData);
});

// Initialize
fetchPGs();
priceRange.addEventListener("input", () => {
    priceDisplay.textContent = `₹${priceRange.value}`;
});
