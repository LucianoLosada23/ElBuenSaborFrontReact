import { safeParse } from "valibot";
import axios from "axios";
import {
  ingredientListSchema,
  ingredientSchemaCreate,
  type Ingredient,
  type IngredientCreate,
} from "../../../types/Insumos/Ingredient";



export const getAllIngredients = async () => {
  try {
    const url = "http://localhost:8080/api/v1/ingredients";
    const { data } = await axios.get(url, {
      withCredentials: true
    });
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
export const getAllIngredientsToPrepare = async () => {
  try {
    const url = "http://localhost:8080/api/v1/ingredients/toprepare";
    const { data } = await axios.get(url, {
      withCredentials: true
    });
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
    toPrepare : data.toPrepare
  };

  const result = safeParse(ingredientSchemaCreate, payload);
  if (!result.success) {
    console.error("Error en los datos antes del POST:", result.issues);
    throw new Error("Datos inválidos para crear ingrediente.");
  }
  try {
    const url = "http://localhost:8080/api/v1/ingredients";
    const { data } = await axios.post(url, result.output , {
      withCredentials: true
    });
    return data;
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    throw error;
  }
};

export const putIngredient = async (data: IngredientCreate, id: number) => {
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

  const result = safeParse(ingredientSchemaCreate, payload);
  if (!result.success) {
    console.error("Error en los datos antes del PUT:", result.issues);
    throw new Error("Datos inválidos para actualizar ingrediente.");
  }
  try {
    const url = `http://localhost:8080/api/v1/ingredients/${id}`;
    const { data } = await axios.put(url, result.output);
    return data;
  } catch (error) {
    console.error("Error al actualizar ingrediente:", error);
    throw error;
  }
};

export const deleteIngredient = async (id: Ingredient["id"]) => {
  console.log(id);
  try {
    const url = `http://localhost:8080/api/v1/ingredients/${id}`;
    const { data } = await axios.delete(url);
    return data;
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
  }
};
