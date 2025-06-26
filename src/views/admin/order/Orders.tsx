import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import ProductModal from "../../../components/admin/product/ProductModal";
import { useProduct } from "../../../hooks/useProduct";
import { getAllOrdersByCompany, putOrderStatus } from "../../../services/admin/order/order";
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

// Traducciones de estado
const statusOptions = [
  "PENDING_PAYMENT",
  "TOCONFIRM",
  "INKITCHEN",
  "READY",
  "DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const statusLabels: Record<string, string> = {
  PENDING_PAYMENT: "Pago pendiente",
  TOCONFIRM: "Por confirmar",
  INKITCHEN: "En cocina",
  READY: "Listo",
  DELIVERY: "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

// Traducciones del tipo de entrega
const deliveryTypeLabels: Record<string, string> = {
  TAKEAWAY: "Local",
  DELIVERY: "Domicilio",
};

// Formateador de fecha
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-AR");
};

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

  const handleStatusChange = async (orderId: number | string, newStatus: string) => {
    try {
      await putOrderStatus(orderId.toString(), newStatus);
      await fetchOrders();
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const columns: MRT_ColumnDef<OrderByCompany>[] = [
    { accessorKey: "id", header: "ID Pedido" },
    { accessorKey: "client.id", header: "ID Cliente" },
    { accessorKey: "client.name", header: "Nombre Cliente" },
    { accessorKey: "companyId", header: "ID Empresa" },
    { accessorKey: "description", header: "Descripción" },
    {
      accessorKey: "status",
      header: "Estado",
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
                  {statusLabels[status] || status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      accessorKey: "initAt",
      header: "Fecha de inicio",
      Cell: ({ row }) => formatDate(row.original.initAt),
    },
    {
      accessorKey: "finalizedAt",
      header: "Fecha de finalización",
      Cell: ({ row }) => formatDate(row.original.finalizedAt),
    },
    {
      accessorKey: "deliveryType",
      header: "Tipo de entrega",
      Cell: ({ row }) =>
        deliveryTypeLabels[row.original.deliveryType] || row.original.deliveryType,
    },
    { accessorKey: "total", header: "Total" },
  ];

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
              {statusLabels[status] || status}
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
