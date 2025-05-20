import { XMarkIcon } from "@heroicons/react/24/outline";

import { useCart } from "../../hooks/useCart";
import { useAppSelector } from "../../app/hooks";

export default function Carrito() {
  const { isCartOpen, cart, toggleCart, decrementAmount, incrementAmount , toggleFacturacion} = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * (item.amount ?? 1),
    0
  );
  const descuento = subtotal * 0.1;
  const total = subtotal - descuento;

  const facturacion = useAppSelector(state => state.cart.isFacturacionOpen);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-86 bg-white py-2 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Mi Orden</h1>
        <button onClick={() => toggleCart()} className="cursor-pointer">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Carrito vacío */}
      {cart.length === 0 ? (
        <div className="p-4 flex justify-center items-center h-[calc(100%-240px)]">
          <p>No hay productos agregados al carrito</p>
        </div>
      ) : (
        <>
          {/* Lista de productos */}
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-240px)]">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3  p-3 rounded items-end justify-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  loading="lazy"
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-col text-sm w-full">
                  <p className=" text-xs">{item.product.name}</p>
                  {item.clarifications && (
                    <p className="text-gray-500 text-xs mt-1 italic">
                      “{item.clarifications}”
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementAmount(item.product.id)}
                        className="px-2 py-1 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 text-sm"
                      >
                        −
                      </button>
                      <span className="font-semibold text-xs">
                        {item.amount}
                      </span>
                      <button
                        onClick={() => incrementAmount(item.product.id)}
                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between text-gray-800 text-sm mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600 mb-2">
              <span>10% OFF Retiro en local</span>
              <span>- ${descuento.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="bg-principal w-full py-3 cursor-pointer mt-4 rounded-full text-white font-medium hover:bg-terciario transition"
              onClick={() => toggleFacturacion()}
            >
              Continuar
            </button>
          </div>
        </>
      )}

    </div>
  );
}
