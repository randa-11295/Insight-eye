import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import TableLoader from "./TableLoaderReusable";
import { useTheme } from "@mui/material/styles"; // Use theme for colors

const TableReusable = ({ data, columns, loading, handelChangeSelect }) => {
  const theme = useTheme(); // Get theme colors

  if (loading) return <TableLoader columns={columns.length || 12} />;

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <Table sx={{ minWidth: 500 }}>
        {/* Table Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
            {handelChangeSelect && (
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Select</TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align="center"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  letterSpacing: "0.8px",
                  borderBottom: `2px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
                  "&:hover": { backgroundColor: theme.palette.action.selected },
                }}
              >
                {handelChangeSelect && (
                  <TableCell align="center" sx={{ width: "50px" }}>
                    <Checkbox onChange={() => handelChangeSelect(row)} />
                  </TableCell>
                )}

                {columns.map((col) => (
                  <TableCell key={col.field} align="center" sx={{ color: theme.palette.text.secondary }}>
                    {col.field === "frame" ? (
                      <img src={`data:image/jpeg;base64,${row[col.field]}`} alt="Frame" width="50" />
                    ) : (
                      row[col.field] || row.metadata?.[col.field] || "—"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (handelChangeSelect ? 1 : 0)} align="center" sx={{ color: theme.palette.text.secondary }}>
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
