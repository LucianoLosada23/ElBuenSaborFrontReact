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
import { PlusIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxXMarkIcon, PencilIcon } from "@heroicons/react/24/solid";

type Props<T extends object> = {
  title?: string;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  onAddClick?: () => void;
  addButtonText?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

const GenericTable = <T extends object>({
  title = "Tabla",
  columns,
  data,
  onAddClick,
  addButtonText = "Agregar",
  onEdit,
  onDelete,
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
            className="text-white bg-admin-principal hover:bg-admin-secundario p-2 rounded-full cursor-pointer"
            aria-label="Editar"
          >
            <PencilIcon width={16} height={16} />
          </button>
          <button
            onClick={() => onDelete?.(row.original)}
            className="text-white bg-admin-principal hover:bg-admin-secundario p-2 rounded-full cursor-pointer"
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

  return (
    <Stack sx={{ m: "2rem 0", bgcolor: "white", p: 6 }} spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>
        {onAddClick && (
          <button
            className="bg-admin-principal flex text-white items-center text-center gap-2 px-4 py-2 font-medium rounded-lg hover:bg-admin-secundario transition-colors cursor-pointer"
            onClick={onAddClick}
          >
            <PlusIcon className="w-6 h-6 text-white ml-2" />
            {addButtonText}
          </button>
        )}
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
