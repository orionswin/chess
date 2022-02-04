import Pieces from "../Pieces.js";

export default class King extends Pieces {
  move(x2, y2) {
    if (x2 === this.x1) {
      return Math.abs(y2 - this.y1) === 1;
    } else if (y2 === this.y1) {
      return Math.abs(x2 - this.x1) === 1;
    } else {
      return Math.abs(x2 - this.x1) === 1 && Math.abs(y2 - this.y1) === 1;
    }
  }
}
