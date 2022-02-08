import Pieces from "../Pieces.js";

export default class Bishop extends Pieces {
  move(x2, y2) {
    return (
      Math.abs(y2 - this.y1) > 0 &&
      Math.abs(x2 - this.x1) === Math.abs(y2 - this.y1)
    );
  }
}
