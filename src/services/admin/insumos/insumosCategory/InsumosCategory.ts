import axios from "axios";
import { safeParse } from "valibot";
import {
  IngredientCategoryCreate,
  ingredientCategoryListSchema,
} from "../../../../types/Ingredients/IngredientCategory";

export const getAllInsumosCategory = async () => {
  try {
    const url = "http://localhost:8080/api/v1/category-ingredients";
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

export const postInsumosCategory = async (category: IngredientCategoryCreate) => {
  try {
    const url = "http://localhost:8080/api/v1/category-ingredients";
    const { data } = await axios.post(url, category);
    const result = safeParse(IngredientCategoryCreate, data);
    if (result.success) {
      return result.output;
    } else {
      console.error("Error en la validación de la categoría de insumos:");
    }
  } catch (error) {
    console.error("Error al crear la categoría de insumos:", error);
  }
};
