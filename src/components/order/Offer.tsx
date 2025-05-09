export default function Offer() {
    const offers = [
        {
          title: "Retiro Local - Domicilio",
          description: "Retirá en el local o recibí en tu casa.",
          icon: "/shop1.png",
        },
        {
          title: "Efectivo",
          description: "Pagá en efectivo al recibir o retirar.",
          icon: "/dollar1.png",
        },
        {
          title: "Mercado Pago",
          description: "Pagá con tarjeta, QR o saldo virtual.",
          icon: "/mercadopago1.svg",
        },
      ];
  
    return (
      <div className=" py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 rounded-2xl">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <img
                src={offer.icon}
                alt={offer.title}
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  