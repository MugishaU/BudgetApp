DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    uid VARCHAR(28) PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL
);

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_uid VARCHAR(28) references users(uid) NOT NULL,
    budget FLOAT 
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    user_uid VARCHAR(28) references users(uid) NOT NULL,
    budget FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    cost FLOAT NOT NULL,
    day INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL
);

INSERT INTO users (uid, username)
VALUES
('xmaODUiApRRoJMiFBqX7vHSdhyS2','user1'),
('eUaufeImqfcuVnbDKz6gDFAnjfj1','user2'),
('Ort6mJQIQiUushGJO4sKY9WNyGX2','user3')
;

INSERT INTO accounts (user_uid, budget)
VALUES
('xmaODUiApRRoJMiFBqX7vHSdhyS2',1000),
('eUaufeImqfcuVnbDKz6gDFAnjfj1',1200),
('Ort6mJQIQiUushGJO4sKY9WNyGX2',null)
;

INSERT INTO history (user_uid, budget, description, type, cost, day, month, year)
VALUES
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'McDonalds', 'Food',6.99,10,10,2020),
('eUaufeImqfcuVnbDKz6gDFAnjfj1', 1200, 'Spotify', 'Subscriptions',9.99,12,10,2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'Petrol', 'Travel',15,10,10,2020)
;
