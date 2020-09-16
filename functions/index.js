//importamos las librerías de firebase que necesitamos estilo node
const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://memoro-e03d4.firebaseio.com",
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//     const writeResult = await admin.firestore().collection('messages').add({original: original});
//     // Send back a message that we've succesfully written the message
//     res.json({result: `Message with ID: ${writeResult.id} added.`});
//   });

exports.addMessage = functions.https.onRequest((req, res) => {
  const payload = {
    token: req.query.currentToken,
    notification: {
      title: req.query.title,
      body: req.query.body,
    },
  };
  admin
    .messaging()
    .sendAll([payload])
    .then(function (response) {
      console.log("Función firebase add Message ", response);
      console.log(response.responses[0].error);
      res.send("It works!");
      return null;
    })
    .catch(function (error) {
      console.log(error);
      res.send("It doesnt works!");
    });
});

exports.sendMessageTo = functions.https.onRequest((req, res) => {
  const payload = {
    token: req.query.currentToken,
    notification: {
      title: "test to someone",
      body: `test to someone`,
    },
  };
  admin
    .messaging()
    .sendToDevice("vuyCQasukgSVTwLj7vZv", payload)
    .then(function (response) {
      console.log(response);
      console.log(response.responses[0].error);
      res.send("It works!");
      return null;
    })
    .catch(function (error) {
      console.log(error);
      res.send("It doesnt works!");
    });
});

exports.createUserAuth = functions.https.onRequest((req, res) => {
  console.log("createUserAuth ==> ", req.body);
  const data = JSON.parse(req.body)
  admin
    .auth()
    .createUser({email:data.user, password:data.pass, emailVerified:false, disabled:false})
    //.createUserWithEmailAndPassword(req.body.user, req.body.pass)
    .then((response) => {
      console.log("createUserAuth response ==> ", response);
      res.send("User created!");
      return null;
    })
    .catch((error) => {
      console.log("Error creando usuario ",error);
      throw new functions.https.HttpsError("internal", error.message);
    });
});
