import { useState, useRef, useEffect } from "react";
import { UserCircleIcon, ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { memo } from "react";

export default memo(function Navbar() {
  const [userAuth, setUserAuth] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 0); // Si hizo scroll, activar sticky
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
    className={`bg-bg-light w-full z-50 transition-all duration-300 ease-in-out transform ${
      isSticky ? "fixed top-0 left-0 shadow-md translate-y-0" : "translate-y-[-5px]"
    }`}
    >
      <div className="flex justify-between items-center w-full max-w-8xl mx-auto px-4 ">
        <a href="/">
          <img src="/logo3.svg" alt="logo" width={160} height={1} />
        </a>

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
            <ShoppingBagIcon width={24} height={24} />
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
});
