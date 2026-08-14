import requests

API_URL = "http://127.0.0.1:5000/api/cars"

new_cars = [ {
        "id": 2,
        "manufacturer": "AC",
        "model": "Petite",
        "generation": "First Generation, 1952-1958",
        "colours": ["Bright Blue", "Pale Blue", "Fawn (Beige/ Tan),", "Mist Silver", "Ruby Red"],
        "trim_levels": ["4-Speed Manual Gearbox", "3 Wheeler with single front wheel"],
        "specials": [""],
        "engine_options": ["350cc Villeries  27B single cyclinder, Petrol"],
        "image": "images/acpetitemk1.jpg"

    },
    {
        "id": 3,
        "manufacturer": "AC",
        "model": "Petite",
        "generation": "Second Generation, 1955-1958",
        "colours": ["Bright Blue", "Pale Blue", "Fawn (Beige/ Tan),", "Mist Silver", "Ruby Red"],
        "trim_levels": ["4-Speed Manual Gearbox", "3 Wheeler with single front wheel"],
        "specials": [""],
        "engine_options": ["Villiers 28B engine, Petrol"],
        "image": "images/acpetite.jpg"

    },
    ]

for car in new_cars:
    response = requests.post(API_URL, json=car)
    if response.status_code == 201:
        print(f"Added: {car['manufacturer']} {car['model']}")
    else:
        print("Failed to add")
              