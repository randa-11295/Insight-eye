import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableLoader from "./TableLoaderReusable"; // Import Skeleton Loader
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Styled Components for Dark Theme
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "14px",
    letterSpacing: "0.8px",
    borderBottom: "2px solid #333",
    padding: " 15px 5px",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#ddd",
    padding: " 15px 5px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#141414",
  "&:nth-of-type(odd)": {
    backgroundColor: "black",
  },
  "&:hover": {
    backgroundColor: "#222",
  },
  "&:last-child td, &:last-child th": { border: 0 },
}));

const TableReusable = ({ data, columns, loading, page, limit, onPageChange, onRowsPerPageChange, handelChangeSelect }) => {
  if (loading) return <TableLoader columns={columns.length} />;

  const exportToExcel = () => {
    // Process data: truncate long text fields
    const processedData = data.map(row => {
      let newRow = {};
      columns.forEach(col => {
        let value = row[col.field] || row.metadata?.[col.field] || "—";

        if (typeof value === "string" && value.length > 32000) {
          newRow[col.field] = value.substring(0, 32000) + "..."; // Truncate text
        } else {
          newRow[col.field] = value;
        }
      });
      return newRow;
    });

    const ws = XLSX.utils.json_to_sheet(processedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "table_data.xlsx");
  };

  return (
    <>
      {/* Export Button */}
      <Button 
        variant="contained" 
        onClick={exportToExcel} 
        sx={{
          backgroundColor: "#16AA9D",
          color: "#fff",
          marginBottom: "10px",
          "&:hover": { backgroundColor: "#12877a" }
        }}
      >
        Download Excel
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#121212",
          border: "1px solid #333",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 500 }}>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {handelChangeSelect && <StyledTableCell align="center">Select</StyledTableCell>}
              {columns.map((col) => (
                <StyledTableCell key={col.field} align="center">
                  {col.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  {handelChangeSelect && (
                    <StyledTableCell align="center" sx={{ width: "50px" }}>
                      <Checkbox onChange={() => handelChangeSelect(row)} />
                    </StyledTableCell>
                  )}

                  {columns.map((col) => (
                    <StyledTableCell key={col.field} align="center">
                      {col.field === "frame" ? (
                        <img src={`data:image/jpeg;base64,${row[col.field]}`} alt="Frame" width="50" />
                      ) : (
                        row[col.field] || row.metadata?.[col.field] || "—"
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + (handelChangeSelect ? 1 : 0)} align="center" sx={{ color: "#aaa" }}>
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 75]}
        component="div"
        count={100}
        rowsPerPage={limit}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
};

export default TableReusable;
