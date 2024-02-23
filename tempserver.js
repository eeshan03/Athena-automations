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
  user: 'Soaham',
  password: '1234',
  port: 3306,
  database: 'athena'
});

// connect to database
dbConn.connect();

app.get('/device/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`Select * from Machines where DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});
app.get('/machineid', function (req, res) {
  dbConn.query('SELECT DeviceId FROM Machines', function (error, results, fields) {
    if (error) throw error;
    return res.json(results);
  });
});



app.get('/temperature/past24h/:machineId', function (req, res) {
  const twentyFourHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Temperature WHERE Stamp >= '${twentyFourHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get current temperature for all machines
app.get('/temperature/current', function (req, res) {
  dbConn.query('SELECT DeviceId, Temp, Humidity, MachineName FROM Temperature WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM Temperature GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/flow/past24h/:machineId', function (req, res) {
  const twentyFourHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  
  dbConn.query(`SELECT * FROM Flow WHERE Stamp >= '${twentyFourHoursAgo}' AND DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get current temperature for all machines
app.get('/flow/current', function (req, res) {
  dbConn.query('SELECT DeviceId, Flow FROM Flow WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM Flow GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/rpm/past24h/:machineId', function (req, res) {
  const twentyFourHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM RPM WHERE Stamp >= '${twentyFourHoursAgo}' AND DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get current temperature for all machines
app.get('/rpm/current', function (req, res) {
  dbConn.query('SELECT DeviceId, RPM FROM RPM WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM RPM GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});


// get temperature data from last 24 hours for a specific machine
app.get('/pressure/past24h/:machineId', function (req, res) {
  const twentyFourHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Pressure WHERE Stamp >= '${twentyFourHoursAgo}' AND DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get current temperature for all machines
app.get('/pressure/current', function (req, res) {
  dbConn.query('SELECT DeviceId, Pressure1, Pressure2 FROM Pressure WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM Pressure GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});




app.get('/vibration/sensor1', function (req, res) {
  dbConn.query('SELECT DeviceID , mean_x,mean_y,mean_z FROM LongTermVibrationSensor1 WHERE (DeviceID, currenttime) IN (SELECT DeviceID, MAX(currenttime) FROM LongTermVibrationSensor1 GROUP BY DeviceID) ORDER BY DeviceID', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/vibration/sensor2', function (req, res) {
  dbConn.query('SELECT DeviceID , mean_x1,mean_y1,mean_z1 FROM LongTermVibrationSensor2 WHERE (DeviceID, currenttime) IN (SELECT DeviceID, MAX(currenttime) FROM LongTermVibrationSensor2 GROUP BY DeviceID) ORDER BY DeviceID', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});


app.get('/vibration/sensor1/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM LongTermVibrationSensor1 WHERE  DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/vibration/sensor2/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM LongTermVibrationSensor2 WHERE  DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});



// set port
app.listen(3004, function () {
  console.log('Node app is running on port 3004');
});

module.exports = app;

