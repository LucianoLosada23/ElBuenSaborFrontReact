import { number, object, string, union, null_, type InferOutput, array } from 'valibot';

export const CategoryParentSchema = object({
  id: number(),
  name: string()
});

export const IngredientCategorySchema = object({
  id: number(),
  name: string(),
  category_parent_id: union([CategoryParentSchema, null_()])
});
export type IngredientCategory = InferOutput<typeof IngredientCategorySchema>;

export const ingredientCategoryListSchema = array(IngredientCategorySchema);
export type IngredientCategoryList = InferOutput<typeof ingredientCategoryListSchema>;