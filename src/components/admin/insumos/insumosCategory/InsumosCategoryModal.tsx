import { useUIState } from "../../../../hooks/ui/useUIState";
import Modal from "../../../ui/Modal";

export default function InsumosCategoryModal() {
  const { isInsumosCategoryOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isInsumosCategoryOpen}
        onClose={() => toggle("isInsumosCategoryOpen")}
        title="Añadir Categorías Insumos"
      >
        <div></div>
      </Modal>
    </>
  );
}
