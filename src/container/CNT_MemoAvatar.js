import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import usuarioImagen from '../images/foto_de_perfil.jpg';

import { storage } from '../services/firebase/firebaseConfig';

import MemoAvatar from '../components/MemoAvatar';

const MemoAvtar_container = ({ ref_storage, child_storage }) => {

    const [src, setSRC] = useState(null);
   
    useEffect(() => {

        if (ref_storage!== '' &&  child_storage !== '' ) {

            document.querySelector('#row_avatar').style.display = 'none';
            
        try {
            storage.ref(ref_storage).child(child_storage).getDownloadURL().then(url => {
                // `url` is the download URL for storage
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
       
        <MemoAvatar
        src= {src}
        onOpenAvatar = {onOpenAvatar}
        onCloseAvatar = {onCloseAvatar}
        uploadImage = {uploadImage}
        
        />
    )

}


export default withRouter(MemoAvtar_container);