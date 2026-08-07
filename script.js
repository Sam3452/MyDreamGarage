

function openInfo(car) {
    const infoBox = document.getElementById('car-info');
    const infoContent = document.getElementById('info-content');

      infoContent.innerHTML = `
        <span id="closeInfo">&times;</span>
        <img src="${car.image}" alt="${car.manufacturer} ${car.model}">
        <h2>${car.manufacturer} ${car.model}</h2>
        <p>${car.generation}</p>
        <p>Colours:${car.colours.join(', ')}</p>
        <p>Trim Levels: ${car.trim_levels.join(', ')}</p>
        <p>Specials: ${car.specials.join(', ')}</p>
        <p>Engine Options: ${car.engine_options.join(', ')}</p>
    `;

    infoBox.style.display = 'flex';

    document.getElementById('closeInfo').addEventListener('click', closeInfo);
    
}

function closeInfo() {
    document.getElementById('car-info').style.display = 'none';
}

document.addEventListener('click', (e) => {
    const infoBox = document.getElementById('car-info');
    if (e.target === infoBox) closeInfo();
});

let allCars = [];

async function searchCars() {
    try {
        const response = await fetch('cars.json');
        allCars = await response.json();
        renderCars(allCars);
    } catch (error) {
        console.error('Error searching cars:', error);
    }
}

function renderCars(cars) {
    const container = document.getElementById('car-container');
    container.innerHTML = '';

    cars.forEach(car => {
        const carBox = document.createElement('div');
        carBox.classList.add('car-box');

        carBox.innerHTML = `<img src="${car.image}" alt="${car.manufacturer} ${car.model}" title="${car.manufacturer} ${car.model} ${car.generation}">`;

        carBox.addEventListener('click', () => openInfo(car));

        container.appendChild(carBox);
    });
}

function filterCars(query) {
    const lowerQuery = query.toLowerCase().trim();
    const filtered = allCars.filter(car => 
        car.manufacturer.toLowerCase().includes(lowerQuery) ||
        car.model.toLowerCase().includes(lowerQuery) ||
        car.generation.toLowerCase().includes(lowerQuery)
    );

    renderCars(filtered);
}

document.getElementById('car-search').addEventListener('input', (e) => {
    filterCars(e.target.value);
});

searchCars();