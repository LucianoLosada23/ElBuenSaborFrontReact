import type { Product } from "../../types/shop/product/Product";

export const getProducts = async () => {
  try {
    
  } catch (error) {
    throw new Error("Error fetching products: " + error);
    console.log(error);
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    // const response = await fetch(`http://localhost:3000/api/products/${id}`);
    // const data:product = await response.json();
    const data: Product = {
      id: 1,
      name: "Pizza",
      description: "Comida",
      time: "20",
      price: 10,
      image: "https://example.com/pizza.jpg",
      categoryId: 1,
    }; 
    return data;
  } catch (error) {
    throw new Error("Error fetching product by ID: " + error);
  }
};
