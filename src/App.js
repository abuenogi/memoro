
import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import firebase from "firebase";
import produce from 'immer';
import "firebase/messaging";
import { auth, geo } from './services/firebase/firebaseConfig';
import { getDataElement, updateDataElement } from './fuctions/CRUD';

import Login from "./container/CNT_Login";
import SignUp from "./container/CNT_Signup";
import ChangePassword from "./container/CNT_ChangePassword";
import About from "./components/About_info";
import Terminos from "./components/Terminos_info";
import Privacidad from "./components/Privacidad_info";
import ConocerMas from "./components/Conocer_info";
import Home from "./components/Home";
import { HomeLinks } from "./pages/HomeLinks";
import MiPerfil  from "./container/CNT_MiPerfil";
import Memorenyos from "./components/Memorenyos";
import MemorenyosForm from "./components/MemorenyosForm";
import MemoContacts from "./components/MemoContacts";
import MemoContactsForm from "./components/MemoContactsForm";
import NoMatch from "./pages/NoMatch";

import  Calendario  from "./components/Calendario";
import Mapa from "./components/Mapa";
import CampoMapa from "./components/CampoMapa";
import  Entretenimiento  from "./components/Entretenimiento";
import Contactos from "./components/Contactos";


import { user_auth, memoSelected, UserContext } from "./context/UserContext";
import { sendTokenToServer, updateUIForPushEnabled, updateUIForPushPermissionRequired, showToken, setTokenSentToServer } from './fuctions/messageUtilities';

const App = () => {
  const [memorenyoSelected, setMemorenyoSelected] = useState(memoSelected);
  const [userAuth, setUserAuth] = useState(user_auth);
  


  //Sólo se ejecutará este useEffect al principio de la aplicación

  useEffect(() => {
    const updateUser = async user => {
      setUserAuth(await produce(userAuth, async (draft) => {

        if (user) {
        
          draft.photoURL = user.photoURL;
          //draft.user_id = user.uid; // No confundir el id de auth con el id de db 
          //draft.nombre = user.displayName;
          draft.email = user.email;

          var user_result = await getDataElement('usuarios', 'email', user.email);

          user_result.docs.map(doc => {

            draft.user_id = user_result.docs[0].id;
            draft.telefono = doc.data().telefono;
            draft.fechaNac = doc.data().fechaNac;
            draft.pais = doc.data().pais;
            draft.ciudad = doc.data().ciudad;
            draft.domicilio = doc.data().domicilio;
            draft.nombre = doc.data().nombre;
            draft.ubicacion = doc.data().ubicacion;
            draft.rol = doc.data().rol;
            draft.casa = doc.data().casa;

            if (doc.data().contactos) {
              draft.contactos = doc.data().contactos;
            }
            if (doc.data().cuidador) {
              draft.cuidador = doc.data().cuidador;
            }
            if (doc.data().radioSeguridad) {
              draft.radioSeguridad = doc.data().radioSeguridad;
            }
            if (doc.data().eventos) {
              draft.eventos = doc.data().eventos;
            }
          })
 
          return draft;

        } else {
          console.log('El usuario no existe');
        }

      }))
        //función de immer que se encarga de hacer el objeto inmutable
        ;
    }


    const unsuscribe = auth.onAuthStateChanged(updateUser);
    return () => unsuscribe();
  }, [])

 

  /*
   *
   * MENSAJERIA
   *
   */

  // Retrieve Firebase Messaging object.
  /*

  const messaging = firebase.messaging();
  // Add the public key generated from the console here.
  messaging.usePublicVapidKey(
    "BFteR1CX2goeMojHT_3fdkwFiXEVCvNLU1FEoTRIzGOG3U443eVRhTX37WSccYaa05riXIu94HqOzlbF__GSItY"
  );
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
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log("No Instance ID token available. Request permission to generate one.");
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          showToken("Error retrieving Instance ID token. ", err);
          setTokenSentToServer(false);
        });
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
*/
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user_auth: userAuth, memorenyoSelected, setMemorenyoSelected }}
      >
        <div className="auth-inner">
          <Switch>
            /** PATHS de las páginas del inicio de sesion/registro*/
            <Route exact path="/" component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route exact path="/home" component={Home} />
            /** PATHS de las páginas de info*/
            <Route exact path="/about" component={About} />
            <Route exact path="/terminos" component={Terminos} />
            <Route exact path="/Privaciadad" component={Privacidad} />
            <Route exact path="/ConocerMas" component={ConocerMas} />
            /** PATHS de las páginas del menú superior derecho - barra de
            navegación*/
            <Route path="/homelinks" component={HomeLinks} />
            <Route path="/miperfil" component={MiPerfil} />
            <Route path="/memorenyos" component={Memorenyos} />
            /** PATHS relacionados con la configuración y datos del memoreño */
            <Route path="/memoContacts" component={MemoContacts} />
            /** PATHS formularios */
            <Route path="/memorenyosForm" component={MemorenyosForm} />
            <Route path="/memoContactsForm" component={MemoContactsForm} />
            /** PATHS de las páginas del menú del Home */
            <Route path="/calendario" component={Calendario} />
            <Route path="/mapa" component={Mapa} />
            <Route path="/entretenimiento" component={Entretenimiento} />
            <Route path="/contactos" component={Contactos} />
            /** Otros PATHS */
            <Route path="/BuscaMapa" component={CampoMapa} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
export default App;
