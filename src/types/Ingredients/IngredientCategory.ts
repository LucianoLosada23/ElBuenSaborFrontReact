import { number, object, string, union, null_ } from 'valibot';

export const IngredientCategorySchema = object({
  id: number(),
  name: string(),
  parentCategory: union([
    object({
      id: number(),
      name: string(),
    }),
    null_(),
  ]),
});