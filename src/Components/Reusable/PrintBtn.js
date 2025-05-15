import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LoadingButton } from "@mui/lab";

const PrintBtn = ({ loading, data, columns }) => {
  const exportToExcel = () => {
    // Process data: truncate long text fields
    const processedData = data?.map((row) => {
      let newRow = {};
      columns.forEach((col) => {
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
    <LoadingButton
      sx={{
        backgroundColor: "#16AA9D",
        color: "#fff",
        marginBottom: "10px",
        "&:hover": { backgroundColor: "#12877a" },
      }}
      loading={loading}
      variant="contained"
      onClick={exportToExcel}
      loadingPosition="start"
    >
      Download all Data in Excel
    </LoadingButton>
  );
};
export default PrintBtn;
