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
        <div className="py-14">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-2xl">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className="bg-bg-light rounded-md shadow-md p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={offer.icon}
                            alt={offer.title}
                            className="w-8 h-8 mb-3" // Imagen más pequeña
                        />
                        <h3 className="text-lg font-semibold mb-1">{offer.title}</h3> {/* Tamaño de texto reducido */}
                        <p className="text-sm text-gray-600">{offer.description}</p> {/* Tamaño de texto reducido */}
                    </div>
                ))}
            </div>
        </div>
    );
}
