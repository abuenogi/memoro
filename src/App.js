import React, { useState, useContext } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./container/CNT_Login";
import SignUp from "./container/CNT_Signup";
import ChangePassword from "./container/CNT_ChangePassword";
import Home from "./components/Home";
import { HomeLinks } from "./pages/HomeLinks";
import { MiPerfil } from "./pages/MiPerfil";
import Memorenyos from "./components/Memorenyos";
import MemorenyosForm from "./components/MemorenyosForm";
import MemoContacts from "./components/MemoContacts";
import MemoContactsForm from "./components/MemoContactsForm";
import NoMatch from "./pages/NoMatch";
import { Calendario } from "./pages/Calendario";
import Mapa from "./components/Mapa";
import { Entretenimiento } from "./pages/Entretenimiento";
import Contactos from "./components/Contactos";
import { user_auth, memoSelected, UserContext } from "./context/UserContext";
import firebase from "firebase";
import "firebase/messaging";
import { sendTokenToServer, updateUIForPushEnabled, updateUIForPushPermissionRequired, showToken, setTokenSentToServer } from './fuctions/messageUtilities';

const App = () => {
  const [memorenyoSelected, setMemorenyoSelected] = useState(memoSelected);

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
        value={{ user_auth, memorenyoSelected, setMemorenyoSelected }}
      >
        <div className="auth-inner">
          <Switch>
            /** PATHS de las páginas del inicio de sesion/registro*/
            <Route exact path="/" component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route exact path="/home" component={Home} />
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
            <Route component={NoMatch} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
export default App;
