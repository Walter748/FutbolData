/* import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token');
    return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {

    const token = Cookies.get('token'); 

  return token ? <Outlet   /> : <Navigate to="/" />; // Renderiza los componentes hijos si está autenticado, de lo contrario redirige a /login
};

export default PrivateRoute;