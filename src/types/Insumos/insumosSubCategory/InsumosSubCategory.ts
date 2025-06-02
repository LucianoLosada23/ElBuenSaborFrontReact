import { number, object, string, type InferOutput } from "valibot";

export const IngredientSubCategoryCreateSchema = object({
  name: string(),
    company: object({
    id: number(),
  }),
  parent: object({
    id: number(),
  }),
});

export type IngredientSubCategoryCreate = InferOutput<typeof IngredientSubCategoryCreateSchema>;
