const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package

const app = express();

// Set up MySQL connection
const connection = mysql.createConnection({
  host: '192.168.1.26',
  user: 'Soaham',
  password: '1234',
  port: 3306,
  database: 'athena'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Use bodyParser middleware to parse request body
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Update frequency endpoint
app.put("/api/update-frequencies", (req, res) => {
  const { machineID, column, value } = req.body;
  // Construct SQL query
  const sql = `UPDATE Frequency SET ${column} = ? WHERE Machine_ID = ?`;
  const values = [value, machineID];

  // Execute SQL query
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Value updated successfully");
    
    res.send(result);
  });
});


const port = 3006;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
