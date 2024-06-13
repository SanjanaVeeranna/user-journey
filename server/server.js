const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Database connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Create tables if they don't exist
db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blue_triangles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );

  CREATE TABLE IF NOT EXISTS leaderboard (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT NOT NULL,
    time_window VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );
`);

// API endpoints
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.execute(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password])
    .then(() => res.send('User created successfully'))
    .catch((err) => res.status(500).send(err));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.execute(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password])
    .then((result) => {
      if (result.length > 0) {
        res.send('Login successful');
      } else {
        res.status(401).send('Invalid username or password');
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.post('/blue-triangle-click', (req, res) => {
  const { user_id } = req.body;
  db.execute(`INSERT INTO blue_triangles (user_id, timestamp) VALUES (?, NOW())`, [user_id])
    .then(() => res.send('Blue triangle click recorded'))
    .catch((err) => res.status(500).send(err));
});

app.get('/leaderboard', (req, res) => {
  const { time_window } = req.query;
  db.execute(`
    SELECT u.username, SUM(bt.timestamp) AS score
    FROM users u
    JOIN blue_triangles bt ON u.user_id = bt.user_id
    WHERE bt.timestamp >= NOW() - INTERVAL ? MINUTE
    GROUP BY u.username
    ORDER BY score DESC
  `, [time_window])
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

app.listen(3000, () => console.log('Server listening on port 3000'));