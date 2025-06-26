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
    const { data } = await axios.post(url, result.output ,{
      withCredentials : true
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// PUT
export const updateEmployee = async (id: number, employeeData: UpdateEmployee) => {
  try {
    // Formateamos fecha y aseguramos tipos numéricos
    const formattedData = {
      ...employeeData,
      phone: Number(employeeData.phone),
      born_date: new Date(employeeData.born_date).toISOString(),
      addressBasicDTO: {
        ...employeeData.addressBasicDTO,
        id: Number(employeeData.addressBasicDTO.id),
        number: Number(employeeData.addressBasicDTO.number),
        postalCode: Number(employeeData.addressBasicDTO.postalCode),
        cityId: Number(employeeData.addressBasicDTO.cityId),
      },
    };

    // Validación con schema
    const result = safeParse(editEmployeeSchema, formattedData);
    if (!result.success) {
      console.error("Error de validación:", result.issues);
      return;
    }

    // Request PUT
    const url = `http://localhost:8080/api/v1/employee/bycompany/${id}`;
    const { data } = await axios.put(url, result.output, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
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