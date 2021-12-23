import React from "react";
import { Grid, Paper, Box, makeStyles } from "@material-ui/core";

const styles1 = {
  paper: {
    background: "#FF5757",
  },
};

const styles2 = {
  paper: {
    background: "#4CAF50",
  },
};

const useStyles1 = makeStyles(styles1);
const useStyles2 = makeStyles(styles2);

function Cell(props) {
  if (props.N == 0) {
    return <RedCell></RedCell>;
  } else if (props.N == 1) {
    return <GreenCell></GreenCell>;
  } else {
    return <WhiteCell></WhiteCell>;
  }
}

const WhiteCell = () => {
  return (
    <Grid item>
      <Paper elevation={3}>
        <Box padding={2} height={100} width={100}></Box>
      </Paper>
    </Grid>
  );
};

const RedCell = () => {
  const classes = useStyles1();
  return (
    <Grid item>
      <Paper className={classes.paper} elevation={3}>
        <Box padding={2} height={100} width={100}></Box>
      </Paper>
    </Grid>
  );
};

const GreenCell = () => {
  const classes = useStyles2();
  return (
    <Grid item>
      <Paper className={classes.paper} elevation={3}>
        <Box padding={2} height={100} width={100}></Box>
      </Paper>
    </Grid>
  );
};

export default Cell;
