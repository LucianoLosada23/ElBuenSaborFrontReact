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

export const statusColorMap: Record<string, string> = {
  PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
  TOCONFIRM: "bg-gray-200 text-gray-800",
  INKITCHEN: "bg-orange-200 text-orange-900",
  READY: "bg-green-200 text-green-900",
  DELIVERY: "bg-blue-200 text-blue-900",
  DELIVERED: "bg-emerald-200 text-emerald-900",
  CANCELLED: "bg-red-200 text-red-900",
};

export const dayOfWeekMap: Record<string, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

export const genero: Record<string, string> = {
  MASCULINO: "Masculino",
  FEMENINO: "Femenino",
  OTRO: "Otro"
};

export const payform: Record<string, string> = {
  EFECTIVO: "Efectivo",
  MERCADO_PAGO: "Mercado Pago",
};

export const translateRoleEmployee = (role: string) => roleEmployeeMap[role] || role;
export const translateUnitMeasure = (unit: string) => unitMeasureMap[unit] || unit;
export const translatePromotionBehavior = (behavior: string) => promotionBehaviorMap[behavior] || behavior;
export const translateStatus = (status: string) => statusMap[status] || status;
export const translateDeliveryType = (type: string) => deliveryTypeMap[type] || type;
export const translateDayOfWeek = (day: string) => dayOfWeekMap[day] || day;
export const translateGenero = (gen: string) => genero[gen] || gen;
export const translatePayForm = (pay: string) => payform[pay] || pay;
