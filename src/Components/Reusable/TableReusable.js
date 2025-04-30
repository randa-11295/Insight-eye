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
import { useTheme } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { selectedStreamState } from "../../Recoil/RecoilState";

const TableReusable = ({ data, columns, loading , selected }) => {
  const theme = useTheme();
  const [selectedData, setSelectedData] = useRecoilState(selectedStreamState);

  if (loading) return <TableLoader columns={columns.length || 12} />;

  const isSelected = (row) => {
    return selectedData.some((item) => item.id === row.id);
  };

  const handleCheckboxChange = (row) => {
    if (isSelected(row)) {
      setSelectedData(selectedData.filter((item) => item.id !== row.id));
    } else {
      setSelectedData([...selectedData, row]);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px",
        overflow: "auto",
      }}
    >
      <Table sx={{ minWidth: 500 }}>
        {/* Table Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
          {selected &&  <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Select
            </TableCell>}
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
            data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: isSelected(row)
                    ? theme.palette.action.selected
                    : rowIndex % 2 === 0
                    ? theme.palette.background.default
                    : theme.palette.action.hover,
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                {selected && (
                  <TableCell align="center" sx={{ width: "50px" }}>
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleCheckboxChange(row)}
                    />
                  </TableCell>
                )}

                {columns.map((col) => (
                  <TableCell
                    key={col.field}
                    align="center"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {col.field === "frame" ? (
                      <img
                        src={`data:image/jpeg;base64,${row[col.field]}`}
                        alt="Frame"
                        width="50"
                      />
                    ) : (
                      row[col.field] || row.metadata?.[col.field] || "—"
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                align="center"
                sx={{ color: theme.palette.text.secondary }}
              >
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
