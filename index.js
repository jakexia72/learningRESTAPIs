//load app server

const express = require('express');
const app = express();
const port = process.env.PORT ||  3003;
const morgan = require('morgan');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mysqlPractice'
});

app.use(morgan('short'));

app.use(express.static('./public'));

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));

//this allows for refactoring
const router = require('./routes/user.js');
app.use(router);

app.get("/", (req, res) => {
  var users = [
    {firstName: "Tania", lastName: "Sharma"},
    {firstName: "Noma", lastName: "Abdulrehem"},
    {firstName: "Jinwhoo", lastName: "Hwan"}
  ]
  res.json(users);
  console.log("response");

});

app.listen(port, () => {
  console.log("server is up and listening on " + port);
});
