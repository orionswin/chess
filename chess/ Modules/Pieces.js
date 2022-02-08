export default class Pieces {
  constructor(name, color, x1, y1) {
    this.clicked = false;
    this.letter = x1;
    this.name = name;
    this.color = color;
    this.x1 = x1.charCodeAt(0) - 96; //Original xy(eg. A8) position on board
    this.y1 = parseInt(y1);
    this.path = [];
  }
  checkPath() {
    //Checks + and x directions for open paths (no other piece on the way)
    const p_gridx = [-1, 0, 1, -1, 1, -1, 0, 1];
    const p_gridy = [1, 1, 1, 0, 0, -1, -1, -1];
    for (let j = 0; j < p_gridx.length; j++) {
      for (let k = 1; k <= 7; k++) {
        try {
          if (
            document.querySelector(
              `#${String.fromCharCode(96 + this.x1 + k * p_gridx[j])}${
                this.y1 + k * p_gridy[j]
              }`
            ).childElementCount !== 0
          ) {
            this.path.push(
              `${String.fromCharCode(96 + this.x1 + k * p_gridx[j])}${
                this.y1 + k * p_gridy[j]
              }`
            );
            break;
          } else {
            this.path.push(
              `${String.fromCharCode(96 + this.x1 + k * p_gridx[j])}${
                this.y1 + k * p_gridy[j]
              }`
            );
          }
        } catch (err) {
          continue;
        }
      }
    }
  }
}
