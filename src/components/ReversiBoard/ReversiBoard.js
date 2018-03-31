import React from "react";
import white from "./white.jpg";
import black from "./black.jpg";
import whiteSpy from "./white_spy.PNG";
import blackSpy from "./black_spy.png";

import "./ReversiBoard.css";

class ReversiBoard extends React.Component {
  onClick(id, e) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
    //console.log(e)
    if (e.shiftKey) {
      if (this.isActive(id)) {
        this.props.moves.clickShift(id);
      }
    }
  }

  clickEndTurn(e) {
    this.props.events.endTurn();
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    //if (this.props.G.cells[id] !== null) return false; //uncomment if to disable clicking to change color
    return true;
  }

  render() {
    let winner = "";
    if (this.props.ctx.gameover !== null) {
      winner = <div id="winner">Winner: {this.props.ctx.gameover}</div>;
    }

    let tbody = [];
    const gridSize = 4;
    for (let i = 0; i < gridSize; i++) {
      let cells = [];
      for (let j = 0; j < gridSize; j++) {
        const id = gridSize * i + j;

        cells.push(
          <td
            className="cell-style"
            key={id}
            onClick={event => this.onClick(id, event)}
          >
            {this.props.G.cells[id] === "0" && (
              <img src={white} alt="white" width="30px" height="30px" />
            )}
            {this.props.G.cells[id] === "1" && (
              <img src={black} alt="black" width="30px" height="30px" />
            )}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div className="grid-table">
        <div>
          player 1<img src={blackSpy} alt="blackSpy" />
        </div>
        <div>
          <table id="board">
            <tbody>{tbody}</tbody>
          </table>
          {winner}
          <input
            type="submit"
            value="End Turn"
            onClick={event => this.clickEndTurn(event)}
          />
        </div>
        <div>
          player 2<img src={whiteSpy} alt="whiteSpy" />
        </div>
      </div>
    );
  }
}

export default ReversiBoard;
