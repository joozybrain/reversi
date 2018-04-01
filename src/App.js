import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
import ReversiBoard from "./components/ReversiBoard/ReversiBoard";

function isVictory(cells) {
  let flag = true;
  let winnerObj = {};
  let whiteCount = 0;
  let blackCount = 0;
  cells.forEach(arrayElement => {
    if (arrayElement === null) flag = false;
    if (arrayElement === "0") whiteCount++;
    if (arrayElement === "1") blackCount++;
  });

  if (flag) {
    if (whiteCount > blackCount) winnerObj = { winner: "white", flag: true };
    if (whiteCount < blackCount) winnerObj = { winner: "black", flag: true };
    if (whiteCount === blackCount) winnerObj = { winner: "draw", flag: true };
  }
  return winnerObj;
}

const Reversi = Game({
  //setup: () =>  ({ cells: Array(64).fill(null) }), //The brackets before the curly braces is inform it is object and not code block

  setup: () => {
    let tempArray = Array(16).fill(null);

    tempArray[5] = "0";
    tempArray[10] = "0";
    tempArray[6] = "1";
    tempArray[9] = "1";
    return { cells: tempArray };
  },

  moves: {
    clickCell(G, ctx, id) {
      const edgeCells = [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15];
      let cells = [...G.cells]; // don't mutate original state.

      if (cells[id] === null) cells[id] = ctx.currentPlayer;

      //Flip tiles diagonally down left
      if (
        cells[id + 5] !== ctx.currentPlayer &&
        cells[id + 5] !== null &&
        !edgeCells.includes(id + 5)
      ) {
        if (cells[id + 10] === ctx.currentPlayer) {
          cells[id + 5] = ctx.currentPlayer;
        } else {
          if (cells[id + 15] === ctx.currentPlayer) {
            cells[id + 5] = ctx.currentPlayer;
            cells[id + 10] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiles diagonally up left
      if (
        cells[id - 5] !== ctx.currentPlayer &&
        cells[id - 5] !== null &&
        !edgeCells.includes(id - 5)
      ) {
        if (cells[id - 10] === ctx.currentPlayer) {
          cells[id - 5] = ctx.currentPlayer;
        } else {
          if (cells[id - 15] === ctx.currentPlayer) {
            cells[id - 5] = ctx.currentPlayer;
            cells[id - 10] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiless diagonally down right
      if (
        cells[id + 3] !== ctx.currentPlayer &&
        cells[id + 3] !== null &&
        !edgeCells.includes(id + 3)
      ) {
        if (cells[id + 6] === ctx.currentPlayer) {
          cells[id + 3] = ctx.currentPlayer;
        } else {
          if (cells[id + 9] === ctx.currentPlayer) {
            cells[id + 3] = ctx.currentPlayer;
            cells[id + 6] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiles diagonally up right
      if (
        cells[id - 3] !== ctx.currentPlayer &&
        cells[id - 3] !== null &&
        !edgeCells.includes(id - 3)
      ) {
        if (cells[id - 6] === ctx.currentPlayer) {
          cells[id - 3] = ctx.currentPlayer;
        } else {
          if (cells[id - 9] === ctx.currentPlayer) {
            cells[id - 3] = ctx.currentPlayer;
            cells[id - 6] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiles upwards
      if (cells[id - 4] !== ctx.currentPlayer && cells[id - 4] !== null) {
        if (cells[id - 8] === ctx.currentPlayer) {
          cells[id - 4] = ctx.currentPlayer;
        } else {
          if (cells[id - 12] === ctx.currentPlayer) {
            cells[id - 4] = ctx.currentPlayer;
            cells[id - 8] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiles downwards
      if (cells[id + 4] !== ctx.currentPlayer && cells[id + 4] !== null) {
        if (cells[id + 8] === ctx.currentPlayer) {
          cells[id + 4] = ctx.currentPlayer;
        } else {
          if (cells[id + 12] === ctx.currentPlayer) {
            cells[id + 4] = ctx.currentPlayer;
            cells[id + 8] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiles right
      if (
        cells[id + 1] !== ctx.currentPlayer &&
        cells[id + 1] !== null &&
        ![2, 3, 6, 7, 10, 11, 14, 15].includes(id)
      ) {
        if (cells[id + 2] === ctx.currentPlayer) {
          cells[id + 1] = ctx.currentPlayer;
        } else {
          if (cells[id + 3] === ctx.currentPlayer) {
            cells[id + 1] = ctx.currentPlayer;
            cells[id + 2] = ctx.currentPlayer;
          }
        }
      }
      //Flip tiles left
      if (
        cells[id - 1] !== ctx.currentPlayer &&
        cells[id - 1] !== null &&
        ![0, 1, 4, 5, 8, 9, 12, 13].includes(id)
      ) {
        if (cells[id - 2] === ctx.currentPlayer) {
          cells[id - 1] = ctx.currentPlayer;
        } else {
          if (cells[id - 3] === ctx.currentPlayer) {
            cells[id - 1] = ctx.currentPlayer;
            cells[id - 2] = ctx.currentPlayer;
          }
        }
      }
      return { ...G, cells }; // don't mutate original state.
    },

    clickShift(G, ctx, id) {
      let cells = [...G.cells]; // don't mutate original state.
      cells[id] = null;
      return { ...G, cells }; // don't mutate original state.
    }
  },

  flow: {
    endGameIf: (G, ctx) => {
      let isVictoryObj = isVictory(G.cells);
      if (isVictoryObj.flag) {
        return isVictoryObj.winner;
      }
    }
  }
});

const App = Client({
  game: Reversi,
  board: ReversiBoard,
  debug: false
});

export default App;
