import { useEffect, useState } from "react";
import type { Categories } from "../../types/Category";
import { getCategories } from "../../services/CategoryService";

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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categorías Populares</h1>

      <div className="flex overflow-x-auto gap-4 pb-2">
        {categories.length === 0 ? (
          <p className="text-gray-500">No hay categorías disponibles.</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="min-w-[128px] text-center group">
              <img
                src={category.image || "/placeholder.png"}
                alt={category.name || "Categoría"}
                title={category.name}
                className="w-32 h-36 rounded-xl object-cover cursor-pointer mx-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <h2 className="text-sm font-medium text-gray-700 mt-2">{category.name}</h2>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
