import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses, // ✅ Add this import
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { selectedStreamState } from "../../Recoil/RecoilState";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function StreamTable({ data }) {
  const [selectedStreams, setSelectedStreams] = useRecoilState(selectedStreamState);

  const toggleSelection = (row) => {
    setSelectedStreams((prev) =>
      prev.some((stream) => stream.id === row.id)
        ? prev.filter((stream) => stream.id !== row.id)
        : [...prev, row]
    );
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            {["Order", "Name", "Type", "Path"].map((header) => (
              <StyledTableCell key={header} align={header === "Order" ? "left" : "center"}>
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>
                <Checkbox
                  checked={selectedStreams.some((stream) => stream.id === row.id)}
                  onChange={() => toggleSelection(row)}
                />
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.path}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
