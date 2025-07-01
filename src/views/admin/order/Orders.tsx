import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import {
  getAllOrdersByCompany,
  putOrderStatus,
} from "../../../services/admin/order/order";
import OrderGenericTable from "../../../components/ui/OrderGenericTable";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import type { Order } from "../../../types/user/UserOrder";

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

const deliveryTypeLabels: Record<string, string> = {
  TAKEAWAY: "Local",
  DELIVERY: "Domicilio",
};

const formatHour = (dateStr: string | null) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("Todos");

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

  const handleStatusChangeFilter = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleStatusChange = async (
    orderId: number | string,
    currentStatus: string,
    newStatus: string
  ) => {
    // Si cambia a CANCELLED o DELIVERED, pedir confirmación
    if (
      (newStatus === "CANCELLED" || newStatus === "DELIVERED") &&
      currentStatus !== newStatus
    ) {
      const confirmChange = window.confirm(
        `¿Estás seguro que querés cambiar el estado a "${statusLabels[newStatus]}"?`
      );
      if (!confirmChange) return;
    }

    try {
      await putOrderStatus(orderId.toString(), newStatus);
      await fetchOrders();
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const columns: MRT_ColumnDef<Order>[] = [
    {
      accessorKey: "orderProducts",
      header: "Orden",
      Cell: ({ row }) => {
        const products = row.original.orderProducts;
        return products
          .map((p) => `${p.productTitle} (x${p.quantity})`)
          .join(", ");
      },
    },
    { accessorKey: "client.name", header: "Nombre Cliente" },
    {
      accessorKey: "status",
      header: "Estado",
      Cell: ({ row }) => {
        const currentStatus = row.original.status;
        const orderId = row.original.id;

        // Deshabilitar select si el estado es CANCELLED o DELIVERED
        const isDisabled = currentStatus === "CANCELLED" || currentStatus === "DELIVERED";

        return (
          <FormControl fullWidth size="small" variant="standard">
            <Select
              value={currentStatus}
              onChange={(e) =>
                handleStatusChange(orderId, currentStatus, e.target.value)
              }
              disabled={isDisabled}
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
      header: "Hora de inicio",
      Cell: ({ row }) => formatHour(row.original.initAt),
    },
    {
      accessorKey: "finalizedAt",
      header: "Hora de finalización",
      Cell: ({ row }) =>
        row.original.finalizedAt ? formatHour(row.original.finalizedAt) : "-",
    },
    {
      accessorKey: "deliveryType",
      header: "Tipo de entrega",
      Cell: ({ row }) =>
        deliveryTypeLabels[row.original.deliveryType] ||
        row.original.deliveryType,
    },
    {
      accessorKey: "total",
      header: "Total",
      Cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
    },
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
        extraHeaderButton={StatusFilterSelect}
      />
    </>
  );
}
