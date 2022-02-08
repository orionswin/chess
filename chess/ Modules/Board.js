import Pawn from "./piecesClass/Pawn.js";
import King from "./piecesClass/King.js";
import Queen from "./piecesClass/Queen.js";
import Knight from "./piecesClass/Knight.js";
import Rook from "./piecesClass/Rook.js";
import Bishop from "./piecesClass/Bishop.js";
const files = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default class Board {
  constructor(board, tiles, pieces) {
    this.promotionPrompt = document.querySelector(
      ".promotion-prompt-container"
    );
    this.promotionPromptBlack = document.querySelector(
      ".promotion-prompt-black"
    );
    this.promotionPromptWhite = document.querySelector(
      ".promotion-prompt-white"
    );
    this.piecePromotionButton = document.querySelectorAll("[promotion-button]");
    this.board = board;
    this.player = ["white", "black"];
    this.boardState = [];
    this.tiles = tiles;
    this.isWhite = true;
    this.pieces = pieces;
    this.path = [];
    this.select = "";
    this.createBoxPositions();
    this.pieceInteraction();
    this.turnPlayer();
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
  movePawn(tile, x2) {
    if (this.select.name === "pawn") {
      if (tile.childElementCount > 0 && x2 === this.select.x1) {
        tile.getAttribute("style");
        tile.removeAttribute("style");
      } else if (
        tile.childElementCount === 0 &&
        Math.abs(x2 - this.select.x1) === 1
      ) {
        tile.getAttribute("style");
        tile.removeAttribute("style");
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
        try {
          if (
            this.select.color ===
            this.tiles[i].firstElementChild.classList[1].split("-")[0]
          ) {
            continue;
          } else if (
            this.select.color !==
            this.tiles[i].firstElementChild.classList[1].split("-")[0]
          ) {
            this.tiles[i].style.border = "4px solid rgba(200, 1, 1)";
            this.tiles[i].style.borderRadius = "4px";
            this.movePawn(this.tiles[i], x2);
            this.tiles[i].classList.add("to-capture");
            this.tiles[i].style.pointerEvents = "auto";
          } else {
            this.tiles[i].style.border = "4px solid rgb(255, 252, 97)";
            this.tiles[i].style.borderRadius = "4px";
          }
        } catch (err) {
          this.tiles[i].style.border = "4px solid rgb(255, 252, 97)";
          this.tiles[i].style.borderRadius = "4px";
          this.movePawn(this.tiles[i], x2);
        }
      }
    }
  }
  clearHighlight() {
    this.tiles.forEach((item) => {
      // item.classList.remove("selected-highlight");
      item.getAttribute("style"); //Added due to a bug where removeAttribute fails to run on some divs in time; seems to
      item.removeAttribute("style");
      item.classList.remove("to-capture");
    });
  }
  dropItem(e, tile) {
    const piece = document.querySelector("div.clicked");
    if (tile.hasAttribute("style") && this.select !== "") {
      this.clearHighlight();
      const fromtile = piece.parentElement;
      if (tile.childElementCount === 0) {
        tile.append(...fromtile.childNodes);
        piece.classList.toggle("clicked");
        // if pawn reaches promotion row, promote to selected piece

        const xy = tile.id.split("");
        const y2 = parseInt(xy[1]);
        this.togglePlayer();
        if (
          y2 === 1 &&
          piece.classList.contains("pawn") === true &&
          piece.classList.contains("black-piece") === true
        ) {
          this.showPromotionBlack();
          this.piecePromotionButton.forEach((button) => {
            button.addEventListener("click", () => {
              if (
                button.classList.contains("rook") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("rook");
                piece.textContent = "♜";
                this.hidePromotionBlack();
              } else if (
                button.classList.contains("knight") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");

                piece.classList.add("knight");
                piece.textContent = "♞";
                this.hidePromotionBlack();
              } else if (
                button.classList.contains("bishop") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("bishop");
                piece.textContent = "♝";
                this.hidePromotionBlack();
              } else if (
                button.classList.contains("queen") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("queen");
                piece.textContent = "♛";
                this.hidePromotionBlack();
              }
            });
          });
        } else if (
          y2 === 8 &&
          piece.classList.contains("pawn") === true &&
          piece.classList.contains("white-piece") === true
        ) {
          this.showPromotionWhite();
          this.piecePromotionButton.forEach((button) => {
            button.addEventListener("click", () => {
              if (
                button.classList.contains("rook") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("rook");
                piece.textContent = "♜";
                hidePromotionWhite();
              } else if (
                button.classList.contains("knight") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("knight");
                piece.textContent = "♞";
                hidePromotionWhite();
              } else if (
                button.classList.contains("bishop") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("bishop");
                piece.textContent = "♝";
                hidePromotionWhite();
              } else if (
                button.classList.contains("queen") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("queen");
                piece.textContent = "♛";
                hidePromotionWhite();
              }
            });
          });
        }
        this.select = "";
      } else {
        tile.innerHTML = "";
        tile.append(...fromtile.childNodes);
        piece.classList.toggle("clicked");
        this.togglePlayer();
        // if pawn reaches promotion row, promote to selected piece
        const piecePromotionButton =
          document.querySelectorAll("[promotion-button]");
        const xy = tile.id.split("");
        const y2 = parseInt(xy[1]);
        if (
          y2 === 1 &&
          piece.classList.contains("pawn") === true &&
          piece.classList.contains("black-piece") === true
        ) {
          this.showPromotionBlack();
          this.piecePromotionButton.forEach((button) => {
            button.addEventListener("click", () => {
              if (
                button.classList.contains("rook") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("rook");
                piece.textContent = "♜";
                this.idePromotionBlack();
              } else if (
                button.classList.contains("knight") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("knight");
                piece.textContent = "♞";
                this.hidePromotionBlack();
              } else if (
                button.classList.contains("bishop") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("bishop");
                piece.textContent = "♝";
                this.hidePromotionBlack();
              } else if (
                button.classList.contains("queen") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("queen");
                piece.textContent = "♛";
                this.hidePromotionBlack();
              }
            });
          });
        } else if (
          y2 === 8 &&
          piece.classList.contains("pawn") === true &&
          piece.classList.contains("white-piece") === true
        ) {
          this.showPromotionWhite();
          piecePromotionButton.forEach((button) => {
            button.addEventListener("click", () => {
              if (
                button.classList.contains("rook") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("rook");
                piece.textContent = "♜";
                this.hidePromotionWhite();
              } else if (
                button.classList.contains("knight") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("knight");
                piece.textContent = "♞";
                this.hidePromotionWhite();
              } else if (
                button.classList.contains("bishop") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("bishop");
                piece.textContent = "♝";
                this.hidePromotionWhite();
              } else if (
                button.classList.contains("queen") &&
                piece.classList.contains("pawn")
              ) {
                piece.classList.remove("pawn");
                piece.classList.add("queen");
                piece.textContent = "♛";
                this.hidePromotionWhite();
              }
            });
          });
        }
        this.select = "";
      }
    } else if (tile.childElementCount === 0 && this.select !== "") {
      this.clearHighlight();
      piece.classList.toggle("clicked");
      this.select = "";
    }
  }

  turnPlayer() {
    const whitePiece = document.querySelectorAll(".white-piece");
    const blackPiece = document.querySelectorAll(".black-piece");
    blackPiece.forEach((blackPiece, idx) => {
      if (this.isWhite) {
        blackPiece.parentElement.classList.add("not-turn");
        if (whitePiece[idx].parentElement.classList.contains("not-turn")) {
          whitePiece[idx].parentElement.classList.remove("not-turn");
        }
      } else {
        blackPiece.parentElement.classList.remove("not-turn");
        whitePiece[idx].parentElement.classList.add("not-turn");
      }
    });
  }
  togglePlayer() {
    if (this.isWhite) {
      this.isWhite = false;
    } else {
      this.isWhite = true;
    }
    this.turnPlayer();
  }
  clickItem(tile) {
    this.tiles.forEach((item) => {
      if (item.classList.contains("to-capture")) {
        item.style.pointerEvents = "auto";
      }
    });
    if (tile.childElementCount > 0 && tile.hasAttribute("style") === false) {
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
      cell.addEventListener("click", (e) => {
        this.clickItem(cell);
        this.dropItem(e, cell);
      });
    });
  }

  showPromotionBlack() {
    this.promotionPrompt.classList.remove("visibility-hidden");
    this.promotionPromptBlack.classList.remove("display-none");
  }

  hidePromotionBlack() {
    this.promotionPrompt.classList.add("visibility-hidden");
    this.promotionPromptBlack.classList.add("display-none");
  }

  showPromotionWhite() {
    this.promotionPrompt.classList.remove("visibility-hidden");
    this.promotionPromptWhite.classList.remove("display-none");
  }

  hidePromotionWhite() {
    this.promotionPrompt.classList.add("visibility-hidden");
    this.promotionPromptWhite.classList.add("display-none");
  }
}
