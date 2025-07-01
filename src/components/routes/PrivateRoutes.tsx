import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

interface Props {
  allowedRoles: string[];
}

const PrivateRoutes: React.FC<Props> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // Chequear roleEmployee o role, y normalizar
  const userRole =
    (user.user?.User.roleEmployee ?? user.user?.User.role ?? "").toLowerCase();

  const allowed = allowedRoles.map((r) => r.toLowerCase());

  if (!userRole || !allowed.includes(userRole)) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoutes;
