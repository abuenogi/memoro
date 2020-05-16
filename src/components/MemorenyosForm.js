
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faUser, faMobile, faEnvelope, faMapMarkedAlt, faImage, faStreetView, faKey } from '@fortawesome/free-solid-svg-icons'
import  Footer from "./Footer";
import Layout  from "./Layout";
import  NavigationBar  from "../container/CNT_NavigationBar";
import  Jumbotron  from "./Jumbotron";
import { createData } from '../fuctions/CRUD';
import { Container } from 'react-bootstrap';
import { useLocation, useHistory} from 'react-router-dom';
import { db } from '../services/firebase/firebaseConfig';
import { auth } from '../services/firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';


const MemorenyosForm = (props) => {

    const cuidador = useContext(UserContext);

    const location = useLocation();
    const history = useHistory();
    var memorenyoId = '';
    var memorenyo = location.memorenyo;    
    
    const initialMemoObjetValues = {
        nombre: '',
        telefono: '',
        correo: '',
        contrasenya: '',
        direccion: '',
        imagen: '',
        radioSeguridad: '',

        cuidador: cuidador.user_id
        //cuidador: '6bzL3lDiF7hHPo1eNshw'
    }
    //Variable de carga de los valores del objeto memorenyo
    var [values, setValues] = useState(initialMemoObjetValues);
    var [memorenyoId, setMemorenyoId] = useState('');
    var [memoObject, setMemoObject] = useState({})

    useEffect(() => {
         if (!memorenyo) {
            setValues({ ...initialMemoObjetValues })
        }
        else {
            setValues({...memorenyo })
        }

    }, [memorenyoId, memoObject])

    const handleInputChange = e => {

        var { name, value } = e.target;
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
        if (memorenyoId == '') {
            auth.createUserWithEmailAndPassword(obj.correo, obj.contrasenya)
            .catch(function (error) {
                console.log(error);
            });
            obj.rol = 'memorenyo';
            delete obj.contrasenya;
            createData(obj, 'usuarios');
        }
        else {
            db.child(`memorenyos/${memorenyoId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                })
        }
        history.push({
            pathname: '/memorenyos'
          });

    }

    return (

        <React.Fragment>
            <Layout>
                <NavigationBar />
                <Jumbotron />
                <Container fluid>
                    <div>
                        <h3>{!memorenyo? "Crear memoreño" : "Actualizar memoreño"}</h3>
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
                                    value={values.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={fas, faImage} />
                                    </div>
                                </div>
                                <input type="file" className="form-control" name="imagen" placeholder="Foto"
                                    value={values.imagen}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-row">
                                
                                <div className="form-group input-group col-md-6">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faEnvelope} />
                                        </div>
                                    </div>
                                    <input type="email" className="form-control" name="correo" placeholder="Correo electrónico"
                                        value={values.correo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group input-group col-md-6">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faKey} />
                                        </div>
                                    </div>
                                    <input type="password" className="form-control" name="contrasenya" placeholder="Contraseña"
                                        value={values.contrasenya}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group input-group col-md-6">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faMobile} />
                                        </div>
                                    </div>

                                    <input type="number" className="form-control" name="telefono" placeholder="Teléfono móvil"
                                        value={values.telefono}
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
                                        value={values.radioSeguridad}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faMapMarkedAlt} />
                                        </div>
                                    </div>
                                    <input className="form-control" name="direccion" placeholder="Dirección"
                                        value={values.direccion}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="submit" value={!memorenyoId? "Guardar" : "Actualizar"} className="btn btn-primary btn-block" />
        
                            </div>
                        </form>
                    </div>
                </Container>
            </Layout>
            <Footer />
        </React.Fragment>
    );
}
export default withRouter(MemorenyosForm);

