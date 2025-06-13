import { number, object, string, type InferOutput } from "valibot";

export const emailField = string();
export const passwordField = string();

export const registerClientSchema = object({
  name: string(),
  email: emailField,
  password: passwordField,
  role: string(),
  phone: number(),
  lastname: string(),
  born_date: string(),
  genero: string()
})

export type RegisterClient = InferOutput<typeof registerClientSchema>