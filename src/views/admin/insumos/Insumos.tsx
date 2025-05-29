import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import { getAllIngredients } from "../../../services/admin/insumos/Ingredients";
import type { Ingredient } from "../../../types/Ingredients/Ingredient";
import type { MRT_ColumnDef } from "material-react-table";
import InsumosModal from "../../../components/admin/insumos/insumosModal/InsumosModal";
import { useUIState } from "../../../hooks/ui/useUIState";

const columns: MRT_ColumnDef<Ingredient>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "unit_measure", header: "Unidad de medida" },
  { accessorKey: "min_stock", header: "Stock mínimo" },
  { accessorKey: "current_stock", header: "Stock actual" },
  { accessorKey: "max_stock", header: "Stock máximo" },
];


export default function Insumos() {
  // State
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  //Redux hooks

  const {toggle} = useUIState()

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
  return (
    <>
      <GenericTable
        title="Insumos"
        columns={columns}
        data={ingredients}
        addButtonText="Añadir"
        onAddClick={() => toggle("isInsumosOpen")}
      />
      <InsumosModal/>
    </>
    
  );
}
