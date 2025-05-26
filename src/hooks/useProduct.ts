import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToProduct, removeFromProduct } from "../features/productSlice";
import type { Product } from "../types/shop/product/Product";

export function useProduct() {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  return {
    product,
    setProduct: (p: Product) => dispatch(addToProduct(p)),
    clearProduct: () => dispatch(removeFromProduct()),
  };
}
