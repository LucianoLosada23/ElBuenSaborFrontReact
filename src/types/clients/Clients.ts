import { array, boolean, number, object , string, type InferOutput} from "valibot"


export const clientSchema = object({
    id: number(),
    isActive: boolean(),
    name: string(),
    email: string(),
    password: string(),
    role: string(),
    phone: number(),
    lastname: string(),
    born_date: string(),
    genero: string(),
})

export const clientListSchema = array(clientSchema)

export type Client = InferOutput<typeof clientSchema>
export type ClientList = InferOutput<typeof clientListSchema>