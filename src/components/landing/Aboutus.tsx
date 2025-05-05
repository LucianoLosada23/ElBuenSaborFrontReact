
export default function Aboutus() {
  return (
    <div className="mt-36 p-10" id="about">
      {/* Título con margen superior */}
      <h2 className="font-semibold text-2xl mb-10 font-display text-center text-gris-oscuro mt-10">
        Sobre Nosotros
      </h2>
      
      <div className="max-w-7xl mx-auto p-6  items-center">
        <div className="shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Contenedor con imagen más grande */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src="/delibery.jpg"
            alt="Imagen del banner"
            className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
          />
          <div className="absolute inset-0 bg-terciario/12 rounded-tl-lg rounded-bl-lg"></div>
        </div> 

        {/* Descripción resumida */}
        <div className="flex flex-col justify-center text-center md:text-left bg-white rounded-tr-lg rounded-br-lg px-8 h-[400px]">
          <p className="text-lg text-gris-oscuro font-display">
            En <span className="text-black font-semibold">BuenSabor</span>, nos especializamos en ofrecerte una experiencia gastronómica única a través de nuestra plataforma de venta de comida online. Explora un menú variado, haz tu pedido y recíbelo en la puerta de tu hogar.
          </p>
          <p className="text-lg text-gris-oscuro mt-6 font-display">
            Nuestra misión es garantizar comodidad y calidad en cada pedido, utilizando ingredientes frescos y un proceso de entrega rápido para que disfrutes de la mejor experiencia posible.
          </p>
          <p className="text-lg text-black mt-6 font-display font-semibold">
            ¡Bienvenido a BuenSabor, donde cada bocado cuenta!
          </p>
        </div>
        </div>

      </div>
    </div>
  );
}
