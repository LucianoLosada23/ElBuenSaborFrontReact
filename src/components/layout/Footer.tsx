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

  return (
    <div className="bg-principal mt-10 py-12">
      <div className="max-w-8xl mx-auto grid grid-cols-2 justify-between items-center">
        <a href={"/"}>
          <img
            src="/logowhite.svg"
            alt="logo"
            loading="lazy"
            width={300}
            height={1}
          />
        </a>
        <ul className="flex gap-28">
          {links.map((link, index) => (
            <li
              key={index}
              className="hover:border-b border-white cursor-pointer"
            >
              <a
                href={link.link}
                className="font-display italic font-semibold text-[18px] text-white"
              >
                {link.nameLink}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Información adicional legal */}
      <div className="max-w-8xl mx-auto mt-8 text-center">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} El Buen Sabor. Todos los derechos
          reservados.
        </p>
        <div className="mt-4 flex justify-center gap-8">
          <a href="/politicas-privacidad">
            <span className="text-white text-sm hover:underline">
              Políticas de Privacidad
            </span>
          </a>
          <a href="/terminos-condiciones">
            <span className="text-white text-sm hover:underline">
              Términos y Condiciones
            </span>
          </a>
          <a href="/derechos-consumidor">
            <span className="text-white text-sm hover:underline">
              Derechos del Consumidor
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
