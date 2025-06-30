import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useUIState } from "../../../../hooks/ui/useUIState";
import GenericTable from "../../../../components/ui/GenericTable";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { getAllProductCategory, deleteProductCategory } from "../../../../services/admin/product/category/category";
import ProductCategoryModal from "../../../../components/admin/product/productCategory/ProductCategoryModal";
import ProductSubCategoryModal from "../../../../components/admin/product/productCategory/productSubCategory/ProductSubCategoryModal";
import { useInsumosCategory } from "../../../../hooks/insumosCategory/useInsumosCategory";
import type {
  IngredientCategory,
  IngredientCategoryList,
} from "../../../../types/Insumos/IngredientCategory";
import { useCategorias } from "../../../../hooks/useCategorias";

export default function ProductCategory() {
  const [ingredientCategory, setIngredientCategory] =
    useState<IngredientCategoryList>([]);
  const [parentCategories, setParentCategories] = useState<
    IngredientCategory[]
  >([]);
  const [childCategories, setChildCategories] = useState<IngredientCategory[]>(
    []
  );

  const { toggle } = useUIState();
  const { selectedParentId, selectParentCategory } = useInsumosCategory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductCategory();
        if (data) {
          setIngredientCategory(data);
          const parents = data.filter((cat) => cat.parent === null);
          setParentCategories(parents);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const parentColumns: MRT_ColumnDef<IngredientCategory>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nombre de la Categoría",
    },
    {
      id: "subcategorías",
      header: "Subcategorías",
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="flex gap-2 cursor-pointer hover:text-admin-principal"
            onClick={() => {
              const parentId = row.original.id;
              const children = ingredientCategory.filter(
                (cat) => cat.parent?.id === parentId
              );
              setChildCategories(children);
              selectParentCategory(parentId);
            }}
          >
            Ver subcategorías
          </button>
        </div>
      ),
    },
  ];

  const childColumns: MRT_ColumnDef<IngredientCategory>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nombre de la Subcategoría",
    },
  ];
  const { seleccionarCategoria } = useCategorias();

  const handleEdit = (categoria: {
    id: number;
    name: string;
    company: { id: number };
    parent?: { id: number } | null;
  }) => {
    seleccionarCategoria(categoria);

    if (categoria.parent === null || categoria.parent === undefined) {
      // Es categoría padre
      toggle("isProductCategoryOpen");
    } else {
      // Es subcategoría
      toggle("isProductSubCategoryOpen");
    }
  };

  const handleDelete = async (categoria: {
    id: number;
    name: string;
    parent?: { id: number } | null;
  }) => {
    if (window.confirm(`¿Está seguro de eliminar la categoría ${categoria.name}?`)) {
      try {
        await deleteProductCategory(categoria.id);
        // Actualiza el estado eliminando la categoría de las listas.
        setIngredientCategory((prev) =>
          prev.filter((cat) => cat.id !== categoria.id)
        );
        setParentCategories((prev) =>
          prev.filter((cat) => cat.id !== categoria.id)
        );
        if (selectedParentId && categoria.parent?.id === selectedParentId) {
          setChildCategories((prev) =>
            prev.filter((cat) => cat.id !== categoria.id)
          );
        }
      } catch (error) {
        console.error("Error eliminando la categoría:", error);
      }
    }
  };

  return (
    <>
      {selectedParentId !== null ? (
        <GenericTable
          title={`Subcategorías de ${
            parentCategories.find((p) => p.id === selectedParentId)?.name
          }`}
          columns={childColumns}
          data={childCategories}
          addButtonText="Añadir Subcategoría"
          onAddClick={() => toggle("isProductSubCategoryOpen")}
          onEdit={handleEdit}
          onDelete={handleDelete}
          extraHeaderButton={
            <button
              onClick={() => selectParentCategory(null)}
              className="flex gap-2 mr-4 text-sm cursor-pointer hover:text-admin-principal"
            >
              <ArrowLeftStartOnRectangleIcon width={20} height={20} />
              Volver
            </button>
          }
        />
      ) : (
        <GenericTable
          title="Categorías Padre"
          columns={parentColumns}
          data={parentCategories}
          addButtonText="Añadir Categoría"
          onAddClick={() => toggle("isProductCategoryOpen")}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <ProductCategoryModal />
      <ProductSubCategoryModal />
    </>
  );
}
