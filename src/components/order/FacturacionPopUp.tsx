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
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Resumen de su Orden</h3>

          <div>
            <span className="font-medium">Tipo de Entrega:</span> {tipoEntrega}
          </div>

          <div>
            <span className="font-medium">Forma de Pago:</span> {formaDePago}
          </div>

          <div>
            <h4 className="font-medium mt-2">Productos:</h4>
            <ul className="space-y-2 mt-1">
              {cart.map((item) => (
                <li key={item.product.id} className="border-b py-2">
                  <div className="flex justify-between">
                    <span>{item.product.title}</span>
                    <span>x {item.quantity}</span>
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

          {isLoading && <p className="text-center">Procesando orden...</p>}

          {successMsg && (
            <p className="text-green-600 text-center font-medium">
              {successMsg}
            </p>
          )}

          {mpUrl && (
            <div className="flex justify-center mt-4 items-center gap-8 bg-blue-300 rounded-full">
              <img src="/mp.svg" alt="Mercado Pago" width={64} height={20} />
              <a href={mpUrl}>Ir a Mercado Pago</a>
            </div>
          )}

          {!isLoading && !mpUrl && !successMsg && (
            <button
              className="bg-principal w-full py-3 cursor-pointer mt-4 flex gap-4 justify-center items-center rounded-full text-white font-medium hover:bg-principal/80 transition"
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
