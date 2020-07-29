import React, { useContext, useState, useEffect, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';
import Avatar from 'react-avatar-edit'
import imagen from '../images/foto_de_perfil.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faImage , fa} from "@fortawesome/free-solid-svg-icons";

const MemoAvtar = () => {

    const [preview, setPreview] = useState(imagen);
    const [src, setSRC] = useState(imagen);

    useEffect(() => {
        document.querySelector('#row_avatar').style.display = 'none';
       
    }, [])

    const onCloseAvatar = () => {
        document.querySelector('#row_avatar').style.display = 'none';
    }
    const onOpenAvatar = () => {
        document.querySelector('#row_avatar').style.display = 'block';
    }

    const onCrop = (preview) => {
        setPreview(preview)
    }

    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 71680) {
            alert("Archivo muy pesado");
            elem.target.value = "";
        };
    }


    return (
        <Fragment>

            <div className="form-group">

                <div id='row_avatar' >  
                    <Avatar className="d-flex justify-center"
                        width={'100%'}
                        height={300}
                        onCrop={onCrop}
                        onClose={onCloseAvatar}
                        onBeforeFileLoad={onBeforeFileLoad}
                        src={src}
                    />
                </div>
                <div className="d-flex justify-content-around mt-4 mb-4">

                    <div class="row">

                        <div class="col" >
                            <img src={preview} alt="Preview" />
                        </div>

                        <div class="col" >
                            <Button className="ml-4" onClick={onOpenAvatar}><FontAwesomeIcon className="d-flex" icon={(fas, faImage)} size="2x" /> </Button>
                        </div>

                    </div>

                </div>

            </div>
        </Fragment>
    )

}


export default withRouter(MemoAvtar);