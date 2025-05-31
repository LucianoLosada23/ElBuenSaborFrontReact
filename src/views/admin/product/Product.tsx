import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { Ingredient } from "../../../types/Ingredients/Ingredient";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import ProductModal from "../../../components/admin/product/productoModal/ProductModal";
import { getAllProduct } from "../../../services/admin/product/product";
import type { Product } from "../../../types/product/product";

const columns: MRT_ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Nombre" },
  { accessorKey: "description", header: "Descripción" },
  { accessorKey: "price", header: "Precio" },
  { accessorKey: "estimatedTime", header: "Tiempo estimado" },
  { accessorKey: "category.name", header: "Categoría" },
  { accessorKey: "company.id", header: "ID Empresa" },
];
export default function Product() {
  // State
  const [ingredients, setIngredients] = useState<Product[]>([]);
  console.log(ingredients);
  
  //Redux hooks

  const { toggle } = useUIState();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllProduct();
        setIngredients(data ?? []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);
  return (
    <>
      <GenericTable
        title="Productos"
        columns={columns}
        data={ingredients}
        addButtonText="Añadir"
        onAddClick={() => toggle("isProductOpen")}
      />
      <ProductModal/>
    </>
  );
}
