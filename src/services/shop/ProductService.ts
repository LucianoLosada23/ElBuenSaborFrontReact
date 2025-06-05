import type { Product } from "../../types/shop/product/Product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    // const response = await fetch("http://localhost:3000/api/products");
    // const data:product[] = await response.json();
    const data: Product[] = [
      {
        id: 1,
        name: "Pizza",
        description:
          "La pizza mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 10,
        time: "30",
        image: "bur.webp",
        categoryId: 1,
        stock: 100,
      },
      {
        id: 2,
        name: "Hamburguesa",
        description:
          "La hamburguesa mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 15,
        time: "20",
        image: "bur.webp",
        categoryId: 1,
        stock: 50,
      },
      {
        id: 3,
        name: "Bebida",
        description:
          "La bebida mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 5,
        time: "30",
        image: "bur.webp",
        categoryId: 2,
        stock: 200,
      },
      {
        id: 4,
        name: "Postre",
        description:
          "El postre mas rico de todo el condado esta aca en nuestro buen sabor",
        price: 7,
        time: "20",
        image: "bur.webp",
        categoryId: 3,
        stock: 30,
      },
      {
        id: 5,
        name: "Ensalada",
        description:
          "La ensalada mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 8,
        time: "10",
        image: "bur.webp",
        categoryId: 4,
        stock: 20,
      },
      {
        id: 6,
        name: "Ensalada",
        description:
          "La ensalada mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 8,
        time: "20",
        image: "bur.webp",
        categoryId: 4,
        stock: 20,
      },
      {
        id: 7,
        name: "Ensalada",
        description:
          "La ensalada mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 8,
        time: "30",
        image: "bur.webp",
        categoryId: 4,
        stock: 20,
      },
      {
        id: 8,
        name: "Ensalada",
        description:
          "La ensalada mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 8,
        time: "20",
        image: "bur.webp",
        categoryId: 4,
        stock: 20,
      },
      {
        id: 9,
        name: "Ensalada",
        description:
          "La ensalada mas rica de todo el condado esta aca en nuestro buen sabor",
        price: 8,
        time: "10",
        image: "bur.webp",
        categoryId: 4,
        stock: 20,
      },
    ];
    return data;
  } catch (error) {
    throw new Error("Error fetching products: " + error);
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
      stock: 100,
    };
    return data;
  } catch (error) {
    throw new Error("Error fetching product by ID: " + error);
  }
};
