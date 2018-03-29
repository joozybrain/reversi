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
  console.log("white" + whiteCount + "black" + blackCount);
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
    // tempArray[27] = "0";
    // tempArray[36] = "0";
    // tempArray[28] = "1";
    // tempArray[35] = "1";

    tempArray[5] = "0";
    tempArray[10] = "0";
    tempArray[6] = "1";
    tempArray[9] = "1";
    return { cells: tempArray };
  },

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells]; // don't mutate original state.
      cells[id] = ctx.currentPlayer;
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
      console.log(ctx);
      console.log(G);
      let isVictoryObj = isVictory(G.cells);
      if (isVictoryObj.flag && ctx.currentPlayer === "0" && ctx.turn === 12) {
        return isVictoryObj.winner;
      }
    }
  }
});

const App = Client({
  game: Reversi,
  board: ReversiBoard
});

export default App;
