import { array, nullable, number, object, optional, string, type InferOutput } from "valibot";

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

export const orderByCompanySchema = object({
  id: number(),
  client: object({
    id: number(),
    name: string()
  }),
  companyId: number(),
  description: optional(string()),
  status: string(),
  initAt: string(),
  finalizedAt: nullable(string()),
  deliveryType: string(),
  total: number(),
  orderProducts: array(object({
    id: number(),
    orderId: number(),
    productId: number(),
    quantity: number(),
    price: number()
  }))
})



export const orderByCompanyListSchema = array(orderByCompanySchema)

export type Order = InferOutput<typeof orderSchema>
export type OrderByCompany = InferOutput<typeof orderByCompanySchema>
export type OrderByCompanyList = InferOutput<typeof orderByCompanyListSchema>