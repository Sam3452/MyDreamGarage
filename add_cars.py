import requests

API_URL = "http://127.0.0.1:5000/api/cars"

new_cars = [
    
    {
    "id": 164,
    "manufacturer": "BMW",
    "model": "2 Series Coupe (G42)",
    "generation": "2021 to present",
    "extra_info": "Second-generation 2 Series coupe built on BMW's rear-wheel-drive CLAR architecture. The M240i xDrive sits below the separate G87 M2.",
    "colours": [
      "Alpine White",
      "Black Sapphire (metallic)",
      "Brooklyn Grey (metallic)",
      "Thundernight Metallic",
      "Portimao Blue (metallic)",
      "Melbourne Red (metallic)"
    ],
    "trim_levels": [
      "220i",
      "230i",
      "M240i xDrive",
      "Sport",
      "M Sport"
    ],
    "specials": [
      "M240i xDrive"
    ],
    "engine_options": [
      "2.0L B48 turbo I4 (184-255 hp)",
      "3.0L B58 turbo I6 (374 hp, M240i xDrive)"
    ],
    "image": "images/bmwg42.jpg"
  },
  
  
  
  
]


for car in new_cars:
    response = requests.post(API_URL, json=car)
    if response.status_code == 201:
        print(f"Added: {car['manufacturer']} {car['model']}")
    else:
        print("Failed to add")
              