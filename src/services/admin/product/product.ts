import axios from "axios";
import { array, safeParse } from "valibot";
import {
  PostProductSchema,
  ProductSchema,
  type PostProduct,
} from "../../../types/product/product";

export const postProduct = async (rawProduct: PostProduct, imageFile?: File | null) => {

  console.log(imageFile)
  try {
    // Conversión a Product válido
    const parsedProduct: PostProduct = {
      company: rawProduct.company,
      category: { id: Number(rawProduct.category.id) },
      title: rawProduct.title,
      description: rawProduct.description,
      estimatedTime: Number(rawProduct.estimatedTime),
      price: Number(rawProduct.price),
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

    // Armar form-data
    const formData = new FormData();
    formData.append("product", JSON.stringify(result.output));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // POST al backend con multipart/form-data
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/products/create",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
    const url = "http://localhost:8080/api/v1/products/public";
    const { data } = await axios(url , {
      withCredentials: true
    });
    console.log("Data cruda del backend: ", data);
    const result = safeParse(array(ProductSchema), data);
    console.log("Validated products:", result.success ? result.output : result.issues);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
