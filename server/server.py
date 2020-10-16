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
    auth = check_token("eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlM2FlZWUyYjVjMDhjMGMyODFhNGZmN2RjMmRmOGIyMzgyOGQ1YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVkZ2V0YXBwLTExMTBkIiwiYXVkIjoiYnVkZ2V0YXBwLTExMTBkIiwiYXV0aF90aW1lIjoxNjAyODUxNjYyLCJ1c2VyX2lkIjoieG1hT0RVaUFwUlJvSk1pRkJxWDd2SFNkaHlTMiIsInN1YiI6InhtYU9EVWlBcFJSb0pNaUZCcVg3dkhTZGh5UzIiLCJpYXQiOjE2MDI4NTE2NjQsImV4cCI6MTYwMjg1NTI2NCwiZW1haWwiOiJ1c2VyMUB1c2VyLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ1c2VyMUB1c2VyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.exC2auOW9JY8rGafo7acF_WgLX9seQhvu4uueQHehPhHm0EsrxWdIlk78pmHB0LWaj2E4fgL_V5Wen4UkrZATJnE6vMGWj5Dyw_YAW_JLS6BwOO8_gV6RJKWtGc_8Ak6HLNdTdedkHAEaH81do4M9dUl8c-9WgFhORD_TGlUdIjIcPFYeT7F3i9Nhlp2USXZLwZLjDMFXUuqf154rtq-zgDWcL-KbQ_HpxPfT9nsA-Xuwc_mDyVudWpIIPwEx7nXxz1XqY30My2NcPdqyRW0sSS7sBWGaZ8uEzftKu9NgqpRBUQFWsxi-H1w5XdZCT_A7JLBOH7cW8jDM2QJ3EFs3Q")
    if auth['error'] == True:
        return jsonify(auth['message'])
    return jsonify(auth['uid'])


app.run(debug=True)