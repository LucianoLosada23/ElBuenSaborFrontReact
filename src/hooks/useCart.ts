import { useAppDispatch, useAppSelector } from "../app/hooks";
import {

  addToCart,
  incrementAmount,
  decrementAmount,
} from "../features/cartSlice";
import type { Carrito } from "../types/shop/carrito/Carrito";

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);


  return {
    cart,
    addToCart: (item: Carrito) => dispatch(addToCart(item)),
    incrementAmount: (productId: number) =>
      dispatch(incrementAmount({ productId })),
    decrementAmount: (productId: number) =>
      dispatch(decrementAmount({ productId })),
  };
}
