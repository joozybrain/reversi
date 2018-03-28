import React from "react";
import white from "./white.jpg";
import black from "./black.jpg";

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

    const cellStyle = {
      border: "1px solid #555",
      width: "50px",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center",
      background: "green"
    };

    let tbody = [];
    for (let i = 0; i < 8; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        const id = 8 * i + j;

        cells.push(
          <td
            style={cellStyle}
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
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}

export default ReversiBoard;
