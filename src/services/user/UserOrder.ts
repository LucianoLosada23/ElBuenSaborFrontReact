import axios from "axios";
import { safeParse } from "valibot";
import { listaDeOrdenesSchema } from "../../types/user/UserOrder";

export const getAllUserOrder = async () => {
  try {
    const url = "http://localhost:8080/api/v1/order/byclient";
    const { data } = await axios.get(url, { withCredentials: true });
    const result = safeParse(listaDeOrdenesSchema, data);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    return result.output;
  } catch (error) {
    console.error("Error al obtener las ordenes de usuario:", error);
  }
};
