import firebase from 'firebase';


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

// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const authSession = firebase.auth;
export const db = firebase.firestore();
export const geo = firebase.firestore;
export const storage = firebase.storage();

// Initialize Performance Monitoring and get a reference to the service
var perf = firebase.performance();
/*
db.settings({
    timestampsInSnapshots: true,
});
*/
export default firebase;


