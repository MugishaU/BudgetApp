from os import environ
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session
from flask_sqlalchemy import sqlalchemy, SQLAlchemy
from helpers import check_token, format_resp
from datetime import datetime as dt

load_dotenv()

app = Flask(__name__)

CORS(app)
Session(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = environ["DATABASE_URL"]
db = SQLAlchemy(app)


@app.route('/')
def running():
    return jsonify("Flask Server Running")


@app.route('/register', methods=["POST"])
def register():

    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    details = request.get_json()
    if 'username' not in details or type(details['username']) != str:
        return jsonify({'error': 'Key \'username\' Not Present in Request Body or of Invalid Type (str expected)'}), 400

    uid = check['uid']

    try:
        result_proxy = db.session.execute('INSERT INTO users (uid, username) VALUES (:1, :2) RETURNING username', {
                                          '1': uid, '2': details['username']})
        response = format_resp(result_proxy)
        db.session.commit()
    except sqlalchemy.exc.SQLAlchemyError:
        return jsonify({'error': 'Error Writing to Database'}), 500
    return jsonify(f"Welcome, {response[0]['username']}")


@app.route('/user', methods=["GET"])
def user():

    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    uid = check['uid']

    result_proxy = db.session.execute(
        'SELECT username, budget FROM users WHERE uid = :1', {'1': uid})
    response = format_resp(result_proxy)

    if len(response) == 0:
        return jsonify({'error': 'User Not Found'}), 404
    return jsonify(response[0])


@app.route('/history', methods=['GET'])
def history():

    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    uid = check['uid']

    try:
        month = int(request.args.get('month'))
        year = int(request.args.get('year'))

        if float(request.args.get('month')).is_integer() == False or float(request.args.get('year')).is_integer() == False:
            raise ValueError

        if month not in range(1, 13) or year not in range(1960, dt.now().year+1) or (year == dt.now().year and month not in range(1, dt.now().month+1)):
            return jsonify({'error': 'Key(s) \'month\' or \'year\' Outside of Acceptable Range'}), 400

    except (TypeError, ValueError):
        return jsonify({'error': 'Key(s) \'month\' or \'year\' Not Present in Query String or of Invalid Type (int expected)'}), 400

    result_proxy = db.session.execute(
        'SELECT id, budget, description, category, cost, day FROM history WHERE user_uid = :1 AND month = :2 AND year = :3', {'1': uid, '2': month, '3': year})
    response = format_resp(result_proxy)

    if len(response) == 0:
        return jsonify({'error': f"No Entries Corresponding to Time Period {month}/{year}"}), 500
    return jsonify(response)


@app.route('/budget', methods=['PUT'])
def budget():

    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    details = request.get_json()

    try:
        budget = float(details['budget'])

        if budget <= 0:
            raise ValueError

    except (TypeError, ValueError, KeyError):
        return jsonify({'error': 'Key \'budget\' Not Present in Request Body or of Invalid Type (float expected)'}), 400

    uid = check['uid']

    try:
        result_proxy = db.session.execute(
            'UPDATE users SET budget = :1 WHERE uid = :2 RETURNING budget', {'1': budget, '2': uid})
        db.session.execute(
            'UPDATE history SET budget = :1 WHERE user_uid = :2 AND month = :3 AND year = :4', {'1': budget, '2': uid, '3': dt.now().month, '4': dt.now().year})
        response = format_resp(result_proxy)
        db.session.commit()
    except sqlalchemy.exc.SQLAlchemyError:
        return jsonify({'error': 'Error Writing to Database'}), 500

    return jsonify(f"Budget for {dt.now().month}/{dt.now().year} updated to £{format(budget,'.2f')}")


@app.route('/spend', methods=['POST'])
def spend():

    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    details = request.get_json()

    try:
        budget = float(details['budget'])
        description = details['description']
        category = details['category']
        cost = float(details['cost'])
        day = int(details['day'])
        month = int(details['month'])
        year = int(details['year'])

        if budget <= 0 or cost <= 0:
            raise ValueError

        if float(details['day']).is_integer() == False or float(details['month']).is_integer() == False or float(details['year']).is_integer() == False:
            raise ValueError

        if day not in range(1, 32) or month not in range(1, 13) or year > dt.now().year:
            raise ValueError
        elif year == dt.now().year and month not in range(1, dt.now().month + 1):
            raise ValueError

        if type(description) != str or type(category) != str:
            raise TypeError
    except (TypeError, ValueError, KeyError):
        return jsonify({'error': 'Requried Key(s) Missing in Request Body or of Invalid Type'}), 400

    uid = check['uid']

    try:
        result_proxy = db.session.execute(
            'INSERT INTO history (user_uid, budget, description, category, cost, day, month, year) VALUES (:1, :2, :3, :4, :5, :6, :7, :8) RETURNING description', {'1': uid, '2': budget, '3': description, '4': category, '5': cost, '6': day, '7': month, '8': year})
        response = format_resp(result_proxy)
        db.session.commit()
    except sqlalchemy.exc.SQLAlchemyError:
        return jsonify({'error': 'Error Writing to Database'}), 500

    return jsonify(f"Expenditure '{response[0]['description']}' added to history")


@app.route('/breakdown', methods=['GET'])
def breakdown():
    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    uid = check['uid']

    try:
        month = int(request.args.get('month'))
        year = int(request.args.get('year'))

        if float(request.args.get('month')).is_integer() == False or float(request.args.get('year')).is_integer() == False:
            raise ValueError

        if month not in range(1, 13) or year not in range(1960, dt.now().year+1) or (year == dt.now().year and month not in range(1, dt.now().month+1)):
            return jsonify({'error': 'Key(s) \'month\' or \'year\' Outside of Acceptable Range'}), 400

    except (TypeError, ValueError):
        return jsonify({'error': 'Key(s) \'month\' or \'year\' Not Present in Query String or of Invalid Type (int expected)'}), 400

    result_proxy = db.session.execute(
        'SELECT id, budget, description, category, cost, day FROM history WHERE user_uid = :1 AND month = :2 AND year = :3', {'1': uid, '2': month, '3': year})
    response = format_resp(result_proxy)

    if len(response) == 0:
        return jsonify({'error': f"No Entries Corresponding to Time Period {month}/{year}"}), 500

    grouped_history = {}

    for entry in response:
        if entry['category'] in grouped_history:
            grouped_history[entry['category']] += entry['cost']
        else:
            grouped_history[entry['category']] = entry['cost']

    return jsonify(grouped_history)


@app.route('/reset', methods=['DELETE'])
def reset():
    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    uid = check['uid']

    try:
        db.session.execute(
            'DELETE FROM history WHERE user_uid = :1', {'1': uid})
        result_proxy = db.session.execute(
            'UPDATE users SET budget = null WHERE uid = :1 RETURNING username', {
                '1': uid}
        )
        db.session.commit()
        response = format_resp(result_proxy)
    except sqlalchemy.exc.SQLAlchemyError:
        return jsonify({'error': 'Error Writing to Database'}), 500
    return jsonify(f"{response[0]['username']} Account Succesfully Reset")


@app.route('/delete', methods=['DELETE'])
def delete():
    check = check_token()
    if check['error'] == True:
        return jsonify(check['message']), check['status']

    uid = check['uid']

    try:
        db.session.execute(
            'DELETE FROM history WHERE user_uid = :1', {'1': uid})
        result_proxy = db.session.execute(
            'DELETE FROM users WHERE uid = :1 RETURNING username', {
                '1': uid}
        )
        db.session.commit()
        response = format_resp(result_proxy)
        username = response[0]['username']
    except (sqlalchemy.exc.SQLAlchemyError, IndexError):
        return jsonify({'error': 'Error Writing to Database'}), 500
    return jsonify(f"{username} Permanently Deleted")


if __name__ == "__main__":
    app.run(debug=True)
