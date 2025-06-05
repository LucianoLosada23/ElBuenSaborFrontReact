import axios from "axios";
import { safeParse } from "valibot";
import { IngredientSubCategoryCreateSchema, type IngredientSubCategoryCreate } from "../../../../../types/Insumos/insumosSubCategory/InsumosSubCategory";

export const postProductSubCategory = async (subCategoryData: IngredientSubCategoryCreate) => {
  try {
    const result = safeParse(IngredientSubCategoryCreateSchema, subCategoryData);
    if (!result.success) {
      console.error("Error en la validación de la subcategoría de insumos:", result.issues);
      return;
    }
    const url = "http://localhost:8080/api/v1/category";
    const { data } = await axios.post(url, result.output);
    return data;
  } catch (error) {
    console.error("Error al crear la subcategoría de insumos:", error);
  }
};



