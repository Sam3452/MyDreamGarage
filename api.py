from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect('cars.db')
    conn.row_factory = sqlite3.Row
    return conn

def row_to_car(row):
    return {
        'id': row['id'],
        'manufacturer': row['manufacturer'],
        'model': row['model'],
        'generation': row['generation'],
        'colours': json.loads(row['colours']),
        'trim_levels': json.loads(row['trim_levels']),
        'specials': json.loads(row['specials']),
        'engine_options': json.loads(row['engine_options']),
        'image': row['image']
    }

@app.route('/api/cars', methods=['GET'])
def get_cars():
    conn = get_db()
    rows = conn.execute('SELECT * FROM cars').fetchall()
    conn.close()
    return jsonify([row_to_car(r) for r in rows])

@app.route('/api/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    conn = get_db()
    row = conn.execute('SELECT * FROM cars WHERE id = ?', (car_id,)).fetchone()
    conn.close()
    if row is None:
        return jsonify({'error': 'Car not found'}), 404
    return jsonify(row_to_car(row))

@app.route('/api/cars', methods=['POST'])
def add_car():
    data = request.json
    conn = get_db()
    conn.execute('''
        INSERT INTO cars (manufacturer, model, generation, colours, trim_levels, specials, engine_options, image) 
        VALUES (?,?,?,?,?,?,?,?,?)
    ''', (
            data['manufacturer'], data['model'], data['generation'],
            json.dumps(data['colours']), json.dumps(data['trim_levels']),
            json.dumps(data['specials']), json.dumps(data['engine_options']),
            data['image']
    ))
    conn.commit()
    conn.close()
    return jsonify({'status': 'created'}), 201

@app.route('/')
def home():
    return jsonify({'message': 'Car API is running. Try /api/cars'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
