import React, { useState, useEffect, useContext } from 'react';
import { withRouter,useLocation, useHistory } from 'react-router-dom';
import { Button} from 'reactstrap';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faMap, faUser, faMobile, faEnvelope, faMapMarkedAlt, faStreetView, faKey } from '@fortawesome/free-solid-svg-icons'

import Footer from "./Footer";
import Layout from "./Layout";
import NavigationBar from "../container/CNT_NavigationBar";
import CNT_NavigationBarMemoLower from "../container/CNT_NavigationBarMemoLower";
import Modal from "./Modal";
import CampoMapa from "./CampoMapa";
import useForm from "../functions/hooks/useFormSignUp";
import MemoAvatar from './MemoAvatar';

import { auth, geo } from '../services/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';

import { fetch_data,createData, updateData } from '../functions/CRUD';



const MemorenyosForm = (props) => {

    const history = useHistory();
   
    const { user_auth, memorenyoSelected, setMemorenyoSelected } = useContext(UserContext);
    const { handleChange } = useForm();
   
    const [isOpened, setOpened] = useState(false);
    var [nombre_direccion, setNombre_direccion] = useState('');
    var [url, setURL] = useState('');

    let ubicacion_casa;
  
    const location = useLocation();

    useEffect(() => {

        if (location.casa) {
            ubicacion_casa = location.casa;
            setURL(`https://eu1.locationiq.com/v1/reverse.php?key=c7392af2aaffbc&lat=${location.casa.lat}&lon=${location.casa.lng}&format=json`)
        }

    }, [location.casa])

    

    const openModal = () => {
        document.getElementById("root").disabled = true;
        document.querySelector("#modal-root").style.display = 'block';

        setOpened(true);
    }
    const closeModal = () => setOpened(false);

    const initialMemoObjetValues = {
        nombre: '',
        telefono: '',
        email: '',
        contrasenya: '',
        pais: '',
        ciudad: '',
        direccion: '',
        imagen: '',
        radioSeguridad: '',
        cuidador: user_auth.user_id,
        ubicacion: '',
        casa: ''
    }

    //Variable de carga de los valores del objeto memorenyo
    var [values, setValues] = useState(initialMemoObjetValues);


    const [ref_storage, setRef_storage] = useState('');
    const [child_storage, setChild_storage] = useState('');

    useEffect(() => {

        setRef_storage('usuarios');
        setChild_storage(memorenyoSelected.id);

        //Preguntar  si puede recogerse de otra forma
        //Para saber si mostrar o no la contraseña
        if (memorenyoSelected.nombre == '') {
            setValues({ ...initialMemoObjetValues })
            document.querySelector('#MemoAvatar').style.display = 'none';
        }
        else {
            setValues({ ...memorenyoSelected })
        }
    }, [memorenyoSelected])

    
    useEffect(() => {
         
        if (values.casa) {
            setURL(`https://eu1.locationiq.com/v1/reverse.php?key=c7392af2aaffbc&lat=${values.casa.Pc}&lon=${values.casa.Vc}&format=json`)
        }
    }, [values.casa.Pc])


    useEffect(() => {

        let data = {}
       
        const fetchData = async () => {
    
            if (url)
            data = await fetch_data(url);
            if(data)
            setNombre_direccion(data.display_name);
        };

        fetchData();

    }, [url])

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
        debugger;
        if (location.casa) 
            oCasa = new geo.GeoPoint(location.casa.lat, location.casa.lng);

        if (!obj.id || obj.id == '') {
            auth.createUserWithEmailAndPassword(obj.email, obj.contrasenya)
                .catch(function (error) {
                    console.log('Error añadiendo el memorenyo en auth addOrEdit ', error);
                });
            //Se actualizan los datos del cuidador, el rol y la ubicación
            obj.rol = 'memorenyo';
            obj.cuidador = user_auth.id;
            obj.ubicacion = '';
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

                            <MemoAvatar 
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
                                    <input type="email" className="form-control" name="email" placeholder="Correo electrónico"
                                        value={values.email || ''}
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
                                    value={nombre_direccion || ubicacion_casa || `LatLng(${values.casa.Pc}, ${values.casa.Vc})` || ''}
                                    onChange={handleInputChange}
                                />

                                 <Button className="ml-4" onClick={openModal}>
                                    <FontAwesomeIcon icon={(fas, faMap)} size="1x" /> 
                                </Button>
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