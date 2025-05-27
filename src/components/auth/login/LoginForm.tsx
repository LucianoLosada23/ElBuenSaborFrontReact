import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  contrasena: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold mb-6">Iniciar Sesión</h2>
        <XMarkIcon width={24} hanging={24}/>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Email"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña *
          </label>
          <input
            type="password"
            {...register("contrasena", { required: true })}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Contraseña"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-principal hover:bg-secundario text-white font-semibold py-3 cursor-pointer rounded-full transition"
        >
          Ingresar
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
        ¿Necesitas una Cuenta?{" "}
        <Link to="/register" className="text-gray-700 underline font-medium">
          Registrarse
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
