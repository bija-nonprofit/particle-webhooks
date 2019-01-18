const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

// Set up firebase for database access.
const admin = require("firebase-admin");
const serviceAccount = require("./particle-webhooks-firebase-adminsdk-gt9ix-7fedf47ff6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://particle-webhooks.firebaseio.com"
});

var db = admin.firestore();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1><marquee direction=right>Hello from Express path / on Now 2.0!</marquee></h1>')
    res.end()
})

app.get('/about', (req, res) => {
    res.send('<h1><marquee direction=left>Hello from Express path /about on Now 2.0!</marquee></h1>')
    res.end()
})

app.post('/webhook', (req,res) => {
    console.log("Webhook posted data: ", req.body)
    const createdAt = new Date();
    const docRef = db.collection('sensor-data').doc(createdAt.toISOString());
    const firebaseDoc = docRef.set(req.body);
    res.json({
        status: "ok",
        createdAt,
        firebaseDoc
    });
    res.end();
})

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
})
