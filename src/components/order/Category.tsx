import { useEffect, useState } from "react";
import type { Categories } from "../../types/Category";
import { getCategories } from "../../services/CategoryService";

export default function Category() {
  const [categories, setCategories] = useState<Categories>([]);

  const callCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  useEffect(() => {
    callCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categorías Populares</h1>
      
      <div className="flex overflow-x-auto gap-4 pb-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[120px] bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer transition p-4 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 mb-2">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-sm font-medium text-gray-700">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
