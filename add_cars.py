import requests

API_URL = "http://127.0.0.1:5000/api/cars"

new_cars = [ {
        "id": 100,
        "manufacturer": "Citreon",
        "model": "C1",
        "generation": "First Generation, 2005-2014",
        "colours": ["Lipizan white", "Oural White", "Caldera Black", "Gallium Grey", "Carlinite Grey", "Aluminium Grey", "Scarlet Red", "Sunrise Red", "Orange Mandaline", "Electra Blue", "Botticelli Blue", "Calvi Blue", "Damas Blue", "Lime Green", "Green", "Pacific Green", "Plum/Viola", "Citrus Yellow"],
        "trim_levels": ["Vibe", "Rhythm", "Lounges", "Airplay", "Platinum", "VT", "VTR", "VTR+"],
        "specials": ["Cool", "Splash", "Code", "Black/White"],
        "engine_options": ["1.0L 3-Cylinder Petrol", "1.4L 4-CylinderDiesel"],
        "image": "c1.jpg"

    },
    ]

for car in new_cars:
    response = requests.post(API_URL, json=car)
    if response.status_code == 201:
        print(f"Added: {car['manufacturer']} {car['model']}")
    else:
        print("Failed to add")
              