import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { Carrito } from "../types/shop/carrito/Carrito";

export type DeliveryType = "TAKEAWAY" | "DELIVERY";
export type PayType = "EFECTIVO"| "MERCADO_PAGO";

interface CartItem {
  deliveryType: DeliveryType;
  payForm : PayType;
  subtotal: number;
  descuento: number;
  recargo: number;
  total: number;
  cart: Carrito[];
}

const initialState: CartItem = {
  deliveryType: "TAKEAWAY",
  payForm : "EFECTIVO",
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
          quantity: quantity,
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
        item.quantity += 1;
      }
    },

    // Disminuir cantidad (y eliminar si llega a 1 y presionan menos)
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
      }
    },
    setPay (state , action : PayloadAction<PayType>){
      state.payForm = action.payload
    },
    setEntrega(state, action: PayloadAction<DeliveryType>) {
      state.deliveryType = action.payload;
    },
    calculateTotals(
      state,
      action: PayloadAction<{
        cart: { product: { price: number }; amount?: number }[];
      }>
    ) {
      const { cart } = action.payload;
      state.subtotal = cart.reduce(
        (acc, item) => acc + item.product.price * (item.amount ?? 1),
        0
      );
      state.descuento = state.deliveryType === "TAKEAWAY" ? state.subtotal * 0.1 : 0;
      state.recargo = state.deliveryType === "DELIVERY" ? state.subtotal * 0.1 : 0;
      state.total = state.subtotal - state.descuento + state.recargo;
    },
  },
});

export const {
  addToCart,
  incrementAmount,
  decrementAmount,
  setEntrega,
  calculateTotals,
  setPay,
} = cartSlice.actions;

export default cartSlice.reducer;
