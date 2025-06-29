import { useUIState } from "../../../hooks/ui/useUIState";
import type { Employee } from "../../../types/auth/register/RegisterEmployee";
import Modal from "../../ui/Modal";
import PromotionsForm from "./PromotionsForm";

type EmployeeModalProps = {
  onRefresh: () => void;
  employeeToEdit?: Employee | null;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
}

export default function PromotionsModal({onRefresh , employeeToEdit , setEmployeeToEdit}: EmployeeModalProps) {
  const { isPromotionsOpen , toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isPromotionsOpen}
        onClose={() => {toggle("isPromotionsOpen") , setEmployeeToEdit(null)}}
        title={employeeToEdit ? "Editar un Empleado" : "Añadir una Promocion"}
      >
        <PromotionsForm
          onRefresh={onRefresh}
          employeeToEdit={employeeToEdit}
          setEmployeeToEdit={setEmployeeToEdit}
        />
      </Modal>
    </>
  );
}
