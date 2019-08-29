const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('firebase');

const port = process.env.PORT || 3000
const app = express();



/**
* Update your Firebase Project
* Credentials and Firebase Database
* URL
*/
firebase.initializeApp({
  serviceAccount: "./particle-webhooks-firebase-adminsdk-gt9ix-7fedf47ff6.json",
  databaseURL: "https://particle-webhooks.firebaseio.com"
});  //by adding your credentials, you get authorized to read and write from the database


/**
* Loading Firebase Database and refering 
* to user_data Object from the Database
*/
var db = firebase.database();

app.use(bodyParser.json())

app.post('/webhook', (req,res) => {
  db.ref('particle-webhooks/payload').set({
    data: req.body
  });

  res.json({ status: "ok"})
});

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`)
});
