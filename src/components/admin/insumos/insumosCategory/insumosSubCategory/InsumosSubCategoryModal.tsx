import { useUIState } from "../../../../../hooks/ui/useUIState";
import { useCategorias } from "../../../../../hooks/useCategorias";
import Modal from "../../../../ui/Modal";
import InsumosSubCategoryForm from "./InsumosSubCategoryForm";

type InsumosSubCategoryModalProps = {
  onRefresh: () => void;
}

export default function InsumosSubCategoryModal({onRefresh}: InsumosSubCategoryModalProps) {
  const {limpiarCategoria} = useCategorias();
  const { isInsumosSubCategoryOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isInsumosSubCategoryOpen}
        onClose={() => {toggle("isInsumosSubCategoryOpen"), limpiarCategoria()}}
        title="Añadir SubCategorías Insumos"
      >
        <InsumosSubCategoryForm
          onRefresh={onRefresh}
        />
      </Modal>
    </>
  );
}
