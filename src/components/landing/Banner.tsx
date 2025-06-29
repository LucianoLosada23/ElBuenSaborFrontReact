import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-12 md:gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-wide drop-shadow-sm">
            Ordena Cómodo Desde Tu Casa
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 font-medium max-w-xl mx-auto lg:mx-0 tracking-wide leading-relaxed">
            Descubrí nuestro menú digital y pedí tus platos favoritos desde la
            comodidad de tu casa.
          </p>
          <div className="mt-6 sm:mt-8">
            <Link to={"/catalogo"}>
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-principal cursor-pointer text-white rounded-full shadow-md hover:bg-principal/70 transition-colors duration-200 font-semibold text-base sm:text-lg">
                Explorar Menú
              </button>
            </Link>
          </div>
        </div>

        {/* Imagen de producto */}
        <div className="flex-1 flex justify-center lg:justify-end mb-6 sm:mb-0">
          <img
            src="banner.jpg"
            alt="Producto destacado"
            loading="lazy"
            className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
}