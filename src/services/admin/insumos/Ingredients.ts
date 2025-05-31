import { safeParse } from "valibot";
import {
  ingredientListSchema,
  ingredientSchemaCreate,
  type Ingredient,
  type IngredientCreate,
} from "../../../types/Ingredients/Ingredient";
import axios from "axios";

export const getAllIngredients = async () => {
  try {
    const url = "http://localhost:8080/api/v1/ingredients";
    const { data } = await axios.get(url);
    const result = safeParse(ingredientListSchema, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Falló el parseo del schema:");
    }
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
  }
};

export const createIngredient = async (data: IngredientCreate) => {
  // Parseo / normalización
  const payload: IngredientCreate = {
    company: { id: Number(data.company.id) },
    name: data.name,
    price: Number(data.price),
    unitMeasure: data.unitMeasure.toUpperCase(),
    status: Boolean(data.status),
    minStock: Number(data.minStock),
    currentStock: Number(data.currentStock),
    maxStock: Number(data.maxStock),
    categoryIngredient: {
      id: Number(data.categoryIngredient.id),
    },
  };

  try {
    const url = "http://localhost:8080/api/v1/ingredients";
    const { data } = await axios.post(url, payload);
    const result = safeParse(ingredientSchemaCreate, data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Falló el parseo del schema:");
    }
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    throw error;
  }
};

export const deleteIngredient = async (id: Ingredient["id"]) => {
  console.log(id)
  try {
    const url = `http://localhost:8080/api/v1/ingredients/${id}`;
    const { data } = await axios.delete(url);
    return data;
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
  }
};
