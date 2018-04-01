import React from "react";
import white from "./white.jpg";
import black from "./black.jpg";
import whiteSpy from "./whitespy_small.png";
import blackSpy from "./blackspy_smallv2.jpg";

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
              <img className="button" src={white} alt="white" />
            )}
            {this.props.G.cells[id] === "1" && (
              <img className="button" src={black} alt="black" />
            )}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div className="grid-table">
        <div>
          <img src={whiteSpy} alt="whiteSpy" className="spy-img" />
        </div>
        <div>1</div>
        <div>
          <img src={blackSpy} alt="blackSpy" className="spy-img" />
        </div>
        <div
          className={
            this.props.ctx.currentPlayer === "0" ? "turn-line" : undefined
          }
        />
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
        <div
          className={
            this.props.ctx.currentPlayer === "1" ? "turn-line" : undefined
          }
        />
      </div>
    );
  }
}

export default ReversiBoard;
