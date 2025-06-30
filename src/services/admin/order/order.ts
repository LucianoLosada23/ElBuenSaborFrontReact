import axios from "axios";
import { safeParse } from "valibot";
import { orderByCompanyListSchema, orderSchema} from "../../../types/shop/order/Order";
import { listaDeOrdenesSchema } from "../../../types/user/UserOrder";

export const getAllOrdersByCompany = async () => {
  try {
    const url = "http://localhost:8080/api/v1/order/bycompany";
    const { data } = await axios.get(url, {
      withCredentials: true
    });
      console.log(data);

    const result = safeParse(orderByCompanyListSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  }
};
export const getAllOrdersByClient = async () => {
  try {
    const url = "http://localhost:8080/api/v1/order/byclient";
    const { data } = await axios.get(url, {
      withCredentials: true
    });
      console.log(data);

    const result = safeParse(listaDeOrdenesSchema, data);
    if (result.success) {
      return result.output;
    }
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  }
};

export const putOrderStatus = async (orderId: string, status: string) => {
  try {
      const url = `http://localhost:8080/api/v1/order/${orderId}/status?status=${encodeURIComponent(status)}`;
    const { data } = await axios.put(url, null , {
      withCredentials: true
    });
    return data;
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);
  }
}
