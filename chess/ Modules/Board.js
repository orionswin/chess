import Pawn from "./piecesClass/Pawn.js";
import King from "./piecesClass/King.js";
import Queen from "./piecesClass/Queen.js";
import Knight from "./piecesClass/Knight.js";
import Rook from "./piecesClass/Rook.js";
import Bishop from "./piecesClass/Bishop.js";
const files = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default class Board {
  constructor(board, tiles, pieces) {
    this.board = board;
    this.player = ["white", "black"];
    this.boardState = [];
    this.tiles = tiles;
    this.pieces = pieces;
    this.path = [];
    this.select = "";
    this.createBoxPositions();
    this.pieceInteraction();
  }
  createBoxPositions() {
    this.tiles.forEach((cell, idx) => {
      const rank = 8 - Math.floor(idx / 8);
      const file = files[idx % 8];
      const position = `${file}${rank}`;
      // init
      cell.setAttribute("data-file", file);
      cell.setAttribute("data-rank", rank);
      cell.setAttribute("data-position", position);
    });
  }

  pieceInit(piece) {
    const xy = piece.parentElement.id.split("");
    if (piece.classList.contains("clicked") !== false) {
      if (piece.classList.contains("pawn")) {
        const cp = new Pawn(
          piece.classList[2],
          piece.classList[1].split("-")[0],
          xy[0],
          xy[1]
        );
        cp.clicked = true;
        this.select = cp;
      } else if (piece.classList.contains("rook")) {
        const cp = new Rook(
          piece.classList[2],
          piece.classList[1].split("-")[0],
          xy[0],
          xy[1]
        );
        cp.clicked = true;
        this.select = cp;
      } else if (piece.classList.contains("king")) {
        const cp = new King(
          piece.classList[2],
          piece.classList[1].split("-")[0],
          xy[0],
          xy[1]
        );
        cp.clicked = true;
        this.select = cp;
      } else if (piece.classList.contains("queen")) {
        const cp = new Queen(
          piece.classList[2],
          piece.classList[1].split("-")[0],
          xy[0],
          xy[1]
        );
        cp.clicked = true;
        this.select = cp;
        console.log(cp);
      } else if (piece.classList.contains("bishop")) {
        const cp = new Bishop(
          piece.classList[2],
          piece.classList[1].split("-")[0],
          xy[0],
          xy[1]
        );
        cp.clicked = true;
        this.select = cp;
      } else if (piece.classList.contains("knight")) {
        const cp = new Knight(
          piece.classList[2],
          piece.classList[1].split("-")[0],
          xy[0],
          xy[1]
        );
        cp.clicked = true;
        this.select = cp;
      }
    }
  }
  highlightMoves() {
    // this.select.checkPath();
    this.select.checkPath();
    for (let i = 0; i < this.tiles.length; i++) {
      const xy = this.tiles[i].id.split("");
      const x2 = xy[0].charCodeAt(0) - 96;
      const y2 = parseInt(xy[1]);
      if (
        this.select.move(x2, y2) === true &&
        this.select.path.includes(this.tiles[i].id)
      ) {
        this.tiles[i].style.border = "4px solid yellow";
      }
    }
  }
  clearHighlight() {
    this.tiles.forEach((item) => item.removeAttribute("style"));
  }
  dropItem(tile) {
    if (tile.childElementCount === 0 && this.select !== "") {
      this.clearHighlight();
      const piece = document.querySelector("div.clicked");
      if (tile.children.length === 0) {
        const fromtile = piece.parentElement;
        tile.append(...fromtile.childNodes);
        piece.classList.toggle("clicked");
        this.select = "";
      } else {
        piece.classList.toggle("clicked");
        this.select = "";
      }
    }
  }

  clickItem(tile) {
    if (tile.childElementCount > 0) {
      const piece = tile.firstElementChild;
      piece.classList.toggle("clicked");
      if (this.select === "") {
        this.pieceInit(piece);
        this.highlightMoves();
      } else {
        this.pieces.forEach((item) => item.classList.remove("clicked"));
        this.select = "";
        this.clearHighlight();
      }
    }
  }
  pieceInteraction() {
    this.tiles.forEach((cell) => {
      cell.addEventListener("click", () => {
        this.clickItem(cell);
        this.dropItem(cell);
      });
    });
  }
}
