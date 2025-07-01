import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useUIState } from "../../hooks/ui/useUIState";
import Modal from "../ui/Modal";
import { useCart } from "../../hooks/useCart";
import { postOrder } from "../../services/shop/OrderServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { translateDeliveryType, translatePayForm } from "../../utils/statusTranslations";

export default function FacturacionPopUp() {
  const { cart, formaDePago, tipoEntrega, clearCart } = useCart();
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
        }, 1000);
        setTimeout(() => {
          clearCart();
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error al crear la orden", error);

      if (error.response && error.response.data) {
        const backendMsg = error.response.data.message || error.response.data || "Error desconocido desde backend.";
        toast.error(backendMsg);
      } else {
        toast.error("Error desconocido al crear la orden.");
      }


    } finally {
      setIsLoading(false);
    }
  };

  // Cuando cambia cart o formaDePago, reseteamos mpUrl y successMsg
  useEffect(() => {
    setMpUrl(null);
    setSuccessMsg(null);
  }, [cart, formaDePago]);

  return (
    <>
      <Modal
        isOpen={isFacturacionOpen}
        onClose={() => toggle("isFacturacionOpen")}
        title={"Detalle De Facturación"}
      >
        <div className="space-y-6 p-4">
          <h3 className="font-bold text-xl text-gray-800 border-b pb-2">Resumen de su Orden</h3>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Tipo de Entrega:</span>
            <span className="text-gray-600 ml-2">{translateDeliveryType(tipoEntrega)}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">Forma de Pago:</span>
          <span className="text-gray-600 ml-2">{translatePayForm(formaDePago)}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-700 mb-3">Productos:</h4>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.product.id} className="border-b border-gray-200 py-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{item.product.title}</span>
                    <span className="text-gray-600">x {item.quantity}</span>
                  </div>
                  {item.clarifications && (
                    <div className="text-sm text-gray-500 mt-1">
                      Aclaraciones: {item.clarifications}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {isLoading && (
            <p className="text-center text-blue-500 font-medium">Procesando orden...</p>
          )}

          {successMsg && (
            <p className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg">
              {successMsg}
            </p>
          )}

          {mpUrl && (
            <div className="flex justify-center mt-4 items-center gap-4 bg-blue-100 p-3 rounded-lg">
              <img src="/mp.svg" alt="Mercado Pago" width={64} height={20} />
              <a href={mpUrl} className="text-blue-600 hover:underline font-medium">
                Ir a Mercado Pago
              </a>
            </div>
          )}

          {!isLoading && !mpUrl && !successMsg && (
            <button
              className="bg-principal w-full py-3 cursor-pointer mt-4 flex gap-2 justify-center items-center rounded-lg text-white font-semibold hover:bg-principal/90 transition shadow-md"
              onClick={handleSubmit}
            >
              Confirmar Orden
              <ArrowRightIcon width={20} height={20} />
            </button>
          )}
        </div>
      </Modal>
    </>
  );

}
