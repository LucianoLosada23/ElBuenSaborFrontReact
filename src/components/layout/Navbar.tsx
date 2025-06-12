import { useState, useRef, useEffect } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  MapPinIcon,
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUIState } from "../../hooks/ui/useUIState";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/auth/useAuth";
import { logout } from "../../services/auth/login/login";

export default function Navbar() {
  // State
  const [open, setOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //location
  const location = useLocation();

  // Redux hooks
  const { toggle } = useUIState();
  const { cart } = useCart();
  const { user, logoutUser } = useAuth();

  // Funciones
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      
      logoutUser();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  const isStickyEnabled =
    isSticky &&
    !["/usuario/perfil", "/usuario/ordenes"].includes(location.pathname);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownItems = [
    {
      name: "Mis Direcciones",
      icon: <MapPinIcon width={18} height={18} />,
      link: "/usuario/direcciones",
    },
    {
      name: "Mis Órdenes",
      icon: <ClipboardDocumentListIcon width={18} height={18} />,
      link: "/usuario/ordenes",
    },
    {
      name: "Mi Perfil",
      icon: <UserIcon width={18} height={18} />,
      link: "/usuario/perfil",
    },
    {
      name: "Cerrar Sesión",
      icon: <ArrowLeftEndOnRectangleIcon width={18} height={18} />,
      link: "#",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`bg-white w-full z-40 transition-all duration-300 ease-in-out transform py-4 ${
        isStickyEnabled ? "fixed top-0 left-0 shadow-md translate-y-0" : ""
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-8xl mx-auto px-4">
        <Link to="/">
          <img
            src="/logo1.png"
            alt="logo"
            width={160}
            loading="lazy"
            height={1}
          />
        </Link>

        {/* Mostrar buscador solo en /catalogo */}
        {location.pathname === "/catalogo" && (
          <div className="flex items-center max-w-3xl w-full bg-white border border-gray-300 rounded-full p-2 hover:border-black">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pr-10 pl-4 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <MagnifyingGlassCircleIcon
                width={38}
                height={38}
                className="text-principal cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
        )}
        <div className=" flex items-center gap-6">
          {user.user !== null ? (
            <div className="space-x-10 flex items-center">
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-3 border-x border-gris px-2 cursor-pointer py-2"
                  onClick={() => setOpen(!open)}
                >
                  <UserCircleIcon width={24} height={24} />
                  <div className="flex items-center space-x-1">
                    <p className="font-display">
                      {user.user?.User.name} {user.user.User.lastname}
                    </p>
                    <ChevronDownIcon width={24} height={24} />
                  </div>
                </div>

                {open && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gris rounded-lg shadow-lg z-50">
                    <ul className="text-gray-700">
                      {dropdownItems.map((drop, index) =>
                        index === 3 ? (
                          <Link
                            to={drop.link}
                            key={index}
                            onClick={handleLogout}
                          >
                            <li className="px-4 py-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100">
                              {drop.icon}
                              <span className="font-display text-gris-oscuro text-[14px]">
                                {drop.name}
                              </span>
                            </li>
                          </Link>
                        ) : (
                          <Link to={drop.link} key={index}>
                            <li className="px-4 py-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100">
                              {drop.icon}
                              <span className="font-display text-gris-oscuro text-[14px]">
                                {drop.name}
                              </span>
                            </li>
                          </Link>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-x-6">
              <Link
                to="/register"
                state={{ from: location }}
                className="px-6 py-3  text-white  bg-principal rounded-full cursor-pointer font-semibold  hover:text-white hover:bg-secundario transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-principal"
                role="button"
              >
                Registrate
              </Link>
              <Link
                to="/login"
                state={{ from: location }}
                className="px-6 py-3 text-gris-oscuro rounded-full cursor-pointer font-semibold   hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-principal"
                role="button"
              >
                Ingresar
              </Link>
            </div>
          )}
          <div className="relative">
            <button
              onClick={() => toggle("isCartOpen")}
              className="cursor-pointer relative"
            >
              <ShoppingBagIcon width={24} height={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-principal text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
