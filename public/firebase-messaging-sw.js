// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDO1lla7rlMq5zVMe--XnCH_OUr_MzRng4",
    authDomain: "memoro-e03d4.firebaseapp.com",
    databaseURL: "https://memoro-e03d4.firebaseio.com",
    projectId: "memoro-e03d4",
    storageBucket: "memoro-e03d4.appspot.com",
    messagingSenderId: "824261837219",
    appId: "1:824261837219:web:784c12a3b37a3fdecd5a16",
    measurementId: "G-S10E2L6T3K"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();