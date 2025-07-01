import type { Product } from "../types/product/product";

export function getAppliedPrice(product: Product, quantity: number): number {
  let priceToApply = product.price;

  if (product.promotionType) {
    const behavior = product.promotionType;
    const promoValue = product.promotionalPrice;
    const extraValue = product.promotionalExtraValue;

    switch (behavior) {
      case "PRECIO_FIJO":
        if (promoValue != null) {
          priceToApply = promoValue;
        }
        break;
      case "DESCUENTO_PORCENTAJE":
        if (promoValue != null) {
          priceToApply = promoValue;
        }
        break;
      case "X_POR_Y":
        if (promoValue != null && extraValue != null) {
          const x = promoValue;
          const y = extraValue;
          const cantidadPromos = Math.floor(quantity / x);
          const resto = quantity % x;
          const unidadesACobrar = cantidadPromos * y + resto;
          priceToApply = (product.price * unidadesACobrar) / quantity;
        }
        break;
      default:
        priceToApply = product.price;
    }
  }

  return priceToApply;
}
