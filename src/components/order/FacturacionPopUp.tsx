import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useUIState } from "../../hooks/ui/useUIState";

import Modal from "../ui/Modal";
import { useCart } from "../../hooks/useCart";
import { postOrder } from "../../services/shop/OrderServices";

export default function FacturacionPopUp() {
  // Redux hooks
  const { cart, formaDePago, tipoEntrega } = useCart();
  const { isFacturacionOpen, toggle } = useUIState();

  const handleSubmit = async () => {
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
    await postOrder(order)
  };

  return (
    <>
      <Modal
        isOpen={isFacturacionOpen}
        onClose={() => toggle("isFacturacionOpen")}
        title={"Detalle De Facturación"}
      >
        <div>
          <h3 className="font-semibold text-lg">Su Orden</h3>
          <button
            className="bg-principal w-full py-3 cursor-pointer mt-4 flex gap-4 justify-center items-center rounded-full text-white font-medium hover:bg-principal/80 transition"
            onClick={handleSubmit}
          >
            Continuar
            <ArrowRightIcon width={20} height={20} />
          </button>
        </div>
      </Modal>
    </>
  );
}
