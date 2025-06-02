import {
  object,
  number,
  string,
  boolean,
  type InferOutput,
  array,
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
  })
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
});
export type Ingredient = InferOutput<typeof ingredientSchema>;

export const ingredientListSchema = array(ingredientSchema);
export type IngredientList = InferOutput<typeof ingredientListSchema>;
