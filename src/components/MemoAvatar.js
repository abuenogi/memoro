import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar-edit'
import { Button, } from 'reactstrap';

import { storage } from '../services/firebase/firebaseConfig';
import usuarioImagen from '../images/foto_de_perfil.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faUpload } from "@fortawesome/free-solid-svg-icons";

const MemoAvtar = ({ ref_storage, child_storage }) => {


    const [src, setSRC] = useState(null);

   
    useEffect(() => {

         debugger;

        if (ref_storage!= '' &&  child_storage != '' ) {

            document.querySelector('#row_avatar').style.display = 'none';
            
        try {
            storage.ref(ref_storage).child(child_storage).getDownloadURL().then(url => {
                // `url` is the download URL for 'images/stars.jpg'
                var img = document.querySelector('.foto_de_perfil');
                img.src = url;
    
            }).catch(function (error) {
                setSRC(usuarioImagen)
                console.log(error)
            });
        } catch (error) {
            setSRC(usuarioImagen)
            console.log(error)
        }
        }
       


    }, [ref_storage, child_storage ])

    const onCloseAvatar = () => {
        document.querySelector('#row_avatar').style.display = 'none';
        document.querySelector('#row_perfil').style.display = 'block';
    }
    const onOpenAvatar = () => {
        document.querySelector('#row_avatar').style.display = 'block';
        document.querySelector('#row_perfil').style.display = 'none';
    }

    const uploadImage = async e => {

        const files = e.target.files[0]
        if (files) {
            setSRC(files.src)
            // add to image folder in firebase
            storage.ref(ref_storage).child(child_storage).put(files);

        } else {
            console.log('Error en la subida de la imagen');
        }
    }

    return (
        <Fragment>

            <div className="form-group">
                <div id='row_avatar' >
                    <Button className='mr-10' onClick={onCloseAvatar}>X</Button>
                    <input
                        type="file"
                        name="file"
                        placeholder="Seleccionar imagen"
                        onChange={uploadImage}
                    />
                </div>
                <div className="d-flex justify-content-around">
                    <div id='row_perfil' >
                        <img onClick={onOpenAvatar} className='foto_de_perfil' height={200} src={src} alt=" Añadir imagen" />

                    </div>

                </div>

            </div>
        </Fragment>
    )

}


export default withRouter(MemoAvtar);