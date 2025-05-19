import { useCart } from "../../hooks/useCart";
import Modal from "../ui/Modal";

export default function FacturacionPopUp() {
  const {isFacturacion , toggleFacturacion} = useCart()
  return (
    <>
      <Modal isOpen={isFacturacion} onClose={() => toggleFacturacion()} title={"Detalle De Facturación"}>
        <div>
          <h3 className="font-semibold text-lg">Su Orden</h3>
        </div>
      </Modal>
    </>
  );
}
