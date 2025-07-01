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
import { translateUnitMeasure } from "../../../utils/statusTranslations";

const columns: MRT_ColumnDef<Ingredient>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "price", header: "Precio Costo" },
  {
    accessorKey: "status",
    header: "Disponibilidad",
    Cell: ({ cell }) =>
      cell.getValue<boolean>() ? "Disponible" : "No disponible",
  },
  {
    accessorKey: "unitMeasure",
    header: "Unidad de Medida",
    Cell: ({ cell }) => translateUnitMeasure(cell.getValue<string>()),
  },
  { accessorKey: "currentStock", header: "Stock", Cell: ({ cell }) => {
    const value = cell.getValue<number>();
    return Number(value.toFixed(3));
  }, },
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
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  //funciones 
  const refreshEmployees = () => setRefreshTrigger((prev) => prev + 1);

  //Redux hooks
  const {setEdit} = useInsumoEdit()
  const { toggle } = useUIState();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        console.log(data);
        
        setIngredients(data ?? []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, [refreshTrigger]);

  const handleEdit = (insumo : Ingredient) => {
    toggle("isInsumosOpen");
    setEdit(insumo)
  };

  const handleDelete = async (ingredient: Ingredient) => {
    if (!window.confirm(`¿Está seguro de eliminar el insumo "${ingredient.name}"?`)) return;
    try {
      await deleteIngredient(ingredient.id);
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
      <InsumosModal 
        onRefresh={refreshEmployees}
      />
    </>
  );
}

