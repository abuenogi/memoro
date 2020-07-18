import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar-edit'
import { storage } from '../services/firebase/firebaseConfig';

const MemoAvtar = ({imagen_inicial, ref_storage, child_storage}) => {

  
    const [src, setSRC] = useState(imagen_inicial);

    useEffect(() => {
        document.querySelector('#row_avatar').style.display = 'none';
        

    }, [])

    const onCloseAvatar = () => {
        document.querySelector('#row_avatar').style.display = 'none';
        document.querySelector('#row_perfil').style.display = 'block';
    }
    const onOpenAvatar = () => {
        document.querySelector('#row_avatar').style.display = 'block';
        document.querySelector('#row_perfil').style.display = 'none';
    }

    const onCrop = (preview) => {
        setSRC(preview)
       
    }

    const onFileLoad = (file) => {
       
        if (file) {
            // add to image folder in firebase
            storage.ref(ref_storage).child(child_storage).put(file);
            
          } else {
            console.log('Error en la subida de la imagen');
          }
    }

    return (
        <Fragment>

            <div className="form-group">
                <div id='row_avatar' >
                    <Avatar className="d-flex justify-center"
                        width={'100%'}
                        height={200}
                        onCrop={onCrop}
                        onClose={onCloseAvatar}
                        onFileLoad={onFileLoad}
                    />
                </div>
                <div className="d-flex justify-content-around">
                    <div id='row_perfil' >
                        <img onClick={onOpenAvatar} height={200}  src={src} alt=" Añadir imagen" />

                    </div>

                </div>

            </div>
        </Fragment>
    )

}


export default withRouter(MemoAvtar);