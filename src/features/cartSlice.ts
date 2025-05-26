import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { Carrito } from "../types/shop/carrito/Carrito";

interface CartItem {

  isCartOpen: boolean;
  isFacturacion: boolean;
  cart: Carrito[];
}

const initialState: CartItem = {
  isCartOpen: false,

  isFacturacion: false,
  cart: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    toggleFacturacion: (state) => {
      state.isFacturacion = !state.isFacturacion;
    },

    addToCart: (state, action: PayloadAction<Carrito>) => {
      const { product, amount, clarifications } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.amount += amount;
      } else {
        state.cart.push({
          product,
          amount: amount,
          clarifications: clarifications,
        });
        toast.success("Agregado al carrito con éxito");
      }
    },

    // Aumentar cantidad
    incrementAmount: (state, action: PayloadAction<{ productId: number }>) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.productId
      );
      if (item) {
        item.amount += 1;
      }
    },

    // Disminuir cantidad (y eliminar si llega a 1 y presionan menos)
    decrementAmount: (state, action: PayloadAction<{ productId: number }>) => {
      const index = state.cart.findIndex(
        (item) => item.product.id === action.payload.productId
      );
      if (index !== -1) {
        const item = state.cart[index];
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.cart.splice(index, 1);
          toast.info("Producto eliminado del carrito");
        }

      }
    },
  },
});

export const {
  toggleCart,
  toggleFacturacion,
  addToCart,
  incrementAmount,
  decrementAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
