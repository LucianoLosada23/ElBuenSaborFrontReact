import { useEffect, useState } from "react";
import type { Categories } from "../../types/shop/productosCategory/Category";
import { getCategories } from "../../services/shop/CategoryService";

export default function Category() {
  const [categories, setCategories] = useState<Categories>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-semibold  text-gray-800 mb-6">
          Hola, ¿Qué pides hoy?
        </h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No hay categorías disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-6 justify-items-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-xl border border-gray-200 w-full max-w-[140px] flex flex-col items-center text-center"
              >
                <img
                  src={category.image || "/placeholder.png"}
                  alt={category.name || "Categoría"}
                  loading="lazy"
                  className="w-20 h-20 object-cover rounded-full mb-3 border border-gray-200"
                />
                <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
