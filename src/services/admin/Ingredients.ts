import { safeParse } from "valibot";
import { ingredientListSchema } from "../../types/Ingredients/Ingredient";
import axios from "axios";

export const getAllIngredients = async () => {
  try {
    const url = "/public/json/ingredient.json";
    const { data } = await axios.get(url);
    const result = safeParse(ingredientListSchema, data);
    if (result.success) {
      return result.output;
    } else {
      console.warn("Falló el parseo del schema:", result.issues);
      return []; 
    }
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
    return []; 
  }
};
