import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  toggleCart,
  toggleFacturacion,
  addToCart,
  incrementAmount,
  decrementAmount,
} from "../features/cartSlice";
import type { Carrito } from "../types/Carrito";

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const isFacturacion = useAppSelector((state) => state.cart.isFacturacion);

  return {
    cart,
    isCartOpen,
    isFacturacion,

    toggleCart: () => dispatch(toggleCart()),
    toggleFacturacion: () => dispatch(toggleFacturacion()),
    addToCart: (item: Carrito) => dispatch(addToCart(item)),
    incrementAmount: (productId: number) =>
      dispatch(incrementAmount({ productId })),
    decrementAmount: (productId: number) =>
      dispatch(decrementAmount({ productId })),
  };
}
