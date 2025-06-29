export default function Operation() {
  const info = [
    {
      title: "Elige tu comida",
      description: "Explora nuestro menú y selecciona tus platos favoritos.",
    },
    {
      title: "Realiza tu pedido",
      description: "Confirma tu pedido y elige la mejor opción de pago.",
    },
    {
      title: "Recibe tu comida",
      description: "Disfruta tu pedido en la comodidad de tu hogar.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-20 md:mt-36 py-10 md:py-16 lg:py-20 px-4 sm:px-6" id="steps">
      <h2 className="font-semibold text-xl sm:text-2xl font-display text-center mb-8 md:mb-10 text-gris-oscuro">
        ¿Cómo Funciona?
      </h2>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 text-center items-start">
        {info.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center px-4">
            {/* Número circular */}
            <div className="bg-principal shadow-lg md:shadow-xl lg:shadow-2xl rounded-full p-3 sm:p-4 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 relative z-10">
              <p className="text-4xl sm:text-5xl font-bold text-white">{index + 1}</p>
            </div>
            
            {/* Contenido del paso */}
            <div className="mt-3 sm:mt-4">
              <h3 className="font-semibold text-lg sm:text-[19px] md:text-[20px] text-gris-oscuro font-display">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-[15px] font-display">
                {step.description}
              </p>
            </div>

            {/* Flecha entre los pasos (solo en desktop) */}
            {index !== info.length - 1 && (
              <div className="hidden md:block absolute top-1/3 md:top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-24 lg:w-32 h-5 flex items-center justify-center">
                <img
                  src="/arrow2.svg"
                  alt="Flecha"
                  loading="lazy"
                  className="object-contain w-full h-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}