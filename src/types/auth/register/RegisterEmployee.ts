import { array, number, object, string, type InferOutput } from "valibot"


export const employeeSchema = object({
    id: number(),
    name: string(),
    email: string(),
    password: string(),
    role: string(),
    phone: number(),
    lastname: string(),
    born_date: string(),
    genero: string(),
    roleEmployee: string(),
    addressBasicDTO: object({
        id: number(),
        street: string(),
        number: number(),
        postalCode: number(),
        cityId: number()
    })  
})
export const employeesArraySchema = array(employeeSchema);

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
export type Employee = InferOutput<typeof employeeSchema>
export type EmployeesArray = InferOutput<typeof employeesArraySchema>;