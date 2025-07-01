import { number, object, string, type InferOutput } from "valibot";

export const userSchema = object({
  User: object({
    id: number(),
    name: string(),
    email: string(),
    password: string(),
    phone: number(),
    role: string(),
    lastname: string(),
    genero: string(),
    born_date: string(),
    roleEmployee : string()
  }),
  message: string(),
});

export type UserMe = InferOutput<typeof userSchema>;
