import sqlite3
from datetime import datetime
from flask import Flask, request, jsonify, redirect, url_for

def db_connect():
    return sqlite3.connect('monitor.db')

def create_readings_table():
    db = db_connect()
    cur = db.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS readings (datetime text, sector text, humidity real)')
    db.close()

def return_date_string():
    return datetime.strftime(datetime.today(), '%d/%m/%Y %H:%M:%S')

app = Flask(__name__)
create_readings_table()

@app.route('/')
def home():
    return redirect(url_for('read_data'))

@app.route('/save-data', methods=['POST'])
def save_data():
    humidity = float(request.json['humidity'])
    sector = request.json['sector']
    date = return_date_string()
    data = (date, sector, humidity)

    try:
        db = db_connect()
        cur = db.cursor()
        cur.execute('INSERT INTO readings VALUES (?,?,?)', data)
        db.commit()
        db.close()
    except:
        db.close()
        return jsonify({ 'msg':'Um erro ocorreu' })

    response = {
        'Dado Inserido':{
            'reading_time': date,
            'reading,sector': sector,
            'reading_humidity': humidity
        }
    }
        
    return jsonify(response)

@app.route('/read-data', methods=['GET'])
def read_data():
    try:
        db = db_connect()
        cur = db.cursor()
        data = cur.execute('SELECT * FROM readings').fetchall()
        db.close()
    except:
        db.close()
        return jsonify({ 'msg':'Um erro ocorreu' })
    
    readings_time = [t for t, _, _ in data]
    readings_sector = [s for _, s, _ in data]
    readings_humidity = [h for _, _, h in data]
    
    response = {
        'readings_time': readings_time,
        'readings_sector': readings_sector,
        'readings_humidity': readings_humidity
    }
       
    return jsonify(response)

if __name__ == '__main__':
    app.run(
        host='192.168.15.6',
        threaded=True,
        use_reloader=False
    )
