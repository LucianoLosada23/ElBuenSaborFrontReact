import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import useAddress from "../../../hooks/address/useAddress";
import type {
  UpdateEmployee,
  Employee,
} from "../../../types/auth/register/RegisterEmployee";
import { toast } from "react-toastify";
import {
  createEmployee,
  updateEmployee,
} from "../../../services/admin/employee/employeeServices";
import { useUIState } from "../../../hooks/ui/useUIState";

type EmployeeFormProps = {
  onRefresh: () => void;
  employeeToEdit?: Employee | null;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
};

export default function EmployeeForm({ onRefresh, employeeToEdit , setEmployeeToEdit}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<UpdateEmployee>();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  const { provinces, cities } = useAddress();
  const { toggle } = useUIState();

  const rolEmployee = [
    { value: "CASHIER", name: "Cajero" },
    { value: "COOK", name: "Cocinero" },
    { value: "DELIVERY", name: "Repartidor" },
  ];

  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.province.id === selectedProvinceId)
    : [];

  useEffect(() => {
    if (employeeToEdit) {
      const cityId = employeeToEdit.addressBasicDTO.cityId;
      const city = cities.find((c) => c.id === cityId);
      const provinceId = city?.province?.id;

      setValue("name", employeeToEdit.name);
      setValue("lastname", employeeToEdit.lastname);
      setValue("email", employeeToEdit.email);
      setValue("phone", Number(employeeToEdit.phone));
      setValue("born_date", employeeToEdit.born_date.split("T")[0]);
      setValue("genero", employeeToEdit.genero);
      setValue("roleEmployee", employeeToEdit.roleEmployee);
      setValue("addressBasicDTO.street", employeeToEdit.addressBasicDTO.street);
      setValue("addressBasicDTO.number", employeeToEdit.addressBasicDTO.number);
      setValue("addressBasicDTO.postalCode", employeeToEdit.addressBasicDTO.postalCode);
      setValue("addressBasicDTO.cityId", cityId);
      setValue("addressBasicDTO.id", employeeToEdit.addressBasicDTO.id);

      if (provinceId) {
        setSelectedProvinceId(provinceId);
      }
    }
  }, [employeeToEdit, setValue, cities]);

  const onSubmit = async (data: UpdateEmployee) => {
    try {
      if (employeeToEdit) {
        const result = await updateEmployee(employeeToEdit.id, {
          ...data,
          addressBasicDTO: {
            ...data.addressBasicDTO,
            id: employeeToEdit.addressBasicDTO.id,
          },
        });
        if (!result) throw new Error("Error al actualizar el empleado");
        toast.success("Empleado actualizado exitosamente");
        setEmployeeToEdit(null)
      } else {
        if (!data.password) {
          toast.error("La contraseña es obligatoria para crear un empleado");
          return;
        }

        const result = await createEmployee({
          ...data,
          password: data.password,
        });
        if (!result) throw new Error("Error al registrar el empleado");
        toast.success("Empleado registrado exitosamente");
      }

      toggle("isEmployeeModalOpen");
      onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Ocurrió un error");
    }
  };

  const handleNext = async () => {
    const isValid = await trigger([
      "name",
      "lastname",
      "email",
      "password",
      "phone",
      "born_date",
      "genero",
      "roleEmployee",
    ]);
    if (isValid) setStep(2);
  };

  const handleBack = () => setStep(1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Datos personales */}
          <div>
            <label className="text-sm font-medium">Nombre *</label>
            <input
              {...register("name", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Nombre"
            />
            {errors.name && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Apellido *</label>
            <input
              {...register("lastname", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Apellido"
            />
            {errors.lastname && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Email"
            />
            {errors.email && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Teléfono *</label>
            <input
              type="tel"
              {...register("phone", { required: true, valueAsNumber: true })}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/\D/g, "");
              }}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Teléfono"
            />
            {errors.phone && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Fecha de nacimiento *</label>
            <input
              type="date"
              {...register("born_date", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
            {errors.born_date && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Género *</label>
            <select
              {...register("genero", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              defaultValue=""
            >
              <option value="" disabled>Selecciona un género</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMENINO">Femenino</option>
              <option value="OTRO">Otro</option>
            </select>
            {errors.genero && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          <div>
            <label className="text-sm font-medium">Rol *</label>
            <select
              {...register("roleEmployee", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              defaultValue=""
            >
              <option value="" disabled>Selecciona un rol</option>
              {rolEmployee.map((rol) => (
                <option key={rol.value} value={rol.value}>
                  {rol.name}
                </option>
              ))}
            </select>
            {errors.roleEmployee && <span className="text-red-500 text-sm">Campo requerido</span>}
          </div>

          {!employeeToEdit && (
            <div className="flex flex-col">
              <label className="text-sm font-medium">Contraseña *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-10"
                  placeholder="Contraseña"
                />
                <div
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">Campo requerido</span>
                )}
              </div>
            </div>
          )}

          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="bg-admin-principal hover:bg-admin-principal/50 text-white font-semibold px-5 py-3 rounded-full transition flex gap-4 cursor-pointer"
            >
              Siguiente
              <ArrowRightIcon width={24} height={24} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="hidden" {...register("addressBasicDTO.id")} />

          <div>
            <label className="text-sm font-medium">Calle *</label>
            <input
              {...register("addressBasicDTO.street", { required: true })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Calle"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Provincia *</label>
            <select
              value={selectedProvinceId ?? ""}
              onChange={(e) => {
                const id = Number(e.target.value);
                setSelectedProvinceId(id);
                setValue("addressBasicDTO.cityId", 0);
              }}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            >
              <option value="" disabled>Selecciona una provincia</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Código Postal *</label>
            <input
              type="number"
              {...register("addressBasicDTO.postalCode", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Código Postal"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Ciudad *</label>
            <select
              {...register("addressBasicDTO.cityId", {
                required: true,
                valueAsNumber: true,
              })}
              value={watch("addressBasicDTO.cityId") ?? ""}
              onChange={(e) => setValue("addressBasicDTO.cityId", Number(e.target.value))}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            >
              <option value="" disabled>
                {selectedProvinceId
                  ? "Selecciona una ciudad"
                  : "Primero selecciona una provincia"}
              </option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Número *</label>
            <input
              type="number"
              {...register("addressBasicDTO.number", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              placeholder="Número"
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-800 font-semibold px-5 py-3 rounded-full transition flex gap-4"
            >
              <ArrowLeftIcon width={24} height={24} />
              Atrás
            </button>
            <button
              type="submit"
              className="bg-admin-principal hover:bg-admin-principal/50 text-white font-semibold px-5 py-3 rounded-full transition cursor-pointer"
            >
              {employeeToEdit ? "Actualizar Empleado" : "Registrar Empleado"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
