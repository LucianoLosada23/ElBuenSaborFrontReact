export default function BannerProduct() {
    return (
      <div className="relative bg-green-100">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Texto */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-green-800">
              Encontrá las Mejores Ofertas
            </h1>
            <p className="mt-4 text-lg text-green-700 font-display">
              Platos irresistibles, postres deliciosos, desayunos nutritivos y bebidas refrescantes — todo al mejor precio.
            </p>
            <button className="mt-6 px-6 py-3 cursor-pointer bg-green-700 text-white rounded-full hover:bg-green-800 transition font-semibold">
              Ver productos
            </button>
          </div>
  
          {/* Imagen de producto */}
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
              alt="Producto destacado"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    );
  }
  