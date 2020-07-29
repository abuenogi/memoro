
import React , {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const { user_auth } = useContext(UserContext);
    const isLogin =  user_auth.isLogin


    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;