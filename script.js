async function getCars() {
    try {
        const response = await fetch('cars.json');
        const cars = await response.json();

        const container = document.getElementId('car-container');

        cars.forEach(car => {
            const carBox = document.createElement('div');
            carBox.classList.add('car-box');

            carBox.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h2>${car.manufacturer}</h2>
            <p>${car.model}</p>
            `;

            container.appendChild(carBox);
        });
    } catch (error) {
        console.error('Error getting cars:', error);

    }
}

getCars();