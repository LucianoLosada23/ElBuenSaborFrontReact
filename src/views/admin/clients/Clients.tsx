import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import { getAllClients } from "../../../services/admin/clients/clientsServices";
import type { Client } from "../../../types/clients/Clients";

const columns: MRT_ColumnDef<Client>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "lastname", header: "Apellido" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Teléfono" },
  { accessorKey: "born_date", header: "Fecha de Nacimiento" },
  { accessorKey: "genero", header: "Género" },
  { accessorKey: "role", header: "Rol" },
  {
    accessorKey: "isActive",
    header: "Activo",
    Cell: ({ cell }) => (cell.getValue() ? "Sí" : "No"),
  },
];
export default function Clients() {
  // State
  const [employees, setEmployees] = useState<Client[]>([]);

  //Redux hooks
  const { toggle } = useUIState();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllClients();
        setEmployees(data ?? []);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <GenericTable
        title="Clientes"
        columns={columns}
        data={employees}
        addButtonText="Añadir"
        onAddClick={() => toggle("isEmployeeModalOpen")}
      />
    </>
  );
}
