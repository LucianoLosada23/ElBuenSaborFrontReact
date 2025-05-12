import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/Product';

interface ProductType {
    product : Product | null
}

const initialState: ProductType = {
    product : null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
   
    addToProduct: (state, action: PayloadAction<Product>) => { //Agregar al carrito , si ya existe el producto aumentar cantidad
        state.product = action.payload
    },

    removeFromCart: (state) => { //Cerrar Popup
        state.product = null;
    },

  },
});

export const {addToProduct , removeFromCart} = productSlice.actions;
export default productSlice.reducer;
