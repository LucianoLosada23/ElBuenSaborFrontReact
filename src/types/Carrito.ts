import type { Product } from "./Product";

export interface Carrito {
    product: Product,
    amount: number,
    clarifications?: string
}
