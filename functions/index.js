//importamos las librerías de firebase que necesitamos estilo node
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const  firebaseConfig =  {
    apiKey: "AIzaSyDO1lla7rlMq5zVMe--XnCH_OUr_MzRng4",
    authDomain: "memoro-e03d4.firebaseapp.com",
    databaseURL: "https://memoro-e03d4.firebaseio.com",
    projectId: "memoro-e03d4",
    storageBucket: "memoro-e03d4.appspot.com",
    messagingSenderId: "824261837219",
    appId: "1:824261837219:web:784c12a3b37a3fdecd5a16",
    measurementId: "G-S10E2L6T3K"
};


admin.initializeApp(firebaseConfig);

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });


exports.msg = functions.https.onRequest((request, response) => {
    const payload = {     
        notification: {     
                title: 'You have been invited to a trip.',    
                 body: 'Tap here to check it out!'     
             }     
        };   
    
    const msgAsync = async () => {
        var rdo = await admin.messaging().sendToDevice('SYMpni36HafmWoq0HR29ZMAPSul1', payload);
        //var rdo = admin.messaging().sendToDevice('SYMpni36HafmWoq0HR29ZMAPSul1', payload);    
        response.send("It works!: "+ rdo);
    }
    //SYMpni36HafmWoq0HR29ZMAPSul1 (UID de lolo)
    //xhBYIheWEad0FGKfmao38J2dd6j1  (UID de isabel católica)
    //tJx17ygCZuN1bbj2xjiHe0QhUZg1 (UID de fernando católica)
    //msgAsync();

    var rdo =  admin.messaging().sendToDevice('SYMpni36HafmWoq0HR29ZMAPSul1', payload);
        //var rdo = admin.messaging().sendToDevice('SYMpni36HafmWoq0HR29ZMAPSul1', payload);    
    response.send("It works!: "+ rdo);
});

