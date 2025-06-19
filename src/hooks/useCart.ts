import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToCart,
  incrementAmount,
  decrementAmount,
  setEntrega,
  setPay,
  type DeliveryType,
  type PayType,
  clearCart,
} from "../features/cartSlice";
import type { Carrito } from "../types/shop/carrito/Carrito";

export function useCart() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart.cart);
  const tipoEntrega = useAppSelector((state) => state.cart.deliveryType);
  const formaDePago = useAppSelector((state) => state.cart.payForm);
  const subtotal = useAppSelector((state) => state.cart.subtotal);
  const descuento = useAppSelector((state) => state.cart.descuento);
  const recargo = useAppSelector((state) => state.cart.recargo);
  const total = useAppSelector((state) => state.cart.total);

  return {
    formaDePago,
    cart,
    tipoEntrega,
    subtotal,
    descuento,
    recargo,
    total,
    addToCart: (item: Carrito) => dispatch(addToCart(item)),
    incrementAmount: (productId: number) => dispatch(incrementAmount({ productId })),
    decrementAmount: (productId: number) => dispatch(decrementAmount({ productId })),
    setEntrega: (entrega: DeliveryType) => dispatch(setEntrega(entrega)),
    setPay: (pay: PayType) => dispatch(setPay(pay)),
    clearCart: () => dispatch(clearCart()),
  };
}
