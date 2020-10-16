import firebase_admin
from os import environ
from dotenv import load_dotenv
from firebase_admin import auth, credentials
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
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

@app.route('/register')
def register():
    auth = check_token("het")
    if auth['error'] == True:
        return jsonify({'error': auth['message']}),401
    return jsonify(auth['uid'])


app.run(debug=True)