import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import {
  deleteIngredient,
  getAllIngredients,
} from "../../../services/admin/insumos/Ingredients";
import type { MRT_ColumnDef } from "material-react-table";
import InsumosModal from "../../../components/admin/insumos/InsumosModal";
import { useUIState } from "../../../hooks/ui/useUIState";
import type {Ingredient} from "../../../types/Insumos/Ingredient";
import { useInsumoEdit } from "../../../hooks/insumos/useInsumoEdit";

const columns: MRT_ColumnDef<Ingredient>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "price", header: "Precio Costo" },
  {
    accessorKey: "status",
    header: "Disponibilidad",
    Cell: ({ cell }) =>
      cell.getValue<boolean>() ? "Disponible" : "No disponible",
  },
  { accessorKey: "unitMeasure", header: "Unidad de Medida" },
  { accessorKey: "currentStock", header: "Stock" },
  {
    header: "Categoría",
    accessorFn: (row) =>
      row.categoryIngredient?.parent?.name ??
      row.categoryIngredient?.name ??
      "Sin categoría",
  },
];

export default function Insumos() {
  // State
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  //Redux hooks
  const {setEdit} = useInsumoEdit()
  const { toggle } = useUIState();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(data ?? []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleEdit = (insumo : Ingredient) => {
    toggle("isInsumosOpen");
    setEdit(insumo)
  };

  const handleDelete = async (ingredient: Ingredient) => {
    if (!window.confirm(`¿Está seguro de eliminar el insumo "${ingredient.name}"?`)) return;
    try {
      await deleteIngredient(ingredient.id);
      setTimeout(() => window.location.reload(), 500); // recarga tras eliminar
    } catch (error) {
      console.error("Error al eliminar el ingrediente:", error);
    }
  };
  return (
    <>
      <GenericTable
        title="Insumos"
        columns={columns}
        data={ingredients}
        addButtonText="Añadir"
        onAddClick={() => toggle("isInsumosOpen")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <InsumosModal />
    </>
  );
}

