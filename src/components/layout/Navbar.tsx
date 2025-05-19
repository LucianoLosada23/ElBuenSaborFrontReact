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
import { toggleCart } from "../../features/cartSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";

export default function Navbar() {
  const [userAuth, setUserAuth] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

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
        isSticky && "fixed top-0 left-0 shadow-md translate-y-0"
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-8xl mx-auto px-4">
        <Link to="/">
          <img src="/logo1.png" alt="logo" width={160} loading="lazy" height={1} />
        </Link>

        {/* Mostrar buscador solo en /catalogo */}
        {location.pathname === "/catalogo" && (
          <div className="flex-1 flex justify-center">
            <div className="flex items-center max-w-3xl w-full bg-gray-50 rounded-full p-2 ">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pizza, hamburguesa, bebidas..."
                  className="w-full pl-10 pr-2 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                />
              </div>
              <Button height={0.5} width={2} text={"Buscar"} size={14} />
            </div>
          </div>
        )}

        {userAuth ? (
          <div className="space-x-10 flex items-center">
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-3 border-x border-gris px-2 cursor-pointer py-2"
                onClick={() => setOpen(!open)}
              >
                <UserCircleIcon width={24} height={24} />
                <div className="flex items-center space-x-1">
                  <p className="font-display">Nombre Apellido</p>
                  <ChevronDownIcon width={24} height={24} />
                </div>
              </div>

              {open && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gris rounded-lg shadow-lg z-10">
                  <ul className="text-gray-700">
                    {dropdownItems.map((drop, index) => (
                      <Link to={drop.link} key={index}>
                        <li className="px-4 py-2 cursor-pointer flex items-center space-x-2 hover:bg-gray-100">
                          {drop.icon}
                          <span className="font-display text-gris-oscuro text-[14px]">
                            {drop.name}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => dispatch(toggleCart())}
                className="cursor-pointer relative"
              >
                <ShoppingBagIcon width={24} height={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-x-6">
            <a href="/">
              <button className="font-display px-4 py-3 text-white text-[12px] bg-principal rounded-[10px] font-semibold uppercase tracking-widest hover:text-white hover:bg-secundario">
                Registrate
              </button>
            </a>
            <a href="/">
              <button className="font-display uppercase text-[14px] hover:bg-gris-claro py-3 px-4 rounded-[10px]">
                Ingresar
              </button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
