import axios from "axios";
import { array, safeParse } from "valibot";
import {
  PostProductSchema,
  ProductSchema,
  type PostProduct,
} from "../../../types/product/product";

export const postProduct = async (rawProduct: PostProduct) => {
  try {
    // Conversión a Product válido
    const parsedProduct: PostProduct = {
      company: rawProduct.company,
      category: {
        id: Number(rawProduct.category.id),
      },
      title: rawProduct.title,
      description: rawProduct.description,
      estimatedTime: Number(rawProduct.estimatedTime),
      price: Number(rawProduct.price),
      image: rawProduct.image,
      productIngredients: rawProduct.productIngredients.map((pi) => ({
        ingredient: { id: pi.ingredient.id },
        quantity: pi.quantity,
      })),
    };

    // Validación con Valibot
    const result = safeParse(PostProductSchema, parsedProduct);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }

    // POST al backend
    const url = "http://localhost:8080/api/v1/products";
    const { data } = await axios.post(url, result.output);
    return data;
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};
export const putProduct = async (rawProduct: PostProduct , id : number) => {
  try {
    // Conversión a Product válido
    const parsedProduct: PostProduct = {
      company: rawProduct.company,
      category: {
        id: Number(rawProduct.category.id),
      },
      title: rawProduct.title,
      description: rawProduct.description,
      estimatedTime: Number(rawProduct.estimatedTime),
      price: Number(rawProduct.price),
      image: rawProduct.image,
      productIngredients: rawProduct.productIngredients.map((pi) => ({
        ingredient: { id: pi.ingredient.id },
        quantity: pi.quantity,
      })),
    };

    // Validación con Valibot
    const result = safeParse(PostProductSchema, parsedProduct);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }

    // POST al backend
    const url = `http://localhost:8080/api/v1/products/${id}`;
    const { data } = await axios.put(url, result.output);
    return data;
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};

export const getAllProduct = async () => {
  try {
    const url = "http://localhost:8080/api/v1/products";
    const { data } = await axios(url);
    const result = safeParse(array(ProductSchema), data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
