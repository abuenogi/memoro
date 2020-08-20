import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from "./Footer";
import Info from "./Info";
import { Layout } from "./Layout";
import NavigationBar from "../container/CNT_NavigationBar";
import Jumbotron from "./Jumbotron";
import { HomeLinks } from "../pages/HomeLinks";
import firebase from "firebase";
import { UserContext } from '../context/UserContext';
import { distance } from '../fuctions/calculaDistancias';
import { confirmAlert } from 'react-confirm-alert';
import { getDataElement } from '../fuctions/CRUD';

const messaging = firebase.messaging();

messaging.onMessage((payload) => {

  console.log('Message received. notification ', payload.notification);
  
  confirmAlert({
    title: payload.notification.title,
    message: payload.notification.body,
    childrenElement: () => <div><li>Custom 1</li><li>Custom 2</li></div>, 
    buttons: [
      {
        label: 'Vale',

      }
    ]
  });

});

// Add the public key generated from the console here.
messaging.usePublicVapidKey(
  "BNh822cvMkTVa_8vHSXfJYHAwEPfGRp9qqxrmD2T22CV8uxBhQbg48SZZoPtooftnOJDFA0isFwgmO30-RrlTB8"
);
const Home = () => {

  const { user_auth } = useContext(UserContext);
  const [memorenyos, setMemorenyos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user_auth.rol === 'cuidador') {
        const data = await getDataElement('usuarios', 'cuidador', user_auth.id);
        console.log("set memore data : ",data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setMemorenyos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
    };
    fetchData();
  }, [user_auth]);

  useEffect(()=> {
    let listaMemorenyos = [];
    memorenyos.map((memorenyo) => {
      var distanciaKM = distance(memorenyo.casa.Pc, memorenyo.casa.Vc, memorenyo.ubicacion.Pc, memorenyo.ubicacion.Vc);
      console.log("distanciaKM  ",distanciaKM);
      
      if ((distanciaKM) > memorenyo.radioSeguridad) {
        listaMemorenyos.push('\r\n' + memorenyo.nombre +' a una distancia de '+distanciaKM + ' metros ');
      }

    });
    if(listaMemorenyos.length>0)
      enviarMensaje(listaMemorenyos);
  }, [memorenyos]);


  const enviarMensaje = (listaMemorenyos) =>  {
     //Solicita permiso para recibir notificaciones
     Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        
        console.log("Notification permission granted.");
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging
          .getToken()
          .then((currentToken) => {
            if (currentToken) {
              let titulo = 'Alerta memoreñ@s';
              let cuerpo = 'El/los memoreñ@s ' + listaMemorenyos.join() + ' está fuera se su perímetro de seguridad';
              sendTokenToServer(currentToken, titulo, cuerpo);
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

  const sendTokenToServer = (currentToken, titulo, cuerpo) => {
    const url = `https://us-central1-memoro-e03d4.cloudfunctions.net/addMessage?currentToken=${currentToken}&title=${titulo}&body=${cuerpo}`
    fetch(url);
  }


  return (
    <React.Fragment>
      <Layout>
        <NavigationBar />
        <Jumbotron />
        <HomeLinks />
        <Footer />
        <Info />
      </Layout>
    </React.Fragment>
  );
}

export default withRouter(Home);