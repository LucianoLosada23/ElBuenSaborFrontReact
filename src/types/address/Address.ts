import { array, number, object, string, type InferOutput } from "valibot";

//schema para traer todas las Provincias
export const provincesSchema = array(object({
    id: number(),
    name: string(),
    country: object({
      id: number(),
      name: string(),
    }),
}));

//schema para obtener todas las ciudades
export const citiesSchema = array(object({
    id: number(),
    name: string(),
    province: object({
        id: number(),
        name: string(),
        country: object({
            id: number(),
            name: string(),
        })
    })
}))

//types para las Provincias y Ciudades
export type Provinces = InferOutput<typeof provincesSchema>
export type Cities = InferOutput<typeof citiesSchema>
