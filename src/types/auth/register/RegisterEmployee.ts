import { number, object, string, type InferOutput } from "valibot"

export const registerEmployeeSchema = object({
    name : string(),
    email: string(),
    password: string(),
    phone: number(),
    lastname: string(),
    born_date: string(),
    genero: string(),
    roleEmployee: string(),
    addressBasicDTO: object({
        street: string(),
        number: number(),
        postalCode: number(),
        cityId: number()
    })
})

export type RegisterEmployee = InferOutput<typeof registerEmployeeSchema>