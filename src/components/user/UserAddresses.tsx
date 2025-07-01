import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProvinces, addCities } from "../../features/address/addressSlice";
import { getAllProvinces, getAllCities } from "../../services/address/Address";
import {
  getClientAddresses,
  createAddress,
  addClientAddress,
  deleteClientAddress,
} from "../../services/clientAddresses/clientAddresses";
import type { Address, ClientAddress } from "../../types/address/Address";

export default function UserAddresses() {
  const [addresses, setAddresses] = useState<ClientAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const provinces = useSelector((state: any) => state.address.provinces);
  const cities = useSelector((state: any) => state.address.cities);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<Address>();

  // Cargar provincias y ciudades si no están en el store
  useEffect(() => {
    if (!provinces || provinces.length === 0) {
      getAllProvinces().then((prov) => dispatch(addProvinces(prov)));
    }
    if (!cities || cities.length === 0) {
      getAllCities().then((ciud) => dispatch(addCities(ciud)));
    }
    // eslint-disable-next-line
  }, []);

  // Filtrar ciudades por provincia seleccionada
  const filteredCities = selectedProvinceId
    ? cities.filter((city: any) => city.province.id === selectedProvinceId)
    : [];

  // Cargar direcciones del cliente
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await getClientAddresses();
      setAddresses(data);
    } catch (e) {
      console.error("Error al obtener direcciones del cliente:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Agregar nueva dirección
  const onSubmit = async (data: Address) => {
    try {
      const address = await createAddress(data);
      await addClientAddress(address.id);
      reset();
      setSelectedProvinceId(null);
      fetchAddresses();
    } catch (e) {
      console.error("Error al agregar dirección:", e);
      if (e instanceof Error) {
        alert(`Error al agregar dirección: ${e.message}`);
      }
    }
  };

  // Eliminar dirección
  const handleDelete = async (clientAddressId: number) => {
    if (!window.confirm("¿Eliminar esta dirección?")) return;
    await deleteClientAddress(clientAddressId);
    fetchAddresses();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-semibold mb-6">Mis Direcciones</h2>
      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Calle</label>
          <input
            {...register("street", { required: true })}
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            placeholder="Calle"
          />
          {errors.street && <span className="text-red-500 text-xs">Campo requerido</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Número</label>
          <input
            type="number"
            {...register("number", { required: true, valueAsNumber: true })}
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            placeholder="Número"
          />
          {errors.number && <span className="text-red-500 text-xs">Campo requerido</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Provincia</label>
          <select
            onChange={(e) => {
              const provinceId = Number(e.target.value);
              setSelectedProvinceId(provinceId);
              setValue("city.id", null as any); // Limpiar ciudad al cambiar provincia
            }}
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            defaultValue=""
          >
            <option value="" disabled>Selecciona una provincia</option>
            {provinces.map((p: { id: number; name: string }) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ciudad</label>
          <select
            {...register("city.id", { required: true, valueAsNumber: true })}
            onChange={(e) => setValue("city.id", Number(e.target.value))}
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            defaultValue=""
            disabled={!selectedProvinceId}
          >
            <option value="" disabled>
              {selectedProvinceId ? "Selecciona una ciudad" : "Primero selecciona una provincia"}
            </option>
            {filteredCities.map((city: { id: number; name: string }) => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
          {errors.city?.id && <span className="text-red-500 text-xs">Campo requerido</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Código Postal</label>
          <input
            type="number"
            {...register("postalCode", { required: true, valueAsNumber: true })}
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            placeholder="Código Postal"
          />
          {errors.postalCode && <span className="text-red-500 text-xs">Campo requerido</span>}
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-principal text-white px-6 py-2 rounded-full hover:bg-terciario transition"
          >
            Agregar dirección
          </button>
        </div>
      </form>
      {/* Lista de direcciones */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Direcciones guardadas</h3>
        {loading ? (
          <div>Cargando...</div>
        ) : addresses.length === 0 ? (
          <div>No tienes direcciones guardadas.</div>
        ) : (
          <ul className="space-y-4">
            {addresses.map((ca) => (
              <li key={ca.id} className="flex justify-between items-center border-b py-2">
                <span>
                  {ca.address.street} {ca.address.number},{" "}
                  {ca.address.city ? ca.address.city.name: "Sin ciudad"},{" "}
                  CP: {ca.address.postalCode}
                </span>
                <button
                  onClick={() => handleDelete(ca.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
