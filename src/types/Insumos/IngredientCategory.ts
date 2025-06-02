import {
  number,
  object,
  string,
  union,
  null_,
  type InferOutput,
  array,
} from "valibot";
import { companySchema } from "../Company/Company";

export const IngredientCategoryCreate = object({
  name: string(),
    company: object({
    id: number(),
  }),
});

export const CategoryParentSchema = object({
  id: number(),
  name: string(),
});

export const IngredientCategorySchema = object({
  company: companySchema,
  id: number(),
  name: string(),
  parent: union([CategoryParentSchema, null_()]),
});

export type IngredientCategoryCreate = InferOutput<typeof IngredientCategoryCreate>;
export type IngredientCategory = InferOutput<typeof IngredientCategorySchema>;

export const ingredientCategoryListSchema = array(IngredientCategorySchema);
export type IngredientCategoryList = InferOutput<
  typeof ingredientCategoryListSchema
>;

