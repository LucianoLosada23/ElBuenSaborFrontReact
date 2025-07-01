import React from "react";
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
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

const OrderGenericTable = <T extends object>({
  title = "Tabla",
  columns,
  data,
  onAddClick,
  addButtonText,
  onEdit,
  onDelete,
  extraHeaderButton,
}: Props<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnFilters: true,
    enableFilters: true,
    enableGlobalFilter: true,
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

  // Si tienes acciones de borrado en esta tabla, agrega confirmación similar a:
  const handleDelete = (row: T) => {
    if (window.confirm("¿Está seguro de eliminar este elemento?")) {
      onDelete?.(row);
    }
  };

  return (
    <Stack sx={{ m: "2rem 0", bgcolor: "white", p: 6 }} spacing={2}>
      {/* Título */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          {title}
        </Typography>
      </Box>

      {/* Barra de búsqueda + filtro estado + paginación */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
          mb: 1,
        }}
      >
        <MRT_GlobalFilterTextField table={table} />
        {extraHeaderButton}
        <Box sx={{ flexGrow: 1 }} />
        <MRT_TablePagination table={table} />
      </Box>

      {/* Tabla */}
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

export default OrderGenericTable;
