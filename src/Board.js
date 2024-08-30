//src/Board.js
import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // Check if every cell in the board is false (i.e., all lights are off)
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy); // left
      flipCell(y, x + 1, boardCopy); // right
      flipCell(y - 1, x, boardCopy); // above
      flipCell(y + 1, x, boardCopy); // below

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <h1>Congratulations! You're the winner!</h1>;
  }

  // make table board
  //Springboard's solution to creating the tableBoard
  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  //below is my solution to creating the tableBoard
  // const tableBoard = createBoard().map((row, y) => (
  //   <tr key={y}>
  //     {row.map((cell, x) => (
  //       <Cell
  //         key={`${y}-${x}`}
  //         isLit={cell}
  //         flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
  //       />
  //     ))}
  //   </tr>
  // ));

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
