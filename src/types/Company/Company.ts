import { number, object, string, type InferOutput } from "valibot";

export const companySchema = object({
  id: number(),
});

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

export type  CreateCompany = InferOutput<typeof createCompanySchema>