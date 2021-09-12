const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = 'X';

let gameState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
    [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
    [2, 12, 22, 32, 42, 52, 62, 72, 82, 92],
    [3, 13, 23, 33, 43, 53, 63, 73, 83, 93],
    [4, 14, 24, 34, 44, 54, 64, 74, 84, 94],
    [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
    [6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
    [7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
    [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
    [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
    [0, 11, 22, 33, 44, 55, 66, 77, 88, 99],
    [9, 18, 27, 36, 45, 54, 63, 72, 81, 90]
];

function handleResultValidation() {
    let roundWon = false;
    
    for (let x = 0; x <= 21; x++) {
        const winCondition = winningConditions[x];
        
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        let d = gameState[winCondition[3]];
        let e = gameState[winCondition[4]];
        let f = gameState[winCondition[5]];
        let g = gameState[winCondition[6]];
        let h = gameState[winCondition[7]];
        let i = gameState[winCondition[8]];
        let j = gameState[winCondition[9]];
        
        if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '' || g === '' || h === '' || i === '' || j === '') {
            continue;
        }
        
        if (a === b && b === c && c === d && d === e && e === f && f === g && g === h && h === i && i === j) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    
    let roundDraw = !gameState.includes('');
    
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);