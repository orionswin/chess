import Pieces from "../Pieces.js";

export default class Knight extends Pieces {
  checkPath() {
    const p_gridx = [-1, 1, -2, 2, -2, 2, -1, 1];
    const p_gridy = [2, 2, 1, 1, -1, -1, -2, -2];
    for (let j = 0; j < p_gridx.length; j++) {
      try {
        if (
          document.querySelector(
            `#${String.fromCharCode(96 + this.x1 + p_gridx[j])}${
              this.y1 + p_gridy[j]
            }`
          ).childElementCount !== 0
        ) {
          this.path.push(
            `${String.fromCharCode(96 + this.x1 + p_gridx[j])}${
              this.y1 + p_gridy[j]
            }`
          );
          continue;
        } else {
          this.path.push(
            `${String.fromCharCode(96 + this.x1 + p_gridx[j])}${
              this.y1 + p_gridy[j]
            }`
          );
        }
      } catch (err) {
        continue;
      }
    }
  }
  move(x2, y2) {
    if (Math.abs(y2 - this.y1) === 1) {
      return Math.abs(x2 - this.x1) === 2;
    } else if (Math.abs(x2 - this.x1) === 1) {
      return Math.abs(y2 - this.y1) === 2;
    } else {
      return false;
    }
  }
}
