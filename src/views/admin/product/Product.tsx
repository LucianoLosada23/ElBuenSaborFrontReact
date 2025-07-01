import GenericTable from "../../../components/ui/GenericTable";
import { useEffect, useState } from "react";
import type { MRT_ColumnDef } from "material-react-table";
import { useUIState } from "../../../hooks/ui/useUIState";
import ProductModal from "../../../components/admin/product/ProductModal";
import { getAllProduct, deleteProduct } from "../../../services/admin/product/product";

import { useProduct } from "../../../hooks/useProduct";
import type { Product } from "../../../types/product/product";

const columns: MRT_ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Nombre" },
  { accessorKey: "description", header: "Descripción" },
  { accessorKey: "price", header: "Precio" },
  { accessorKey: "estimatedTime", header: "Tiempo estimado" },
  { accessorKey: "category.name", header: "Categoría" },
  { accessorKey: "company.id", header: "ID Empresa" },
];
export default function Product() {

  //State
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  
  //Redux hooks
  const {setProductEdit} = useProduct()
  const { toggle } = useUIState();

  //funciones 
  const refreshEmployees = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data ?? []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducts();
  }, [refreshTrigger]);

  const handleEdit = (producto : Product) => {
    toggle("isProductOpen");
    setProductEdit(producto)
  };

  const handleDelete = async (producto: Product) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar el producto "${producto.title}"?`
    );
    if (!confirmDelete) return;
    try {
      await deleteProduct(producto.id);
      refreshEmployees();
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  };

  return (
    <>
      <GenericTable
        title="Productos"
        columns={columns}
        data={products}
        addButtonText="Añadir"
        onAddClick={() => toggle("isProductOpen")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        onRefresh={refreshEmployees}
      />
    </>
  );
}
