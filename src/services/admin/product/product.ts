import axios from "axios";
import { array, safeParse } from "valibot";
import {
  PostProductSchema,
  ProductSchema,
  type PostProduct,
} from "../../../types/product/product";

export const postProduct = async (rawProduct: PostProduct, imageFile?: File | null) => {
  try {
    // Conversión a Product válido
    const parsedProduct: PostProduct = {
      company: rawProduct.company,
      profit_percentage : rawProduct.profit_percentage,
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

    console.log("PRODUCTOOO");
    console.log(formData);
    

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
export const putProduct = async (rawProduct: PostProduct, id: number, imageFile?: File | null) => {
  try {
    const parsedProduct: PostProduct = {
      company: rawProduct.company,
      category: { id: Number(rawProduct.category.id) },
      title: rawProduct.title,
      profit_percentage: rawProduct.profit_percentage,
      description: rawProduct.description,
      estimatedTime: Number(rawProduct.estimatedTime),
      price: Number(rawProduct.price),
      productIngredients: rawProduct.productIngredients.map((pi) => ({
        ingredient: { id: pi.ingredient.id },
        quantity: pi.quantity,
      })),
    };

    const result = safeParse(PostProductSchema, parsedProduct);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }

    const formData = new FormData();
    formData.append("product", JSON.stringify(result.output));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const url = `http://localhost:8080/api/v1/products/${id}`;
    const { data } = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
};

export const getAllProduct = async () => {
  try {
    const url = "http://localhost:8080/api/v1/products/bycompany";
    const { data } = await axios(url , {
      withCredentials: true
    });
    const result = safeParse(array(ProductSchema), data);
       if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
export const deleteProduct = async (id: number) => {
  try {
    const url = `http://localhost:8080/api/v1/products/${id}`;
    const { data } = await axios.delete(url, { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Error eliminando el producto:", error);
    throw error;
  }
};

export const getProductsByCompany = async (companyId: string) => {
  try {
    const url = `http://localhost:8080/api/v1/products/public/${companyId}`;
    const { data } = await axios.get(url, { withCredentials: true });
    console.log(data);
    
    const result = safeParse(array(ProductSchema), data);
       if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los productos por compañía:", error);
  }
};

