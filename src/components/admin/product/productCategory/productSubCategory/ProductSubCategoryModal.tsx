import { useUIState } from "../../../../../hooks/ui/useUIState";
import Modal from "../../../../ui/Modal";
import InsumosSubCategoryForm from "../../../insumos/insumosCategory/insumosSubCategory/InsumosSubCategoryForm";
export default function ProductSubCategoryModal() {
  const { isProductSubCategoryOpen, toggle } = useUIState();

  return (
    <>
      <Modal
        isOpen={isProductSubCategoryOpen}
        onClose={() => toggle("isProductSubCategoryOpen")}
        title="Añadir SubCategorías Productos"
      >
        <InsumosSubCategoryForm />
      </Modal>
    </>
  );
}
