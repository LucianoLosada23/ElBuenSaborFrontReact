import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useUIState } from "../../hooks/ui/useUIState";
import Modal from "../ui/Modal";
import { useCart } from "../../hooks/useCart";
import { postOrder } from "../../services/shop/OrderServices";
import { useEffect, useState } from "react";

export default function FacturacionPopUp() {
  const { cart, formaDePago, tipoEntrega } = useCart();
  const { isFacturacionOpen, toggle } = useUIState();

  const [isLoading, setIsLoading] = useState(false);
  const [mpUrl, setMpUrl] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const order = {
        description: "",
        deliveryType: tipoEntrega,
        payForm: formaDePago,
        orderProductDTOs: cart.map((item) => ({
          clarifications: item.clarifications || "",
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const res = await postOrder(order);

      if (formaDePago === "MERCADO_PAGO" && res.startsWith("http")) {
        setMpUrl(res);
      } else {
        setSuccessMsg("La orden se confirmó correctamente.");
        setTimeout(() => {
          toggle("isFacturacionOpen");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al crear la orden", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMpUrl(null);
    setSuccessMsg(null);
  }, [cart, formaDePago]);

  return (
    <Modal
      isOpen={isFacturacionOpen}
      onClose={() => toggle("isFacturacionOpen")}
      title="Detalle De Facturación"
    >
      <div className="space-y-4 p-2 sm:p-4">
        <h3 className="font-semibold text-lg">Resumen de su Orden</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Tipo de Entrega</p>
            <p className="font-medium capitalize">
              {tipoEntrega.toLowerCase()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Forma de Pago</p>
            <p className="font-medium">
              {formaDePago === "MERCADO_PAGO" ? "Mercado Pago" : "Efectivo"}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mt-4 mb-2">Productos:</h4>
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <li key={item.product.id} className="border-b pb-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm sm:text-base line-clamp-2">
                    {item.product.title}
                  </span>
                  <span className="text-sm sm:text-base whitespace-nowrap ml-2">
                    x{item.quantity}
                  </span>
                </div>
                {item.clarifications && (
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                    <span className="font-medium">Notas:</span> {item.clarifications}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <p>Procesando orden...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-principal mx-auto mt-2"></div>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-600 font-medium">{successMsg}</p>
          </div>
        )}

        {mpUrl && (
          <div className="mt-4">
            <a
              href={mpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full px-6 py-3 transition-colors"
            >
              <img 
                src="/mp.svg" 
                alt="Mercado Pago" 
                className="w-16 sm:w-20" 
              />
              <span className="text-blue-600 font-medium">
                Pagar con Mercado Pago
              </span>
              <ArrowRightIcon className="text-blue-600" />
            </a>
            <p className="text-xs text-center text-gray-500 mt-2">
              Serás redirigido al sitio de Mercado Pago
            </p>
          </div>
        )}

        {!isLoading && !mpUrl && !successMsg && (
          <button
            className="bg-principal w-full py-3 cursor-pointer mt-6 flex gap-2 justify-center items-center rounded-full text-white font-medium hover:bg-principal/90 transition disabled:opacity-70"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Confirmar Orden
            <ArrowRightIcon width={20} height={20} />
          </button>
        )}
      </div>
    </Modal>
  );
}