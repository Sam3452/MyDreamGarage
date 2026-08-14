

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
        const response = await fetch('http://localhost:5000/api/cars');
        allCars = await response.json();
        renderCars(allCars);
        populateManufacturerFilter();
        populateModelFilter()
    } catch (error) {
        console.error('Error searching cars:', error);
    }
}

function renderCars(cars) {
   currentFilteredCars = cars;
   currentPage = 1;
   renderPage();
}

function filterCars() {
    const query = document.getElementById('car-search').value.toLowerCase().trim()
    const selectedMake = document.getElementById('manufacturer-filter').value;

    const filtered = allCars.filter(car => {
        const matchesSearch =
    
        car.manufacturer.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.generation.toLowerCase().includes(query)

    const matchesMake = selectedMake === '' || car.manufacturer === selectedMake;
  

    return matchesSearch && matchesMake;
});

    renderCars(filtered);
}

document.getElementById('car-search').addEventListener('input', (e) => {
    filterCars(e.target.value);
});

function populateManufacturerFilter() {
    const select = document.getElementById('manufacturer-filter');

    const manufacturers = [...new Set(allCars.map(car => car.manufacturer))].sort();

    manufacturers.forEach(make => {
        const option = document.createElement('option');
        option.value = make;
        option.textContent = make;
        select.appendChild(option);
    });
}

function populateModelFilter() {
    const select = document.getElementById('model-filter');
    const models = [...new Set(allCars.map(car => car.model))].sort();

    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        select.appendChild(option);
    });
}

const CARS_PER_PAGE = 8;
let currentPage = 1;
let currentFilteredCars = [];

function renderPage()
{
    const container = document.getElementById('car-container');
    container.innerHTML = ''

    const totalPages = Math.max(1, Math.ceil(currentFilteredCars.length / CARS_PER_PAGE));
    currentPage = Math.min(currentPage, totalPages);

    const startIndex = (currentPage -1) * CARS_PER_PAGE;
    const endIndex = startIndex + CARS_PER_PAGE;
    const carsForThisPage = currentFilteredCars.slice(startIndex, endIndex);
    
    carsForThisPage.forEach(car => {
        const carBox = document.createElement('div');
        carBox.classList.add('car-box');

        carBox.innerHTML = `<img src="${car.image}" alt="${car.manufacturer} ${car.model}" title="${car.manufacturer} ${car.model} ${car.generation}">`;
        
        carBox.addEventListener('click', () => openInfo(car));

        container.appendChild(carBox);
    });

    updatePaginationControls(totalPages);
}

function updatePaginationControls(totalPages) 
{
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;

}

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(currentFilteredCars.length / CARS_PER_PAGE)
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});


document.getElementById('car-search').addEventListener('input', filterCars);
document.getElementById('manufacturer-filter').addEventListener('change', filterCars);

searchCars();