import { useState, useRef, useEffect } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  MapPinIcon,
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
      className={`bg-white w-full z-40 transition-all duration-300 ease-in-out transform py-3 md:py-4 ${
        isStickyEnabled ? "fixed top-0 left-0 shadow-md translate-y-0" : ""
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 mr-4"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-700"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo1.png"
            alt="logo"
            className="h-10 md:h-12 w-auto"
            loading="lazy"
          />
        </Link>

        {/* Search bar - Desktop */}
        {location.pathname === "/catalogo" && (
          <div className="hidden md:flex items-center max-w-3xl w-full bg-white border border-gray-300 rounded-full p-1 md:p-2 hover:border-black mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pr-10 pl-4 py-1 md:py-2 focus:outline-none focus:ring-0 focus:border-transparent text-sm md:text-base"
              />
              <MagnifyingGlassCircleIcon
                width={30}
                height={30}
                className="text-principal cursor-pointer absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
        )}

        {/* Search bar - Mobile */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white p-3 shadow-md md:hidden z-30">
            <div className="flex items-center w-full bg-white border border-gray-300 rounded-full p-2">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pr-10 pl-4 py-1 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              />
              <MagnifyingGlassCircleIcon
                width={28}
                height={28}
                className="text-principal cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
        )}

        {/* User actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {user.user !== null ? (
            <div className="hidden md:flex items-center">
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-2 md:space-x-3 border-x border-gris px-2 cursor-pointer py-1 md:py-2"
                  onClick={() => setOpen(!open)}
                >
                  <UserCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
                  <div className="flex items-center space-x-1">
                    <p className="font-display text-sm md:text-base">
                      {user.user?.User.name} {user.user.User.lastname}
                    </p>
                    <ChevronDownIcon className="w-4 h-4 md:w-5 md:h-5" />
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
                              <span className="font-display text-gris-oscuro text-sm">
                                {drop.name}
                              </span>
                            </li>
                          </Link>
                        ) : (
                          <Link to={drop.link} key={index}>
                            <li className="px-4 py-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100">
                              {drop.icon}
                              <span className="font-display text-gris-oscuro text-sm">
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
            <div className="hidden md:flex items-center gap-2 md:gap-4">
              <Link
                to="/register"
                state={{ from: location }}
                className="px-4 py-2 md:px-6 md:py-3 text-white bg-principal rounded-full cursor-pointer font-semibold text-sm md:text-base hover:text-white hover:bg-secundario transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-principal"
                role="button"
              >
                Registrate
              </Link>
              <Link
                to="/login"
                state={{ from: location }}
                className="px-4 py-2 md:px-6 md:py-3 text-gris-oscuro rounded-full cursor-pointer font-semibold text-sm md:text-base bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-principal"
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
              <ShoppingBagIcon className="w-5 h-5 md:w-6 md:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-principal text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="px-4 py-3 border-t border-gray-200">
            {user.user !== null ? (
              <>
                <div className="mb-4">
                  <p className="font-semibold text-gray-800">
                    {user.user?.User.name} {user.user.User.lastname}
                  </p>
                  <p className="text-sm text-gray-600">{user.user?.User.email}</p>
                </div>
                <ul className="space-y-2">
                  {dropdownItems.map((drop, index) => (
                    <li key={index}>
                      <Link
                        to={drop.link}
                        onClick={() => {
                          if (index === 3) handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
                      >
                        <span className="mr-2">{drop.icon}</span>
                        <span>{drop.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/register"
                  state={{ from: location }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-white bg-principal rounded-full cursor-pointer font-semibold text-center hover:bg-secundario transition-colors duration-200"
                  role="button"
                >
                  Registrate
                </Link>
                <Link
                  to="/login"
                  state={{ from: location }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gris-oscuro rounded-full cursor-pointer font-semibold text-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  role="button"
                >
                  Ingresar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}