import { useUIState } from "../../../hooks/ui/useUIState";
import type { Employee } from "../../../types/auth/register/RegisterEmployee";
import Modal from "../../ui/Modal";
import EmployeeForm from "./EmployeeForm";

type EmployeeModalProps = {
  onRefresh: () => void;
  employeeToEdit?: Employee | null;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
}

export default function EmployeeModal({onRefresh , employeeToEdit , setEmployeeToEdit}: EmployeeModalProps) {
  const { isEmployeeModalOpen , toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isEmployeeModalOpen}
        onClose={() => {toggle("isEmployeeModalOpen") , setEmployeeToEdit(null)}}
        title={employeeToEdit ? "Editar un Empleado" : "Añadir un Empleado"}
      >
        <EmployeeForm
          onRefresh={onRefresh}
          employeeToEdit={employeeToEdit}
          setEmployeeToEdit={setEmployeeToEdit}
        />
      </Modal>
    </>
  );
}
