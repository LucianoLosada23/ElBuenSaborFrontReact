import { safeParse } from "valibot";
import {
  createCompanySchema,
  type CreateCompany,
} from "../../../types/Company/Company";
import axios from "axios";

export const registerCompany = async (company: CreateCompany) => {
  try {
    const result = safeParse(createCompanySchema, company);

    if (!result.success) {
      console.error("Errores de validación:", result.issues, company);
      throw new Error("Invalid company data");
    }

    const url = "http://localhost:8080/public/auth/register/company";
    const response = await axios.post(url, result.output);
    return response.data;
  } catch (error: any) {
    // Mostrar información detallada del error para debug
    console.error("Error al registrar la empresa:", error);
    if (axios.isAxiosError(error)) {
      console.error("Respuesta del servidor:", error.response?.data);
    }
    throw error;
  }
};