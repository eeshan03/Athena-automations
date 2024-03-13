require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const PASS = process.env.PASS;
const app = express();
const port = 3007;
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: '192.168.1.26',
  user: 'Soaham',
  password: '1234',
  port: 3306,
  database: 'athena'
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "freeplay.cha@gmail.com",
    pass:  PASS,
  },
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});
// Endpoint to get LeaveOperatorData for a specific user
app.get('/api/LeaveOperatorData', (req, res) => {
  const { username } = req.query; // Retrieve the username from query parameters
  console.log('Received request for user:', username); // Add this log

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  // SQL query to select leave data for the given username
  const query = 'SELECT id, user, name, date_from, date_to, reason, leave_duration, backup_person, is_leave_sanctioned FROM leave_data WHERE user = ?';

  // Execute the query
  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      // Return the result as a JSON response
      res.json(results);
    }
  });
});

app.post('/api/leave_data', (req, res) => {
  const data = req.body;
  console.log('Received leave data:', data);

  // Insert the data into the 'leave_data' table
  const query = 'INSERT INTO leave_data SET ?';

  // Execute the query
  connection.query(query, data, (error, request) => {
    if (error) {
      console.error('Error saving leave data to database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Leave data saved successfully' });
    }
  });
});

// Define the API endpoint to fetch data from the 'manager_data' table
app.get('/api/displaytable', (req, res) => {
  // SQL query to select all rows from the 'manager_data' table
  const query = 'SELECT name, machine_no, opn_no, time_taken, parts_produced, machine FROM manager_data';

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

// Define the API endpoint to insert data into the 'lower_table' table
app.post('/api/lower_table', (req, res) => {
  const data = req.body;

  // Insert the data into the 'lower_table' table
  const query = 'INSERT INTO lower_table SET ?';

  // Execute the query
  connection.query(query, data, (error, results) => {
    if (error) {
      console.error('Error saving data to database:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
});


app.get('/api/maintenance-users', async (req, res) => {
  try {
    const maintenanceUsers = await getMaintenanceUsers(); // Implement this query
    res.json(maintenanceUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to get maintenance users
const getMaintenanceUsers = async () => {
  return new Promise((resolve, reject) => {
    // Use the connection to execute a query to fetch usernames where role is 'Maintenance'
    const query = 'SELECT username FROM users WHERE role = ?';
    connection.query(query, ['maintenance'], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.map((row) => ({ username: row.username, id: row.id })));
      }
    });
  });
};


app.post('/send-maintenance-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const mailOptions = {
      from: 'freeplay.cha@gmail.com',
      to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending maintenance email:', error);
        return res.status(500).send('Error sending maintenance email: ' + error.message);
      }
      res.status(200).send('Maintenance email sent: ' + info.response);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
