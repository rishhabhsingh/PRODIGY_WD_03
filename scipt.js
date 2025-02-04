const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X'; // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // empty board
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

// Function to handle a cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = Array.from(cells).indexOf(clickedCell);

    // Check if the cell is already taken or if the game is over
    if (gameBoard[clickedIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game board and the UI
    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWinner()) {
        gameActive = false;
        status.textContent = `${currentPlayer} wins!`;
    } else if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check if there is a winner
function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = ''); // Clear all cells
    status.textContent = `Player X's turn`;
}

// Event listeners for cell clicks and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize status text
status.textContent = `Player X's turn`;
