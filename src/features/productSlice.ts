import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

interface ProductType {
  product: Product | null;
}

const initialState: ProductType = {
  product: null,
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
  },
});

export const { addToProduct, removeFromProduct } = productSlice.actions;
export default productSlice.reducer;
