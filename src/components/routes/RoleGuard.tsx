// RoleGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  const userRole =
    (user?.user?.User.roleEmployee ?? user?.user?.User.role ?? "").toLowerCase();
  const allowed = allowedRoles.map((r) => r.toLowerCase());

  if (!userRole || !allowed.includes(userRole)) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default RoleGuard;
