import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { Carrito } from "../types/shop/carrito/Carrito";

export type DeliveryType = "TAKEAWAY" | "DELIVERY";
export type PayType = "EFECTIVO" | "MERCADO_PAGO";

interface CartItem {
  deliveryType: DeliveryType;
  payForm: PayType;
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  cart: Carrito[];
}

const initialState: CartItem = {
  deliveryType: "TAKEAWAY",
  payForm: "EFECTIVO",
  subtotal: 0,
  descuento: 0,
  recargo: 0,
  total: 0,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Carrito>) => {
      const { product, quantity, clarifications } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          product,
          quantity,
          clarifications,
        });
        toast.success("Agregado al carrito con éxito");
      }

      calculateTotals(state);
    },

    incrementAmount: (state, action: PayloadAction<{ productId: number }>) => {
      const item = state.cart.find(
        (item) => item.product.id === action.payload.productId
      );
      if (item) {
        item.quantity += 1;
        calculateTotals(state);
      }
    },

    decrementAmount: (state, action: PayloadAction<{ productId: number }>) => {
      const index = state.cart.findIndex(
        (item) => item.product.id === action.payload.productId
      );
      if (index !== -1) {
        const item = state.cart[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart.splice(index, 1);
          toast.info("Producto eliminado del carrito");
        }
        calculateTotals(state);
      }
    },

    setEntrega: (state, action: PayloadAction<DeliveryType>) => {
      state.deliveryType = action.payload;
      calculateTotals(state);
    },

    setPay: (state, action: PayloadAction<PayType>) => {
      state.payForm = action.payload;
    },

    clearCart: (state) => {
      state.cart = [];
      calculateTotals(state);
    },
  },
});

function calculateTotals(state: CartItem) {
  state.subtotal = state.cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (state.deliveryType === "TAKEAWAY") {
    state.descuento = state.subtotal * 0.1;
    state.recargo = 0;
  } else if (state.deliveryType === "DELIVERY") {
    state.recargo = state.subtotal * 0.1;
    state.descuento = 0;
  } else {
    state.recargo = 0;
    state.descuento = 0;
  }

  state.total = state.subtotal - state.descuento + state.recargo;
}

export const {
  addToCart,
  incrementAmount,
  decrementAmount,
  setEntrega,
  setPay,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
