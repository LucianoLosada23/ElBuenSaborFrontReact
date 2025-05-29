import { useUIState } from "../../../../../hooks/ui/useUIState";
import Modal from "../../../../ui/Modal";
import InsumosCategoryForm from "../insumosCategoryForm/InsumosCategoryForm";

export default function InsumosCategoryModal() {
  const { isInsumosCategoryOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isInsumosCategoryOpen}
        onClose={() => toggle("isInsumosCategoryOpen")}
        title="Añadir Categorías Insumos"
      >
        <InsumosCategoryForm/>
      </Modal>
    </>
  );
}
