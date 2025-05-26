import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  Cog8ToothIcon,
  IdentificationIcon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  ClipboardIcon,
  InboxArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <Squares2X2Icon className="w-6 h-6" />,
      path: "/admin",
    },
    {
      label: "Productos",
      icon: <ArchiveBoxIcon className="w-6 h-6" />,
      path: "#",
    },
    {
      label: "Insumos",
      icon: <ClipboardIcon className="w-6 h-6" />,
      path: "/admin/insumos",
    },
    {
      label: "Órdenes",
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      path: "#",
    },
    {
      label: "Clientes",
      icon: <UserGroupIcon className="w-6 h-6" />,
      path: "#",
    },
    {
      label: "Compras",
      icon: <InboxArrowDownIcon className="w-6 h-6" />,
      path: "#",
    },
    {
      label: "Empleados",
      icon: <IdentificationIcon className="w-6 h-6" />,
      path: "#",
    },
    {
      label: "Configuración",
      icon: <Cog8ToothIcon className="w-6 h-6" />,
      path: "#",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black px-3 py-4 transition-all duration-300 shadow-md
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5 cursor-pointer" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Logo */}
        {!collapsed ? (
          <div className="flex justify-center mb-6">
            <img
              src="/logo1.png"
              alt="Logo"
              className="w-32 h-20 object-contain transition-all duration-300"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-6">
            <img
              src="/bs.png"
              alt="Logo pequeño"
              className="w-40 h-20 object-contain transition-all duration-300"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 items-start">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center cursor-pointer gap-3 px-3 py-2 w-full rounded-md transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white"
                    : "hover:bg-gray-100"
                }`}
              title={collapsed ? item.label : undefined} // tooltip en modo colapsado
            >
              <span>{item.icon}</span>
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        } w-full min-h-screen p-6`}
      >
        <Outlet />
      </div>
    </div>
  );
}
