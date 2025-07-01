import { safeParse } from "valibot";
import {
  editEmployeeSchema,
  employeesArraySchema,
  registerEmployeeSchema,
  type RegisterEmployee,
  type UpdateEmployee,
} from "../../../types/auth/register/RegisterEmployee";
import axios from "axios";

// GET 
export const getAllEmployees = async () => {
  try { 
    const url = "http://localhost:8080/api/v1/employee/bycompany";
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    const result = safeParse(employeesArraySchema, data);
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
// POST
export const createEmployee = async (employeeData: UpdateEmployee) => {
  try {
    const dataEmployee = {
      ...employeeData,
      password: employeeData.password!,
      phone: Number(employeeData.phone),
      born_date: new Date(employeeData.born_date).toISOString(),
      addressBasicDTO: {
        id: 0,  // porque es nuevo
        isActive: true,
        street: employeeData.addressBasicDTO.street,
        number: Number(employeeData.addressBasicDTO.number),
        postalCode: Number(employeeData.addressBasicDTO.postalCode),
        city: {
          id: Number(employeeData.addressBasicDTO.city.id),
        },
      },
    };

    const url = "http://localhost:8080/public/auth/register/employee";
    const { data } = await axios.post(url, dataEmployee, { withCredentials: true });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// PUT
export const updateEmployee = async (id: number, employeeData: UpdateEmployee) => {
  try {
    const dataEmployee = {
      ...employeeData,
      phone: Number(employeeData.phone),
      born_date: new Date(employeeData.born_date).toISOString(),
      addressBasicDTO: {
        id: Number(employeeData.addressBasicDTO.id),
        isActive: true,  // lo agrego fijo
        street: employeeData.addressBasicDTO.street,
        number: Number(employeeData.addressBasicDTO.number),
        postalCode: Number(employeeData.addressBasicDTO.postalCode),
        city: {
          id: Number(employeeData.addressBasicDTO.city.id),
        },
      },
    };

    const url = `http://localhost:8080/api/v1/employee/bycompany/${id}`;
    const { data } = await axios.put(url, dataEmployee, { withCredentials: true });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// DELETE
export const deleteEmployee = async (employeeId: number) => {
  try {
    const url = `http://localhost:8080/api/v1/employee/${employeeId}`;
    const { data } = await axios.delete(url, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};