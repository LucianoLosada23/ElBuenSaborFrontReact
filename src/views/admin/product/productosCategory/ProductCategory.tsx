import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useUIState } from "../../../../hooks/ui/useUIState";
import GenericTable from "../../../../components/ui/GenericTable";
import type {
  IngredientCategory,
  IngredientCategoryList,
} from "../../../../types/Ingredients/IngredientCategory";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { getAllProductCategory } from "../../../../services/admin/product/category/category";
import ProductCategoryModal from "../../../../components/admin/product/productCategory/productCategoryModal/ProductCategoryModal";
import ProductSubCategoryModal from "../../../../components/admin/product/productCategory/productSubCategory/ProductSubCategoryModal";
import { useInsumosCategory } from "../../../../hooks/insumosCategory/useInsumosCategory";

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
    const fetchIngredients = async () => {
      try {
        const data = await getAllProductCategory();
        if (data) {
          setIngredientCategory(data);
          const parents = data.filter((cat) => cat.parent === null);
          setParentCategories(parents);
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
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
        />
      )}
      <ProductCategoryModal/>
      <ProductSubCategoryModal/>
    </>
  );
}
