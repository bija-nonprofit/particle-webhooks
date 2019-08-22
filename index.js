const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

// Set up firebase for database access.
const admin = require("firebase-admin")
const serviceAccount = require("./particle-webhooks-firebase-adminsdk-gt9ix-7fedf47ff6.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://particle-webhooks.firebaseio.com"
})

var db = admin.firestore()

app.use(bodyParser.json())

app.post('/webhook', (req,res) => {
    console.log("Webhook posted data: ", req.body);
    const createdAt = new Date();
    const docRef = db.collection('sensor-data').doc(createdAt.toISOString());
    //const firebaseDoc = docRef.set(req.body);
    const firebaseDoc = docRef.set({ temperature: 70 });
    res.json({
        status: "ok",
        createdAt,
        firebaseDoc
    });
    res.end()
})

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
})
