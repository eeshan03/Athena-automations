const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3005;
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '192.168.1.26',
  user: 'Dhruv',
  password: '1234',
  port: 3306,
  database: 'athena'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

// Define the API endpoint to fetch data from the 'dpr' table
app.get('/api/table', (req, res) => {
  // SQL query to select all rows from the 'dpr' table
  const query = 'SELECT name, part_no, opn_no, machine FROM dpr';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      // Return the result as a JSON response
      res.json(results);
    }
  });
});

// Define the API endpoint to insert data into the 'manager_data' table
app.post('/api/table', (req, res) => {
  const data = req.body;

  // Prepare the data for insertion
  const values = data.map((row) => [row.name, row.part_no, row.opn_no, row.machine, row.dateTime, row.parts_produced, row.time_taken]);

  // Insert the data into the 'manager_data' table
  const query = 'INSERT INTO manager_data (name, part_no, opn_no, machine, dateTime, parts_produced, time_taken) VALUES ?';

  // Execute the query
  connection.query(query, [values], (error, results) => {
    if (error) {
      console.error('Error saving data to database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
});


// Leave Data
app.get('/api/LeaveData', (req, res) => {
  // SQL query to select all rows from the 'leave_data' table
  const query = 'SELECT id, user, name, date_from, date_to, reason, leave_duration, backup_person, is_leave_sanctioned FROM leave_data WHERE is_leave_sanctioned=0';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      // Return the result as a JSON response
      res.json(results);
    }
  });
});

//Update status
app.post('/api/updateStatus', (req, res) => {
  const { id } = req.body;

  // SQL query to update the 'is_leave_sanctioned' status for a specific record
  const updateQuery = 'UPDATE leave_data SET is_leave_sanctioned = 1 WHERE id = ?';

  // Execute the update query
  connection.query(updateQuery, [id], (updateError) => {
    if (updateError) {
      console.error('Error updating leave sanction status:', updateError);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Status updated successfully' });
    }
  });
});

// Update history
app.get('/api/update-history', (req, res) => {
  // SQL query to select rows with is_leave_sanctioned equal to 1 from the 'leave_data' table
  const query = 'SELECT id, user, name, date_from, date_to, reason, leave_duration, backup_person, is_leave_sanctioned FROM leave_data WHERE is_leave_sanctioned = 1';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching update history data from database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      // Return the result as a JSON response
      res.json(results);
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
