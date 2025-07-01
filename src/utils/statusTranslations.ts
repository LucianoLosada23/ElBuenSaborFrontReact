export const statusMap: Record<string, string> = {
  PENDING_PAYMENT: "Pago pendiente",
  TOCONFIRM: "A confirmar",
  INKITCHEN: "En cocina",
  READY: "Listo",
  DELIVERY: "En reparto",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export const deliveryTypeMap: Record<string, string> = {
  TAKEAWAY: "Para retirar",
  DELIVERY: "Envío a domicilio",
};

export const roleEmployeeMap: Record<string, string> = {
  CASHIER: "Cajero/a",
  COOK: "Cocinero/a",
  DELIVERY: "Repartidor/a",
};

export const unitMeasureMap: Record<string, string> = {
  KILOGRAM: "Kilogramo",
  GRAM: "Gramo",
  LITER: "Litro",
  MILLILITER: "Mililitro",
  UNIT: "Unidad",
};

export const promotionBehaviorMap: Record<string, string> = {
  PRECIO_FIJO: "Precio fijo",
  DESCUENTO_PORCENTAJE: "Descuento %",
  X_POR_Y: "Promo tipo 2x1, 3x2",
};

export const translateRoleEmployee = (role: string) => roleEmployeeMap[role] || role;
export const translateUnitMeasure = (unit: string) => unitMeasureMap[unit] || unit;
export const translatePromotionBehavior = (behavior: string) => promotionBehaviorMap[behavior] || behavior;
export const translateStatus = (status: string) => statusMap[status] || status;
export const translateDeliveryType = (type: string) => deliveryTypeMap[type] || type;
