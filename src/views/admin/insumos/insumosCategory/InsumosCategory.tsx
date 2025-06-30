import { useEffect, useState } from "react";
import { useUIState } from "../../../../hooks/ui/useUIState";
import GenericTable from "../../../../components/ui/GenericTable";
import { deleteInsumosCategory, getAllInsumosCategory } from "../../../../services/admin/insumos/insumosCategory/InsumosCategory";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import InsumosSubCategoryModal from "../../../../components/admin/insumos/insumosCategory/insumosSubCategory/InsumosSubCategoryModal";
import { useInsumosCategory } from "../../../../hooks/insumosCategory/useInsumosCategory";
import type { MRT_ColumnDef } from "material-react-table";
import { useCategorias } from "../../../../hooks/useCategorias";
import InsumosCategoryModal from "../../../../components/admin/insumos/insumosCategory/InsumosCategoryModal";
import type {
  IngredientCategory,
  IngredientCategoryList,
} from "../../../../types/Insumos/IngredientCategory";

export default function InsumosCategory() {
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
        const data = await getAllInsumosCategory();
        if (Array.isArray(data)) {
          setIngredientCategory(data);
          const parents = data.filter((cat) => cat.parent === null);
          setParentCategories(parents);
        } else {
          setIngredientCategory([]);
          setParentCategories([]);
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        setIngredientCategory([]);
        setParentCategories([]);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    if (selectedParentId !== null) {
      const children = ingredientCategory.filter(
        (cat) => cat.parent?.id === selectedParentId
      );
      setChildCategories(children);
    } else {
      setChildCategories([]);
    }
  }, [selectedParentId, ingredientCategory]);

  const selectedParentName =
    parentCategories.find((p) => p.id === selectedParentId)?.name ?? "";

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
      id: "subcategorias",
      header: "Subcategorías",
      Cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            className="flex gap-2 cursor-pointer hover:text-admin-principal"
            onClick={() => selectParentCategory(row.original.id)}
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
      toggle("isInsumosCategoryOpen");
    } else {
      // Es subcategoría
      toggle("isInsumosSubCategoryOpen");
    }
  };
  const handleDelete = async (categoria: {
    id: number;
    name: string;
    parent?: { id: number } | null;
  }) => {
    if (window.confirm(`¿Está seguro de eliminar la categoría ${categoria.name}?`)) {
      try {
        // Realiza la eliminación a través del servicio correspondiente.
        await deleteInsumosCategory(categoria.id);

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
          title={`Subcategorías de ${selectedParentName}`}
          columns={childColumns}
          data={childCategories}
          addButtonText="Añadir Subcategoría"
          onAddClick={() => toggle("isInsumosSubCategoryOpen")}
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
          onDelete={handleDelete}
          onAddClick={() => toggle("isInsumosCategoryOpen")}
          onEdit={handleEdit}
        />
      )}

      <InsumosCategoryModal />
      <InsumosSubCategoryModal />
    </>
  );
}
