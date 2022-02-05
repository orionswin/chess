class ChessPiece {
    constructor(name, color, x1, y1) {
        this.clicked = false;
        this.name = name;
        this.color = color;
        this.letter = x1;
        this.x1 = x1.charCodeAt(0) - 96;                    //Original xy(eg. A8) position on board
        this.y1 = parseInt(y1);
        this.path = []
    }
    checkPath() {                                           //Checks + and x directions for open paths (no other piece on the way)
        const p_gridx = [-1,0,1,-1,1,-1,0,1];
        const p_gridy = [1,1,1,0,0,-1,-1,-1];
        for (let j=0; j < p_gridx.length; j++) {
            for (let k=1; k <= 7; k++) {
                try {
                    if (document.querySelector(`#${String.fromCharCode(96 + this.x1 + (k*p_gridx[j]))}${this.y1 + (k*p_gridy[j])}`).childElementCount !== 0) {
                        this.path.push(`${String.fromCharCode(96 + this.x1 + (k*p_gridx[j]))}${this.y1 + (k*p_gridy[j])}`);
                        break;
                    }
                    else {
                        this.path.push(`${String.fromCharCode(96 + this.x1 + (k*p_gridx[j]))}${this.y1 + (k*p_gridy[j])}`);
                    }
                }
                catch (err) {
                    continue;
                }
            }
        }
    }
}

class Pawn extends ChessPiece {
    move(x2, y2) {                                          //Boolean. Checks if move is valid
        if (this.color === "black") {
            if (y2 - this.y1 === -2 && this.y1 === 7) {
                return (x2 === this.x1 && y2 - this.y1 === -2);
            }
            else if (Math.abs(x2 - this.x1) === 1) {
                return (y2 - this.y1 === -1);
            }
            else {
                return (x2 === this.x1 && y2 - this.y1 === -1);
            }
        }
        else if (this.color === "white") {
            if (y2 - this.y1 === 2 && this.y1 === 2) {
                return (x2 === this.x1 && y2 - this.y1 === 2);
            }
            else if (Math.abs(x2 - this.x1) === 1) {
                return (y2 - this.y1 === 1);
            }
            else {
                return (x2 === this.x1 && y2 - this.y1 === 1);
            }
        }
    }
}

class Rook extends ChessPiece {
    move(x2, y2) {
        if (x2 === this.x1) {
            return Math.abs(y2 - this.y1) > 0 && Math.abs(y2 - this.y1) < 8;
        }
        else if (y2 === this.y1) {
            return Math.abs(x2 - this.x1) > 0 && Math.abs(x2 - this.x1) < 8;
        }
        else {
            return false;
        }
    }
}

class King extends ChessPiece {
    move(x2, y2) {
        if (x2 === this.x1) {
            return Math.abs(y2 - this.y1) === 1;
        }
        else if (y2 === this.y1) {
            return Math.abs(x2 - this.x1) === 1;
        }
        else {
            return (Math.abs(x2-this.x1) === 1 && Math.abs(y2-this.y1) === 1);
        }
    }
}

class Queen extends ChessPiece {
    move(x2, y2) {
        if (x2 === this.x1) {
            return Math.abs(y2 - this.y1) > 0 && Math.abs(y2 - this.y1) < 8;
        }
        else if (y2 === this.y1) {
            return Math.abs(x2 - this.x1) > 0 && Math.abs(x2 - this.x1) < 8;
        }
        else {
            return (Math.abs(y2 - this.y1) > 0 && Math.abs(x2-this.x1) === Math.abs(y2-this.y1));
        }
    }
}

class Bishop extends ChessPiece {
    move(x2, y2) {
        return (Math.abs(y2 - this.y1) > 0 && Math.abs(x2-this.x1) === Math.abs(y2-this.y1));
    }
}

class Knight extends ChessPiece {
    checkPath() {
        const p_gridx = [-1,1,-2,2,-2,2,-1,1];
        const p_gridy = [2,2,1,1,-1,-1,-2,-2];
        for (let j=0; j < p_gridx.length; j++) {
            try {
                if (document.querySelector(`#${String.fromCharCode(96 + this.x1 + p_gridx[j])}${this.y1 + p_gridy[j]}`).childElementCount !== 0) {
                    this.path.push(`${String.fromCharCode(96 + this.x1 + p_gridx[j])}${this.y1 + p_gridy[j]}`);
                    continue;
                }
                else {
                    this.path.push(`${String.fromCharCode(96 + this.x1 + p_gridx[j])}${this.y1 + p_gridy[j]}`);
                }
            }
            catch (err) {
                continue;
            }
        }
    }
    move(x2, y2) {
        if (Math.abs(y2 - this.y1) === 1) {
            return Math.abs(x2 - this.x1) === 2;
        }
        else if (Math.abs(x2 - this.x1) === 1) {
            return Math.abs(y2 - this.y1) === 2;
        }
        else {
            return false;
        }
    }
}








const tiles = Array.from(document.querySelectorAll('.cell'))
const pieces = Array.from(document.querySelectorAll('.piece'))

let select = "" //Selected piece. Type Object returned by clickItem

function clickItem(tile) {
    if (tile.childElementCount > 0 && tile.hasAttribute('style') === false) {
        const piece = tile.firstElementChild;
        piece.classList.toggle('clicked');
        if (select === "") {
            createClass(piece);
            highlightMoves();
        }
        else {
            pieces.forEach(item => item.classList.remove('clicked'));
            select = "";
            clearHighlight();
        }
    }
}

function createClass(piece) {
    const xy = piece.parentElement.id.split('')
    if (piece.classList.contains('clicked') !== false) {
        if (piece.classList.contains('pawn')) {
            const cp = new Pawn(piece.classList[2], piece.classList[1].split('-')[0], xy[0], xy[1])
            cp.clicked = true;
            select = cp;
        }
        else if (piece.classList.contains('rook')) {
            const cp = new Rook(piece.classList[2], piece.classList[1].split('-')[0], xy[0], xy[1])
            cp.clicked = true;
            select = cp;
        }
        else if (piece.classList.contains('king')) {
            const cp = new King(piece.classList[2], piece.classList[1].split('-')[0], xy[0], xy[1])
            cp.clicked = true;
            select = cp;
        }
        else if (piece.classList.contains('queen')) {
            const cp = new Queen(piece.classList[2], piece.classList[1].split('-')[0], xy[0], xy[1])
            cp.clicked = true;
            select = cp;
        }
        else if (piece.classList.contains('bishop')) {
            const cp = new Bishop(piece.classList[2], piece.classList[1].split('-')[0], xy[0], xy[1])
            cp.clicked = true;
            select = cp;
        }
        else if (piece.classList.contains('knight')) {
            const cp = new Knight(piece.classList[2], piece.classList[1].split('-')[0], xy[0], xy[1])
            cp.clicked = true;
            select = cp;
        }
    }
}

function highlightMoves() {
    select.checkPath();
    for (let i=0; i<tiles.length; i++) {
        const xy = tiles[i].id.split('');
        const x2 = xy[0].charCodeAt(0) - 96;
        const y2 = parseInt(xy[1]);
        if (select.move(x2, y2) === true && select.path.includes(tiles[i].id)) {
            try {
                if (select.color === tiles[i].firstElementChild.classList[1].split('-')[0]) {
                    continue;
                }
                else if (select.color !== tiles[i].firstElementChild.classList[1].split('-')[0]) {
                    tiles[i].style.border = "4px solid red";
                    movePawn(tiles[i], x2);
                }
                else {
                    tiles[i].style.border = "4px solid yellow";
                }
            }
            catch (err) {
                tiles[i].style.border = "4px solid yellow";
                movePawn(tiles[i], x2);
            }
        }
    }
}

function movePawn(tile, x2) {
    if (select.name === "pawn") {
        if (tile.childElementCount > 0 && x2 === select.x1) {
            tile.getAttribute('style');
            tile.removeAttribute('style');
        }
        else if (tile.childElementCount === 0 && Math.abs(x2 - select.x1) === 1) {
            tile.getAttribute('style');
            tile.removeAttribute('style');
        }
    }
}

function clearHighlight() {
    tiles.forEach(item => {
        item.getAttribute('style');         //Added due to a bug where removeAttribute fails to run on some divs in time; seems to
        item.removeAttribute('style');      //fix freezing bug as well
    });
}

function dropItem(tile) {
    const piece = document.querySelector('div.clicked');
    if (tile.hasAttribute('style') && select !== "") {
        clearHighlight();
        const fromtile = piece.parentElement;
        if (tile.childElementCount === 0) {
            tile.append(...fromtile.childNodes);
            piece.classList.toggle('clicked');
            select = "";
        }
        else {
            tile.innerHTML = "";
            tile.append(...fromtile.childNodes);
            piece.classList.toggle('clicked');
            select = "";
        }
    }
    else if (tile.childElementCount === 0 && select !== "") {
        clearHighlight();
        piece.classList.toggle('clicked');
        select = "";
    }
}

tiles.forEach(item => item.addEventListener('click', function() {
    clickItem(item);
    dropItem(item);
}))

