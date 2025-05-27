import { useUIState } from "../../hooks/ui/useUIState";
import Modal from "../ui/Modal";

export default function FacturacionPopUp() {

  // Redux hooks
  const {isFacturacionOpen , toggle} = useUIState()
  
  return (
    <>
      <Modal isOpen={isFacturacionOpen} onClose={() => toggle("isFacturacionOpen")} title={"Detalle De Facturación"}>
        <div>
          <h3 className="font-semibold text-lg">Su Orden</h3>
        </div>
      </Modal>
    </>
  );
}
