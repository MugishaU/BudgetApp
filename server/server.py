import firebase_admin
from os import environ
from dotenv import load_dotenv
from firebase_admin import auth, credentials
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
# from helpers import format_resp

load_dotenv()

app = Flask(__name__)

CORS(app)
Session(app)

GOOGLE_APPLICATION_CREDENTIALS = {
    "type": "service_account",
    "project_id": environ["FIREBASE_PROJECT_ID"],
    "private_key_id": environ["FIREBASE_PRIVATE_KEY_ID"],
    "client_email": environ["FIREBASE_CLIENT_EMAIL"],
    "client_id": environ["FIREBASE_CLIENT_ID"],
    "auth_uri": environ["FIREBASE_AUTH_URI"],
    "token_uri": environ["FIREBASE_TOKEN_URI"],
    "auth_provider_x509_cert_url": environ["AUTH_PROVIDER_X509_CERT_URL"],
    "client_x509_cert_url": environ["CLIENT_X509_CERT_URL"],
    "private_key": environ["FIREBASE_PRIVATE_KEY"].replace("\\n", "\n").replace("\\","")
}

cred = credentials.Certificate(GOOGLE_APPLICATION_CREDENTIALS)
firebase_admin.initialize_app(cred)


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = environ["DATABASE_URI"]
db = SQLAlchemy(app)

@app.route('/')
def running():
    return jsonify("Flask Server Running")



app.run(debug=True)