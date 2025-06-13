import type { Product } from "../../product/product";

export interface Carrito {
    product: Product,
    quantity: number,
    clarifications?: string
}


