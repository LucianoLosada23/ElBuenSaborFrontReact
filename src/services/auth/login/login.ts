import axios from "axios";
import { loginSchema, type Login } from "../../../types/auth/login/Login";
import { safeParse } from "valibot";

export const login = async (user: Login) => {
  try {
    const result = safeParse(loginSchema, user);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    const url = "http://localhost:8080/public/auth/login";
    const { data } = await axios.post(url, result.output ,{
      withCredentials: true
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
