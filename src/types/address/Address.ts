import { array, boolean, number, object, string, union, null_ as vNull, type InferOutput } from "valibot";

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

// Address schema (para crear address)
export const addressSchema = object({
  street: string(),
  number: number(),
  postalCode: number(),
  city: union([
    object({
      id: number(),
      //name: string() // opcional, solo para mostrar
    }),
  ]),
});

// Address con id (para mostrar)
export const addressWithIdSchema = object({
  id: number(),
  isActive: boolean(),
  street: string(),
  number: number(),
  postalCode: number(),
  city: union([
    object({
      id: number(),
      name: string(),
    }),
  ]),
});

// ClientAddress schema
export const clientAddressSchema = object({
  id: number(),
  isActive: boolean(),
  clientId: number(),
  address: addressWithIdSchema,
});

export const clientAddressListSchema = array(clientAddressSchema);

export type Provinces = InferOutput<typeof provincesSchema>
export type Cities = InferOutput<typeof citiesSchema>
export type Address = InferOutput<typeof addressSchema>;
export type AddressWithId = InferOutput<typeof addressWithIdSchema>;
export type ClientAddress = InferOutput<typeof clientAddressSchema>;
export type ClientAddressList = InferOutput<typeof clientAddressListSchema>;
