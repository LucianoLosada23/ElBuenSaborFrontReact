import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import ProductModal from "../../../components/admin/product/ProductModal";
import { useProduct } from "../../../hooks/useProduct";
import { getAllOrdersByCompany } from "../../../services/admin/order/order";
import { putOrderStatus } from "../../../services/admin/order/order"; // importamos el service
import type { OrderByCompany } from "../../../types/shop/order/Order";
import OrderGenericTable from "../../../components/ui/OrderGenericTable";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

const statusOptions = [
  "PENDING_PAYMENT",
  "TOCONFIRM",
  "INKITCHEN",
  "READY",
  "DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

// Columnas actualizadas, la columna "status" ahora no solo muestra texto, sino que tendrá renderizado personalizado (pasamos la función desde acá)
export default function Orders() {
  const [orders, setOrders] = useState<OrderByCompany[]>([]);
  const [statusFilter, setStatusFilter] = useState("Todos");

  const { setProductEdit } = useProduct();
  const { toggle } = useUIState();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrdersByCompany();
      setOrders(data ?? []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const filteredOrders =
    statusFilter === "Todos"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const handleEdit = (order: OrderByCompany) => {
    toggle("isProductOpen");
    // setProductEdit(order);
  };

  const handleStatusChangeFilter = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  // Función que actualiza el estado de la orden cuando cambias el select dentro de la tabla
  const handleStatusChange = async (orderId: number | string, newStatus: string) => {
    try {
      await putOrderStatus(orderId.toString(), newStatus);
      // Después de actualizar, recargamos las órdenes
      await fetchOrders();
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  // Columnas con render personalizado para status
  const columns: MRT_ColumnDef<OrderByCompany>[] = [
    { accessorKey: "id", header: "ID Pedido" },
    { accessorKey: "client.id", header: "ID Cliente" },
    { accessorKey: "client.name", header: "Nombre Cliente" },
    { accessorKey: "companyId", header: "ID Empresa" },
    { accessorKey: "description", header: "Descripción" },
    {
      accessorKey: "status",
      header: "Estado",
      // Render personalizado para que sea select editable
      Cell: ({ row }) => {
        const currentStatus = row.original.status;
        const orderId = row.original.id;
        return (
          <FormControl fullWidth size="small" variant="standard">
            <Select
              value={currentStatus}
              onChange={(e) => handleStatusChange(orderId, e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    { accessorKey: "initAt", header: "Fecha de inicio" },
    { accessorKey: "finalizedAt", header: "Fecha de finalización" },
    { accessorKey: "deliveryType", header: "Tipo de entrega" },
    { accessorKey: "total", header: "Total" },
  ];

  // Select para filtrar estado (igual que antes)
  const StatusFilterSelect = (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="filter-status-label">Estado</InputLabel>
        <Select
          labelId="filter-status-label"
          id="filter-status"
          value={statusFilter}
          label="Estado"
          onChange={handleStatusChangeFilter}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <>
      <OrderGenericTable
        title="Órdenes"
        columns={columns}
        data={filteredOrders}
        addButtonText="Añadir"
        onAddClick={() => toggle("isProductOpen")}
        onEdit={handleEdit}
        extraHeaderButton={StatusFilterSelect}
      />

      <ProductModal />
    </>
  );
}
