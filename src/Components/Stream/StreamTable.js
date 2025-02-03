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


export default function StreamTable({ data, handelChangeSelect }) {
  return (
    <TableContainer >
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow >
            <StyledTableCell >order</StyledTableCell>
            <StyledTableCell align="center">name</StyledTableCell>
            <StyledTableCell align="center">type</StyledTableCell>
            <StyledTableCell align="center">path</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, indx) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row"  >
                <Checkbox onChange={() => { handelChangeSelect(row) }} />
                {indx + 1}</StyledTableCell>
              <StyledTableCell align="center" >
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.path}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
