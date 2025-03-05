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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableLoader from "./TableLoaderReusable"; 


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

const TableReusable = ({ data, columns, loading, page, limit, onPageChange, onRowsPerPageChange, handelChangeSelect, print, pagination }) => {
  if (loading) return <TableLoader columns={columns.length} />;



  return (
    <>
     

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

  
    </>
  );
};

export default TableReusable;
