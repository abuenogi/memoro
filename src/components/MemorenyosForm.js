
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faUser, faMobile, faEnvelope, faMapMarkedAlt, faImage, faStreetView, faKey, faGlobe, faGlobeEurope, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Footer from "./Footer";
import Layout  from "./Layout";
import NavigationBar  from "../container/CNT_NavigationBar";
import CNT_NavigationBarMemoLower  from "../container/CNT_NavigationBarMemoLower";
import { createData, updateData } from '../fuctions/CRUD';
import { Container } from 'react-bootstrap';
import { useLocation, useHistory} from 'react-router-dom';
import { auth } from '../services/firebase/firebaseConfig';
import { UserContext, memoSelected } from '../context/UserContext';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


const MemorenyosForm = (props) => {

    const user_auth = useContext(UserContext);
    //const location = useLocation();
    const history = useHistory();
    //var memorenyoId = '';
    //const memorenyoSelected = useContext(UserContext);
    let [memorenyoSelected, setMemorenyoSelected] = useContext(UserContext);
        
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
        cuidador: user_auth.user_id
    }

    //Variable de carga de los valores del objeto memorenyo
    var [values, setValues] = useState(initialMemoObjetValues);
    //var [memorenyoId, setMemorenyoId] = useState('');
    var [memoObject, setMemoObject] = useState({})

    useEffect(() => {
        //Preguntar a Mateo si puede recogerse de otra forma
        //Para saber si mostrar o no la contraseña
        if (memorenyoSelected.nombre=='') {
            setValues({ ...initialMemoObjetValues })
        }
        else {
            setValues({...memorenyoSelected})
        }
    }, [memorenyoSelected])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleInputSelect = (name,value) => {
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
        console.log('Que vale el objeto que voy a actualizar/crear ', obj);
        console.log('Que vale el objeto que voy a actualizar/crear ', obj.id);
        console.log('Que vale el objeto que voy a actualizar/crear  user_auth ', user_auth);
        console.log('Que vale el objeto que voy a actualizar/crear  user_auth.user_id ', user_auth.user_id);
        
        if (!obj.id || obj.id == '') {
            auth.createUserWithEmailAndPassword(obj.correo, obj.contrasenya)
            .catch(function (error) {
                console.log('Error añadiendo el memorenyo en auth addOrEdit ', error);
            });
            obj.rol = 'memorenyo';
            delete obj.contrasenya;
            createData(obj, 'usuarios');
        }
        else {
            console.log("Voy a actualizar los datos del memoreño ", obj);
            updateData(obj.id, obj, 'usuarios');
        }

        //Actualizo los datos del memoreño del contexto
        setMemorenyoSelected({...obj});
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
                    <div className="divTitle">
                        <h3>{memorenyoSelected.nombre==''? "Crear memoreño" : "Detalle del memoreño"}</h3>
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
                                    value={values.nombre || ''}
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
                                    value={values.imagen || ''}
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
                                        value={values.correo || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {memorenyoSelected.nombre=='' && (
                                <div className="form-group input-group col-md-6">
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
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faGlobe} />
                                        </div>
                                    </div>
                                    <CountryDropdown className="form-control" type="selector" name="pais" placeholder="País" 
                                        value={values.pais || ''}
                                        onChange={(value) => handleInputSelect('pais', value)}/>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faCaretDown} />
                                        </div>
                                    </div>
                                    <RegionDropdown type="selector" className="form-control" name="ciudad" placeholder="Ciudad"
                                        country={values.pais}
                                        value={values.ciudad}
                                        onChange={(value) => handleInputSelect('ciudad', value)} />
                                </div>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <FontAwesomeIcon icon={fas, faMapMarkedAlt} />
                                        </div>
                                    </div>
                                    <input className="form-control" name="direccion" placeholder="Dirección"
                                        value={values.direccion || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            <div className="form-group">
                                <input type="submit" value={memorenyoSelected.nombre==''? "Guardar" : "Actualizar"} className="btn btn-primary btn-block" />
        
                            </div>
                        </form>
                    </div>
                </Container>
                <CNT_NavigationBarMemoLower/>
            </Layout>
            <Footer />
        </React.Fragment>
    );
}
export default withRouter(MemorenyosForm);

