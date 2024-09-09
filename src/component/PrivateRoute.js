import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utility/auth';

const PrivateRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
