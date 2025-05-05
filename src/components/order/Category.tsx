import { useEffect, useState } from "react";
import type { Category } from "../../models/Category";
//import { getCategories } from "../../services/CategoryService";

export default function Category() {

  const [categories, setCategories] = useState<Category[]>([]);

  const callCategories = async () => {
    //const data = await getCategories();
    
    const data = [{
        id: 1,
        name: "Pizza",
        description: "Comida",
        image: "https://example.com/pizza.jpg",
      },
      {
        id: 2,
        name: "Hamburguesa",
        description: "Comida",
        image: "https://example.com/hamburguesa.jpg",
      },
      {
        id: 3,
        name: "Bebida",
        description: "Comida",
        image: "https://example.com/bebida.jpg",
      },
      {
        id: 4,
        name: "Postre",
        description: "Comida",
        image: "https://example.com/postre.jpg",
      },
      {
        id: 5,
        name: "Ensalada",
        description: "Comida",
        image: "https://example.com/ensalada.jpg",
      },
      {
        id: 6,
        name: "Sopa",
        description: "Comida",
        image: "https://example.com/sopa.jpg",
      },
      {
        id: 7,
        name: "Pasta",
        description: "Comida",
        image: "https://example.com/pasta.jpg",
      },
      {
        id: 8,
        name: "Mariscos",
        description: "Comida",
        image: "https://example.com/mariscos.jpg",
      },
    ]
    
    setCategories(data);
  }

  useEffect(() => {
    callCategories();
  }, []);


  return (
    <>
      <div className="max-w-7xl mx-auto pt-10">
          <h1 className=" text-3xl font-bold pb-1">Categorias</h1>
          <div className="flex">
            {categories.map((category) => (
              <div  key={category.id} className="flex flex-col items-center justify-center p-5">
                <img
                  src={category.image}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <h2 className="text-lg">{category.name}</h2>
                </div>
              ))}
          </div>
      </div>
    </>
  )
}
