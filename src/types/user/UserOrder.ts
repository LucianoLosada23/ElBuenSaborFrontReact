import {
  array,
  boolean,
  literal,
  null_,
  number,
  object,
  string,
  title,
  union,
  type InferOutput,
} from "valibot";

// Enum para status
const statusEnum = union([
  literal("TOCONFIRM"),
  literal("PENDING_PAYMENT"),
  literal("DELIVERED"),
  literal("CANCELLED"),
  // Agrega otros estados posibles aquí si los hay
]);

// Enum para deliveryType
const deliveryTypeEnum = union([
  literal("TAKEAWAY"),
  literal("DELIVERY"),
  // Agrega otros tipos si los hay
]);

export const clientSchema = object({
  id: number(),
  isActive: boolean(),
  name: string(),
});

export const orderProductSchema = object({
  id: number(),
  title: string(),
  isActive: boolean(),
  orderId: number(),
  productId: number(),
  quantity: number(),
  price: number(),
});

export const orderSchema = object({
  id: number(),
  isActive: boolean(),
  client: clientSchema,
  companyId: number(),
  description: string(),
  status: statusEnum,
  initAt: string(),
  finalizedAt: union([string(), null_()]),
  deliveryType: deliveryTypeEnum,
  total: number(),
  orderProducts: array(orderProductSchema),
});

export const listaDeOrdenesSchema = array(orderSchema);

export type Order = InferOutput<typeof orderSchema>;
export type OrderList = InferOutput<typeof listaDeOrdenesSchema>;