import { useUIState } from "../../../../hooks/ui/useUIState";
import Modal from "../../../ui/Modal";

export default function InsumosModal() {

  // Redux hooks
  const {isInsumosOpen , toggle} = useUIState()

  return (
   <>
      <Modal isOpen={isInsumosOpen} onClose={() => toggle("isInsumosOpen")} title="Añadir Insumos">
        <div>

        </div>
      </Modal>
   </>
  )
}
