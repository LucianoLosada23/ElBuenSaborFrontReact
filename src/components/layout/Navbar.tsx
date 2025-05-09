import { useState, useRef, useEffect } from "react";
import { UserCircleIcon, ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../features/cartSlice";
import type { RootState } from "../../store/store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [userAuth, setUserAuth] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdown = [
    { name: "Mis Direcciones", icon: "/location.svg" },
    { name: "Mis Órdenes", icon: "/order.svg" },
    { name: "Mi Perfil", icon: "/profile.svg" },
    { name: "Cerrar Sesión", icon: "/logout.svg" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        <a href="/">
          <img src="/logo1.png" alt="logo" width={160} height={1} />
        </a>

        {/* Mostrar buscador solo en /catalogo */}
        {window.location.pathname === "/catalogo" && (
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
              <button className="py-2 px-8 cursor-pointer text-white bg-principal rounded-full hover:bg-terciario font-semibold text-[14px]">
                Buscar
              </button>
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
                    {dropdown.map((drop, index) => (
                      <div
                        className="flex px-4 space-x-1 hover:bg-gray-100 py-2 cursor-pointer"
                        key={index}
                      >
                        <img src={drop.icon} alt="icono" width={18} height={18} />
                        <li className="font-display text-gris-oscuro text-[14px]">
                          {drop.name === "Mis Órdenes" ? <a href="#">{drop.name}</a> : drop.name}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => dispatch(toggleCart())} className="cursor-pointer relative">
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
