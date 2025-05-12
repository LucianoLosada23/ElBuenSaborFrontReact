import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/Product';
import {toast} from "react-toastify"

interface CartProduct {
    product : Product
    cantidad : number
}

interface CartItem {
    isCartOpen: boolean;
    cart : CartProduct[]
}

const initialState: CartItem = {
  isCartOpen: false,
  cart : []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    toggleCart: (state) => {   //Abrir o Cerrar Carrito
      state.isCartOpen = !state.isCartOpen;
    },

    addToCart: (state, action: PayloadAction<Product>) => { //Agregar al carrito , si ya existe el producto aumentar cantidad
        const existingItem = state.cart.find(item => item.product.id === action.payload.id);
        
        if (existingItem) {
          existingItem.cantidad += 1;
        } else {
          state.cart.push({ product: action.payload, cantidad: 1 });
          toast.success("Agregado al carrito con éxito")
        }
    }

  },
});

export const {toggleCart , addToCart} = cartSlice.actions;
export default cartSlice.reducer;
