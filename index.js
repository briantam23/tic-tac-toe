const prompt = require('prompt');

const board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

const markBoard = (position, mark) => {
    board[position] = mark.toUpperCase();
}

const printBoard = () => {
    console.log(
        '\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n'
    );
}

const validateMove = position => {
    if(Number.isInteger(parseFloat(position)) === true && board[position] === ' ') {
        return true;
    }
    return false;
}

// Everyone possible combination of three in a row
const winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
    [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// Determins if the passed in player has three in a row
const checkWin = player => {
    for(let i = 0; i < winCombinations.length; i++) {
        let markCount = 0;
        for(let j = 0; j < winCombinations[i].length; j++) {
            if(board[winCombinations[i][j]] === player) {
                markCount++;
            }
            if(markCount === 3) {
                return true;
            }
        }
    }
    return false;
}

const checkDraw = () => {
    let markCount = 0;
    for(const position in board) {
        if(board[position] === ' ') {
            return false;
        }
    }
    return true;
}

const playTurn = player => {

    console.log('Your turn player: ' + player);
    prompt.start();
    prompt.get(['position'], (err, result) => {

        if(validateMove(result.position) === true) {
            markBoard(result.position, player);
            printBoard();
            if(checkWin(player) === true) {
                console.log('Winner Winner!');
                return;
            }
            if(checkDraw(player) === true) {
                console.log('Draw!');
                return;
            }
            player === 'X' ? playTurn('O') : playTurn('X');
        } 
        else {
            console.log('incorrect input please try again...');
            playTurn(player);
        }
    });
}

console.log(
    'Game started: \n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n'
);


playTurn('X');
