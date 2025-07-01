import { useUIState } from "../../../../../hooks/ui/useUIState";
import { useCategorias } from "../../../../../hooks/useCategorias";
import Modal from "../../../../ui/Modal";
import InsumosSubCategoryForm from "../../../insumos/insumosCategory/insumosSubCategory/InsumosSubCategoryForm";

  type ProductSubCategoryModalProps = {
    onRefresh: () => void;
  }
export default function ProductSubCategoryModal({onRefresh}:ProductSubCategoryModalProps) {
  const {limpiarCategoria} = useCategorias();

  const { isProductSubCategoryOpen, toggle } = useUIState();

  return (
    <>
      <Modal
        isOpen={isProductSubCategoryOpen}
        onClose={() => {toggle("isProductSubCategoryOpen"), limpiarCategoria()}}
        title="Añadir SubCategorías Productos"
      >
        <InsumosSubCategoryForm 
          onRefresh={onRefresh}
        />
      </Modal>
    </>
  );
}
