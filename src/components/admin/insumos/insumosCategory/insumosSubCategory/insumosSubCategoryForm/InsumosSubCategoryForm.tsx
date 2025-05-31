import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useUIState } from "../../../../../../hooks/ui/useUIState";
import { useInsumosCategory } from "../../../../../../hooks/insumosCategory/useInsumosCategory";
import {
  postInsumosSubCategory,
} from "../../../../../../services/admin/insumos/insumosCategory/insumosSubCategory/insumosSubCategory";
import {
  postProductSubCategory
} from "../../../../../../services/admin/product/category/subcategory/subCategory";
import { useLocation } from "react-router-dom";
import { useCategorias } from "../../../../../../hooks/useCategorias";
import { putInsumosCategory } from "../../../../../../services/admin/insumos/insumosCategory/InsumosCategory";
import { putProductCategory } from "../../../../../../services/admin/product/category/category";

interface SubcategoryFormData {
  name: string;
}

const InsumosSubCategoryForm: React.FC = () => {
  const location = useLocation();
  const { selectedCategory } = useCategorias(); // Subcategoría seleccionada
  const { selectedParentId } = useInsumosCategory();
  const { toggle } = useUIState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubcategoryFormData>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (selectedCategory) {
      reset({ name: selectedCategory.name });
    } else {
      reset({ name: "" });
    }
  }, [selectedCategory, reset]);

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

    try {
      let result;

      if (selectedCategory && selectedCategory.id !== undefined) {
        // EDITAR
        if (location.pathname === "/admin/insumos-categorias") {
          result = await putInsumosCategory(selectedCategory.id, subcategoryToSend);
          toggle("isInsumosSubCategoryOpen");
        } else if (location.pathname === "/admin/productos-categorias") {
          result = await putProductCategory(selectedCategory.id, subcategoryToSend);
          toggle("isProductSubCategoryOpen");
        }

        if (result) {
          toast.success("Subcategoría actualizada con éxito");
        }
      } else {
        // CREAR
        if (location.pathname === "/admin/insumos-categorias") {
          result = await postInsumosSubCategory(subcategoryToSend);
          toggle("isInsumosSubCategoryOpen");
        } else if (location.pathname === "/admin/productos-categorias") {
          result = await postProductSubCategory(subcategoryToSend);
          toggle("isProductSubCategoryOpen");
        }

        if (result) {
          toast.success("Subcategoría creada con éxito");
        }
      }
    } catch (error) {
      console.error("Error al guardar la subcategoría:", error);
      toast.error("Hubo un error al guardar la subcategoría");
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
        {selectedCategory ? "Actualizar Subcategoría" : "Crear Subcategoría"}
      </button>
    </form>
  );
};

export default InsumosSubCategoryForm;
