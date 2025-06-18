import { useUIState } from "../../../hooks/ui/useUIState";
import { useProduct } from "../../../hooks/useProduct";
import Modal from "../../ui/Modal";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeModal() {
  const { isEmployeeModalOpen , toggle } = useUIState();
  const {setProductEdit} = useProduct()
  return (
    <>
      <Modal
        isOpen={isEmployeeModalOpen}
        onClose={() => {toggle("isEmployeeModalOpen") , setProductEdit(null)}}
        title="Añadir un Empleado"
      >
        <EmployeeForm/>
      </Modal>
    </>
  );
}
