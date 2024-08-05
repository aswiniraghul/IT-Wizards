import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = Boolean(localStorage.getItem("user"));

  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;