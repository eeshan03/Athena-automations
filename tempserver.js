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

app.get('/machinename/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`SELECT MachineName FROM Machines WHERE DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      return res.send(JSON.stringify(results[0]));
    } else {
      return res.send({ error: true, message: `No machine found for DeviceId ${machineId}` });
    }
  });
});


// get current temperature for all machines
app.get('/temperature/current', function (req, res) {
  dbConn.query('SELECT DeviceId, Temp, Humidity, MachineName FROM Temperature WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM Temperature GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
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

// get temperature data for past 8 hours for a specific machine
app.get('/temperature/past8h/:machineId', function (req, res) {
  const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Temperature WHERE Stamp >= '${eightHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get temperature data for past month for a specific machine
app.get('/temperature/pastMonth/:machineId', function (req, res) {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Temperature WHERE Stamp >= '${oneMonthAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
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

app.get('/flow/past24h/:machineId', function (req, res) {
  const twentyFourHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  
  dbConn.query(`SELECT * FROM Flow WHERE Stamp >= '${twentyFourHoursAgo}' AND DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get flow data for past 8 hours for a specific machine
app.get('/flow/past8h/:machineId', function (req, res) {
  const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Flow WHERE Stamp >= '${eightHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get flow data for past month for a specific machine
app.get('/flow/pastMonth/:machineId', function (req, res) {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Flow WHERE Stamp >= '${oneMonthAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});



// get current rpm for all machines
app.get('/rpm/current', function (req, res) {
  dbConn.query('SELECT DeviceId, RPM FROM RPM WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM RPM GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
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

// get rpm data for past 8 hours for a specific machine
app.get('/rpm/past8h/:machineId', function (req, res) {
  const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM RPM WHERE Stamp >= '${eightHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get rpm data for past month for a specific machine
app.get('/rpm/pastMonth/:machineId', function (req, res) {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM RPM WHERE Stamp >= '${oneMonthAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});




// get current pressure for all machines
app.get('/pressure/current', function (req, res) {
  dbConn.query('SELECT DeviceId, Pressure1, Pressure2, MachineName FROM Pressure WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM Pressure GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get pressure data from last 24 hours for a specific machine
app.get('/pressure/past24h/:machineId', function (req, res) {
  const twentyFourHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Pressure WHERE Stamp >= '${twentyFourHoursAgo}' AND DeviceID = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get pressure data for past 8 hours for a specific machine
app.get('/pressure/past8h/:machineId', function (req, res) {
  const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Pressure WHERE Stamp >= '${eightHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get pressure data for past month for a specific machine
app.get('/pressure/pastMonth/:machineId', function (req, res) {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM Pressure WHERE Stamp >= '${oneMonthAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/vibration/sensor1', function (req, res) {
  dbConn.query('SELECT DeviceId , mean_x, mean_y, mean_z, mean_combined, MachineName FROM VibrationSensor1 WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM VibrationSensor1 GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/vibration/sensor2', function (req, res) {
  dbConn.query('SELECT DeviceId, mean_x1, mean_y1, mean_z1, mean_combined1, MachineName FROM VibrationSensor2 WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM VibrationSensor2 GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});
app.get('/vibration/sensor1/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor1 WHERE  DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get vibration-sensor1 data for past 8 hours for a specific machine
app.get('/vibration/sensor1/past8h/:machineId', function (req, res) {
  const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor1 WHERE Stamp >= '${eightHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get vibration-sensor1 data for past month for a specific machine
app.get('/vibration/sensor1/pastMonth/:machineId', function (req, res) {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor1 WHERE Stamp >= '${oneMonthAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// Assuming you are using Express for your server

app.get('/vibration/all/sensor1/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(
    'SELECT DeviceId, mean_x, mean_y, mean_z, mean_combined, MachineName FROM VibrationSensor1 WHERE DeviceId = ? ORDER BY Stamp DESC',
    [machineId],
    function (error, results, fields) {
      if (error) throw error;
      return res.send(JSON.stringify(results));
    }
  );
});

app.get('/vibration/all/sensor2/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(
    'SELECT DeviceId, mean_x1, mean_y1, mean_z1, mean_combined1, MachineName FROM VibrationSensor2 WHERE DeviceId = ? ORDER BY Stamp DESC',
    [machineId],
    function (error, results, fields) {
      if (error) throw error;
      return res.send(JSON.stringify(results));
    }
  );
});




app.get('/vibration/sensor2/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor2 WHERE  DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get vibration-sensor2 data for past 8 hours for a specific machine
app.get('/vibration/sensor2/past8h/:machineId', function (req, res) {
  const eightHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor2 WHERE Stamp >= '${eightHoursAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

// get temperature data for past month for a specific machine
app.get('/vibration/sensor2/pastMonth/:machineId', function (req, res) {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor2 WHERE Stamp >= '${oneMonthAgo}' AND DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});



app.get('/vibration/current', function (req, res) {
  dbConn.query('SELECT DeviceId, Mean_X, Mean_Y, Mean_Z, MachineName FROM VibrationSensor1 WHERE (DeviceId, Stamp) IN (SELECT DeviceId, MAX(Stamp) FROM VibrationSensor1 GROUP BY DeviceId) ORDER BY DeviceId', function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});

app.get('/vibration/:machineId', function (req, res) {
  const machineId = req.params.machineId;
  dbConn.query(`SELECT * FROM VibrationSensor1 WHERE DeviceId = '${machineId}'`, function (error, results, fields) {
    if (error) throw error;
    return res.send(JSON.stringify(results));
  });
});



// set port
app.listen(3004, function () {
  console.log('Node app is running on port 3004');
});

module.exports = app;