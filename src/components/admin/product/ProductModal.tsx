import { useUIState } from "../../../hooks/ui/useUIState";
import { useProduct } from "../../../hooks/useProduct";
import Modal from "../../ui/Modal";
import ProductForm from "./ProductForm";

//props
type ProductModalProps = {
  onRefresh: () => void
}

export default function ProductModal({onRefresh} : ProductModalProps) {

  const { isProductOpen, toggle } = useUIState();
  const {setProductEdit} = useProduct()

  return (
    <>
      <Modal
        isOpen={isProductOpen}
        onClose={() => {toggle("isProductOpen") , setProductEdit(null)}}
        title="Añadir un Producto"
      >
        <ProductForm
          onRefresh={onRefresh}
        />
      </Modal>
    </>
  );
}
