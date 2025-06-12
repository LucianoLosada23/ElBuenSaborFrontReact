import { array, number, object, optional, string, type InferOutput } from "valibot";

export const orderSchema = object({
  description: optional(string()),
  deliveryType: string(),
  payForm: string(),
  orderProductDTOs: array(object({
    clarifications: string(),
    productId: number(),
    quantity: number()
  }))
})

export type Order = InferOutput<typeof orderSchema>
