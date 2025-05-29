import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postInsumosCategory } from "../../../../../services/admin/insumos/insumosCategory/InsumosCategory";
import { useUIState } from "../../../../../hooks/ui/useUIState";
import { toast } from "react-toastify";

interface CategoryFormData {
  name: string;
}

const InsumosCategoryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const {toggle} = useUIState()
  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    const categoryToSend = {
      name: data.name,
      company: {
        id: 1, // hardcodeado
      },
    };

    try {
      const result = await postInsumosCategory(categoryToSend);

      if (result) {
        toggle("isInsumosCategoryOpen");
        toast.success("Categoría creada con éxito");
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo Nombre */}
      <div>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Nombre de la categoría"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full border border-admin-principal py-3 cursor-pointer rounded-md hover:bg-gray-100 text-admin-principal transition"
      >
        Crear Categoría
      </button>
    </form>
  );
};

export default InsumosCategoryForm;
