import { useUIState } from "../../../../hooks/ui/useUIState";
import type { TypePromotion } from "../../../../types/promotions/Promotions";
import Modal from "../../../ui/Modal";
import PromotionsTypesForm from "./PromotionsTypesForm";


type EmployeeModalProps = {
  onRefresh: () => void;
  typePromotionToEdit?: TypePromotion | null;
  setTypePromotionToEdit: React.Dispatch<React.SetStateAction<TypePromotion| null>>;
}

export default function PromotionsTypesModal({onRefresh , typePromotionToEdit , setTypePromotionToEdit}: EmployeeModalProps) {
  const { isPromotionsTypesOpen , toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isPromotionsTypesOpen}
        onClose={() => {toggle("isPromotionsTypesOpen") , setTypePromotionToEdit(null)}}
        title={typePromotionToEdit ? "Editar Tipo Promoción" : "Añadir Tipo Promoción"}
      >
        <PromotionsTypesForm
          onRefresh={onRefresh}
          typePromotionToEdit={typePromotionToEdit}
          setTypePromotionToEdit={setTypePromotionToEdit}
        />
      </Modal>
    </>
  );
}
