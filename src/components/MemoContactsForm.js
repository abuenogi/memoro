import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faUser, faMobile } from "@fortawesome/free-solid-svg-icons";

import Footer from "./Footer";
import Layout from "./Layout";
import NavigationBar from "../container/CNT_NavigationBar";
import NavigationBarMemoLower from "./NavigationBarMemoLower";
import MemoAvatar from "../container/CNT_MemoAvatar";

import { UserContext } from "../context/UserContext";
import { updateData } from "../functions/CRUD";

const MemoContactsForm = ({ history }) => {
  const { memorenyoSelected, setMemorenyoSelected } = useContext(UserContext);
  const location = history.location;

  const initialContactObjetValues = {
    nombre: "",
    telefono: "",
  };
  var [contacto, setContacto] = useState({});

  const [ref_storage, setRef_storage] = useState("");
  const [child_storage, setChild_storage] = useState("");

  //Variable de carga de los valores del objeto memorenyo y sus contactos
  useEffect(() => {
    //Se trata de una creación
    if (!location.contacto || location.contacto.nombre === "") {
      setContacto({ ...initialContactObjetValues });
      document.querySelector("#MemoAvatar").style.display = "none";
    }
    //Se trata de una actualización
    else {
      setContacto({ ...location.contacto });
    }
  }, [location]);

  useEffect(() => {
    setRef_storage("contactos");
    setChild_storage(contacto.telefono);
  }, [contacto.telefono]);

  //Cada vez que se informa algo en los campos del formulario
  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setContacto({
      ...contacto,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addOrEdit(contacto);
  };

  //Cuando cambia la propiedad de contactos de un memorenyo actualizamos
  //los contactos ya que setMemoreyo es asíncrono
  useEffect(() => {
    updateData(memorenyoSelected.id, memorenyoSelected, "usuarios");
  }, [memorenyoSelected.contactos]);

  //Se actualizan los datos del contacto para el memoreño
  const addOrEdit = (contactValue) => {
    console.log("addOrEdit contacto de memorenyo ", contactValue, " MAP? ",memorenyoSelected.contactos, " location.id ",location.id);
    if (contactValue) {
    //Si el contacto existe actualizo
      if (location.id) {
        const contactosTemp = {...memorenyoSelected.contactos,[location.id]:contactValue}  
        console.log(" contactosTemp ==> ",contactosTemp)       
        setMemorenyoSelected({
          ...memorenyoSelected,
          contactos:contactosTemp,
        });

      }
      //si no existe el contacto, se crea 
      else {
        const clave = Object.keys(memorenyoSelected.contactos).length;
        setMemorenyoSelected({
          ...memorenyoSelected,
          contactos: { ...memorenyoSelected.contactos, [clave]: contactValue },
        });
      }
    } else {
      console.log("No existen contacto que actualizar/añadir ", contactValue);
    }

    history.push({
      pathname: "/memoContacts",
    });
  };

  return (
    <React.Fragment>
      <Layout>
        <NavigationBar />
        <Container fluid className="form-style">
          <div>
            <h3 className="text-center mb-4">
              {!location.id
                ? "Crear contacto"
                : "Actualizar contacto"}
            </h3>
          </div>
          <div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
              <MemoAvatar
                ref_storage={ref_storage}
                child_storage={child_storage}
              />
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={(fas, faUser)} />
                  </div>
                </div>
                <input
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre y apellidos"
                  value={contacto.nombre || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={(fas, faMobile)} />
                  </div>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="telefono"
                  placeholder="Teléfono móvil"
                  value={contacto.telefono || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value={!location.id? "Guardar" : "Actualizar"}
                  className="btn button1 mt-4 btn-block"
                />
              </div>
            </form>
          </div>
        </Container>
        <NavigationBarMemoLower />
      </Layout>
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(MemoContactsForm);
