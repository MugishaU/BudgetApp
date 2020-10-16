# from functools import wraps
import firebase_admin
from firebase_admin import auth, credentials
from os import environ
from flask import request
from dotenv import load_dotenv
load_dotenv()

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

def format_resp(resultproxy):
    d, a = {}, []
    for rowproxy in resultproxy:
        for column, value in rowproxy.items():
            d = {**d, **{column: value}}
        a.append(d)
    return a

def check_token(token):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
    except (ValueError,firebase_admin.exceptions.FirebaseError):
        return ({'error':True,'message':'Invalid Token or Firebase Error'})
    return ({'error':False, 'uid':uid})