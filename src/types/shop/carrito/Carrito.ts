import type { Product } from "../product/Product";

export interface Carrito {
    product: Product,
    amount: number,
    clarifications?: string
}
