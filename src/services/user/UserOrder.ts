import axios from "axios";
import { safeParse } from "valibot";
import { listaDeOrdenesSchema } from "../../types/user/UserOrder";

export const getAllUserOrder = async () => {
  try {
    const url = "/public/json/order.json";
    const { data } = await axios.get(url);
    const result = safeParse(listaDeOrdenesSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener las ordenes de usuario:", error);
  }
};
