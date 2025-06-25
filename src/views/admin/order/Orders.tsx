import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import ProductModal from "../../../components/admin/product/ProductModal";

import { useProduct } from "../../../hooks/useProduct";
import { getAllOrdersByCompany } from "../../../services/admin/order/order";
import type { OrderByCompany } from "../../../types/shop/order/Order";

const columns: MRT_ColumnDef<OrderByCompany>[] = [
  { accessorKey: "id", header: "ID Pedido" },
  { accessorKey: "client.id", header: "ID Cliente" },
  { accessorKey: "client.name", header: "Nombre Cliente" },
  { accessorKey: "companyId", header: "ID Empresa" },
  { accessorKey: "description", header: "Descripción" },
  { accessorKey: "status", header: "Estado" },
  { accessorKey: "initAt", header: "Fecha de inicio" },
  { accessorKey: "finalizedAt", header: "Fecha de finalización" },
  { accessorKey: "deliveryType", header: "Tipo de entrega" },
  { accessorKey: "total", header: "Total" },
];
export default function Orders() {
  // State
  const [orders, setOrders] = useState<OrderByCompany[]>([]);

  //Redux hooks
  const {setProductEdit} = useProduct()
  const { toggle } = useUIState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllOrdersByCompany();
        console.log(data);
        
        setOrders(data ?? []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchProducts();
  }, []);

   const handleEdit = (order : OrderByCompany) => {
      toggle("isProductOpen");
      //setProductEdit(order)
    };

  return (
    <>
      <GenericTable
        title="Órdenes"
        columns={columns}
        data={orders}
        addButtonText="Añadir"
        onAddClick={() => toggle("isProductOpen")}
        onEdit={handleEdit}
      />
      <ProductModal/>
    </>
  );
}
