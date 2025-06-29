import {
  object,
  number,
  string,
  boolean,
  type InferOutput,
  array,
  optional,
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
  toPrepare : optional(boolean())
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
