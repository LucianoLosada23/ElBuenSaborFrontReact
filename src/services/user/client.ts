import axios from "axios";

export const getClientProfile = async () => {
  try {
    const url = "http://localhost:8080/api/v1/client";
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (error) {
    console.error("No se pudo obtener el perfil del cliente:", error);
    throw error;
  }
};
