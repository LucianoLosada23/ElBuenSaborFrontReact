import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { getAllInsumosCategory } from "../../../../services/admin/insumos/insumosCategory/InsumosCategory";
import type { IngredientCategory } from "../../../../types/Ingredients/IngredientCategory";
import { createIngredient } from "../../../../services/admin/insumos/Ingredients";

interface InsumosFormFormData {
  name: string;
  price: number;
  unitMeasure: string;
  description?: string;
  minStock: number;
  currentStock: number;
  maxStock: number;
  categoryId: number;
}

const unidades = [ "KILOGRAM", "UNIT", "GRAM", "LITER", "MILLILITER"];

const InsumosForm: React.FC = () => {
  const [allCategories, setAllCategories] = useState<IngredientCategory[]>([]);
  const [parentCategories, setParentCategories] = useState<IngredientCategory[]>([]);
  const [childCategories, setChildCategories] = useState<IngredientCategory[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InsumosFormFormData>();

  const onSubmit: SubmitHandler<InsumosFormFormData> = (data) => {
    const newIngredient = {
      company: { id: 1 }, // Podés hacerlo dinámico si querés
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
    };
    console.log("Ingrediente a guardar:", newIngredient);
    createIngredient(newIngredient)
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllInsumosCategory();
      if (Array.isArray(data)) {
        setAllCategories(data);
        setParentCategories(data.filter((cat) => cat.parent === null));
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedParentId !== null) {
      const children = allCategories.filter(
        (cat) => cat.parent?.id === selectedParentId
      );
      setChildCategories(children);

      if (children.length === 0) {
        // No tiene subcategorías → usar el padre
        setValue("categoryId", selectedParentId);
      } else {
        // Tiene subcategorías → forzar selección manual
        setValue("categoryId", 0);
      }
    } else {
      setChildCategories([]);
      setValue("categoryId", 0);
    }
  }, [selectedParentId, allCategories, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nombre */}
      <input
        {...register("name", { required: "El nombre es obligatorio" })}
        placeholder="Nombre del insumo"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      {/* Precio */}
      <input
        type="number"
        step="0.01"
        {...register("price", { required: "El precio es obligatorio", min: 0 })}
        placeholder="Precio"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      {/* Unidad de medida */}
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

      {/* Stock Mínimo / Actual / Máximo */}
      <div className="flex gap-2">
        <input
          type="number"
          {...register("minStock", { required: "Stock mínimo obligatorio", min: 0 })}
          placeholder="Stock Mínimo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          {...register("currentStock", { required: "Stock actual obligatorio", min: 0 })}
          placeholder="Stock Actual"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          {...register("maxStock", { required: "Stock máximo obligatorio", min: 0 })}
          placeholder="Stock Máximo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      {(errors.minStock || errors.currentStock || errors.maxStock) && (
        <p className="text-red-500">
          {errors.minStock?.message || errors.currentStock?.message || errors.maxStock?.message}
        </p>
      )}

      {/* Categoría Padre */}
      <select
        onChange={(e) => {
          const id = parseInt(e.target.value);
          setSelectedParentId(isNaN(id) ? null : id);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Seleccioná categoría principal</option>
        {parentCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Subcategoría */}
      {childCategories.length > 0 && (
        <select
          {...register("categoryId", { required: "La subcategoría es obligatoria" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccioná subcategoría</option>
          {childCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}

      {/* Botón */}
      <button
        type="submit"
        className="w-full border border-admin-principal py-3 cursor-pointer rounded-md hover:bg-gray-100 text-admin-principal transition"
      >
        Guardar Insumo
      </button>
    </form>
  );
};

export default InsumosForm;
