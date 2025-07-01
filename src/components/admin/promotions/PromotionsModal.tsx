import { useUIState } from "../../../hooks/ui/useUIState";
import type { Promotions } from "../../../types/promotions/Promotions";
import Modal from "../../ui/Modal";
import PromotionsForm from "./PromotionsForm";

type EmployeeModalProps = {
  onRefresh: () => void;
  promotionsToEdit?: Promotions | null;
  setPromotionsToEdit: React.Dispatch<React.SetStateAction<Promotions| null>>;
}

export default function PromotionsModal({onRefresh , promotionsToEdit , setPromotionsToEdit}: EmployeeModalProps) {
  const { isPromotionsOpen , toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isPromotionsOpen}
        onClose={() => {toggle("isPromotionsOpen") , setPromotionsToEdit(null)}}
        title={promotionsToEdit ? "Editar una Promoción" : "Añadir una Promoción"}
      >
        <PromotionsForm
          onRefresh={onRefresh}
          promotionsToEdit={promotionsToEdit}
          setPromotionsToEdit={setPromotionsToEdit}
        />
      </Modal>
    </>
  );
}
