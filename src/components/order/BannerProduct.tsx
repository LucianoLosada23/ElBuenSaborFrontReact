export default function BannerProduct() {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 min-h-[600px] flex items-center">
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display text-green-900 leading-tight tracking-wide drop-shadow-sm">
            Encontrá las Mejores Ofertas
          </h1>
          <p className="mt-6 text-lg text-green-900 font-medium max-w-xl mx-auto lg:mx-0 tracking-wide leading-relaxed">
            Platos irresistibles, postres deliciosos, desayunos nutritivos y
            bebidas refrescantes — todo al mejor precio.
          </p>
          <div className="mt-8">
            <button className="px-8 py-3 bg-green-700 cursor-pointer text-white rounded-full shadow-md hover:bg-green-800 transition-colors duration-200 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-green-300">
              Ver productos
            </button>
          </div>
        </div>

        {/* Imagen de producto */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="banner.png"
            alt="Producto destacado"
            loading="lazy"
            className="w-[500px] h-[500px] object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
