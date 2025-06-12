import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RegisterClient } from "../../../types/auth/register/Register";
import { registerClient } from "../../../services/auth/register/register";
import { useUIState } from "../../../hooks/ui/useUIState";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClient>();

  //state
  const [showPassword, setShowPassword] = useState(false);

  //location
  const navigate = useNavigate();
  const location = useLocation();
  const {toggle} = useUIState()

  const onSubmit: SubmitHandler<RegisterClient> = async (data) => {
    try {
      await registerClient(data);
      toggle("isLoginModal")
      // Redirige a la ubicación anterior o a "/" si no existe
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center">
        <img src="/logo1.png" width={200} height={200} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-10 p-6">
          <div className="flex flex-col gap-6">
            {/* Nombre Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre Completo <span className="text-orange-500">*</span>
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
            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("lastname", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Apellido"
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>

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
            </div>
            {/* Género */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Género <span className="text-orange-500">*</span>
              </label>
              <div className="flex gap-4 mt-2">
                {["masculino", "femenino", "otro"].map((opcion) => (
                  <label key={opcion} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={opcion}
                      {...register("genero", { required: true })}
                      className="accent-principal"
                    />
                    {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                  </label>
                ))}
              </div>
              {errors.genero && (
                <span className="text-red-500 text-sm">Campo Vacío !</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/\D/g, "");
                }}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Teléfono"
              />
            </div>

            {/* Fecha Nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                {...register("born_date", { required: true })}
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
                placeholder="Contraseña"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Contraseña <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("password")}
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
        <Link to="/login" className="text-blue-500  underline font-medium">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
