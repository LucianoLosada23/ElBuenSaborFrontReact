import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addToCart,
  incrementAmount,
  decrementAmount,
  setEntrega,
  setPay,
  calculateTotals,
  type DeliveryType,
  type PayType,
} from "../features/cartSlice";
import type { Carrito } from "../types/shop/carrito/Carrito";
import { useEffect } from "react";

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const tipoEntrega = useAppSelector((state) => state.cart.deliveryType);
  const formaDePago = useAppSelector((state) => state.cart.payForm);
  const subtotal = useAppSelector((state) => state.cart.subtotal);
  const descuento = useAppSelector((state) => state.cart.descuento);
  const recargo = useAppSelector((state) => state.cart.recargo);
  const total = useAppSelector((state) => state.cart.total);

  useEffect(() => {
    dispatch(calculateTotals({ cart }));
  }, [cart, tipoEntrega, dispatch]);

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
    setPay : (pay : PayType) => dispatch(setPay(pay))
  };
}