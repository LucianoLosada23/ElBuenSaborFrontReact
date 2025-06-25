import axios from "axios";
import { safeParse } from "valibot";
import { orderByCompanyListSchema } from "../../../types/shop/order/Order";

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
