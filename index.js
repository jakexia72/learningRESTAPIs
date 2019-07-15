//load app server

const express = require('express');
const app = express();
const port = process.env.PORT ||  3003;
const morgan = require('morgan');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mysqlPractice'
});

app.use(morgan('short'));

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));


const router = express.Router();
router.get('/messages', (req,res) => {
  console.log("test router");
  res.end();
});

app.use(router);

app.post("/user_create", (req, res) => {
  console.log("attempting to create new user...");
  console.log("First name: " + req.body.create_first_name);

  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;

  const queryStr = "INSERT INTO users (first_name, last_name) VALUES (?,?)";

  connection.query(queryStr,[firstName,lastName], (err, results, fields) => {
    if (err){
      console.log("failed to insert new user: " + err);
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: ", results.insertedId);
    res.end()
  });

  res.end();
});



app.get('/users', (req, res) =>{
  connection.query("SELECT * FROM users", (err,rows,fields) => {
    res.json(rows);
  })
});


app.get('/user/:id', (req, res) => {
  console.log("Fetching user with ID: " + req.params.id);
  const userID = req.params.id;
  const queryStr = "SELECT * FROM users WHERE id = ?"
  connection.query(queryStr,[userID], (err, rows, fields) => {
    if (err){
      console.log("Failed to query for users: " + err)
      //sends http error 500 (internal server error)
      res.sendStatus(500)
      throw err
    }

    //provide custom formatting
    const users = rows.map((row) => {
      return {
        firstName: row.first_name,
        lastName: row.last_name
      }
    });

    res.json(users);
  });
  //res.end();
});

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
