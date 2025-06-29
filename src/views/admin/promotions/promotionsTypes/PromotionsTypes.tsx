import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useUIState } from "../../../../hooks/ui/useUIState";
import GenericTable from "../../../../components/ui/GenericTable";
import PromotionsTypesModal from "../../../../components/admin/promotions/promotionsTypes/PromotionsTypesModal";
import type { TypePromotion } from "../../../../types/promotions/Promotions";
import { deletePromotionType, getAllPromotionsTypes } from "../../../../services/admin/promotions/promotionsTypes";


const columns: MRT_ColumnDef<TypePromotion>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "behavior", header: "Tipo Promoción" },
];
export default function PromotionsTypes() {
  // State
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [typePromotion, setTypePromotion] = useState<TypePromotion[]>([]); 
  const [typePromotionToEdit, setTypePromotionToEdit] = useState<TypePromotion| null>(null);

  //Redux hooks
  const { toggle } = useUIState();

  //funciones
  const refreshEmployees = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllPromotionsTypes();
        setTypePromotion(data ?? []);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployees();
  }, [refreshTrigger]);

  const handleDelete = async (typePromotion: TypePromotion) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${typePromotion.name} ${typePromotion.behavior}?`
    );
    if (!confirmDelete) return;

    try {
      await deletePromotionType(typePromotion.id);
      refreshEmployees()
    } catch (error) {
      console.error("Error eliminando el empleado:", error);
    }
  };

  const handleEdit = (typePromotion: TypePromotion) => {
    setTypePromotionToEdit(typePromotion);
    toggle("isPromotionsTypesOpen");
  };

  return (
    <>
      <GenericTable
        title="Tipos Promociones"
        columns={columns}
        data={typePromotion}
        addButtonText="Añadir"
        onAddClick={() => toggle("isPromotionsTypesOpen")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <PromotionsTypesModal 
        onRefresh={refreshEmployees}
        typePromotionToEdit={typePromotionToEdit}
        setTypePromotionToEdit={setTypePromotionToEdit}
      />
    </>
  );
}
