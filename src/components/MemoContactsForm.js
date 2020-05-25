
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faUser, faMobile, faEnvelope, faMapMarkedAlt, faImage, faStreetView, faKey, faGlobe, faGlobeEurope, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Footer from "./Footer";
import Layout  from "./Layout";
import NavigationBar  from "../container/CNT_NavigationBar";
import NavigationBarMemoLower  from "./NavigationBarMemoLower";
import { createData, updateData } from '../fuctions/CRUD';
import { Container } from 'react-bootstrap';
import { useLocation, useHistory} from 'react-router-dom';
import { auth } from '../services/firebase/firebaseConfig';


const MemoContactsForm = (props) => {

    const location = useLocation();
    const memo = location.memorenyo;
    const initialContactObjetValues = {
        nombre: '',
        telefono: ''
    }
    var [memorenyo, setMemorenyo] = useState(memo); 
    var [contactos, setContactos] = useState(memo.contactos); 
    var [contacto, setContacto] = useState(initialContactObjetValues); 
    var contactoSelected;

   
    //Variable de carga de los valores del objeto memorenyo y sus contactos

    useEffect(() => {
        console.log("useEffect de MemoContactsForm memo: ", memo);
        console.log("useEffect de MemoContactsForm memorenyo: ", memorenyo);
        console.log("useEffect de MemoContactsForm memo.contactos: ", memo.contactos);
        console.log("useEffect de MemoContactsForm contactos: ", contactos);
        console.log("useEffect de MemoContactsForm contactoSelected: ", contactoSelected);
        
        //Se trata de una creación
        if(!contactoSelected){
            console.log("MemoContactsForm --> Cargo los datos para un nuevo contacto");
            setContacto({...initialContactObjetValues})
        } 
        //Se trata de una actualización
        else{
            console.log("MemoContactsForm --> Cargo los datos para el contacto seleccionado ");
            //setContacto({...initialContactObjetValues})
        } 

        console.log("MemoContactsForm --> Ahora el contacto vale: ", contacto);
        
    },[])

    //Cada vez que se informa algo en los campos del formulario
    const handleInputChange = e => {
        var { name, value } = e.target;
        setContacto({
            ...contacto,
            [name]: value
        })
    }

    /*
    const handleInputSelect = (name,value) => {
        console.log(" MemoContactsFormValor en handleInputSelect", name, value);
        setContacto({
            ...contacto,
            [name]: value
        })
    }*/

    const handleFormSubmit = e => {
        e.preventDefault()
        addOrEdit(contacto);
    }

    //Cuando cambia la propiedad de contactos de un memorenyo actualizamos 
    //los contactos ya que setMemoreyo es asíncrono
    useEffect(() => {
        updateData(memo.id, memorenyo, 'usuarios');
    }, [memorenyo.contactos]) 

    const addOrEdit = (contactValue) => {
         if (contactValue) {
           const clave = Object.keys(memorenyo.contactos).length;
           setMemorenyo({...memorenyo, contactos: {...memorenyo.contactos, [clave]: contactValue}});
       
        }
        else {
            console.log("No existen contacto que actualizar/añadir ", contactValue);
        }
    }


    return (

        <React.Fragment>
            <Layout>
                <NavigationBar />
                <Container fluid className="form-style">
                    <div>
                        <h4>{!contactoSelected? "Crear contacto" : "Actualizar contacto"}</h4>
                    </div>
                    <div>
                        <form autoComplete="off" onSubmit={handleFormSubmit}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={fas, faUser} />
                                    </div>
                                </div>
                                <input className="form-control" name="nombre" placeholder="Nombre y apellidos"
                                    value={contacto.nombre || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={fas, faMobile} />
                                    </div>
                                </div>
                                <input type="number" className="form-control" name="telefono" placeholder="Teléfono móvil"
                                        value={contacto.telefono  || ''}
                                        onChange={handleInputChange}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="submit" value={!contactoSelected? "Guardar" : "Actualizar"} className="btn btn-primary btn-block" />
        
                            </div>
                        </form>
                    </div>
                </Container>
                <NavigationBarMemoLower memorenyo={memorenyo}/>
            </Layout>
            <Footer />
        </React.Fragment>
    );
}
export default withRouter(MemoContactsForm);

