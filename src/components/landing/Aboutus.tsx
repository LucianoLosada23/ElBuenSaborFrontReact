export default function Aboutus() {
  return (
    <div className="mt-20 md:mt-36 p-4 sm:p-6 md:p-10" id="about">
      {/* Título con margen superior */}
      <h2 className="font-semibold text-xl sm:text-2xl mb-6 sm:mb-10 font-display text-center text-gris-oscuro mt-4 sm:mt-10">
        Sobre Nosotros
      </h2>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="shadow-lg sm:shadow-xl md:shadow-2xl grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden">
          {/* Contenedor con imagen más grande */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] order-2 md:order-1">
            <img
              src="/delibery.jpg"
              alt="Imagen del banner"
              loading="lazy"
              className="w-full h-full object-cover md:rounded-tl-lg md:rounded-bl-lg"
            />
            <div className="absolute inset-0 bg-terciario/12 md:rounded-tl-lg md:rounded-bl-lg"></div>
          </div>

          {/* Descripción resumida */}
          <div className="flex flex-col justify-center text-center md:text-left bg-white p-4 sm:p-6 md:p-8 h-auto sm:h-[300px] md:h-[400px] order-1 md:order-2">
            <p className="text-base sm:text-lg text-gris-oscuro font-display">
              En <span className="text-black font-semibold">BuenSabor</span>,
              nos especializamos en ofrecerte una experiencia gastronómica única
              a través de nuestra plataforma de venta de comida online. Explora
              un menú variado, haz tu pedido y recíbelo en la puerta de tu
              hogar.
            </p>
            <p className="text-base sm:text-lg text-gris-oscuro mt-4 sm:mt-6 font-display">
              Nuestra misión es garantizar comodidad y calidad en cada pedido,
              utilizando ingredientes frescos y un proceso de entrega rápido
              para que disfrutes de la mejor experiencia posible.
            </p>
            <p className="text-base sm:text-lg text-black mt-4 sm:mt-6 font-display font-semibold">
              ¡Bienvenido a BuenSabor, donde cada bocado cuenta!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}