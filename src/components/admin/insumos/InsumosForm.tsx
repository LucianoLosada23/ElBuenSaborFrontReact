import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  createIngredient,
  putIngredient,
} from "../../../services/admin/insumos/Ingredients";
import { getAllInsumosCategory } from "../../../services/admin/insumos/insumosCategory/InsumosCategory";
import type { IngredientCategory } from "../../../types/Insumos/IngredientCategory";
import { useUIState } from "../../../hooks/ui/useUIState";
import { useInsumoEdit } from "../../../hooks/insumos/useInsumoEdit";
import { toast } from "react-toastify";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

interface InsumosFormFormData {
  id?: number;
  name: string;
  price: number;
  unitMeasure: string;
  description?: string;
  minStock: number;
  currentStock: number;
  maxStock: number;
  categoryId: number;
  toPrepare?: boolean; // nuevo campo
}

const unidades = ["KILOGRAM", "UNIT", "GRAM", "LITER", "MILLILITER"];

const InsumosForm: React.FC = () => {
  const [allCategories, setAllCategories] = useState<IngredientCategory[]>([]);
  const [parentCategories, setParentCategories] = useState<IngredientCategory[]>([]);
  const [childCategories, setChildCategories] = useState<IngredientCategory[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const { toggle } = useUIState();
  const { insumoEdit, setEdit } = useInsumoEdit();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InsumosFormFormData>();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllInsumosCategory();
      if (Array.isArray(data)) {
        setAllCategories(data);
        setParentCategories(data.filter(cat => cat.parent === null));
        setCategoriesLoaded(true);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoriesLoaded) return;
    if (insumoEdit) {
      setValue("id", insumoEdit.id);
      setValue("name", insumoEdit.name);
      setValue("price", insumoEdit.price);
      setValue("unitMeasure", insumoEdit.unitMeasure.toUpperCase());
      setValue("minStock", insumoEdit.minStock);
      setValue("currentStock", insumoEdit.currentStock);
      setValue("maxStock", insumoEdit.maxStock);
      setValue("toPrepare", insumoEdit.toPrepare ?? false);

      if (insumoEdit.categoryIngredient?.id) {
        // Si tiene parent, setear parent y child
        const cat = allCategories.find(c => c.id === insumoEdit.categoryIngredient.id);
        if (cat?.parent?.id) {
          setSelectedParentId(cat.parent.id);
          setSelectedChildId(cat.id);
          setValue("categoryId", cat.id);
        } else {
          setSelectedParentId(insumoEdit.categoryIngredient.id);
          setSelectedChildId(null);
          setValue("categoryId", insumoEdit.categoryIngredient.id);
        }
      }
    } else {
      reset();
      setSelectedParentId(null);
      setSelectedChildId(null);
    }
  }, [insumoEdit, setValue, reset, allCategories, categoriesLoaded]);

  useEffect(() => {
    if (selectedParentId !== null) {
      const children = allCategories.filter(cat => cat.parent?.id === selectedParentId);
      setChildCategories(children);
      if (children.length === 0) {
        setValue("categoryId", selectedParentId);
        setSelectedChildId(null);
      } else {
        // Si ya hay un child seleccionado y pertenece a estos hijos, mantenerlo
        if (!children.some(c => c.id === selectedChildId)) {
          setSelectedChildId(null);
          setValue("categoryId", 0);
        }
      }
    } else {
      setChildCategories([]);
      setValue("categoryId", 0);
      setSelectedChildId(null);
    }
  }, [selectedParentId, allCategories, setValue, selectedChildId]);

  const onSubmit: SubmitHandler<InsumosFormFormData> = async (data) => {
    const ingredientPayload = {
      company: { id: 1 }, // reemplazar si tenés otro ID real
      name: data.name,
      price: data.price,
      unitMeasure: data.unitMeasure.toUpperCase(),
      status: true,
      minStock: data.minStock,
      currentStock: data.currentStock,
      maxStock: data.maxStock,
      categoryIngredient: {
        id: data.categoryId,
      },
      toPrepare: data.toPrepare ?? false, // nuevo campo
    };

    try {
      if (data.id) {
        await putIngredient(ingredientPayload, data.id);
        toast.success("Insumo actualizado con éxito");
      } else {
        await createIngredient(ingredientPayload);
        toast.success("Insumo creado con éxito");
      }
      toggle("isInsumosOpen");
      setEdit(null);
      setTimeout(() => window.location.reload(), 500); // recarga tras cerrar modal
    } catch (error) {
      console.error(error);
      toast.error("Error guardando el insumo");
    }
  };

  if (!categoriesLoaded) {
    return <div className="text-center py-8">Cargando categorías...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-8">
        {/* Columna Izquierda */}
        <div className="flex flex-col gap-2">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm">
              Denominación <span className="text-orange-500 text-lg">*</span>
            </label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              placeholder="Denominación del insumo"
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Precio */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm">
              Precio <span className="text-orange-500 text-lg">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "El precio es obligatorio", min: 0 })}
              placeholder="Precio"
              className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          {/* Unidad de medida */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm">
              Unidad de Medida <span className="text-orange-500 text-lg">*</span>
            </label>
            <select
              {...register("unitMeasure", { required: "La unidad es obligatoria" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Unidad de medida</option>
              {unidades.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            {errors.unitMeasure && <p className="text-red-500">{errors.unitMeasure.message}</p>}
          </div>

          {/* ¿Es para preparar? */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              {...register("toPrepare")}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label className="text-gray-700 text-sm">¿Es un insumo para preparar?</label>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col gap-2">
          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm">
              Stock <span className="text-orange-500 text-lg">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                {...register("minStock", { required: "Stock mínimo obligatorio", min: 0 })}
                placeholder="Stock Mínimo"
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              />
              <input
                type="number"
                {...register("currentStock", { required: "Stock actual obligatorio", min: 0 })}
                placeholder="Stock Actual"
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              />
              <input
                type="number"
                {...register("maxStock", { required: "Stock máximo obligatorio", min: 0 })}
                placeholder="Stock Máximo"
                className="w-full border-b-2 border-zinc-300 focus:outline-none py-1"
              />
            </div>
            {(errors.minStock || errors.currentStock || errors.maxStock) && (
              <p className="text-red-500">
                {errors.minStock?.message || errors.currentStock?.message || errors.maxStock?.message}
              </p>
            )}
          </div>

          {/* Categorías */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm">
              Categorías <span className="text-orange-500 text-lg">*</span>
            </label>
            <select
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setSelectedParentId(isNaN(id) ? null : id);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={selectedParentId ?? ""}
            >
              <option value="">Seleccioná categoría principal</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {childCategories.length > 0 && (
              <select
                {...register("categoryId", { required: "La subcategoría es obligatoria" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={selectedChildId ?? ""}
                onChange={e => {
                  const id = parseInt(e.target.value);
                  setSelectedChildId(isNaN(id) ? null : id);
                  setValue("categoryId", isNaN(id) ? 0 : id, { shouldValidate: true });
                }}
              >
                <option value="">Seleccioná subcategoría</option>
                {childCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}

            {childCategories.length === 0 && (
              <input
                type="hidden"
                {...register("categoryId", { required: true })}
                value={selectedParentId ?? ""}
                readOnly
              />
            )}

            {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
          </div>
        </div>
      </div>

      {/* Botón */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-admin-principal flex gap-2 py-3 px-6 cursor-pointer rounded-full hover:bg-admin-principal/50 text-white transition"
        >
          {insumoEdit ? (
            <>
              <PencilSquareIcon width={24} height={24} />
              Guardar cambios
            </>
          ) : (
            <>
              <PlusIcon width={24} height={24} />
              Añadir
            </>
          )}
        </button>
      </div>
    </form>
  );
};


export default InsumosForm;
