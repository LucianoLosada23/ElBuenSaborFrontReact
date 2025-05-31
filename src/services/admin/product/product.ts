import axios from "axios";
import { array, safeParse } from "valibot";
import { ProductSchema, type Product } from "../../../types/product/product";

// Esta es la forma "cruda" como llegan los datos del formulario
interface RawProduct {
  company: { id: number };
  category: { id: string | number };
  title: string;
  description: string;
  estimatedTime: string | number;
  price: string | number;
  image: string; // base64 o url
  productIngredients: {
    ingredient: { id: number };
    quantity: number;
  }[];
}

export const postProduct = async (rawProduct: RawProduct) => {
  try {
    // Conversión a Product válido
    const parsedProduct: Product = {
      id: 0,
      company: rawProduct.company,
      category: {
        id: Number(rawProduct.category.id),
        name: "", // si no lo tenés, poné vacío
        company: rawProduct.company,
        parent: null, // o un string si es necesario
      },
      title: rawProduct.title,
      description: rawProduct.description,
      estimatedTime: Number(rawProduct.estimatedTime),
      price: Number(rawProduct.price),
      image: rawProduct.image,
      productIngredients: rawProduct.productIngredients.map((pi) => ({
        id: 0,
        ingredient: { id: pi.ingredient.id },
        quantity: pi.quantity,
      })),
    };

    // Validación con Valibot
    const result = safeParse(ProductSchema, parsedProduct);
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

export const getAllProduct = async () => {
  try {
    const url = "http://localhost:8080/api/v1/products";
    const { data } = await axios(url);
    console.log(data)
 const result = safeParse(array(ProductSchema), data);
    console.log(result.success);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
