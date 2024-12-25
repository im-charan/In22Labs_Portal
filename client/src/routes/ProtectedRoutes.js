import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../views/authentication/auth/AuthProvider";

const ProtectedRoutes = ({element: Component})=>{

  const {isAuthenticated} = useAuth();

  if(!isAuthenticated){
    return <Navigate to="/auth/login"/>;
  }

  return Component;

}

export default ProtectedRoutes;