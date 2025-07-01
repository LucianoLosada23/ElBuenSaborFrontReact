import { array, number, object, optional, string, type InferOutput } from "valibot"

/* --EMPLEADO-- */

//schema empleado
export const employeeSchema = object({
    id: number(),
    name: string(),
    email: string(),
    password: optional(string()),
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

//schema todos los empleados
export const employeesArraySchema = array(employeeSchema);

//schema PUT empleado
export const editEmployeeSchema = object({
  name: string(),
  email: string(),
  phone: number(),
  lastname: string(),
  born_date: string(),
  genero: string(),
  roleEmployee: string(),
  password: optional(string()), 
  addressBasicDTO: object({
    id: optional(number()),
    street: string(),
    number: number(),
    postalCode: number(),
    cityId: number(),
  }),
});

//schema POST empleado
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


export type Employee = InferOutput<typeof employeeSchema>
export type EmployeesArray = InferOutput<typeof employeesArraySchema>;
export type UpdateEmployee = InferOutput<typeof editEmployeeSchema>
export type RegisterEmployee = InferOutput<typeof registerEmployeeSchema>