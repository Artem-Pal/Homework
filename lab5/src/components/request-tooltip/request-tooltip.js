import React from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  TableContainer, TableCell, Table, TableBody, TableRow, TableHead, Paper,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const RequestTooltip = ({ rowData }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Полное имя</StyledTableCell>
          <StyledTableCell align="right">Возраст</StyledTableCell>
          <StyledTableCell align="right">Город</StyledTableCell>
          <StyledTableCell align="right">Номер телефона</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">{rowData.client.fullName}</StyledTableCell>
          <StyledTableCell align="right">{rowData.client.age}</StyledTableCell>
          <StyledTableCell align="right">{rowData.client.city}</StyledTableCell>
          <StyledTableCell align="right">{rowData.client.phoneNumber}</StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
    <Table className="mt-1">
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>Название</StyledTableCell>
          <StyledTableCell align="right">Цена</StyledTableCell>
          <StyledTableCell align="right">Описание</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {
          rowData.services.map((service) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">{service.name}</StyledTableCell>
              <StyledTableCell align="right">{service.price}</StyledTableCell>
              <StyledTableCell align="right">{service.description}</StyledTableCell>
            </StyledTableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
);

export default React.memo(RequestTooltip);
