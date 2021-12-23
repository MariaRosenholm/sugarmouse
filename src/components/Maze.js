import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Paper, Box, Button } from "@material-ui/core";
import Cell from "./Cell";
import Path from "./Path";

class Maze extends Component {
  matrix = [2];
  paths = [];
  idx = 0;
  numPaths = 0;
  pathIdx = 0;

  index = () => {
    this.idx += 1;
    return this.matrix[this.idx];
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

  matrixCreator = () => {
    for (let i = 0; i < 14; i++) {
      let val = Math.floor(Math.random() * 2);
      if (val == 0) {
        this.matrix.push(0);
      } else {
        this.matrix.push(2);
      }
    }
    this.matrix.push(2);
  };

  inMaze = (x, y, visited) => {
    return (
      x >= 0 &&
      x < 4 &&
      y >= 0 &&
      y < 4 &&
      this.matrix[x * 4 + y] > 0 &&
      visited[x * 4 + y] == 0
    );
  };

  calculatePaths = () => {
    let visited = [];
    for (let i = 0; i < 16; i++) {
      visited[i] = 0;
    }
    this.mazeUtil(visited, 0, 0, []);
    return this.paths;
  };

  mazeUtil = (visited, x, y, currentPath) => {
    if (x == 3 && y == 3) {
      this.numPaths += 1;
      this.paths.push([...currentPath]);
      visited[15] = 0;
      return;
    }
    if (!this.inMaze(x, y, visited)) {
      return;
    }
    visited[4 * x + y] = 1;

    // move towars x direction
    currentPath.push([x + 1, y]);
    this.mazeUtil(visited, x + 1, y, currentPath);
    currentPath.pop();

    // move towars y direction
    currentPath.push([x, y + 1]);
    this.mazeUtil(visited, x, y + 1, currentPath);
    currentPath.pop();

    visited[4 * x + y] = 0;
    return;
  }; // evaluates if this is false or true

  getNumPaths = () => {
    return (
      <div id="total">
        <center>
          <b> Number of possible paths = {this.numPaths}</b>
        </center>
      </div>
    );
  };

  findPaths = () => {
    const displayNumPaths = <this.getNumPaths></this.getNumPaths>; // declaring new compnent here!!
    ReactDOM.render(displayNumPaths, document.getElementById("count")); // here putting the component to html
    let grids = document.getElementById("routes");
    for (let i = 0; i < this.paths.length; i++) {
      const solution = (
        <Path currentPath={this.paths[i]} maze={this.matrix}></Path>
      );
      const id = Math.random();
      const d = document.createElement("span");
      d.id = id;
      const space = document.createElement("br");
      grids.appendChild(d);
      grids.appendChild(space);
      ReactDOM.render(solution, document.getElementById(id));
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  render() {
    this.matrix = new Array();
    this.matrix = [2];
    this.matrixCreator();
    this.calculatePaths();
    return (
      <div>
        <h1>Sugar mouse in a maze!</h1>
        <Grid container spacing={2} justify="center" direction="column">
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Grid item>
                <Paper elevation={3}>
                  <Box id="mouse" padding={2} height={100} width={100}></Box>
                </Paper>
              </Grid>
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Cell N={this.index()} />
            </Grid>
          </p>
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Cell N={this.index()} />
            </Grid>
          </p>
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Cell N={this.index()} />
            </Grid>
          </p>
          <p>
            <Grid container spacing={1} justify="center" direction="row">
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Cell N={this.index()} />
              <Grid item>
                <Paper elevation={3}>
                  <Box id="candy" padding={2} height={100} width={100}></Box>
                </Paper>
              </Grid>
            </Grid>
          </p>
        </Grid>
        <Button
          onClick={this.handleClick}
          style={{
            height: 50,
            margin: 15,
            color: "red",
            background: "white",
            paddinng: 15,
          }}
        >
          <b> Create a maze</b>
        </Button>{" "}
        <Button
          onClick={this.findPaths}
          style={{
            height: 50,
            margin: 15,
            color: "red",
            background: "white",
            padding: 15,
          }}
        >
          <b> Find Paths</b>
        </Button>
      </div>
    );
  }
}

export default Maze;
