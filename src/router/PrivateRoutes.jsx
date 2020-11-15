import React from 'react';
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom';


export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {

        //Estoy recuperanto la ultima ruta para que cuando ya este autenticado lo redireccione a la página donde estaba
        // localStorage.setItem('lastPath', rest.location.pathname);

        return (
            <Route { ...rest }
                component={ (props) => (
                    (isAuthenticated)
                        ? (<Component {...props}/>)
                        : (<Redirect to='/login' />)
                )}
            />
        )


}


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}