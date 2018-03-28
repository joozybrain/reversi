import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
import ReversiBoard from "./components/ReversiBoard/ReversiBoard"

const Reversi = Game({
  //setup: () =>  ({ cells: Array(64).fill(null) }), //The brackets before the curly braces is inform it is object and not code block

  setup: () => {
    let tempArray = Array(64).fill(null);
    tempArray[27] = "0";
    tempArray[36] = "0";
    tempArray[28] = "1";
    tempArray[35] = "1";
    return {cells: tempArray}
  },

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells]; // don't mutate original state.
      cells[id] = ctx.currentPlayer;
      return { ...G, cells }; // don't mutate original state.
    }
  }
});

const App = Client({
  game: Reversi,
  board: ReversiBoard
});

export default App;
