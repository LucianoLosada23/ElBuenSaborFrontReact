import { safeParse } from "valibot";
import {
  registerClientSchema,
  type RegisterClient,
} from "../../../types/auth/register/Register";
import axios from "axios";

export const registerClient = async (client: RegisterClient) => {
  try {
    const dataClient = {
      name: client.name,
      email: client.email,
      password: client.password,
      role: "CLIENT",
      phone: Number(client.phone),
      lastname: client.lastname,
      born_date: new Date(client.born_date).toISOString(), // formato ISO
      genero: client.genero.toUpperCase(), // mayúsculas
    };
    const result = safeParse(registerClientSchema, dataClient);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    const url = "http://localhost:8080/public/auth/register/client";
    const { data } = await axios.post(url, result.output);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
