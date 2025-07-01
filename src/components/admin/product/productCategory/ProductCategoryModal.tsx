import { useUIState } from "../../../../hooks/ui/useUIState";
import { useCategorias } from "../../../../hooks/useCategorias";
import Modal from "../../../ui/Modal";
import InsumosCategoryForm from "../../insumos/insumosCategory/InsumosCategoryForm";

type ProductCategoryModalProps = {
  onRefresh: () => void;
}

export default function ProductCategoryModal({onRefresh}:ProductCategoryModalProps) {
  
  const {limpiarCategoria} = useCategorias();
  const { isProductCategoryOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isProductCategoryOpen}
        onClose={() => {toggle("isProductCategoryOpen"), limpiarCategoria()}}
        title="Añadir Categorías Productos"
      >
        <InsumosCategoryForm 
          onRefresh={onRefresh}
        />

      </Modal>
    </>
  );
}
