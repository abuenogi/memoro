import React , {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const PrivateRoute = ({component: Component, ...rest}) => {


    const { user_auth } = useContext(UserContext);
    const isLogin =  user_auth.isLogin

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
            : <Redirect to="/sign-in" />
        )} />
    );
};

export default PrivateRoute;