import { safeParse } from "valibot";
import { orderSchema, type Order } from "../../types/shop/order/Order";
import axios from "axios";

export const postOrder = async (order: Order) => {
  try {
    const result = safeParse(orderSchema, order);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    console.log(order);
    
    const url = "http://localhost:8080/api/v1/order/create";
    const {data} = await axios.post(url , order , {
        withCredentials: true
    })

    console.log(data)
    return data
  } catch (error) {
    console.log(error);
    throw error;
  }
};
