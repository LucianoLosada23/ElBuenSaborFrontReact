import { useEffect, useState } from "react";
import type { Categories } from "../../types/shop/productosCategory/Category";
import { getCategories } from "../../services/shop/CategoryService";

export default function Category() {
  const [categories, setCategories] = useState<Categories>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 px-2">
          Hola, ¿Qué pides hoy?
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-items-center">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-full max-w-[140px]">
                <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-3 animate-pulse"></div>
                <div className="bg-gray-100 h-4 w-3/4 mx-auto rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No hay categorías disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 w-full max-w-[140px] hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                  <img
                    src={category.image || "/placeholder.png"}
                    alt={category.name || "Categoría"}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.png";
                    }}
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}