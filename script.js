async function getCars() {
    try {
        const response = await fetch('cars.json');
        const cars = await response.json();

        const container = document.getElementById('car-container');

        cars.forEach(car => {
            const carBox = document.createElement('div');
            carBox.classList.add('car-box');

            carBox.innerHTML = `<img src="${car.image}" alt="${car.manufacturer} ${car.model}">`;

            carBox.addEventListener('click', () => openInfo(car));

            container.appendChild(carBox);
    
        });
    } catch (error) {
        console.error('Error getting cars:', error);

    }
}

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

getCars();