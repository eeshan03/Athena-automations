const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

// default route
app.get('/', function (req, res) {
  return res.send({ error: true, message: 'hello' })
});

// connection configurations
const dbConn = mysql.createConnection({
  host: '192.168.1.26',
  user: 'Dhruv',
  password: '1234',
  port: 3306,
  database: 'athena'
});




// connect to database
dbConn.connect();


app.get('/oee', function (req, res) {
  dbConn.query(
    'SELECT t.Machine_ID, t.OEE, t.Parts_produced, t.Parts_rejected, t.Target, t.Availability, t.Performance, t.Quality FROM oee AS t INNER JOIN (SELECT Machine_ID, MAX(Stamp) AS MaxStamp FROM oee GROUP BY Machine_ID) AS latest ON t.Machine_ID = latest.Machine_ID AND t.Stamp = latest.MaxStamp',
    function (error, results, fields) {
      if (error) throw error;
      return res.send(JSON.stringify(results));
    }
  );
});

app.get('/Rework', function(req,res){
  dbConn.query(
    'SELECT * from Rework',
    function (error, result, fields){
      if(error) throw error;
      console.log(error);
      return res.send(JSON.stringify(result));
    }
  )
})

app.get('/checkuser/:username', function (req, res) {
  const username = req.params.username;

  dbConn.query(
    'SELECT COUNT(*) AS count FROM users WHERE username = ?',
    [username],
    function (error, results, fields) {
      if (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const count = results[0].count;
        const exists = count > 0;
        res.status(200).json({ exists: exists });
      }
    }
  );
});

app.post('/createuser', (req, res) => {
  const { username, password, role } = req.body;

  // Insert the new user into the database
  const createUserSql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  const checkUserSql = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';

  // Check if the username already exists
  dbConn.query(checkUserSql, [username], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking username:', checkError);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = checkResults[0].count;
      if (count > 0) {
        res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      } else {
        // If the username doesn't exist, proceed to create the user
        dbConn.query(createUserSql, [username, password, role], (createError, createResult) => {
          if (createError) {
            console.error('Error creating user:', createError);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log('User created successfully');
            res.status(201).json({ message: 'User created successfully' });
          }
        });
      }
    }
  });
});



app.get('/Rejection', function(req,res){
  dbConn.query(
    'SELECT * FROM Rejection',
    function(error, result, fields){
      if(error) throw error;
      return res.send(JSON.stringify(result));
    }
  )
})

app.get('/DataAnalysis', function(req, res){
  dbConn.query(
    'SELECT * FROM LongTermMoving_Analysis',
    function(error, result, fields) {
      if(error) throw error;
      return res.send(JSON.stringify(result));
    }
  )
})
// set port
app.listen(3010, function () {
console.log('Node app is running on port 3010');
})

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9