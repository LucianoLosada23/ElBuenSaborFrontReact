import { useUIState } from "../../../../hooks/ui/useUIState";
import Modal from "../../../ui/Modal";
import ProductForm from "../productForm/ProductForm";

export default function ProductModal() {
  const { isProductOpen, toggle } = useUIState();
  return (
    <>
      <Modal
        isOpen={isProductOpen}
        onClose={() => toggle("isProductOpen")}
        title="Añadir un Producto"
      >
        <ProductForm/>
      </Modal>
    </>
  );
}
