import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import EmployeeModal from "../../../components/admin/employee/EmployeeModal";
import { deleteEmployee, getAllEmployees } from "../../../services/admin/employee/employeeServices";
import type { Employee } from "../../../types/auth/register/RegisterEmployee";
import PromotionsModal from "../../../components/admin/promotions/PromotionsModal";

const columns: MRT_ColumnDef<Employee>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "lastname", header: "Apellido" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Teléfono" },
  { accessorKey: "born_date", header: "Fecha de Nacimiento" },
  { accessorKey: "genero", header: "Género" },
  { accessorKey: "roleEmployee", header: "Rol" },
  { accessorKey: "addressBasicDTO.street", header: "Calle" },
  { accessorKey: "addressBasicDTO.number", header: "Número" },
  { accessorKey: "addressBasicDTO.postalCode", header: "Código Postal" },
];
export default function Promotions() {
  // State
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  //Redux hooks
  const { toggle } = useUIState();

  //funciones
  const refreshEmployees = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data ?? []);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployees();
  }, [refreshTrigger]);

  const handleDelete = async (employee: Employee) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar a ${employee.name} ${employee.lastname}?`
    );
    if (!confirmDelete) return;

    try {
      await deleteEmployee(employee.id);
      refreshEmployees()
    } catch (error) {
      console.error("Error eliminando el empleado:", error);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEmployeeToEdit(employee);
    toggle("isEmployeeModalOpen");
  };

  return (
    <>
      <GenericTable
        title="Promociones"
        columns={columns}
        data={employees}
        addButtonText="Añadir"
        onAddClick={() => toggle("isPromotionsOpen")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> 
      <PromotionsModal
        onRefresh={refreshEmployees}
        employeeToEdit={employeeToEdit}
        setEmployeeToEdit={setEmployeeToEdit}
      />
    </>
  );
}
