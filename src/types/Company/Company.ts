import { number, object, string, optional, type InferOutput } from "valibot";

// Esquema para el listado de compañías que usás en el front
export const companySchema = object({
  id: number(),
  name: string(),
  image: optional(string()),
});

export type Company = InferOutput<typeof companySchema>;

// Ya tenés el createCompanySchema para creación con más campos
export const createCompanySchema = object({
  name: string(),
  email: string(),
  password: string(),
  role: string(),
  phone: number(),
  cuit: string(),
  address: object({
    street: string(),
    number: number(),
    postalCode: number(),
    city: object({
      id: number(),
    }),
  }),
});

export type CreateCompany = InferOutput<typeof createCompanySchema>;
