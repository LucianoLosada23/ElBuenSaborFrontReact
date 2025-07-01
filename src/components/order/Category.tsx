import { useEffect, useState } from "react";
import { getAllProductCategorybyId } from "../../services/admin/product/category/category";
import type { IngredientCategoryList } from "../../types/Insumos/IngredientCategory";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useParams } from "react-router-dom";

export default function Category() {
  const { selectedCategoryId, setCategoryFilter } = useCategoryFilter();
  const [categories, setCategories] = useState<IngredientCategoryList>([]);
  const { companyId: rawCompanyId } = useParams<{ companyId: string }>();
  const companyId = rawCompanyId ? Number(rawCompanyId) : null;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllProductCategorybyId(Number(companyId));
        if (data) setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, [companyId]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-lg font-medium text-gray-900 mb-6 text-center">
          ¿Qué querés pedir?
        </h2>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              selectedCategoryId === null
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Todos
          </button>

          {categories
            .filter((category) => !category.parent)
            .map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  selectedCategoryId === category.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}
