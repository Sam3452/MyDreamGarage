import requests

API_URL = "http://127.0.0.1:5000/api/cars"

new_cars = [{}]

for car in new_cars:
    response = requests.post(API_URL, json=car)
    if response.status_code == 201:
        print(f"Added: {car['manufacturer']} {car['model']}")
    else:
        print("Failed to add")
              