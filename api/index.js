const firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "./particle-webhooks-firebase-adminsdk-gt9ix-7fedf47ff6.json",
  databaseURL: "https://particle-webhooks.firebaseio.com"
});  //by adding your credentials, you get authorized to read and write from the database

var db = firebase.database();

module.exports = async (req, res) => {
  const { body } = req
  const savedData = await db.ref('particle-webhooks/alldata').set({
    data: body
  });
  res.end(`Saved to firebase!`)
}