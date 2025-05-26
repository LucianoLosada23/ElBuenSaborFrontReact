import { object, number, string, boolean, type InferOutput, array} from 'valibot';
import { IngredientCategorySchema } from './IngredientCategory';
import { companySchema } from '../Company/Company';

export const ingredientSchema = object({
  id: number(),
  company_id: companySchema,
  name: string(),
  unit_measure: string(), 
  status: boolean(),
  min_stock: number(),
  current_stock: number(),
  max_stock: number(),
  category_ingredient_id: IngredientCategorySchema
});
export type Ingredient = InferOutput<typeof ingredientSchema>;

export const ingredientListSchema = array(ingredientSchema);
export type IngredientList = InferOutput<typeof ingredientListSchema>;