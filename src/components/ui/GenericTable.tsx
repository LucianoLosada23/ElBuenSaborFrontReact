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
import { PlusIcon } from "@heroicons/react/24/outline";

type Props<T extends object> = {
  title?: string;
  columns: MRT_ColumnDef<T>[];
  data: T[];
  onAddClick?: () => void;
  addButtonText?: string;
};

const GenericTable = <T extends object>({
  title = "Tabla",
  columns,
  data,
  onAddClick,
  addButtonText = "Agregar",
}: Props<T>) => {
  const table = useMaterialReactTable({
    columns,
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
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4" fontWeight={500}>
          {title}
        </Typography>
        {onAddClick && (
          <button
            className="bg-principal flex text-white px-4 py-2 rounded-lg hover:bg-secundario transition-colors cursor-pointer"
            onClick={onAddClick}
          >
            {addButtonText}
            <PlusIcon className="w-6 h-6 text-white ml-2" />
          </button>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                          header.column.columnDef.Header ?? header.column.columnDef.header,
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
