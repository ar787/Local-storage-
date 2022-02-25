import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
    console.log('route', isAuthenticated);
    return (
        <Route {...rest} render={props => (
            isAuthenticated === true ? <Redirect to='/dashboard/root' /> : <Component {...props} />
        )} />
    )
}

export default PublicRoute