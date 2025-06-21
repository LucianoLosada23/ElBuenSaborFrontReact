import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAddress from "../../../hooks/address/useAddress";
import type { RegisterEmployee } from "../../../types/auth/register/RegisterEmployee";
import { toast } from "react-toastify";
import { createEmployee } from "../../../services/admin/employee/employeeServices";

export default function EmployeeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<RegisterEmployee>();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );
  const { provinces, cities} = useAddress();

  const navigate = useNavigate();
  const location = useLocation();


  const filteredCities = selectedProvinceId
    ? cities.filter((city) => city.province.id === selectedProvinceId)
    : [];

  const onSubmit = async (data: RegisterEmployee) => {
    try {
      await createEmployee(data);
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error al registrar empleado");
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

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">
                Nombre <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Nombre"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Apellido <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("lastname", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Apellido"
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Email <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Teléfono <span className="text-orange-500">*</span>
              </label>
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
              {errors.phone && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Fecha de nacimiento <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                {...register("born_date", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              />
              {errors.born_date && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Género <span className="text-orange-500">*</span>
              </label>
              <select
                {...register("genero", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona un género
                </option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
              </select>
              {errors.genero && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Rol <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("roleEmployee", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Rol del empleado"
              />
              {errors.roleEmployee && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium">
                Contraseña <span className="text-orange-500">*</span>
              </label>
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

            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="bg-principal hover:bg-secundario text-white font-semibold px-5 py-3 rounded-full transition flex gap-4 cursor-pointer"
              >
                Siguiente
                <ArrowRightIcon width={24} height={24} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">
                Calle <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("addressBasicDTO.street", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Calle"
              />
              {errors.addressBasicDTO?.street && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Provincia <span className="text-orange-500">*</span>
              </label>
              <select
                onChange={(e) => setSelectedProvinceId(Number(e.target.value))}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una provincia
                </option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Código Postal <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                {...register("addressBasicDTO.postalCode", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Código Postal"
              />
              {errors.addressBasicDTO?.postalCode && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Ciudad <span className="text-orange-500">*</span>
              </label>
              <select
                {...register("addressBasicDTO.cityId", {
                  required: true,
                  valueAsNumber: true,
                })}
                onChange={(e) =>
                  setValue("addressBasicDTO.cityId", Number(e.target.value))
                }
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                defaultValue=""
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
              {errors.addressBasicDTO?.cityId && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Número <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                {...register("addressBasicDTO.number", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
                placeholder="Número"
              />
              {errors.addressBasicDTO?.number && (
                <span className="text-red-500 text-sm">Campo requerido</span>
              )}
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
                className="bg-principal hover:bg-secundario text-white font-semibold px-5 py-3 rounded-full transition cursor-pointer"
              >
                Registrar Empleado
              </button>
            </div>
          </div>
        )}
      </form>

      <p className="text-sm text-center mt-6">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-blue-500 underline font-medium">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}
