import axios from "axios";
import { safeParse } from "valibot";
import { IngredientSubCategoryCreateSchema, type IngredientSubCategoryCreate } from "../../../../../types/Ingredients/insumosSubCategory/InsumosSubCategory";

export const postProductSubCategory = async (subCategoryData : IngredientSubCategoryCreate) => {
  try {
    const url = "http://localhost:8080/api/v1/category";
    const { data } = await axios.post(url, subCategoryData);
    const result = safeParse(IngredientSubCategoryCreateSchema, data);
    if (result.success) {
      return result.output;
    } else {
      console.error("Error en la validación de la subcategoría de insumos:");
    }
  } catch (error) {
    console.error("Error al crear la subcategoría de insumos:", error);
  }
};



