/*import { useMemo } from "react";
import type  {Carrito} from "../types/Carrito";

export function useCartTotals(cart: Carrito[]) {
  return useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.amount, 0);
    const total = subtotal; // o sumar impuestos/envíos si hay
    return { subtotal, total };
  }, [cart]);
}*/
