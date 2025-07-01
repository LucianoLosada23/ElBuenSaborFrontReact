import axios from "axios";
import { safeParse } from "valibot";
import { clientListSchema } from "../../../types/clients/Clients";

// GET 
export const getAllClients = async () => {
  try { 
    const url = "http://localhost:8080/api/v1/client";
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    const result = safeParse(clientListSchema, data);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;  
  }
}