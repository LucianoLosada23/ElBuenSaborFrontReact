import axios from "axios";
import { safeParse } from "valibot";
import {
  IngredientCategoryCreate,
  ingredientCategoryListSchema,
} from "../../../../types/Ingredients/IngredientCategory";

export const getAllProductCategory = async () => {
  try {
    const url = "http://localhost:8080/api/v1/category";
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

export const postProductCategory = async (category: IngredientCategoryCreate) => {
  try {
    const url = "http://localhost:8080/api/v1/category";
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


export const putProductCategory = async (
  id: number,
  category: IngredientCategoryCreate
 
) => {
  const url = `http://localhost:8080/api/v1/category/${id}`;
  const { data } = await axios.put(url, category);
  const result = safeParse(IngredientCategoryCreate, data);
  if (result.success) {
    return result.output;
  } else {
    console.error("Error en la validación de la categoría de insumos:");
  }
  try {
  } catch (error) {
    console.error("Error al actualizar la categoría de insumos:", error);
  }
};