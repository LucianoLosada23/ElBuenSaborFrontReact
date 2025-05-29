import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useUIState } from "../../../../../../hooks/ui/useUIState";
import { useInsumosCategory } from "../../../../../../hooks/insumosCategory/useInsumosCategory";
import { postInsumosSubCategory } from "../../../../../../services/admin/insumos/insumosCategory/insumosSubCategory/insumosSubCategory";


interface SubcategoryFormData {
  name: string;
}

const InsumosSubCategoryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubcategoryFormData>();

  const { toggle } = useUIState();
  const {selectedParentId} = useInsumosCategory()

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
    if (!selectedParentId) {
      toast.error("No hay una categoría padre seleccionada");
      return;
    }

    const subcategoryToSend = {
      name: data.name,
      parent: {
        id: selectedParentId,
      },
      company: {
        id: 1,
      },
    };
    console.log("Subcategoría a enviar:", subcategoryToSend);   

    try {
      const result = await postInsumosSubCategory(subcategoryToSend);
      if (result) {
        toggle("isInsumosSubCategoryOpen");
        toast.success("Subcategoría creada con éxito");
      }
    } catch (error) {
      console.error("Error al crear la subcategoría:", error);
      toast.error("Error al crear la subcategoría");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Nombre de la subcategoría"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full border border-admin-principal py-3 cursor-pointer rounded-md hover:bg-gray-100 text-admin-principal transition"
      >
        Crear Subcategoría
      </button>
    </form>
  );
};

export default InsumosSubCategoryForm;
