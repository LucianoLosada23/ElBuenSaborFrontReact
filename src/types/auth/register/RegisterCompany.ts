import { object, string, number } from "valibot";

export const registerCompanySchema = object({
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
      name: string(),
      province: object({
        name: string(),
        country: object({
          name: string(),
        }),
      }),
    }),
  }),
});
