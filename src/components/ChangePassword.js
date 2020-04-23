import React, { Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, Label, Input } from 'reactstrap';

const CangePassword = (props) => {

    //const { user,signInWithGoogle}  =props;

    return (

        <Fragment>
            <Form  >
                <h3 >Cambiar contraseña</h3>
                <div className="form-group" >
                    <Label>Correo electrónico</Label>
                    <Input type="email" className="form-control" placeholder="" />
                </div>
                <Button type="submit" className="btn btn-primary btn-block mt-3" >Enviar correo</Button>
                
                <p className=" text-center mt-5" >Te enviará un correo con tu nueva contraseña</p>
            </Form>
        </Fragment>
    );

}
export default withRouter(CangePassword);