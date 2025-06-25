import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import EmployeeModal from "../../../components/admin/employee/EmployeeModal";
import { getAllEmployees } from "../../../services/admin/employee/employeeServices";
import type { Employee } from "../../../types/auth/register/RegisterEmployee";

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
export default function Employee() {
  // State
  const [employees, setEmployees] = useState<Employee[]>([]);

  //Redux hooks
  const { toggle } = useUIState();

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
  }, []);

   const handleEdit = (employee : Employee) => {
      toggle("isEmployeeModalOpen");
    };

  return (
    <>
      <GenericTable
        title="Empleados"
        columns={columns}
        data={employees}
        addButtonText="Añadir"
        onAddClick={() => toggle("isEmployeeModalOpen")}
        onEdit={handleEdit}
      />
      <EmployeeModal/>
    </>
  );
}
