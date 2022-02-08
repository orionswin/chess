import Pieces from "../Pieces.js";

export default class Queen extends Pieces {
  move(x2, y2) {
    if (x2 === this.x1) {
      return Math.abs(y2 - this.y1) > 0 && Math.abs(y2 - this.y1) < 8;
    } else if (y2 === this.y1) {
      return Math.abs(x2 - this.x1) > 0 && Math.abs(x2 - this.x1) < 8;
    } else {
      return (
        Math.abs(y2 - this.y1) > 0 &&
        Math.abs(x2 - this.x1) === Math.abs(y2 - this.y1)
      );
    }
  }
}
