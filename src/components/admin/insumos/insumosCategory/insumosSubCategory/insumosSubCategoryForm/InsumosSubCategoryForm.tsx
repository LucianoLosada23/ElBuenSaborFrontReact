import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useUIState } from "../../../../../../hooks/ui/useUIState";
import { useInsumosCategory } from "../../../../../../hooks/insumosCategory/useInsumosCategory";
import { postInsumosSubCategory } from "../../../../../../services/admin/insumos/insumosCategory/insumosSubCategory/insumosSubCategory";
import { postProductSubCategory } from "../../../../../../services/admin/product/category/subcategory/subCategory";
import { useLocation } from "react-router-dom";

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
  const { selectedParentId } = useInsumosCategory();
  const location = useLocation();
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
      // Determinar cuál service usar según la ruta
      let result;

      if (location.pathname === "/admin/insumos-categorias") {
        result = await postInsumosSubCategory(subcategoryToSend);
        toggle("isInsumosSubCategoryOpen");
      } else if (location.pathname === "/admin/productos-categorias") {
        result = await postProductSubCategory(subcategoryToSend);
        toggle("isProductSubCategoryOpen");
      }

      if (result) {
        toast.success("Categoría creada con éxito");
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      toast.error("Hubo un error al crear la categoría");
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
