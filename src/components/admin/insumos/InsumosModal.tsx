import { useInsumoEdit } from "../../../hooks/insumos/useInsumoEdit";
import { useUIState } from "../../../hooks/ui/useUIState";
import Modal from "../../ui/Modal";
import InsumosForm from "./InsumosForm";

type InsumosModalProps = {
  onRefresh: () => void
}

export default function InsumosModal({onRefresh}:InsumosModalProps) {

  // Redux hooks
  const {isInsumosOpen , toggle} = useUIState()
  const {setEdit} = useInsumoEdit()

  return (
   <>
      <Modal isOpen={isInsumosOpen} onClose={() => {toggle("isInsumosOpen"), setEdit(null), onRefresh()}} title="Añadir Insumos">
       <InsumosForm
        onRefresh={onRefresh}
       />
      </Modal>
   </>
  )
}
