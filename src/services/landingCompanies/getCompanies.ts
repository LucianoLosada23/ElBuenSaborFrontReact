import axios from "axios";
import { array, safeParse } from "valibot";
import { companySchema } from "../../types/Company/Company"; // o la ruta correspondiente

export const getAllCompanies = async () => {
  try {
    const url = "http://localhost:8080/api/v1/company/public"; // 👉 esta es la URL correcta
    const { data } = await axios.get(url, { withCredentials: true });

    const result = safeParse(array(companySchema), data);

    if (result.success) {
      return result.output;
    } else {
      console.error("Error de validación en getAllCompanies:", result.issues);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener las compañías:", error);
    return null;
  }
};
