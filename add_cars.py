import requests

API_URL = "http://127.0.0.1:5000/api/cars"

new_cars = [ {
     "id": 4,
    "manufacturer": "AC",
    "model": "GT Supersport",
    "generation": "2025",
    "extra_info": "Another concept car, first deliveries will be in 2027, will cost around £400,000, Only 25 will be made",
    "colours": ["Blue", "Orange", "White"],
    "trim_levels": [""],
    "specials": [""],
    "engine_options": ["Supercharged V8"],
    "image": "images/GTS.jpg"
       


},
]

for car in new_cars:
    response = requests.post(API_URL, json=car)
    if response.status_code == 201:
        print(f"Added: {car['manufacturer']} {car['model']}")
    else:
        print("Failed to add")
              