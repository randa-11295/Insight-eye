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
  TablePagination
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableLoader from "./TableLoaderReusable"; // Import Skeleton Loader
// Styled Components for Dark Theme
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1a1a1a", // Dark header
    color: "#ffffff", // White text
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "14px",
    letterSpacing: "0.8px",
    borderBottom: "2px solid #333",
    padding: " 15px 5px",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#ddd", // Lighter text for readability
    padding: " 15px 5px",

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#141414", // Dark row background
  "&:nth-of-type(odd)": {
    backgroundColor: "black", // Slightly lighter gray
  },
  "&:hover": {
    backgroundColor: "#222", // Subtle hover effect
  },
  "&:last-child td, &:last-child th": { border: 0 },
}));

const TableReusable = ({ data, columns, loading, page, limit, onPageChange, onRowsPerPageChange, handelChangeSelect }) => {
  if (loading) return <TableLoader  m={3} columns={columns.length} />; // Show loader if loading

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          backgroundColor: "#121212", // Dark container background
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
                  <StyledTableCell align="center">
                    {handelChangeSelect && (
                      <Checkbox onChange={() => handelChangeSelect(row)} />)}
                  </StyledTableCell>

                  {columns.map((col) => (
                    <StyledTableCell key={col.field} align="center">
                      {col.field === "frame" ? (
                        <img src={`data:image/jpeg;base64,${row[col.field]}`} alt="Frame" width="50" />
                      ) : (
                        row[col?.field] || row.metadata?.[col?.field] || "—"
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50 , 75]}
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
