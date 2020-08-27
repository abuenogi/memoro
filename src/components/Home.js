import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import firebase from "firebase";

import Footer from "./Footer";
import Info from "../container/CNT_Info";
import Layout from "./Layout";
import NavigationBar from "../container/CNT_NavigationBar";
import Jumbotron from "../container/CNT_Jumbotron";
import  HomeLinks  from "./HomeLinks";

import { UserContext } from '../context/UserContext';
import { distance } from '../functions/calculaDistancias';

import { getDataElement } from '../functions/CRUD';


const messaging = firebase.messaging();

let memo_lista = "<ul>";

messaging.onMessage((payload) => {

  console.log('Message received. notification ', payload.notification);

  confirmAlert({
    title: payload.notification.title,
    message: '',
    childrenElement: () => <div id='tabla_memo'></div>,
    buttons: [
      {
        label: 'Vale',

      }
    ]
  });

  document.getElementById('tabla_memo').innerHTML = memo_lista;

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
        console.log("set memore data : ", data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setMemorenyos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
    };
    fetchData();
  }, [user_auth]);

  useEffect(() => {
    let listaMemorenyos = [];
    let distanciaKM = ''

    if (memorenyos[0]) {
      memo_lista += `<ul><h5>Los memoreñ@s :</h5></br>`;
      memorenyos.map((memorenyo) => {

        distanciaKM = distance(memorenyo.casa.Pc, memorenyo.casa.Vc, memorenyo.ubicacion.Pc, memorenyo.ubicacion.Vc);
        console.log("distanciaKM  ", distanciaKM);


        if ((distanciaKM) > memorenyo.radioSeguridad) {
          listaMemorenyos.push(memorenyo.nombre + ' está a una distancia de ' + distanciaKM + ' km');

          memo_lista += `<li>${memorenyo.nombre} está a una distancia de ${Math.round(distanciaKM)} km.</li>`;
        }
      });

      memo_lista += `</br><p>Fuera de su perímetro de seguridad.</p>`;
      memo_lista += "</ul>";
    }
    if (listaMemorenyos.length > 0)
      enviarMensaje(listaMemorenyos);
  }, [memorenyos]);


  
  const enviarMensaje = (listaMemorenyos) => {
    //Solicita permiso para recibir notificaciones
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {

        console.log("Notification permission granted.");
     
        messaging
          .getToken()
          .then((currentToken) => {
            if (currentToken) {
              let titulo = 'Alerta memoreñ@s';
              let cuerpo = 'El/los memoreñ@s ' + listaMemorenyos.join() + ' está fuera se su perímetro de seguridad';
              sendTokenToServer(currentToken, titulo, cuerpo);
            } else {
              console.log("No Instance ID token available. Request permission to generate one.");
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
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