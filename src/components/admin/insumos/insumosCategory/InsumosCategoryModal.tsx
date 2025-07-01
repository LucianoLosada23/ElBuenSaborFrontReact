import { useUIState } from "../../../../hooks/ui/useUIState";
import { useCategorias } from "../../../../hooks/useCategorias";
import Modal from "../../../ui/Modal";
import InsumosCategoryForm from "./InsumosCategoryForm";

type InsumosCategoryModalProps = {
  onRefresh: () => void;
}

export default function InsumosCategoryModal({onRefresh} : InsumosCategoryModalProps) {
  const { isInsumosCategoryOpen, toggle } = useUIState();
    const {limpiarCategoria} = useCategorias();
  
  return (
    <>
      <Modal
        isOpen={isInsumosCategoryOpen}
        onClose={() => {toggle("isInsumosCategoryOpen") , limpiarCategoria()}}
        title="Añadir Categorías Insumos"
      >
        <InsumosCategoryForm
          onRefresh={onRefresh}
        />
      </Modal>
    </>
  );
}
