import type { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useUIState } from "../../../../hooks/ui/useUIState";
import GenericTable from "../../../../components/ui/GenericTable";
import { getAllInsumosCategory } from "../../../../services/admin/insumos/insumosCategory/InsumosCategory";
import type {
  IngredientCategory,
  IngredientCategoryList,
} from "../../../../types/Ingredients/IngredientCategory";
import InsumosCategoryModal from "../../../../components/admin/insumos/insumosCategory/InsumosCategoryModal";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function InsumosCategory() {
  const [ingredientCategory, setIngredientCategory] =
    useState<IngredientCategoryList>([]);
  const [parentCategories, setParentCategories] = useState<
    IngredientCategory[]
  >([]);
  const [childCategories, setChildCategories] = useState<IngredientCategory[]>(
    []
  );
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const { toggle } = useUIState();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllInsumosCategory();
        if (data) {
          setIngredientCategory(data);
          const parents = data.filter((cat) => cat.category_parent_id === null);
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
      accessorKey: "subcategorías",
      header: "Subcategorías",
     Cell: ({ row }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button
      className="flex gap-2 cursor-pointer hover:text-admin-principal"
      onClick={() => {
        const parentId = row.original.id;
        const children = ingredientCategory.filter(
          (cat) => cat.category_parent_id?.id === parentId
        );
        setChildCategories(children);
        setSelectedParentId(parentId);
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
          onAddClick={() => toggle("isInsumosCategoryOpen")}
          extraHeaderButton={
            <button
              onClick={() => setSelectedParentId(null)}
              className="flex gap-2 mr-4 text-sm cursor-pointer hover:text-admin-principal"
            >
              <ArrowLeftStartOnRectangleIcon width={20} height={20}/>
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
          onAddClick={() => toggle("isInsumosCategoryOpen")}
        />
      )}

      <InsumosCategoryModal />
    </>
  );
}
