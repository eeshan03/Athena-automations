const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: '192.168.1.101',
  user: 'user',
  password: '1234',
  port: 3306,
  database: 'athena'
});
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'sid$',
//   database: 'athena'
// });
app.post("/register", (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  db.query("INSERT INTO users(username,password) values (?,?)",
  [username,password],
  (err,result) => {
    console.log(err);
  }
  )
})


app.post("/login", (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE username = ? AND password = ?",
  [username,password],
  (err,result) => {
    if (err) {
      res.send({err:err});
    }

    if(result.length>0) {
      res.send(result);
    }
    else{
      res.send({message: "Invalid Credentials" });
    }
  }
  );
});



app.listen(3008,() => {
  console.log("running server on port 3008")
});
module.exports = app;