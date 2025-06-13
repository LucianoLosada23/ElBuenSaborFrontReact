import { useUIState } from "../../../../hooks/ui/useUIState";
import Modal from "../../../ui/Modal";
import InsumosCategoryForm from "../../insumos/insumosCategory/InsumosCategoryForm";

export default function ProductCategoryModal() {
  const { isProductCategoryOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isProductCategoryOpen}
        onClose={() => toggle("isProductCategoryOpen")}
        title="Añadir Categorías Productos"
      >
        <InsumosCategoryForm />
      </Modal>
    </>
  );
}
