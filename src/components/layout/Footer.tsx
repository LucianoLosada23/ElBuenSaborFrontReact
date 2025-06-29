import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const links = [
    {
      nameLink: "Como Funciona",
      link: "#steps",
    },
    {
      nameLink: "Sobre Nosotros",
      link: "#about",
    },
    {
      nameLink: "Contactanos",
      link: "#contact",
    },
  ];

  //location
  const location = useLocation();
  
  return (
    <div className="bg-principal mt-10 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-center">
        <div className="flex justify-center md:justify-start">
          <a href={"/"}>
            <img
              src="/logowhite.svg"
              alt="logo"
              loading="lazy"
              className="w-48 md:w-64 lg:w-80"
            />
          </a>
        </div>
        
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-28 justify-center md:justify-end items-center">
          {links.map((link, index) => (
            <li
              key={index}
              className="hover:border-b border-white cursor-pointer transition-all duration-200"
            >
              <a
                href={link.link}
                className="font-display italic font-semibold text-base sm:text-[16px] lg:text-[18px] text-white hover:text-cyan-200"
              >
                {link.nameLink}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Enlace registro empresa */}
      <div className="max-w-8xl mx-auto mt-6 text-center">
        <p className="text-white text-sm md:text-base">
          ¿Eres una empresa?{" "}
          <Link
            to="/register/company"
            state={{ from: location }}
            className="text-cyan-400 hover:underline font-semibold cursor-pointer hover:text-cyan-300 transition-colors duration-200"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>

      {/* Información adicional legal */}
      <div className="max-w-8xl mx-auto mt-6 md:mt-8 text-center">
        <p className="text-white text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} El Buen Sabor. Todos los derechos
          reservados.
        </p>
        <div className="mt-3 md:mt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <a href="/politicas-privacidad" className="hover:underline">
            <span className="text-white text-xs sm:text-sm">
              Políticas de Privacidad
            </span>
          </a>
          <a href="/terminos-condiciones" className="hover:underline">
            <span className="text-white text-xs sm:text-sm">
              Términos y Condiciones
            </span>
          </a>
          <a href="/derechos-consumidor" className="hover:underline">
            <span className="text-white text-xs sm:text-sm">
              Derechos del Consumidor
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}