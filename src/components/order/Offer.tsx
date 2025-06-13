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
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 "
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full">
                <img
                  src={offer.icon}
                  alt={offer.title}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                {offer.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600">{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
