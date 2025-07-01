import { useEffect, useState } from "react";
import { getAllProductCategorybyId } from "../../services/admin/product/category/category";
import { useParams } from "react-router-dom";
import type { IngredientCategoryList } from "../../types/Insumos/IngredientCategory";

export default function Category() {
  const [categories, setCategories] = useState<IngredientCategoryList>([]);
  const { companyId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllProductCategorybyId(Number(companyId));
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, [companyId]);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Hola, ¿Qué pides hoy?
        </h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No hay categorías disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-6 justify-items-center">
            {categories
              .filter((category) => !category.parent)
              .map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 w-full max-w-[140px] flex flex-col items-center text-center"
                >
                  <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
