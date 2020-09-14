import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';


const MemoAvtar = ({src,onOpenAvatar, onCloseAvatar, uploadImage}) => {


    return (
        <Fragment>

            <div className="form-group" id='MemoAvatar'>
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
                        <img onClick={onOpenAvatar} className='foto_de_perfil' witht="100" height="100" src={src} alt="Añadir imagen" />

                    </div>

                </div>

            </div>
        </Fragment>
    )

}


export default withRouter(MemoAvtar);