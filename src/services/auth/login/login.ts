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
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const url = "http://localhost:8080/public/auth/logout";
    const { data } = await axios.post(url, {}, { withCredentials: true }); // ← ¡esto es clave!
    return data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
