

export default function BannerProduct() {
  return (
    <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-[60%_40%] items-center">
      <div className="bg-gris-claro h-64 p-10 rounded-tl-lg rounded-bl-lg">
        <h2 className="text-3xl font-bold font-display"><span className="font-bold text-4xl text-principal">10%</span> Descuento</h2>
        <p className="mt-4 font-display">
          Lista de los mejores platos, postres, desayunos, bebidas...
        </p>
        <button className="font-display mt-4 px-20 py-4 text-[12px] text-white text-sm cursor-pointer bg-principal rounded-lg font-semibold uppercase tracking-widest hover:bg-terciario transition-all duration-300">
          Ver Más
        </button>
      </div>
      <div className="relative w-full h-64 rounded-r-lg overflow-hidden">
        <img
          src="/bannerproduct1.webp"
          alt="Imagen del banner"
          className="object-cover"
        />
      </div>
    </div>
  );
}
