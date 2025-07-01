import { array, boolean, null_, number, object, record, string, union, value, type InferOutput } from "valibot";

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
    ...createtypePromotionSchema.entries,
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
    productIds: array(number()),
    productValues: record(string() , number()),
    extraValues: record(string(), number())
})

export type CreatePromotions = InferOutput<typeof createPromotionsSchema>

//schema para obtener una promocion
// Producto dentro de cada productPromotion
const productSchema = object({
  id: number(),
  title: string(),
  price: number(),
  isActive: boolean(),
  companyId: union([number(), null_()]),
});

// Elemento del array productPromotions
const productPromotionSchema = object({
  id: number(),
  isActive: boolean(),
  productId: union([number(), null_()]),
  promotionId: union([number(), null_()]),
  product: productSchema,
  value: number(),
  extraValue: union([number(), null_()]),
});

// promotionTypeDTO
const promotionTypeSchema = object({
  id: number(),
  name: string(),
  behavior: string(),
  companyId: union([number(), null_()]),
  isActive: boolean(),
});

// Schema principal
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
  isActive: boolean(),
  productPromotions: array(productPromotionSchema),
  promotionTypeDTO: promotionTypeSchema,
});


//schema para obtener todas promociones
export const allPromotionsSchema = array(promotionsSchema)

//types promotion
export type Promotions = InferOutput<typeof promotionsSchema>
export type AllPromotions = InferOutput<typeof allPromotionsSchema>


