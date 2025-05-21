import { array, literal, number, object, string, union, type InferOutput } from "valibot";

export const ordenSchema = object({
  id: number(),
  fecha: string(),
  estado: union([
    literal('Entregado'),
    literal('Cancelado'),
    // Agrega más estados si los hay
  ]),
  detalle: array(string())
});

export const listaDeOrdenesSchema = array(ordenSchema);
export type Orden = InferOutput<typeof ordenSchema>;
export type ListaDeOrdenes = InferOutput<typeof listaDeOrdenesSchema>;