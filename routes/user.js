//contains user-related routes

const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mysqlPractice'
});

const connection = pool;

router.get('/user/:id', (req, res) => {
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

router.get('/messages', (req,res) => {
  console.log("test 1111");
  res.end();
});

router.get('/users', (req, res) =>{
  connection.query("SELECT * FROM users", (err,rows,fields) => {
    res.json(rows);
  })
});


router.post("/user_create", (req, res) => {
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

module.exports = router
