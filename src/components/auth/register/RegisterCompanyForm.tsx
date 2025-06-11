import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: number;
  cuit: string;
  address: {
    street: string;
    number: number;
    postalCode: number;
    city: {
      name: string;
      province: {
        name: string;
        country: {
          name: string;
        };
      };
    };
  };
}

export default function RegisterCompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center">
        <img src="/logo1.png" width={200} height={200} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {/* Columna 1 */}
          <div className="flex flex-col gap-6">
            {/* Nombre Compañía */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre Compañía <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Nombre"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* CUIT */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CUIT <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("cuit", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="CUIT"
              />
              {errors.cuit && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* Calle */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Calle <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("address.street", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Calle"
              />
              {errors.address?.street && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* Número */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                {...register("address.number", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Número"
              />
              {errors.address?.number && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
          </div>
          {/* Columna 2 */}
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-orange-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* Código Postal */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código Postal <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                {...register("address.postalCode", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Código Postal"
              />
              {errors.address?.postalCode && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ciudad <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("address.city.name", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Ciudad"
              />
              {errors.address?.city?.name && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
          </div>
          {/* Columna 3 */}
          <div className="flex flex-col gap-6">
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                {...register("phone", { required: true, valueAsNumber: true })}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, "");
                }}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Teléfono"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* Contraseña */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Contraseña <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Contraseña"
              />
              <div
                className="absolute right-10 top-8 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeSlashIcon className="w-5 h-5" />
                )}
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* Provincia */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Provincia <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("address.city.province.name", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Provincia"
              />
              {errors.address?.city?.province?.name && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                País <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("address.city.province.country.name", {
                  required: true,
                })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="País"
              />
              {errors.address?.city?.province?.country?.name && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-principal hover:bg-secundario text-white font-semibold py-3 cursor-pointer rounded-full transition"
        >
          Registrarme
        </button>
      </form>
      {/* Línea divisoria */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="mx-3 text-sm text-gray-500">o regístrate con</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>
      {/* Botón de Google */}
      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>
      {/* Enlace a iniciar sesión */}
      <p className="text-sm text-center mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-gray-700 underline font-medium">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}
