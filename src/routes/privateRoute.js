import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    console.log('route', isAuthenticated);
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute