import axios from "axios";
import { safeParse } from "valibot";
import {
  IngredientCategoryCreate,
  ingredientCategoryListSchema,
} from "../../../../types/Insumos/IngredientCategory";

export const getAllInsumosCategory = async () => {
  try {
    const url = "http://localhost:8080/api/v1/category-ingredients";
    const { data } = await axios.get(url , {
      withCredentials: true
    });
    const result = safeParse(ingredientCategoryListSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener las categorías de insumos:", error);
  }
};


export const postInsumosCategory = async (
  category: IngredientCategoryCreate
) => {
  const result = safeParse(IngredientCategoryCreate, category);
  if (!result.success) {
    console.error("Error de validación:", result.issues);
    return;
  }
  try {
    const url = "http://localhost:8080/api/v1/category-ingredients";
    const { data } = await axios.post(url, category ,{
      withCredentials: true
    });
    if (result.success) {
      return data;
    } else {
      console.error("Error en la validación de la categoría de insumos:");
    }
  } catch (error) {
    console.error("Error al crear la categoría de insumos:", error);
  }
};

export const putInsumosCategory = async (id: number,category: IngredientCategoryCreate) => {
  const validation = safeParse(IngredientCategoryCreate, category);
  if (!validation.success) {
    console.error("Error de validación:");
    return;
  }
  
  try {
    const url = `http://localhost:8080/api/v1/category-ingredients/${id}`;
    const { data } = await axios.put(url, category , { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error al actualizar la categoría de insumos:", error);
  }
};
export const deleteInsumosCategory = async (id: number) => {
  try {
    const url = `http://localhost:8080/api/v1/category-ingredients/${id}`;
    const { data } = await axios.delete(url, { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error al eliminar la categoría de insumos:", error);
  }
};
