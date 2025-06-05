import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product as ProductAdmin} from "../../types/product/product";
import type { Product } from "../../types/shop/product/Product";

interface ProductType {
  product: Product | null;
  productEdit: ProductAdmin| null;
}

const initialState: ProductType = {
  product: null,
  productEdit: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    removeFromProduct: (state) => {
      //Cerrar Popup
      state.product = null;
    },

    setProductEdit: (state, action: PayloadAction<ProductAdmin | null>) => {
      state.productEdit = action.payload;
    },
    clearInsumoEdit: (state) => {
      state.productEdit = null;
    },
  },
});

export const { addToProduct, removeFromProduct, setProductEdit, clearInsumoEdit } = productSlice.actions;
export default productSlice.reducer;
