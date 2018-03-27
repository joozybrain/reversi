import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
import ReversiBoard from "./ReversiBoard";

const Reversi = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      let cells = [...G.cells]; // don't mutate original state.
      cells[id] = ctx.currentPlayer === "0" ? "white ": "black";
      return { ...G, cells }; // don't mutate original state.
    }
  }
});

const App = Client({
  game: Reversi,
  board: ReversiBoard
});

export default App;
