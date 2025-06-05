import { useUIState } from "../../../hooks/ui/useUIState";
import { useProduct } from "../../../hooks/useProduct";
import Modal from "../../ui/Modal";
import ProductForm from "./ProductForm";

export default function ProductModal() {
  const { isProductOpen, toggle } = useUIState();
  const {setProductEdit} = useProduct()
  return (
    <>
      <Modal
        isOpen={isProductOpen}
        onClose={() => {toggle("isProductOpen") , setProductEdit(null)}}
        title="Añadir un Producto"
      >
        <ProductForm/>
      </Modal>
    </>
  );
}
