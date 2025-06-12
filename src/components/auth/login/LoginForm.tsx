import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth/login/login";
import type { Login } from "../../../types/auth/login/Login";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useUIState } from "../../../hooks/ui/useUIState";
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  //state
  const [showPassword, setShowPassword] = useState(false);

  //hooks
  const { loginUser } = useAuth();
  const {toggle} = useUIState()

  //location
  const location = useLocation();
  const navigate = useNavigate();

  //Login
  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const result = await login(data);
      loginUser(result)
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-4">
      <div className="flex justify-center">
        <img src="/logo1.png" width={200} height={200} />
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
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1 pr-16"
            placeholder="Email"
          />
        </div>

        {/* Contraseña */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Contraseña</label>
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
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
        onClick={() => {
          const from = (location.state as any)?.from?.pathname || "/";
          const redirect = `http://localhost:5173${from}`;
          console.log(redirect);
          
          window.location.href = `http://localhost:8080/oauth2/google-login?redirect=${redirect}`;
        }}
      >
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
        <Link to="/register" className="text-blue-500 underline font-medium">
          Registrarse
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
