import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  Footer from "./Footer";
import  Info from "./Info";
import { Layout} from "./Layout";
import  NavigationBar from "../container/CNT_NavigationBar";
import  Jumbotron from "./Jumbotron";
import { HomeLinks } from "../pages/HomeLinks";
import firebase from "firebase";

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });
// Add the public key generated from the console here.
messaging.usePublicVapidKey(
  "BNh822cvMkTVa_8vHSXfJYHAwEPfGRp9qqxrmD2T22CV8uxBhQbg48SZZoPtooftnOJDFA0isFwgmO30-RrlTB8"
);
const Home = ()  =>{
    const sendMessage = () => {
        //Solicita permiso para recibir notificaciones
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            debugger
            console.log("Notification permission granted.");
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            messaging
              .getToken()
              .then((currentToken) => {
                if (currentToken) {
                  sendTokenToServer(currentToken);
                  // updateUIForPushEnabled(currentToken);
                } else {
                  // Show permission request.
                  console.log("No Instance ID token available. Request permission to generate one.");
                  // Show permission UI.
                  // updateUIForPushPermissionRequired();
                  // setTokenSentToServer(false);
                }
              })
              .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
                // showToken("Error retrieving Instance ID token. ", err);
                // setTokenSentToServer(false);
              });
          } else {
            console.log("Unable to get permission to notify.");
          }
        });
      }
    
      const sendTokenToServer = (currentToken) => {
        const url = `http://localhost:5001/memoro-e03d4/us-central1/addMessage?currentToken=${currentToken}`
        fetch(url);
      }

        return (
            <React.Fragment> 
                <Layout>
                    <NavigationBar/> 
                    <Jumbotron/> 
                    <HomeLinks/>
                <Footer/>
                <Info/>
                </Layout>
                <div onClick={() => sendMessage()}> ENVIAR MENSAJE </div>
            </React.Fragment>
        );
}

export default withRouter(Home);