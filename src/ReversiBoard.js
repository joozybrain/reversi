import React from "react";
import white from "./white.jpg"
import black from "./black.jpg"

class ReversiBoard extends React.Component {
  onClick(id) {
    console.log(id)
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = "";
    if (this.props.ctx.gameover !== null) {
      winner = <div>Winner: {this.props.ctx.gameover}</div>;
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
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
            {this.props.G.cells[id] === "0" ? <img src={white} alt="white" width="30px" height="30px"/> : <img src={black} alt="white" width="30px" height="30px"/>}
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
