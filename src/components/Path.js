import React, { Component } from "react";
import { Grid, Paper, Box } from "@material-ui/core";
import Cell from "./Cell";

class Path extends Component {
  pathIdx = 0;
  foundPath = [];

  createfoundPath = () => {
    for (let i = 0; i < 16; i++) {
      this.foundPath.push(0);
    }

    for (let j = 0; j < 16; j++) {
      if (this.props.maze[j] === 0) {
        this.foundPath[j] = 2;
      }
    }

    // this is for x and y coordinates
    for (let k = 0; k < this.props.currentPath.length; k++) {
      let x = this.props.currentPath[k][0];
      let y = this.props.currentPath[k][1];

      this.foundPath[4 * x + y] = 1;
    }
  };

  findColor = () => {
    this.pathIdx += 1;
    let result = this.foundPath[this.pathIdx];
    if (result === 2) {
      result = 0;
    } else if (result === 0) {
      result = 2;
    }

    if (this.pathIdx === 14) {
      this.pathIdx = 0;
    }
    return result;
  };

  printOnConsole = () => {
    for (let i = 0; i < 16; i++) {
      console.log(i + " " + this.props.currentPath[i]);
    }
  };

  render() {
    this.createfoundPath();
    this.printOnConsole();
    return (
      <div className="solvedMazes">
        <Grid container spacing={2} justify="center" direction="column">
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Grid item>
                <Paper elevation={3}>
                  <Box id="mouse" padding={2} height={100} width={100}></Box>
                </Paper>
              </Grid>
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
            </Grid>
          </p>
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
            </Grid>
          </p>
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
            </Grid>
          </p>
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Cell N={this.findColor()} />
              <Grid item>
                <Paper elevation={3}>
                  <Box id="candy" padding={2} height={100} width={100}></Box>
                </Paper>
              </Grid>
            </Grid>
          </p>
        </Grid>
      </div>
    );
  }
}

export default Path;
