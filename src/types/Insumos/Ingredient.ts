import {
  object,
  number,
  string,
  boolean,
  type InferOutput,
  array,
  optional,
  nullable,
} from "valibot";
import { IngredientCategorySchema } from "./IngredientCategory";
import { companySchema } from "../Company/Company";

export const ingredientSchemaCreate = object({
  company: companySchema,
  name: string(),
  price: number(),
  unitMeasure: string(),
  status: boolean(),
  minStock: number(),
  currentStock: number(),
  maxStock: number(),
  categoryIngredient : object({
    id : number()
  }),
  toPrepare : optional(boolean()),
  categoryIdProduct: optional(nullable(number())),
  profit_percentage: optional(number()),
  priceProduct: number(),
  image: optional(nullable(string())),
});

export type IngredientCreate = InferOutput<typeof ingredientSchemaCreate>;


export const ingredientSchema = object({
  id: number(),
  company: companySchema,
  name: string(),
  price: number(),
  unitMeasure: string(),
  status: boolean(),
  minStock: number(),
  currentStock: number(),
  maxStock: number(),
  categoryIngredient: IngredientCategorySchema,
  toPrepare : optional(boolean())
});
export type Ingredient = InferOutput<typeof ingredientSchema>;

export const ingredientListSchema = array(ingredientSchema);
export type IngredientList = InferOutput<typeof ingredientListSchema>;
