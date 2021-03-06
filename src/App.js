
import React, { useState,  useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import produce from 'immer';

import "firebase/messaging";
import { auth} from './services/firebase/firebaseConfig';
import { getDataElement } from '../src/functions/CRUD';

import Login from "./container/CNT_Login";
import SignUp from "./container/CNT_Signup";
import ChangePassword from "./container/CNT_ChangePassword";
import About from "./components/About_info";
import Terminos from "./components/Terminos_info";
import Privacidad from "./components/Privacidad_info";
import Home from "./components/Home";
import HomeLinks from "./components/HomeLinks";
import MiPerfil  from "./container/CNT_MiPerfil";
import Memorenyos from "./components/Memorenyos";
import MemorenyosForm from "./components/MemorenyosForm";
import MemoContacts from "./components/MemoContacts";
import MemoContactsForm from "./components/MemoContactsForm";
import NoMatch from "./components/NoMatch";
import  Calendario  from "./components/Calendario";
import Mapa from "./components/Mapa";
import CampoMapa from "./components/CampoMapa";
import  Entretenimiento  from "./container/CNT_Entretenimiento";
import Contactos from "./components/Contactos";


import { user_auth, memoSelected, UserContext } from "./context/UserContext";


const App = () => {

  const [memorenyoSelected, setMemorenyoSelected] = useState(memoSelected);
  const [userAuth, setUserAuth] = useState(user_auth);
 

  //Sólo se ejecutará este useEffect al principio de la aplicación

  useEffect(() => {
    const updateUser = async user => {
      setUserAuth(await produce(userAuth, async (draft) => {

        if (user) {
        
          draft.email = user.email;

          var user_result = await getDataElement('usuarios', 'email', user.email);

          user_result.docs.map(doc => {

            draft.id = user_result.docs[0].id;
            draft.telefono = doc.data().telefono;
            draft.fechaNac = doc.data().fechaNac;
            //draft.pais = doc.data().pais;
            //draft.ciudad = doc.data().ciudad;
            //draft.domicilio = doc.data().domicilio;
            draft.nombre = doc.data().nombre;
            draft.ubicacion = doc.data().ubicacion;
            draft.rol = doc.data().rol;
            draft.casa = doc.data().casa;
            draft.isLogin = doc.data().isLogin=true;

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

 

  
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user_auth: userAuth, setUserAuth , memorenyoSelected, setMemorenyoSelected }}
      >
        <div className="auth-inner">
          <Switch>
            /** PATHS de las páginas del inicio de sesion/registro**/
            <Route exact path="/" component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route exact path="/home" component={Home} />
            /** PATHS de las páginas de info*/
            <Route exact path="/about" component={About} />
            <Route exact path="/terminos" component={Terminos} />
            <Route exact path="/Privaciadad" component={Privacidad} />
            /** PATHS de las páginas del menú superior derecho - barra de
            navegación*/
            <Route exact path="/homelinks" component={HomeLinks} />
            <Route exact path="/miperfil" component={MiPerfil} />
            <Route exact path="/memorenyos" component={Memorenyos} />
            /** PATHS relacionados con la configuración y datos del memoreño */
            <Route exact path="/memoContacts" component={MemoContacts} />
            /** PATHS formularios */
            <Route exact path="/memorenyosForm" component={MemorenyosForm} />
            <Route exact path="/memoContactsForm" component={MemoContactsForm} />
            /** PATHS de las páginas del menú del Home */
            <Route exact path="/calendario" component={Calendario} />
            <Route exact path="/mapa" component={Mapa} />
            <Route exact path="/entretenimiento" component={Entretenimiento} />
            <Route exact path="/contactos" component={Contactos} />
            /** Otros PATHS */
            <Route exact path="/BuscaMapa" component={CampoMapa} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
export default App;
