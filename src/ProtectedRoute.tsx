import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}) => {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Navigate to={authenticationPath} />;
  }
};

export default ProtectedRoute;
