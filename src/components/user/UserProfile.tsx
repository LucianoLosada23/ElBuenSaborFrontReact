import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function UserProfile() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState("/user2.jpg");

  const onSubmit = (data: any) => {
    console.log("Datos enviados:", data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  return (
    <div className="bg-white max-w-6xl mx-auto mt-10 rounded-2xl shadow-lg p-12">
      <div className="grid grid-cols-[35%_1fr] gap-12 items-start">
        {/* Lado izquierdo (imagen + título) */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold mb-6">Editar Perfil</h2>
          <label htmlFor="profileImage" className="cursor-pointer group">
            <img
              src={imagePreview}
              alt="Profile"
              width={220}
              height={220}
              className="rounded-full border-4 border-gray-200 group-hover:opacity-80 transition"
            />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500 mt-3">
            Haz clic para cambiar la foto
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              {...register("nombre")}
              type="text"
              className="w-full border-b-2 border-zinc-500 focus:outline-none py-1"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              {...register("telefono")}
              type="tel"
              className="w-full border-b-2 border-zinc-500 focus:outline-none py-1"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full border-b-2 border-zinc-500 focus:outline-none py-1 pr-10"
            />
            <PencilSquareIcon className="w-5 h-5 absolute right-2 top-8 text-gray-500 cursor-pointer" />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full border-b-2 border-zinc-500 focus:outline-none py-1 pr-16"
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
            <PencilSquareIcon className="w-5 h-5 absolute right-2 top-8 text-gray-500 cursor-pointer" />
          </div>

          {/* Botón Guardar */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-principal text-white font-semibold px-6 py-2 rounded-full hover:bg-terciario transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
