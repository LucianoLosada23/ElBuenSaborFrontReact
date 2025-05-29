import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface InsumosFormFormData {
  titulo: string;
  stockMax: number;
  stockMin: number;
  unidad: string;
  descripcion: string;
  categoriaPrincipal: string;
  categoriaSecundaria: string;
}

const unidades = ["kg", "g", "L", "ml", "unidad"];
const categorias = ["Harinas", "Lácteos", "Verduras", "Carnes"]; // podés cargar dinámicamente si querés

const InsumosForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InsumosFormFormData>();

  const onSubmit: SubmitHandler<InsumosFormFormData> = (data) => {
    console.log("Ingrediente enviado:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <div>
        <input
          {...register("titulo", { required: true })}
          placeholder="Título"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Stock Máximo y Mínimo */}
      <div className="flex gap-2">
        <input
          type="number"
          {...register("stockMax", { required: true, min: 0 })}
          placeholder="Stock Máximo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          {...register("stockMin", { required: true, min: 0 })}
          placeholder="Stock Mínimo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Unidad de medida */}
      <div>
        <select
          {...register("unidad", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Unidad de medida</option>
          {unidades.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Descripción */}
      <div>
        <textarea
          {...register("descripcion")}
          placeholder="Descripción"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Categoría Principal */}
      <div>
        <select
          {...register("categoriaPrincipal", { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Categoría principal</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría Secundaria */}
      <div>
        <select
          {...register("categoriaSecundaria")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Categoría secundaria (opcional)</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Botón confirmar */}
      <button
        type="submit"
        className="w-full border border-admin-principal py-3 cursor-pointer rounded-md hover:bg-gray-100  text-admin-principal transition"
      >
        Guardar Insumo
      </button>
    </form>
  );
};

export default InsumosForm;
