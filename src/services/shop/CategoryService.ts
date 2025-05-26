import axios from "axios";
import { CategoriesSchema} from "../../types/shop/productosCategory/Category";
import { safeParse } from "valibot";

// Obtener categorías
export const getCategories = async () => {
    try {
        const url = "/public/json/category.json";
        const { data } = await axios.get(url);
        
        // Validar los datos con Valibot
        const result = safeParse(CategoriesSchema, data);
        
        if (result.success) {
            return result.output;
        } else {
            throw new Error("Los datos de categorías no son válidos.");
        }
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        throw error; 
    }
};
