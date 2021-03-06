DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    uid VARCHAR(28) PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL,
    budget FLOAT 
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    user_uid VARCHAR(28) references users(uid) NOT NULL,
    budget FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    cost FLOAT NOT NULL,
    day INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL
);

INSERT INTO users (uid, username, budget)
VALUES
('xmaODUiApRRoJMiFBqX7vHSdhyS2','user1', 1000),
('eUaufeImqfcuVnbDKz6gDFAnjfj1','user2', 1200)
;

INSERT INTO history (user_uid, budget, description, category, cost, day, month, year)
VALUES
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'McDonalds', 'Food', 6.50, 10, 10, 2020),
('eUaufeImqfcuVnbDKz6gDFAnjfj1', 1200, 'Spotify', 'Subscriptions', 9.99, 12, 10, 2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'Petrol', 'Travel',15,15,10,2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1500, 'Television', 'Misc', 300, 5, 9, 2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'Television', 'Misc', 300, 5, 10, 2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'Netflix', 'Subscriptions', 300, 5, 10, 2020),
('eUaufeImqfcuVnbDKz6gDFAnjfj1', 1000, 'Tesco', 'Groceries', 23.46, 13, 9, 2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'KFC', 'Food',15,22,10,2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'Pizza Express', 'Food',48.56,23,10,2020),
('xmaODUiApRRoJMiFBqX7vHSdhyS2', 1000, 'EDF Energy', 'Bills',100,24,10,2020)
;
