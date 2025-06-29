import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import type {
  CreatetypePromotion,
  TypePromotion,
} from "../../../../types/promotions/Promotions";
import { createPromotionTypes, updatePromotionTypes } from "../../../../services/admin/promotions/promotionsTypes";
import { useUIState } from "../../../../hooks/ui/useUIState";

type PromotionTypeFormProps = {
  onRefresh: () => void;
  typePromotionToEdit?: TypePromotion | null;
  setTypePromotionToEdit: React.Dispatch<React.SetStateAction<TypePromotion | null>>;
};

// Opciones del enum PromotionBehavior
const behaviorOptions = [
  { value: "PRECIO_FIJO", label: "Precio fijo" },
  { value: "DESCUENTO_PORCENTAJE", label: "Descuento %" },
  { value: "X_POR_Y", label: "Promoción X por Y (2x1, 3x2...)" },
];

export default function PromotionTypeForm({
  onRefresh,
  typePromotionToEdit,
  setTypePromotionToEdit,
}: PromotionTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatetypePromotion>();

  const {toggle} = useUIState()

  // Cargar datos si estamos editando
  useEffect(() => {
    if (typePromotionToEdit) {
      setValue("name", typePromotionToEdit.name);
      setValue("behavior", typePromotionToEdit.behavior);
    }
  }, [typePromotionToEdit, setValue]);

  const onSubmit = async (data: CreatetypePromotion) => {
    try {
      if (typePromotionToEdit) {
        const result = await updatePromotionTypes(typePromotionToEdit.id, {
          ...data,
          id: typePromotionToEdit.id,
          companyId: typePromotionToEdit.companyId,
        });
        if (!result) throw new Error("Error al actualizar tipo de promoción");
        toast.success("Tipo de promoción actualizado");
        setTypePromotionToEdit(null);
      } else {
        const result = await createPromotionTypes(data);
        if (!result) throw new Error("Error al crear tipo de promoción");
        toast.success("Tipo de promoción creado");
      }
      toggle("isPromotionsTypesOpen")
      onRefresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Ocurrió un error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo nombre */}
        <div>
          <label className="text-sm font-medium">
            Nombre <span className="text-orange-600">*</span>
          </label>
          <input
            {...register("name", { required: true })}
            placeholder="Nombre del tipo"
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
          />
          {errors.name && <span className="text-red-500 text-sm">Campo requerido</span>}
        </div>

        {/* Campo comportamiento */}
        <div>
          <label className="text-sm font-medium">
            Comportamiento <span className="text-orange-600">*</span>
          </label>
          <select
            {...register("behavior", { required: true })}
            className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione un comportamiento
            </option>
            {behaviorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.behavior && <span className="text-red-500 text-sm">Campo requerido</span>}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        {typePromotionToEdit && (
          <button
            type="button"
            onClick={() => setTypePromotionToEdit(null)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-5 py-3 rounded-full transition"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-admin-principal hover:bg-admin-principal/50 text-white font-semibold cursor-pointer px-5 py-3 rounded-full transition"
        >
          {typePromotionToEdit ? "Actualizar Tipo Promoción" : "Crear Tipo Promoción"}
        </button>
      </div>
    </form>
  );
}
