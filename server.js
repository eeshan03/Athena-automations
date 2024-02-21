require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require('nodemailer');
const pass = process.env.PASS;

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "192.168.1.26",
  user: 'Dhruv',
  password: "1234",
  port: 3306,
  database: "athena",
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'freeplay.cha@gmail.com',
    pass: pass,
  },
});


app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'freeplay.cha@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email: ' + error.message);
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});


app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        const user = result[0];
        res.send({ user });
      } else {
        res.send({ message: "Invalid Credentials" });
      }
    }
  );
});

app.listen(3008, () => {
  console.log("running server on port 3008");
});
module.exports = app;