import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { getAllIngredients } from "../../../services/admin/insumos/Ingredients";
import { getAllProductCategory } from "../../../services/admin/product/category/category";
import { postProduct, putProduct } from "../../../services/admin/product/product";
import type { IngredientCategory } from "../../../types/Insumos/IngredientCategory";
import type { Ingredient } from "../../../types/Insumos/Ingredient";
import { useUIState } from "../../../hooks/ui/useUIState";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useProduct } from "../../../hooks/useProduct";

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

  const { toggle } = useUIState();
  const { productEdit } = useProduct();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    const product = {
      id: productEdit?.id,
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

    const result = productEdit
      ? await putProduct(product , productEdit.id)
      : await postProduct(product);

    if (result) {
      toggle("isProductOpen");
      toast.success(productEdit ? "Producto actualizado con éxito" : "Producto creado con éxito");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getAllProductCategory();
      const ingr = await getAllIngredients();
      if (cats && ingr) {
        setCategories(cats);
        setIngredients(ingr);
        setFilteredIngredients([]);
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

  // Prellenar si estamos en modo edición
  useEffect(() => {
    if (productEdit) {
      setValue("title", productEdit.title);
      setValue("description", productEdit.description);
      setValue("price", productEdit.price);
      setValue("estimatedTime", productEdit.estimatedTime);
      setValue("image", productEdit.image);

      const parent = categories.find(cat => cat.id === productEdit.category.parent?.id);
      if (parent) {
        setSelectedParentId(parent.id);
        setValue("categoryId", productEdit.category.id);
      } else {
        setSelectedParentId(productEdit.category.id);
        setValue("categoryId", productEdit.category.id);
      }

      const formattedIngredients = productEdit.productIngredients.map((pi: any) => ({
        ingredientId: pi.ingredient.id,
        quantity: pi.quantity,
      }));
      setSelectedIngredients(formattedIngredients);
    }
  }, [productEdit, categories, setValue]);

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
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Detalles Del Producto</h3>
            <label className="text-gray-700">
              Denominación <span className="text-orange-500 text-lg">*</span>
            </label>
            <input
              {...register("title", { required: "El título es obligatorio" })}
              placeholder="Denominación del producto"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Descripción <span className="text-orange-500 text-lg">*</span>
            </label>
            <textarea
              {...register("description", { required: "La descripción es obligatoria" })}
              placeholder="Descripción"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Precio <span className="text-orange-500 text-lg">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true, min: 0 })}
              placeholder="Precio"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.price && <p className="text-red-500">Precio inválido</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Imagen <span className="text-orange-500 text-lg">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "La URL de la imagen es obligatoria" })}
              placeholder="URL de imagen"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Categorías y Tiempo Estimado</h3>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Tiempo Estimado <span className="text-orange-500 text-lg">*</span>
            </label>
            <input
              type="number"
              {...register("estimatedTime", { required: true, min: 1 })}
              placeholder="Tiempo estimado en minutos"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.estimatedTime && <p className="text-red-500">Tiempo estimado inválido</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Categoría <span className="text-orange-500 text-lg">*</span>
            </label>
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
          </div>

          {childCategories.length > 0 && (
            <select
              {...register("categoryId", {
                required: "La subcategoría es obligatoria",
              })}
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
          {errors.categoryId && (
            <p className="text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Ingredientes</h3>
            <label className="text-gray-700">
              Ingredientes <span className="text-orange-500 text-lg">*</span>
            </label>
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
                      className="text-blue-600 hover:underline text-sm"
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

            {selectedIngredients.map((item) => {
              const ingredient = ingredients.find(
                (ing) => ing.id === item.ingredientId
              );
              return (
                <div
                  key={item.ingredientId}
                  className="flex items-center gap-2 border-b py-2 border-gray-300"
                >
                  <label className="flex-1 text-gray-700 text-sm">
                    {ingredient?.name}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="Cantidad"
                    value={item.quantity}
                    onChange={(e) =>
                      handleIngredientChange(item.ingredientId, parseFloat(e.target.value))
                    }
                    className="w-18 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedIngredients((prev) =>
                        prev.filter((i) => i.ingredientId !== item.ingredientId)
                      )
                    }
                    className="text-orange-500 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-admin-principal flex gap-2 py-3 px-6 cursor-pointer rounded-full hover:bg-admin-principal/50 text-white transition"
            >
              <PlusIcon width={24} height={24} />
              {productEdit ? "Actualizar" : "Añadir"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductosForm;
