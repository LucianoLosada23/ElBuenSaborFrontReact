import { safeParse } from "valibot";
import {
  registerEmployeeSchema,
  type RegisterEmployee,
} from "../../../types/auth/register/RegisterEmployee";
import axios from "axios";

export const createEmployee = async (employeeData: RegisterEmployee) => {
  try {
    const dataEmployee : RegisterEmployee = {
      name: employeeData.name,
      email: employeeData.email,
      password: employeeData.password,
      phone: Number(employeeData.phone),
      lastname: employeeData.lastname,
      born_date: new Date(employeeData.born_date).toISOString(), // formato ISO
      genero: employeeData.genero,
      roleEmployee: employeeData.roleEmployee,
      addressBasicDTO: {
        street: employeeData.addressBasicDTO.street,
        number: Number(employeeData.addressBasicDTO.number),
        postalCode: Number(employeeData.addressBasicDTO.postalCode),
        cityId: Number(employeeData.addressBasicDTO.cityId),
      },
    };
    const result = safeParse(registerEmployeeSchema, dataEmployee);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }
    const url = "http://localhost:8080/public/auth/register/employee";
    const { data } = await axios.post(url, result.output);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
