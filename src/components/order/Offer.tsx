export default function Offer() {
  const offers = [
    {
      title: "Retiro o Envío",
      description: "Elegí si pasar por el local o recibir en tu puerta.",
      icon: "/shop1.png",
    },
    {
      title: "Pago en Efectivo",
      description: "Pagá cuando lo recibís, simple y seguro.",
      icon: "/dollar1.png",
    },
    {
      title: "Mercado Pago",
      description: "Usá QR, tarjeta o saldo virtual sin complicaciones.",
      icon: "/mercadopago1.svg",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 sm:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 sm:gap-5 mb-4 sm:mb-5">
                <div className="p-2 sm:p-3 bg-gray-50 rounded-full flex-shrink-0">
                  <img
                    src={offer.icon}
                    alt={offer.title}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {offer.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                    {offer.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}