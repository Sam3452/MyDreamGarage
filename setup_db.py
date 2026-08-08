import sqlite3
import json

conn = sqlite3.connect('cars.db')
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS cars (
id INTEGER PRIMARY KEY,
manufacturer TEXT,
model TEXT,
generation TEXT,
colours TEXT,
trim_levels TEXT,
specials TEXT,
engine_options TEXT,
image TEXT
)
''')

with open('cars.json') as f:
    cars = json.load(f)

for car in cars:
    cursor.execute('''
    INSERT OR REPLACE INTO cars  (id, manufacturer, model, generation, colours, trim_levels, specials, engine_options, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
    car['id'],
    car['manufacturer'],
    car['model'],
    car['generation'],
    json.dumps(car['colours']),
    json.dumps(car['trim_levels']),
    json.dumps(car['specials']),
    json.dumps(car['engine_options']),
    car['image']
))

conn.commit()
conn.close()
print("Datbase Created and populated")
