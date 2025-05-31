import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { getAllIngredients } from "../../../../services/admin/insumos/Ingredients";
import { getAllProductCategory } from "../../../../services/admin/product/category/category";

import type { Ingredient } from "../../../../types/Ingredients/Ingredient";
import type { IngredientCategory } from "../../../../types/Ingredients/IngredientCategory";
import { postProduct } from "../../../../services/admin/product/product";

interface ProductFormData {
  title: string;
  description: string;
  estimatedTime: number;
  price: number;
  image: string;
  categoryId: number;
  ingredients: { ingredientId: number; quantity: number }[];
}

const ProductosForm: React.FC = () => {
  const [categories, setCategories] = useState<IngredientCategory[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);
  const [parentCategories, setParentCategories] = useState<IngredientCategory[]>([]);
  const [childCategories, setChildCategories] = useState<IngredientCategory[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredientId: number; quantity: number }[]>([]);
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    const product = {
      company: { id: 1 },
      title: data.title,
      description: data.description,
      estimatedTime: data.estimatedTime,
      price: data.price,
      image: data.image,
      category: { id: data.categoryId },
      productIngredients: selectedIngredients.map((item) => ({
        ingredient: { id: item.ingredientId },
        quantity: item.quantity,
      })),
    };
    console.log("Producto a guardar:", product);
    postProduct(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getAllProductCategory();
      const ingr = await getAllIngredients();
      if (cats && ingr) {
        setCategories(cats);
        setIngredients(ingr);
        setFilteredIngredients([]); // No mostrar al principio
        setParentCategories(cats.filter((cat) => cat.parent === null));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedParentId !== null) {
      const children = categories.filter((cat) => cat.parent?.id === selectedParentId);
      setChildCategories(children);
      setValue("categoryId", children.length === 0 ? selectedParentId : 0);
    } else {
      setChildCategories([]);
      setValue("categoryId", 0);
    }
  }, [selectedParentId, categories, setValue]);

  const handleIngredientChange = (ingredientId: number, quantity: number) => {
    setSelectedIngredients((prev) => {
      const existing = prev.find((i) => i.ingredientId === ingredientId);
      if (existing) {
        return prev.map((i) =>
          i.ingredientId === ingredientId ? { ...i, quantity } : i
        );
      } else {
        return [...prev, { ingredientId, quantity }];
      }
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const filtered = ingredients.filter((ing) =>
      ing.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <input
        {...register("title", { required: "El título es obligatorio" })}
        placeholder="Título del producto"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {/* Descripción */}
      <textarea
        {...register("description", { required: "La descripción es obligatoria" })}
        placeholder="Descripción"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      {/* Tiempo estimado */}
      <input
        type="number"
        {...register("estimatedTime", { required: true, min: 1 })}
        placeholder="Tiempo estimado en minutos"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.estimatedTime && <p className="text-red-500">Tiempo estimado inválido</p>}

      {/* Precio */}
      <input
        type="number"
        step="0.01"
        {...register("price", { required: true, min: 0 })}
        placeholder="Precio"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.price && <p className="text-red-500">Precio inválido</p>}

      {/* Imagen */}
      <input
        {...register("image", { required: "La URL de la imagen es obligatoria" })}
        placeholder="URL de imagen"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      {errors.image && <p className="text-red-500">{errors.image.message}</p>}

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

      {/* Ingredientes con buscador */}
      <div className="space-y-2">
        <h3 className="font-semibold">Ingredientes</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar ingrediente..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {search && filteredIngredients.length > 0 && (
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md mt-2">
            {filteredIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex items-center justify-between px-2 py-1 border-b border-gray-100 hover:bg-gray-50"
              >
                <span>{ingredient.name}</span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    const alreadySelected = selectedIngredients.some(
                      (i) => i.ingredientId === ingredient.id
                    );
                    if (!alreadySelected) {
                      setSelectedIngredients((prev) => [
                        ...prev,
                        { ingredientId: ingredient.id, quantity: 0 },
                      ]);
                    }
                  }}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Ingredientes seleccionados */}
        {selectedIngredients.map((item) => {
          const ingredient = ingredients.find((ing) => ing.id === item.ingredientId);
          return (
            <div key={item.ingredientId} className="flex items-center gap-2">
              <label className="flex-1">{ingredient?.name}</label>
              <input
                type="number"
                min={0}
                step={0.01}
                placeholder="Cantidad"
                value={item.quantity}
                onChange={(e) =>
                  handleIngredientChange(item.ingredientId, parseFloat(e.target.value))
                }
                className="w-24 px-2 py-1 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() =>
                  setSelectedIngredients((prev) =>
                    prev.filter((i) => i.ingredientId !== item.ingredientId)
                  )
                }
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full border border-blue-600 py-3 cursor-pointer rounded-md hover:bg-blue-50 text-blue-600 transition"
      >
        Guardar Producto
      </button>
    </form>
  );
};

export default ProductosForm;
