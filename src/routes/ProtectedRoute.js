// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { StoreContext } from '../store1';

// const ProtectedRoute = ({ path, element }) => {
//     const { state } = useContext(StoreContext);

//     return state.isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const authToken = localStorage.getItem('auth_token'); // Retrieve the authentication token

    return authToken ? <Route {...rest} render={(props) => <Component {...props} />} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
