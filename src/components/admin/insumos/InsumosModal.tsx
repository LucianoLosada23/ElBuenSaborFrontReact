import { useInsumoEdit } from "../../../hooks/insumos/useInsumoEdit";
import { useUIState } from "../../../hooks/ui/useUIState";
import Modal from "../../ui/Modal";
import InsumosForm from "./InsumosForm";

export default function InsumosModal() {

  // Redux hooks
  const {isInsumosOpen , toggle} = useUIState()
  const {setEdit} = useInsumoEdit()

  return (
   <>
      <Modal isOpen={isInsumosOpen} onClose={() => {
        toggle("isInsumosOpen");
        setEdit(null);
        setTimeout(() => window.location.reload(), 500); // recarga tras cerrar
      }} title="Añadir Insumos">
       <InsumosForm/>
      </Modal>
   </>
  )
}
