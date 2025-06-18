// PrivateRoutes.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

interface Props {
  allowedRoles: string[];
}

const PrivateRoutes: React.FC<Props> = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Si no hay usuario logueado, redirige a login
  if (!user) return <Navigate to="/login" />;

  // Obtener rol y normalizar a minúsculas
  const userRole = user.user?.User.role?.toLowerCase();
  console.log(userRole);
  
  const allowed = allowedRoles.map((r) => r.toLowerCase());

  // Si el rol no existe o no está permitido, redirige a /admin
  if (!userRole || !allowed.includes(userRole)) return <Navigate to="/" />;

  // Si todo bien, renderiza las rutas hijas
  return <Outlet />;
};

export default PrivateRoutes;
