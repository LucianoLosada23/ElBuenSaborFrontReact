import axios from "axios";
import { safeParse } from "valibot";
import { citiesSchema, provincesSchema } from "../../types/address/Address";

//obtener todas las provincias
export const getAllProvinces = async () => {
  try {
    const url = "http://localhost:8080/public/api/v1/provinces"
    const {data} = await axios.get(url)
    const result = safeParse(provincesSchema , data)
    if(result.success){
      return result.output
    }
    throw new Error("Error al parsear las provincias");
  }catch (error) {
    console.error("Error al obtener las provincias:", error);
    throw new Error("Error al obtener las provincias");
  }
};

//obtener todas las ciudades
export const getAllCities = async () => {
  try {
    const url = "http://localhost:8080/public/api/v1/cities"
    const {data} = await axios.get(url)
    const result = safeParse(citiesSchema , data)
    if(result.success){
      return result.output
    }
    throw new Error("Error al parsear las provincias");
  } catch (error) {
    console.error("Error al obtener las ciudades:", error);
    throw new Error("Error al obtener las ciudades");
  }
};