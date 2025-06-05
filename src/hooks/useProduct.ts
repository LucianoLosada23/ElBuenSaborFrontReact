import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToProduct, removeFromProduct , setProductEdit } from "../features/product/productSlice";
import type { Product } from "../types/shop/product/Product";
import type {Product as PorductAdmin} from "../types/product/product"
export function useProduct() { 
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const productEdit = useAppSelector((state)=> state.product.productEdit)
  return {
    product,
    productEdit,     
    setProduct: (p: Product) => dispatch(addToProduct(p)),
    clearProduct: () => dispatch(removeFromProduct()),
    setProductEdit : (p : PorductAdmin| null) => dispatch(setProductEdit(p))
  };
}
