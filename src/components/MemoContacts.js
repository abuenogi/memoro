import React, { Fragment, useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import NavigationBar from "../container/CNT_NavigationBar";
import CNT_NavigationBarMemoLower from "../container/CNT_NavigationBarMemoLower";
import Layout from "./Layout";
import MemoContactsActions from "./MemoContactsActions";
import BotoneraCreacion from "./BotoneraCreacion";
import { getDataWithRef } from "../fuctions/CRUD";
//import { memoSelected } from "../context/UserContext";
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

const MemoContacts = ({history}) => {
  const location = useLocation();
 // const history = useHistory();
  var memorenyo = location.memorenyo;
  const [contactos, setContactos] = useState([]);
  

  useEffect(() => {
    //Los datos que me llegan en el location y en el contexto
   
    console.log(
      "useEffect (MemoContacts)--> El memoreño seleccionado y pasado en el location: ",
      memorenyo
    );

    /******************
     * ****************
     * Aquí abajo se indican dos formas de recuperar el usuario, bien como un array de contactos
     * dentro del memoreño o bien como una referencia a otra tabla de firebase
     * ****************
     * ****************
     */
    //Recuperamos los contactos del memoreño en forma de objeto y lo recorremos (El memoreño tiene un array de contactos)
    const contactosData = Object.keys(memorenyo.contactos).map(
      (key) => memorenyo.contactos[key]
    );

    setContactos(
      contactosData.map((doc) => ({
        ...doc,
      }))      
    );

    console.log("setContactos en useEffect ", contactos);
    //opcion recuperar datos en tabla de referencia (El memoreño tiene un array de referencias a otra tabla)
    /*
        const contactosId = memorenyo.contactos.map( contacto => contacto.id);
         const fetchData = async () => {
             const data = await getDataWithRef ('contactos', contactosId );
             debugger;
             console.log("En MemoContacts data vale" , data);
             console.log("En MemoContacts data vale" , data.docs);
              setContactos(data.map(doc => ({ ...doc.data()}))); };
         fetchData();
         */
  }, []);

  if (memorenyo) {
    console.log("En MemoContacts contactos vale ", contactos);
  }

  /*
  const newContact = {
    nombre: '',
    telefono: ''
}
  const addRow = () => {    
    setContactos([ ...contactos, newContact])
  }
*/

  const onCreate = (value) => {
    //Se almacena el memoreño seleccionado del listado en el contexto del usuario
    console.log("onCreate => memoreño seleccionado y pasado al componente: ",value);
    //Se redirige a la página de detalle del memoreño y modificación
    history.push({
      pathname: '/memoContactsForm',
      memorenyo: memorenyo //> Se va a almacenar en el contexto del usuario para evitar problemas de seguirdad ya que puede accederse al location y ver la información del memoreño
    });

  }


  const onUpdate = value => () => {
    //Se almacena el memoreño seleccionado del listado en el contexto del usuario
    //console.log("onUpdate => memoreño seleccionado y almacenado en el contexto: ",memoSelected);
    console.log("onUpdate => memoreño seleccionado y pasado al componente: ",memorenyo);

    //Se redirige a la página de detalle del memoreño y modificación
    history.push({
      pathname: '/memorenyosForm',
      state: memorenyo.id,
      memorenyo: memorenyo //> Se va a almacenar en el contexto del usuario para evitar problemas de seguirdad ya que puede accederse al location y ver la información del memoreño
    });

  }


  const onDelete = () => {
    console.log("Borrar memorenyo " + memorenyo.id);
    confirmAlert({
      title: 'Borrar memoreñ@',
      message: '¿Realmente quiere eliminar los datos de '+ memorenyo.nombre +'?',
      buttons: [
        {
          label: 'No',
          onClick: () => {}
          
        },
        {
          label: 'Si',
          onClick: () => {
            //Elimino el contacto
          }
        }
      ]
    });
    //window.confirm('¿Realmente quiere eliminar el usuario?') ? onConfirm("Aceptar") : onCancel("Cancelar")
    //db.collection('memorenyos').doc(memorenyo.id).delete();
    //{deleteData(memorenyo.id,'usuarios')}
  }

  return (
    <Fragment>
      <Layout>
        <NavigationBar />
        <Container fluid>
          <div className="divTitle">
            <h4> Contactos de {memorenyo.nombre} </h4>
          </div>
          <Row>
            <Col className="memoColList">
              <table className="table table-borderless">
                <tbody>
                  {
                    console.log("contactos antes de recorrer el map",contactos)}
                    {contactos.map((contacto, index) => (
                    <tr key={index}>
                      <td>
                        <FontAwesomeIcon icon={(fas, faUser)} />
                      </td>
                      <td> {contacto.nombre} </td>
                      <td> {contacto.telefono} </td>
                      <td>
                        <MemoContactsActions contacto={contacto} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
            <Button variant="primary" size="lg" onClick={() => { console.log("Clico en el botón de crear de Memocontacts: "); onCreate() }}>Crear</Button>
            </Col>
          </Row>
        </Container>
        <CNT_NavigationBarMemoLower memorenyo={memorenyo} />
      </Layout>
      <Footer />
    </Fragment>
  );
};
export default withRouter(MemoContacts);
