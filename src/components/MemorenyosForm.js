import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button} from 'reactstrap';
import { fas, faMap, faUser, faMobile, faEnvelope, faMapMarkedAlt, faImage, faStreetView, faKey, faGlobe, faGlobeEurope, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Footer from "./Footer";
import Layout from "./Layout";

import NavigationBar from "../container/CNT_NavigationBar";
import CNT_NavigationBarMemoLower from "../container/CNT_NavigationBarMemoLower";
import { createData, updateData } from '../fuctions/CRUD';
import { Container } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { auth, db, geo } from '../services/firebase/firebaseConfig';
import { UserContext, memoSelected } from '../context/UserContext';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Modal from "./Modal";
import CampoMapa from "./CampoMapa";
import useForm from "../fuctions/useFormSignUp";
import MemoAvtar from './MemoAvatar'


const MemorenyosForm = (props) => {

    //const location = useLocation();
    const history = useHistory();
    //var memorenyoId = '';
    //const memorenyoSelected = useContext(UserContext);
    const { user_auth, memorenyoSelected, setMemorenyoSelected } = useContext(UserContext);
    const { handleChange } = useForm();
    var oUbicacion = new geo.GeoPoint(39.4704799, -0.3770681);
    const [isOpened, setOpened] = useState(false);

    const location = useLocation();
    let ubicacion_casa = location.casa

    const openModal = () => {
        document.getElementById("root").disabled = true;
        document.querySelector("#modal-root").style.display = 'block';

        setOpened(true);
    }
    const closeModal = () => setOpened(false);


    const initialMemoObjetValues = {
        nombre: '',
        telefono: '',
        correo: '',
        contrasenya: '',
        pais: '',
        ciudad: '',
        direccion: '',
        imagen: '',
        radioSeguridad: '',
        cuidador: user_auth.user_id,
        ubicacion: oUbicacion,
        casa: ''
    }

    //Variable de carga de los valores del objeto memorenyo
    var [values, setValues] = useState(initialMemoObjetValues);
    var [memoObject, setMemoObject] = useState({})
    var ref_storage = ''
    var child_storage = ''

    useEffect(() => {

        ref_storage = 'usuarios'
        child_storage = 'id del memoreño'
        //Preguntar a Mateo si puede recogerse de otra forma
        //Para saber si mostrar o no la contraseña
        if (memorenyoSelected.nombre == '') {
            setValues({ ...initialMemoObjetValues })
        }
        else {
            setValues({ ...memorenyoSelected })
        }
    }, [memorenyoSelected])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleInputSelect = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        addOrEdit(values);
    }


    const addOrEdit = (obj) => {

        console.log('Usuario logado  ', user_auth);
        console.log('addOrEdit usuario a modificar ', obj);
        let oCasa = obj.casa;
        if (ubicacion_casa) 
            oCasa = new geo.GeoPoint(ubicacion_casa.lat, ubicacion_casa.lng);

        if (!obj.id || obj.id == '') {
            auth.createUserWithEmailAndPassword(obj.correo, obj.contrasenya)
                .catch(function (error) {
                    console.log('Error añadiendo el memorenyo en auth addOrEdit ', error);
                });
            //Se actualizan los datos del cuidador, el rol y la ubicación
            obj.rol = 'memorenyo';
            //obj.cuidador = user_auth.user_id;
            obj.cuidador = user_auth.user_id;
            obj.ubicacion = oUbicacion;
            obj.casa = oCasa;
            obj.contactos = '';
            delete obj.contrasenya;
            createData(obj, 'usuarios');
        }
        else {
            console.log("Voy a actualizar los datos del memoreño ", obj);
            obj.casa = oCasa;
            updateData(obj.id, obj, 'usuarios');
        }

        //Actualizo los datos del memoreño del contexto
        setMemorenyoSelected({ ...obj });
        //Revisar si mostrar un alert confirmando la actualización o llevarlo al listado de memoreños
        history.push({
            pathname: '/memorenyos'
        });

    }

    return (

        <React.Fragment>
            <Layout>
                <NavigationBar />
                <Container fluid className="form-style">

                    <h3 className="text-center mb-4">{memorenyoSelected.nombre == '' ? "Crear memoreño" : "Detalle del memoreño"}</h3>
                    <div>
                        <form autoComplete="off" onSubmit={handleFormSubmit}>

                            <MemoAvtar
                                ref_storage={ref_storage}
                                child_storage={child_storage}
                            />

                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={fas, faUser} />
                                    </div>
                                </div>
                                <input className="form-control" name="nombre" placeholder="Nombre y apellidos"
                                    value={values.nombre || ''}
                                    onChange={handleInputChange}
                                />


                                <div className="form-group input-group mt-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faEnvelope} />
                                        </div>
                                    </div>
                                    <input type="email" className="form-control" name="correo" placeholder="Correo electrónico"
                                        value={values.correo || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>


                                {memorenyoSelected.nombre == '' && (
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <FontAwesomeIcon icon={fas, faKey} />
                                            </div>
                                        </div>
                                        <input type="password" className="form-control" name="contrasenya" placeholder="Contraseña"
                                            value={values.contrasenya || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}
                                <div className="form-row">
                                    <div className="form-group input-group col-md-6">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <FontAwesomeIcon icon={fas, faMobile} />
                                            </div>
                                        </div>

                                        <input type="number" className="form-control" name="telefono" placeholder="Teléfono móvil"
                                            value={values.telefono || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group input-group col-md-6">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <FontAwesomeIcon icon={fas, faStreetView} />
                                            </div>
                                        </div>
                                        <input className="form-control" name="radioSeguridad" placeholder="Radio de Seguridad"
                                            value={values.radioSeguridad || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>


                                </div>

                            

                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={fas, faMapMarkedAlt} />
                                    </div>
                                </div>
                                <input className="form-control" name="casa" placeholder="Dirección"
                                    value={ubicacion_casa || `[${values.casa.Pc}, ${values.casa.Vc}]` || ''}
                                    onChange={handleInputChange}
                                />

                                 <Button className="ml-4" onClick={openModal}><FontAwesomeIcon icon={(fas, faMap)} size="1x" /> </Button>
                                <Modal title="Mapa de ubicación" isOpened={isOpened} onClose={closeModal} >
                                    <CampoMapa/>
                                </Modal>
                            </div>
                            </div>
                            <div className="form-group">
                                <input type="submit" value={memorenyoSelected.nombre == '' ? "Guardar" : "Actualizar"} className="btn button1 mt-4 btn-block"  />

                            </div>
                        </form>
                    </div>
                </Container>
                <CNT_NavigationBarMemoLower />
            </Layout>
            <Footer />
        </React.Fragment>
    );
}
export default withRouter(MemorenyosForm);