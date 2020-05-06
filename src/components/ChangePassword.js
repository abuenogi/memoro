import React, { Fragment, useState } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

const ChangePassword = ({ onClickBotonChangePassword, onClickVolverLogin}) => {

    const [correo, setCorreo] = useState('');

    return (

        <Fragment>
            <Form  >
                <h3 className="text-center mb-4" >Cambiar contraseña</h3>
                <div className="form-group" >
                    <Label>Correo electrónico</Label>
                    <Input type="email" className="form-control" placeholder="" onChange={e => setCorreo(e.target.value)} />
                </div>
                <Button type="submit" className="btn btn-primary btn-block mt-5 button1" onClick={() => onClickBotonChangePassword(correo)}> Enviar correo </Button>

                <p className=" text-center mt-5" >Te enviará un correo con tu nueva contraseña</p>
                <p className="enlace text-right mt-4" onClick={onClickVolverLogin}> Volver a iniciar sesión</p>
            </Form>
        </Fragment>
    );

}
export default withRouter(ChangePassword);