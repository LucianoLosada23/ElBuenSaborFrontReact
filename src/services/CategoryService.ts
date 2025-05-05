import type { Category } from "../models/Category";

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data:Category[] = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching categories: " + error);
    }
}
