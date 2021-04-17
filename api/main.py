import sqlite3
from datetime import datetime
from flask_cors import CORS
from flask import Flask, request, jsonify, redirect, url_for

def connect_db():
    return sqlite3.connect('monitor.db')

def create_readings_table(db):
    cur = db.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS readings (datetime text, sector text, humidity real)')

def return_date_string():
    return datetime.strftime(datetime.today(), '%d/%m/%Y %H:%M:%S')

app = Flask(__name__)
CORS(app)
db = connect_db()
create_readings_table(db)
db.close()


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
        db = connect_db()
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

@app.route('/read-data/<sector>', methods=['GET'])
def read_data(sector):
    try:
        db = connect_db()
        cur = db.cursor()
        data = cur.execute(f"SELECT datetime, humidity FROM readings WHERE sector='{sector}'").fetchall()
        db.close()
    except:
        db.close()
        return jsonify({ 'msg':'Um erro ocorreu' })

    plotData = [{'date':d, 'humidity':h} for d, h in data]
    lastHumidity = data[-1][-1]
    
    response = {
        'data': plotData,
        'lastHumidity': lastHumidity
    }
       
    return jsonify(response)

@app.route('/read-last-data', methods=['GET'])
def read_last_data():
    sql = f"SELECT sector, humidity FROM readings"

    try:
        db = connect_db()
        cur = db.cursor()
        data = cur.execute(sql).fetchall()
        db.close()
    except:
        db.close()
        return jsonify({ 'msg':'Um erro ocorreu' })

    sectors = sorted(set([s[0] for s in data]))
    response = {s:[] for s in sectors}
    for k in response.keys():
        for i in data:
            if k in i:
                response[k] = i[-1]
       
    return jsonify(response)

@app.route('/read-data/sectors', methods=['GET'])
def read_sectors():
    sql = f"SELECT sector FROM readings"

    try:
        db = connect_db()
        cur = db.cursor()
        data = cur.execute(sql).fetchall()
        db.close()
    except:
        db.close()
        return jsonify({ 'msg':'Um erro ocorreu' })

    data = sorted([s[0] for s in set(data)])

    print(data)

    response = {
        'sectors': data
    }
       
    return jsonify(response)

if __name__ == '__main__':
    app.run(
        host='192.168.15.6',
        threaded=True,
        use_reloader=True
    )   
