import axios from "axios";
import { safeParse } from "valibot";
import { addressSchema, clientAddressListSchema, type Address, type ClientAddressList } from "../../types/address/Address";


// Obtener todas las direcciones del cliente autenticado
export const getClientAddresses = async (): Promise<ClientAddressList> => {
  const url = "http://localhost:8080/api/v1/client-addresses";
  const { data } = await axios.get(url, { withCredentials: true });
  const result = safeParse(clientAddressListSchema, data);
  if (!result.success) throw new Error("Error al parsear direcciones");
  return result.output;
};

// Crear una nueva address (devuelve address con id)
export const createAddress = async (address: Address) => {
  const url = "http://localhost:8080/api/v1/addresses";
  const result = safeParse(addressSchema, address);
  if (!result.success) throw new Error("Error de validación de address");
  const { data } = await axios.post(url, result.output, { withCredentials: true });
  return data;
};

// Asociar address a cliente
export const addClientAddress = async (addressId: number) => {
  const url = "http://localhost:8080/api/v1/client-addresses";
  const { data } = await axios.post(url, { addressId }, { withCredentials: true });
  return data;
};

// Eliminar una dirección del cliente
export const deleteClientAddress = async (clientAddressId: number) => {
  const url = `http://localhost:8080/api/v1/client-addresses/${clientAddressId}`;
  const { data } = await axios.delete(url, { withCredentials: true });
  return data;
};
