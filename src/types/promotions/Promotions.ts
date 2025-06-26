import { array, number, object, record, string, type InferOutput } from "valibot";

/* --TYPE PROMOCIONES-- */

//schema para crear un type de promocion 
export const createtypePromotionSchema = object({
    name: string(),
    behavior: string(),
})

export type CreatetypePromotion = InferOutput<typeof createtypePromotionSchema>

//schema para obtener un type de promocion
export const typePromotionSchema = object({
    id: number(),
    createtypePromotionSchema,
    companyId: number()
})

//schema para obtener todos los type de promociones
export const allTypePromotionSchema = array(typePromotionSchema)

//types de type promociones
export type TypePromotion = InferOutput<typeof typePromotionSchema>
export type AllTypePromotion = InferOutput<typeof allTypePromotionSchema>

/* --PROMOCIONES--*/

//schema para crear una promocion 
export const createPromotionsSchema = object({
    title: string(),
    dateFrom: string(),
    dateTo: string(),
    timeFrom: string(),
    timeTo: string(),
    discountDescription: string(),
    promotionTypeId: number(),
    dayOfWeeks: array(string()),
    productIds: array(string()),
    productValues: record(string() , number())
})

export type CreatePromotions = InferOutput<typeof createPromotionsSchema>

//schema para obtener una promocion
export const promotionsSchema = object({
    id: number(),
    companyId: number(),
    title: string(),
    dateFrom: string(),
    dateTo: string(),
    timeFrom: string(),
    timeTo: string(),
    dayOfWeeks: array(string()),
    discountDescription: string(),
    promotionTypeDTO: object({
        id: number(),
        name: string(),
        behavior: string(),
        companyId: number(),
    })
})

//schema para obtener todas promociones
export const allPromotionsSchema = array(promotionsSchema)

//types promotion
export type Promotions = InferOutput<typeof promotionsSchema>
export type AllPromotions = InferOutput<typeof allPromotionsSchema>


