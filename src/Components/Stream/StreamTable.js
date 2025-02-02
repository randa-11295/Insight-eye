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


export default function StreamTable({data}) {
  return (
    <TableContainer >
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell >order</StyledTableCell>
            <StyledTableCell >name</StyledTableCell>
            <StyledTableCell >type</StyledTableCell>
            <StyledTableCell >path</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row , indx) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" >
              <Checkbox  defaultChecked />
                {indx + 1}</StyledTableCell>
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
