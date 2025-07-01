import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 min-h-[600px] flex items-center">
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight tracking-wide drop-shadow-sm">
            Ordena Cómodo Desde Tu Casa
          </h1>
          <p className="mt-6 text-lg text-gray-600 font-medium max-w-xl mx-auto lg:mx-0 tracking-wide leading-relaxed">
            Descubrí nuestro menú digital y pedí tus platos favoritos desde la
            comodidad de tu casa.
          </p>
          <div className="mt-8">
            <Link to={"/companies"}>
              <button className="px-8 py-3 bg-principal cursor-pointer text-white rounded-full shadow-md hover:bg-principal/70 transition-colors duration-200 font-semibold text-lg ">
                Explorar las compañias
              </button>
            </Link>
          </div>
        </div>

        {/* Imagen de producto */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="banner.jpg"
            alt="Producto destacado"
            loading="lazy"
            className="w-[500px] h-[500px] object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
