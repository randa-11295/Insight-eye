import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TableLoader from "./TableLoaderReusable"; // Import Skeleton Loader

const TableReusable = ({ data, columns, loading }) => {
  if (loading) return <TableLoader  columns={columns.length} />; // Show loader if loading

  return (
    <TableContainer component={Paper} sx={{ mt: 3 , border: "2px solid gray", }} >
      <Table>
      <TableHead >
  <TableRow>
    {columns.map((col) => (
      <TableCell
        align="center"
        key={col.field}
        sx={headerStyle}
      >
        {col.headerName}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.field} align="center">
                    {col.field === "frame" ? (
                      <img src={`data:image/jpeg;base64,${row[col.field]}`} alt="Frame" width="50" />
                    ) : (
                      row[col?.field] ||  row.metadata[col?.field] || " "
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableReusable;

const headerStyle={
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "16px",
  letterSpacing: "0.8px",
  padding: "12px",
  color: "primary.main",
  borderBottom: "2px solid gray",
  paddingY : 3
}