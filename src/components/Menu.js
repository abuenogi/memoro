import React, { Fragment, useContext } from "react";
import { withRouter } from 'react-router-dom';
import { Form , Button} from 'reactstrap';
import { UserContext } from '../context/UserContext';



const Menu = ({onClickBotonSignOut}) => {

    const user_context = useContext(UserContext);

    return (
        <Fragment>
            <Form > 
            <h1>user:</h1>    
            <p>{user_context.user_id}</p>
            <p>{user_context.email}</p>
            <Button type="submit" className="btn btn-primary btn-block button1" onClick={ onClickBotonSignOut}  >Cerrar sesión</Button>
            </Form>
        </Fragment>

    )
};
export default withRouter(Menu);