import Pieces from "../Pieces.js";

export default class Pawn extends Pieces {
  move(x2, y2) {
    //Boolean. Checks if move is valid
    if (this.color === "black") {
      if (y2 - this.y1 === -2 && this.y1 === 7) {
        return x2 === this.x1 && y2 - this.y1 === -2;
      } else {
        return x2 === this.x1 && y2 - this.y1 === -1;
      }
    } else if (this.color === "white") {
      if (y2 - this.y1 === 2 && this.y1 === 2) {
        return x2 === this.x1 && y2 - this.y1 === 2;
      } else {
        return x2 === this.x1 && y2 - this.y1 === 1;
      }
    }
  }
}
