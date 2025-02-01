import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const rows = [
  { name: 'women section', id: 1, type: "tesst", path: "https://service.women.gov.eg" },
  { name: 'men section', id: 2, type: "tesst", path: "https://service.men.gov.eg"},
  { name: 'children section', id: 3, type: "tesst", path: "https://service.children.gov.eg" },

];

export default function CustomizedTables() {
  return (
    <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >id</StyledTableCell>
            <StyledTableCell >name</StyledTableCell>
            <StyledTableCell >type</StyledTableCell>
            <StyledTableCell >path</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" >
              <Checkbox  defaultChecked />
                {row.id}</StyledTableCell>
              <StyledTableCell  >
                {row.name}
              </StyledTableCell>
              <StyledTableCell >{row.type}</StyledTableCell>
              <StyledTableCell >{row.path}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
