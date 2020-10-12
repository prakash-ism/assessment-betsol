import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from "@mdi/react";
import { mdiCurrencyInr, mdiCurrencyUsd } from "@mdi/js";
import { baseService } from "../../services/base.service";
import { INSTANCE } from "../../utils/url-builder";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#b8d5d1",
    color: theme.palette.common.black,
    fontWeight: 400,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e9f0f0",
      opacity: 0.8,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#fff",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    borderRadius: "1rem",
  },
  redText: {
    color: "#e1555a",
  },
  normalText: {
    color: "#005a3c",
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  const changeStatusOfInstance = async (id, status) => {
    let url =
      status == "stopped"
        ? INSTANCE.toggleInstance("start", id)
        : INSTANCE.toggleInstance("stop", id);
    let res = await baseService.makeGetRequest(url);
    props.fetchInstances();
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Instance Name</StyledTableCell>
            <StyledTableCell align="left">Cost Per Hour</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.instanceData.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">
                <Icon
                  path={
                    props.toggleINR === true ? mdiCurrencyInr : mdiCurrencyUsd
                  }
                  title="INR"
                  size={0.6}
                />
                {props.toggleINR === true
                  ? (row.costPerHour / 0.015).toFixed(2)
                  : row.costPerHour}
              </StyledTableCell>
              <StyledTableCell align="left">
                <span
                  className={
                    row.status === "stopped"
                      ? classes.redText
                      : classes.normalText
                  }
                >
                  {row.status}
                </span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <span
                  className={
                    row.status === "stopped"
                      ? classes.normalText
                      : classes.redText
                  }
                >
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => changeStatusOfInstance(row.id, row.status)}
                  >
                    {row.status === "stopped" ? "start" : "stop"}
                  </span>
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
