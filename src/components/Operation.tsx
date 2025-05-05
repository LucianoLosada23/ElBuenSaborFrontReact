

export default function Operation() {
  const info = [
    {
      title: "Elige tu comida",
      description: "Explora nuestro menú y selecciona tus platos favoritos."
    },
    {
      title: "Realiza tu pedido",
      description: "Confirma tu pedido y elige la mejor opción de pago."
    },
    {
      title: "Recibe tu comida",
      description: "Disfruta tu pedido en la comodidad de tu hogar."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mt-36 py-20" id='steps'>
      <h2 className="font-semibold text-2xl font-display text-center mb-10 text-gris-oscuro">
        ¿Cómo Funciona?
      </h2>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 text-center items-center">
        {info.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="bg-principal shadow-2xl rounded-full p-4 flex items-center justify-center w-40 h-40 md:w-40 md:h-40 relative z-10">
              <p className='text-5xl font-bold text-white'>{index + 1}</p>
            </div>
            <h3 className="font-semibold mt-4 text-[20px] text-gris-oscuro font-display">{step.title}</h3>
            <p className="text-gray-600 mt-2 font-display">{step.description}</p>
            {/* Flecha entre los pasos */}
            {index !== info.length - 1 && (
              <div className=" md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 w-40 h-5 flex items-center justify-center">
                <img
                  src="/arrow2.svg"
                  alt="Flecha"
                  width={120}
                  height={20}
                  className="object-contain "
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}