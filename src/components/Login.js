import React, { Fragment , useState} from "react";
import { withRouter } from 'react-router-dom';
import Logo from '../images/logo192.png';
import { Button, Form, Label, Input} from 'reactstrap';


const Login = ({ onClickBotonLogin, onLoadUser,onClickChangePass, onClickReg}) => {

    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');


    return (

        <Fragment>
            <Form  onLoad= { e => onLoadUser}  >

                <h3 className="text-center mb-4">Iniciar sesión</h3>
                <img src={Logo} className="rounded mx-auto d-block  mb-5  mt-3" alt="aligment" />

                <div className="form-group">
                    <Label>Correo electrónico</Label>
                    <Input type="email" className="form-control" placeholder=""  onChange={e => setCorreo(e.target.value)}/>
                </div>

                <div className="form-group">
                    <Label>Contraseña</Label>
                    <Input type="password" className="form-control" placeholder="" onChange={e => setPass(e.target.value)}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <Input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>


                <Button type="submit" className="btn btn-primary btn-block button1" onClick={() =>  onClickBotonLogin (correo,pass)} >Iniciar sesión </Button>
                
                <Button type="submit" className="btn btn-primary btn-block button1" onClick={onClickReg}  >Registrate</Button>
                
                <p className="enlace text-right mt-4" onClick={onClickChangePass} >
                    ¿Has olvidado tu Contraseña?
                </p>
            </Form>
        </Fragment>
    );

}
export default withRouter(Login);