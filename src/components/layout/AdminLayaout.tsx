import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Outline Icons
import {
  Squares2X2Icon as Squares2X2IconOutline,
  IdentificationIcon as IdentificationIconOutline,
  ArchiveBoxIcon as ArchiveBoxIconOutline,
  ClipboardDocumentListIcon as ClipboardDocumentListIconOutline,
  ClipboardIcon as ClipboardIconOutline,
  InboxArrowDownIcon as InboxArrowDownIconOutline,
  CalendarDateRangeIcon as CalendarDateRangeIconLine,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon as UserGroupIconOutline,
  ListBulletIcon as ListBulletIconOutline,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Solid Icons
import {
  Squares2X2Icon as Squares2X2IconSolid,
  IdentificationIcon as IdentificationIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  ClipboardIcon as ClipboardIconSolid,
  CalendarDateRangeIcon,
  InboxArrowDownIcon as InboxArrowDownIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ListBulletIcon as ListBulletIconSolid,
} from "@heroicons/react/24/solid";
import useAddress from "../../hooks/address/useAddress";
import { getAllCities, getAllProvinces } from "../../services/address/Address";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on mobile when resizing
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const { setProvinces, setCities } = useAddress();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesData = await getAllProvinces();
        const citiesData = await getAllCities();
        setProvinces(provincesData);
        setCities(citiesData);
      } catch (error) {
        console.error("Error cargando provincias o ciudades:", error);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: Squares2X2IconOutline,
      iconSolid: Squares2X2IconSolid,
    },
    {
      label: "Promociones",
      path: "/admin/promociones",
      icon: CalendarDateRangeIconLine,
      iconSolid: CalendarDateRangeIcon,
    },
    {
      label: "Categorías",
      path: "/admin/productos-categorias",
      icon: ListBulletIconOutline,
      iconSolid: ListBulletIconSolid,
    },
    {
      label: "Productos",
      path: "/admin/productos",
      icon: ArchiveBoxIconOutline,
      iconSolid: ArchiveBoxIconSolid,
    },
    {
      label: "Insumos",
      path: "/admin/insumos",
      icon: ClipboardIconOutline,
      iconSolid: ClipboardIconSolid,
    },
    {
      label: "Órdenes",
      path: "/admin/ordenes",
      icon: ClipboardDocumentListIconOutline,
      iconSolid: ClipboardDocumentListIconSolid,
    },
    {
      label: "Clientes",
      path: "#",
      icon: UserGroupIconOutline,
      iconSolid: UserGroupIconSolid,
    },
    {
      label: "Compras",
      path: "#",
      icon: InboxArrowDownIconOutline,
      iconSolid: InboxArrowDownIconSolid,
    },
    {
      label: "Empleados",
      path: "/admin/empleados",
      icon: IdentificationIconOutline,
      iconSolid: IdentificationIconSolid,
    },
  ];

  const isActive = (path: string, label?: string) => {
    if (label === "Insumos") {
      return (
        location.pathname === "/admin/insumos" ||
        location.pathname === "/admin/insumos-categorias"
      );
    }
    if (label === "Promociones") {
      return (
        location.pathname === "/admin/promociones" ||
        location.pathname === "/admin/promociones-tipos"
      );
    }

    if (path === "/admin") return location.pathname === "/admin";

    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <img
          src="/logo1.png"
          alt="Logo"
          className="h-10 object-contain"
        />
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 top-0 left-0 h-full bg-white text-black px-2 py-4 transition-all duration-300 shadow-md
          ${collapsed ? "w-20" : "w-64"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        {mobileMenuOpen && (
          <button
            onClick={closeMobileMenu}
            className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}

        {/* Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 transition hidden md:block"
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
        <nav className="flex flex-col gap-4 items-start">
          {menuItems.map((item) => {
            const active = isActive(item.path, item.label);
            const Icon = active ? item.iconSolid : item.icon;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) closeMobileMenu();
                }}
                className={`flex items-center cursor-pointer gap-3 px-3 py-2 w-full transition-all duration-200
                  ${
                    active
                      ? "border-l-4 border-l-admin-principal text-admin-principal"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 text-admin-principal" />
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Main content */}
      <div
        className={`transition-all duration-300 w-full min-h-screen p-4 md:p-6
          ${collapsed ? "md:ml-20" : "md:ml-64"}
          ${mobileMenuOpen ? "ml-64" : "ml-0"}
        `}
      >
        <Outlet />
      </div>
    </div>
  );
}