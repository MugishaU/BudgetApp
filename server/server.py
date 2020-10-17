from os import environ
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from flask_sqlalchemy import sqlalchemy, SQLAlchemy
from helpers import check_token, format_resp

load_dotenv()

app = Flask(__name__)

CORS(app)
Session(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = environ["DATABASE_URI"]
db = SQLAlchemy(app)

@app.route('/')
def running():
    return jsonify("Flask Server Running")

@app.route('/register', methods=["POST"])
def register():
    details = request.get_json()
    token = request.headers.get('token')
    if token:
        auth_token = check_token(token)

        if auth_token['error'] == True:
            return jsonify({'error': auth_token['message']}), 401

        if 'username' not in details or type(details['username']) != str:
            return jsonify({'error':'Key \'username\' Not Present in Request Body or of Invalid Type (str expected)'}),403 
        
        uid = auth_token['uid']

        try:
            result_proxy = db.session.execute('INSERT INTO users (uid, username) VALUES (:1, :2) RETURNING username',{'1':uid, '2':details['username']})
            response = format_resp(result_proxy)
            db.session.commit()
        except sqlalchemy.exc.SQLAlchemyError:
            return({'error':'Error Writing to Database'}),500 
        return jsonify(f"Welcome, {response[0]['username']}")
    return jsonify({'error':'No Token Provided'}),401

@app.route('/user', methods=["GET"])
def user():
    token = request.headers.get('token')
    if token:
        auth_token = check_token(token)

        if auth_token['error'] == True:
            return jsonify({'error': auth_token['message']}), 401

        uid = auth_token['uid']
        
        result_proxy = db.session.execute('SELECT username, budget FROM users WHERE uid = :1', {'1': uid})
        response = format_resp(result_proxy)
        return jsonify(response[0])
    return jsonify({'error':'No Token Provided'}),401




app.run(debug=True)