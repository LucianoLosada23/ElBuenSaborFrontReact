import { useUIState } from "../../../hooks/ui/useUIState";
import Modal from "../../ui/Modal";
import ProductForm from "./ProductForm";

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
