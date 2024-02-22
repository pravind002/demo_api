const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learn_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

const app = express();

// CORS configuration for all origins
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.query(insertQuery, [name, email, password], (err, result) => {
    if (err) throw err;
    res.send("User added successfully");
  });
});

app.get("/users", (req, res) => {
  const selectQuery = `SELECT * FROM users WHERE status = '1'`;
  db.query(selectQuery, (err, results) => {
    if (err) throw err;
    res.json({ "status": "Success", "message": "Data get successfully", "data": results });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
