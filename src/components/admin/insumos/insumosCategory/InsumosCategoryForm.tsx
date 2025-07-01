import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUIState } from "../../../../hooks/ui/useUIState";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  postInsumosCategory,
  putInsumosCategory,
} from "../../../../services/admin/insumos/insumosCategory/InsumosCategory";
import {
  postProductCategory,
  putProductCategory,
} from "../../../../services/admin/product/category/category";
import { useCategorias } from "../../../../hooks/useCategorias"; // Asumo que acá tienes el selector global

type InsumosCategoryFormProps = {
  onRefresh: () => void;
}

interface CategoryFormData {
  name: string;
}

const InsumosCategoryForm = ({onRefresh}:InsumosCategoryFormProps ) => {
  const location = useLocation();
  const { selectedCategory  , limpiarCategoria} = useCategorias();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
    },
  });

  const { toggle } = useUIState();

  // Cuando cambia la categoría seleccionada, seteamos el formulario con sus datos
  useEffect(() => {
    if (selectedCategory) {
      reset({ name: selectedCategory.name });
    } else {
      reset({ name: "" }); // Limpia formulario si no hay categoría seleccionada
    }
  }, [selectedCategory, reset]);

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    const categoryToSend = {
      name: data.name,
      company: {
        id: 1, // hardcodeado, cambiar si necesario
      },
    };

    try {
      let result;

      if (selectedCategory) {
        // EDITAR
        if (location.pathname === "/admin/insumos-categorias") {
          if (selectedCategory && selectedCategory.id !== undefined) {
            result = await putInsumosCategory(
              selectedCategory.id,
              categoryToSend
            );
            if (!result) throw new Error("Error al actualizar una category insumo");
            limpiarCategoria()
            onRefresh()
          }
          toggle("isInsumosCategoryOpen");
        } else if (location.pathname === "/admin/productos-categorias") {
          if (selectedCategory && selectedCategory.id !== undefined) {
            result = await putProductCategory(
              selectedCategory.id,
              categoryToSend
            );
            if (!result) throw new Error("Error al actualizar una category producto");
            limpiarCategoria()
            onRefresh()
          }
          toggle("isProductCategoryOpen");
        }
        if (result) {
          toast.success("Categoría actualizada con éxito");
        }
      } else {
        // CREAR
        if (location.pathname === "/admin/insumos-categorias") {
          result = await postInsumosCategory(categoryToSend);
          if (!result) throw new Error("Error al crear una category insumo");
          onRefresh()
          toggle("isInsumosCategoryOpen");
        } else if (location.pathname === "/admin/productos-categorias") {
          result = await postProductCategory(categoryToSend);
          if (!result) throw new Error("Error al crear una category producto");
          onRefresh()
          toggle("isProductCategoryOpen");
        }
        toast.success(selectedCategory ? "Categoría actualizada con éxito" : "Categoría creada con éxito");
      }
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      toast.error("Hubo un error al guardar la categoría");
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
          placeholder="Denominación de la categoría"
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
        {selectedCategory ? "Actualizar Categoría" : "Añadir Categoría"}
      </button>
    </form>
  );
};

export default InsumosCategoryForm;
