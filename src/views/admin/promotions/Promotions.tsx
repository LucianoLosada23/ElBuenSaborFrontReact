import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import PromotionsModal from "../../../components/admin/promotions/PromotionsModal";
import { getAllPromotions } from "../../../services/admin/promotions/promotions";
import type { Promotions } from "../../../types/promotions/Promotions";

const columns: MRT_ColumnDef<Promotions>[] = [
  { accessorKey: "title", header: "Título" },
  { accessorKey: "discountDescription", header: "Descripción" },
  { accessorKey: "promotionTypeDTO.name", header: "Tipo de Promoción" },
  { accessorKey: "dateFrom", header: "Desde" },
  { accessorKey: "dateTo", header: "Hasta" },
  { accessorKey: "timeFrom", header: "Hora Desde" },
  { accessorKey: "timeTo", header: "Hora Hasta" },
  {
    accessorKey: "dayOfWeeks",
    header: "Días",
    Cell: ({ cell }) => cell.getValue<string[]>().join(", "),
  },
];
export default function Promotions() {
  // State
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [promotions, setPromotions] = useState<Promotions[]>([]);
  const [promotionsToEdit, setPromotionsToEdit] = useState<Promotions | null>(null);

  //Redux hooks
  const { toggle } = useUIState();

  //funciones
  const refreshEmployees = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllPromotions();
        setPromotions(data ?? []);
      } catch (error) {
        console.error("Error fetching Promotions:", error);
      }
    };

    fetchEmployees();
  }, [refreshTrigger]);

  const handleDelete = async (promotions: Promotions) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${promotions.title}?`
    );
    if (!confirmDelete) return;

    try {
      //await deleteEmployee(employee.id);
      refreshEmployees()
    } catch (error) {
      console.error("Error eliminando el empleado:", error);
    }
  };

  const handleEdit = (promotions: Promotions) => {
    setPromotionsToEdit(promotions);
    toggle("isPromotionsOpen");
  };

  return (
    <>
      <GenericTable
        title="Promociones"
        columns={columns}
        data={promotions}
        addButtonText="Añadir"
        onAddClick={() => toggle("isPromotionsOpen")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> 
      <PromotionsModal
        onRefresh={refreshEmployees}
        promotionsToEdit={promotionsToEdit}
        setPromotionsToEdit={setPromotionsToEdit}
      />
    </>
  );
}
