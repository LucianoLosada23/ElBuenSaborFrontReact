// PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRoles: string[];
}

const PrivateRoutes: React.FC<Props> = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!userRole || !allowedRoles.includes(userRole)) return <Navigate to="/admin/instrumentos" />;
  return <Outlet />;
};

export default PrivateRoutes;
