import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
  }
const PrivateRoute:React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;