import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ stats }) {
  const classes = useStyles();

  // useEffect(() => {
  console.log(stats);
  // },[stats])
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ fontSize: "18px" ,fontWeight:"bold"}}>
              Category
            </TableCell>
            <TableCell align="right" style={{ fontSize: "18px",fontWeight:"bold" }}>
              Score
            </TableCell>
            <TableCell align="right" style={{ fontSize: "18px",fontWeight:"bold" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.categoryName}</TableCell>
              <TableCell align="right">{row.quiz_score}</TableCell>
              <TableCell align="right">{row.createdAt.split("T")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
