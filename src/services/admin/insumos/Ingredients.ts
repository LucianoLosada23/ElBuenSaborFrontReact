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

export const getAllIngredientsNotToPrepare = async () => {
  try {
    const url = "http://localhost:8080/api/v1/ingredients/nottoprepare";
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

export const createIngredient = async (data: IngredientCreate, imageFile?: File | null) => {
  const payload: IngredientCreate = {
    company: { id: Number(data.company.id) },
    name: data.name,
    price: Number(data.price),
    unitMeasure: data.unitMeasure.toUpperCase(),
    status: true, // o según corresponda
    minStock: Number(data.minStock),
    currentStock: Number(data.currentStock),
    maxStock: Number(data.maxStock),
    categoryIngredient: {
      id: Number(data.categoryIngredient.id),
    },
    toPrepare: data.toPrepare ?? true,
    categoryIdProduct: data.categoryIdProduct ? Number(data.categoryIdProduct) : null,
    profit_percentage: data.profit_percentage ? Number(data.profit_percentage) : 0,
    priceProduct: data.priceProduct ?? 0, // si aún no lo calculás en front
    image: null, // se carga por FormData
  };

  const result = safeParse(ingredientSchemaCreate, payload);
  if (!result.success) {
    console.error("Error en los datos antes del POST:", result.issues);
    throw new Error("Datos inválidos para crear ingrediente.");
  }

  try {
    const formData = new FormData();
    formData.append("ingredient", JSON.stringify(result.output));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const url = "http://localhost:8080/api/v1/ingredients/create";
    const { data } = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    throw error;
  }
};

export const putIngredient = async (data: IngredientCreate, id: number, imageFile?: File | null) => {
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
    toPrepare: data.toPrepare,
    categoryIdProduct: data.categoryIdProduct ? Number(data.categoryIdProduct) : null,
    profit_percentage: data.profit_percentage ? Number(data.profit_percentage) : 0,
    priceProduct: Number(data.priceProduct) ?? 0,
    image: null, // va por FormData
  };

  const result = safeParse(ingredientSchemaCreate, payload);
  if (!result.success) {
    console.error("Error en los datos antes del PUT:", result.issues);
    throw new Error("Datos inválidos para actualizar ingrediente.");
  }

  try {
    const formData = new FormData();
    formData.append("ingredient", JSON.stringify(result.output));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("LA DATAA", formData);
    const url = `http://localhost:8080/api/v1/ingredients/update/${id}`;
    const { data: responseData } = await axios.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return responseData;
  } catch (error) {
    console.error("Error al actualizar ingrediente:", error);
    throw error;
  }
};


export const deleteIngredient = async (id: Ingredient["id"]) => {
  console.log(id);
  try {
    const url = `http://localhost:8080/api/v1/ingredients/${id}`;
    const { data } = await axios.delete(url, { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
  }
};
