const express = require("express");
const mysql = require("mysql");

// Create connection to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learn_db",
});

//*******CROACOACH DATABASE CONNECTION*************///
// const db = mysql.createConnection({
//   host: 'locadusty-civet-8343.8nk.gcp-asia-southeast1.cockroachlabs.cloudlhost',
//   user: 'parvind_raj',
//   password: '',
//   database: 'demo_database',
//   port:26257
// });

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

const app = express();

// Create table if not exists
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     email VARCHAR(255)
//   )
// `;

// db.query(createTableQuery, (err, result) => {
//   if (err) throw err;
//   console.log('Users table created or already exists');
// });

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const insertQuery = `INSERT INTO users (name, email,password) VALUES (?, ?,?)`;
  db.query(insertQuery, [name, email, password], (err, result) => {
    if (err) throw err;
    res.send("User added successfully");
  });
});

// Get all users
app.get("/users", (req, res) => {
  const selectQuery = `SELECT * FROM users WHERE status = '1'`;
  db.query(selectQuery, (err, results) => {
    if (err) throw err;
    res.json({"status":"Success","message":"Data get successfully","data":results});
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
