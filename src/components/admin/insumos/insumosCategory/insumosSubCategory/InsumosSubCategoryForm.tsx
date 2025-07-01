import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCategorias } from "../../../../../hooks/useCategorias";
import { useInsumosCategory } from "../../../../../hooks/insumosCategory/useInsumosCategory";
import { useUIState } from "../../../../../hooks/ui/useUIState";
import { putInsumosCategory } from "../../../../../services/admin/insumos/insumosCategory/InsumosCategory";
import { putProductCategory } from "../../../../../services/admin/product/category/category";
import { postInsumosSubCategory } from "../../../../../services/admin/insumos/insumosCategory/insumosSubCategory/insumosSubCategory";
import { postProductSubCategory } from "../../../../../services/admin/product/category/subcategory/subCategory";

type InsumosSubCategoryFormProps = {
  onRefresh: () => void;
}

interface SubcategoryFormData {
  name: string;
}

const InsumosSubCategoryForm = ({onRefresh}: InsumosSubCategoryFormProps) => {
  const location = useLocation();
  const { selectedCategory, limpiarCategoria} = useCategorias();
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
          result = await putInsumosCategory(
            selectedCategory.id,
            subcategoryToSend
          );
          if (!result) throw new Error("Error al actualizar una subcategory insumo");
          onRefresh()
          limpiarCategoria()
          toggle("isInsumosSubCategoryOpen");
        } else if (location.pathname === "/admin/productos-categorias") {
          result = await putProductCategory(
            selectedCategory.id,
            subcategoryToSend
          );
          if (!result) throw new Error("Error al actualizar una subcategory producto");
          onRefresh()
          limpiarCategoria()
          toggle("isProductSubCategoryOpen");
        }

        if (result) {
          toast.success("Subcategoría actualizada con éxito");
        }
      } else {
        // CREAR
        if (location.pathname === "/admin/insumos-categorias") {
          result = await postInsumosSubCategory(subcategoryToSend);
          if (!result) throw new Error("Error al crear una subcategory insumo");
          onRefresh()
          toggle("isInsumosSubCategoryOpen");
        } else if (location.pathname === "/admin/productos-categorias") {
          result = await postProductSubCategory(subcategoryToSend);
          if (!result) throw new Error("Error al crear una subcategory insumo");
          onRefresh()
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
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-gray-700 text-sm">
          Denominación <span className="text-orange-500 text-lg">*</span>
        </label>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Nombre de la subcategoría"
          className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-admin-principal w-full flex justify-center gap-2 py-3 px-6 cursor-pointer rounded-full hover:bg-admin-principal/50 text-white transition"
      >
        {selectedCategory ? "Actualizar Subcategoría" : "Añadir Subcategoría"}
      </button>
    </form>
  );
};

export default InsumosSubCategoryForm;
