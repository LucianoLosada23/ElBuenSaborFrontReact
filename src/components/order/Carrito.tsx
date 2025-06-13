import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon, TruckIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../hooks/useCart";
import { useUIState } from "../../hooks/ui/useUIState";
import { useAuth } from "../../hooks/auth/useAuth";

export default function Carrito() {
  // Redux hooks
  const {
    cart,
    tipoEntrega,
    subtotal,
    descuento,
    recargo,
    total,
    setPay,
    decrementAmount,
    incrementAmount,
    setEntrega,
  } = useCart();

  const { isCartOpen, toggle, set } = useUIState();
  const { user } = useAuth();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-86 bg-white py-2 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Mi Orden</h1>
        <button onClick={() => toggle("isCartOpen")} className="cursor-pointer">
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
          <div className="p-4 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded items-end justify-center "
              >
                <img
                  src={item.product.image ?? ""}
                  alt={item.product.title}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-col text-sm w-full">
                  <p className="text-xs font-medium">{item.product.title}</p>
                  {item.clarifications && (
                    <p className="text-gray-500 text-xs mt-1 italic">
                      “{item.clarifications}”
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementAmount(item.product.id)}
                        className="px-2 py-1 bg-principal text-white cursor-pointer rounded hover:bg-gray-300 text-sm"
                      >
                        −
                      </button>
                      <span className="font-semibold text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementAmount(item.product.id)}
                        className="px-2 py-1 bg-principal text-white rounded cursor-pointer hover:bg-gray-300 text-sm"
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

          {/* Entrega */}
          <div className="px-4 mt-6">
            <h3 className="font-semibold mb-2 text-base">Entrega</h3>
            <div className="flex justify-center gap-4">
              <div
                className={`border rounded-md py-2 px-4 flex gap-2 items-center cursor-pointer transition ${
                  tipoEntrega === "TAKEAWAY"
                    ? "bg-principal text-white border-principal"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setEntrega("TAKEAWAY"), setPay("EFECTIVO");
                }}
              >
                <BuildingStorefrontIcon width={20} height={20} />
                <h4 className="text-sm">En tienda</h4>
              </div>
              <div
                className={`border rounded-md py-2 px-4 flex gap-2 items-center cursor-pointer transition ${
                  tipoEntrega === "DELIVERY"
                    ? "bg-principal text-white border-principal"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setEntrega("DELIVERY"), setPay("MERCADO_PAGO");
                }}
              >
                <TruckIcon width={20} height={20} />
                <h4 className="text-sm">Delivery</h4>
              </div>
            </div>
          </div>

          {/* Totales */}
          <div className="p-4 border-y bg-white mt-8">
            <div className="flex justify-between text-gray-600 text-sm mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {tipoEntrega === "TAKEAWAY" && (
              <div className="flex justify-between text-green-700 text-sm mb-1">
                <span>10% OFF Retiro en local</span>
                <span>- ${descuento.toFixed(2)}</span>
              </div>
            )}
            {tipoEntrega === "DELIVERY" && (
              <div className="flex justify-between text-red-700 text-sm mb-1">
                <span>10% Recargo Delivery</span>
                <span>+ ${recargo.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-sm">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="p-2">
            <button
              className="bg-principal w-full py-3 cursor-pointer mt-4 flex gap-4 justify-center items-center rounded-full text-white font-medium hover:bg-principal/80 transition"
              onClick={() => {
                if (user.user === null) {
                  set("isLoginModal", true);
                  set("isFacturacionOpen", false);
                } else {
                  set("isFacturacionOpen", true);
                  set("isLoginModal", false);
                }
              }}
            >
              Continuar
              <ArrowRightIcon width={20} height={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
