import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  type MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArrowRightStartOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxXMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";

type Props<T extends object> = {
  title?: string;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  onAddClick?: () => void;
  addButtonText?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  extraHeaderButton?: React.ReactNode;
};

const GenericTable = <T extends object>({
  title = "Tabla",
  columns,
  data,
  onAddClick,
  addButtonText = "Agregar",
  onEdit,
  onDelete,
  extraHeaderButton,
}: Props<T>) => {
  // Agregamos la columna de acciones al final
  const columnsWithActions = [
    ...columns,
    {
      id: "actions",
      header: "Acciones",
      enableSorting: false,
      enableColumnFilter: false,
      size: 100,
      Cell: ({ row }: { row: MRT_Row<T> }) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit?.(row.original)}
            className=" border border-admin-principal text-admin-principal hover:bg-gray-100 p-2 rounded-full cursor-pointer"
            aria-label="Editar"
          >
            <PencilIcon width={16} height={16} />
          </button>
          <button
            onClick={() => onDelete?.(row.original)}
            className="border border-admin-principal text-admin-principal hover:bg-gray-100 p-2 rounded-full cursor-pointer"
            aria-label="Eliminar"
          >
            <ArchiveBoxXMarkIcon width={16} height={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns: columnsWithActions,
    data,
    enableRowSelection: false,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });
  // location
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack sx={{ m: "2rem 0", bgcolor: "white", p: 6 }} spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          {title}
        </Typography>

        <div className="flex items-center gap-8">
          {extraHeaderButton && extraHeaderButton}
          {!extraHeaderButton && (
            <>
              {(location.pathname === "/admin/insumos" ||
                location.pathname === "/admin/insumos-categorias") && (
                <button
                  onClick={() =>
                    navigate(
                      location.pathname === "/admin/insumos"
                        ? "/admin/insumos-categorias"
                        : "/admin/insumos"
                    )
                  }
                  className="flex gap-2 cursor-pointer text-sm hover:text-admin-principal items-center"
                >
                  {location.pathname === "/admin/insumos-categorias" && (
                    <ArrowLeftStartOnRectangleIcon width={20} height={20} />
                  )}
                  {location.pathname === "/admin/insumos-categorias"
                    ? "Volver"
                    : "Ir a Categorías"}
                  {location.pathname === "/admin/insumos" && (
                    <ArrowRightStartOnRectangleIcon width={20} height={20} />
                  )}
                </button>
              )}

              {location.pathname === "/admin/promociones" && (
                <button
                  onClick={() => navigate("/admin/promociones-tipos")}
                  className="flex gap-2 cursor-pointer text-sm hover:text-admin-principal items-center"
                >
                  Ir a Tipos de Promociones
                  <ArrowRightStartOnRectangleIcon width={20} height={20} />
                </button>
              )}

              {location.pathname === "/admin/promociones-tipos" && (
                <button
                  onClick={() => navigate("/admin/promociones")}
                  className="flex gap-2 cursor-pointer text-sm hover:text-admin-principal items-center"
                >
                  <ArrowLeftStartOnRectangleIcon width={20} height={20} />
                  Volver a Promociones
                </button>
              )}
            </>
          )}
          {onAddClick && (
            <button
              className="bg-admin-principal flex text-white items-center text-center gap-1 px-4 py-3 rounded-full hover:bg-admin-principal/50 hover:text-white transition-colors cursor-pointer"
              onClick={onAddClick}
            >
              <PlusIcon className="w-5 h-5 ml-2" />
              {addButtonText}
            </button>
          )}
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MRT_GlobalFilterTextField table={table} />
        <MRT_TablePagination table={table} />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="center" variant="head" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.Header ??
                            header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell align="center" variant="body" key={cell.id}>
                    <MRT_TableBodyCellValue
                      cell={cell}
                      table={table}
                      staticRowIndex={rowIndex}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
};

export default GenericTable;
