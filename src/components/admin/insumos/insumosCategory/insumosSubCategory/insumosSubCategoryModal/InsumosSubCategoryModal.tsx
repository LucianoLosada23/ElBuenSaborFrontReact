import { useUIState } from "../../../../../../hooks/ui/useUIState";
import Modal from "../../../../../ui/Modal";
import InsumosSubCategoryForm from "../insumosSubCategoryForm/InsumosSubCategoryForm";

export default function InsumosSubCategoryModal() {
  const { isInsumosSubCategoryOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isInsumosSubCategoryOpen}
        onClose={() => toggle("isInsumosSubCategoryOpen")}
        title="Añadir SubCategorías Insumos"
      >
        <InsumosSubCategoryForm/>
      </Modal>
    </>
  );
}
