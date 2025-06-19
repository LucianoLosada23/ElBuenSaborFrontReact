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
      console.error("Errores de validación:", result.issues);
      throw new Error("Invalid company data");
    }

    const url = "http://localhost:8080/public/auth/register/company";
    const response = await axios.post(url, result.output);
    return response.data;
  } catch (error) {
    console.error("Error al registrar la empresa:", error);
    throw new Error("Error al registrar la empresa");
  }
};