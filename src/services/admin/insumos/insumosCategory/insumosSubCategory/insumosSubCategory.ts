import axios from "axios";
import { safeParse } from "valibot";
import {
  IngredientSubCategoryCreateSchema,
  type IngredientSubCategoryCreate,
} from "../../../../../types/Insumos/insumosSubCategory/InsumosSubCategory";

export const postInsumosSubCategory = async (subCategoryData: IngredientSubCategoryCreate) => {
  const result = safeParse(IngredientSubCategoryCreateSchema, subCategoryData);
  if (!result.success) {
    console.error("Error de validación:", result.issues);
    return;
  }
  try {
    const url = "http://localhost:8080/api/v1/category-ingredients";
    const { data } = await axios.post(url, subCategoryData ,{
      withCredentials: true
    });
    if(data) {
      return data;
    } else {
      console.error("Error en la validación de la subcategoría de insumos:");
    }
  } catch (error) {
    console.error("Error al crear la subcategoría de insumos:", error);
  }
};
