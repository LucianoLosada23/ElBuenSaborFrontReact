import axios from "axios";
import { safeParse } from "valibot";
import { ingredientCategoryListSchema } from "../../../../types/Ingredients/IngredientCategory";

export const getAllInsumosCategory = async () => {
  try {
    const url = "/public/json/ingredientCategory.json";
    const { data } = await axios.get(url);
    const result = safeParse(ingredientCategoryListSchema, data);
    console.log(result);
    
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener las categorías de insumos:", error);
  }
};
