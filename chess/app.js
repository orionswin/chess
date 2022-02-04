import Board from "./ Modules/Board.js";
import Pieces from "./ Modules/Pieces.js";

const squares = document.querySelectorAll(".cell");
const board = document.querySelector(".container");
const pieces = document.querySelectorAll(".piece");
// Random player //

let randomPlayer = Math.floor(Math.random() * 2);
const chessInit = new Board(board, squares, pieces, randomPlayer);
