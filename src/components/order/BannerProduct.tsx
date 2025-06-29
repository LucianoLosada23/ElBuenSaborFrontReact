export default function BannerProduct() {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left px-2 sm:px-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-green-900 leading-tight tracking-wide drop-shadow-sm">
            Encontrá las Mejores Ofertas
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-green-900 font-medium max-w-xl mx-auto lg:mx-0 tracking-wide leading-relaxed">
            Platos irresistibles, postres deliciosos, desayunos nutritivos y
            bebidas refrescantes — todo al mejor precio.
          </p>
          <div className="mt-6 sm:mt-8">
            <button className="px-6 py-2 sm:px-8 sm:py-3 bg-green-700 cursor-pointer text-white rounded-full shadow-md hover:bg-green-800 transition-colors duration-200 font-semibold text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-green-300">
              Ver productos
            </button>
          </div>
        </div>

        {/* Imagen de producto */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <img
            src="banner.png"
            alt="Producto destacado"
            loading="lazy"
            className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] object-cover rounded-2xl lg:rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}