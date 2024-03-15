
// Function to create the Board
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const boardContainer = document.querySelector(".container");
    const board = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            const newCell = cell();
            row.push(newCell);
        }
        board.push(row);
    }

    // Create and append DOM elements for the board
    board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.column = columnIndex;
            boardContainer.appendChild(cellElement);
        });
    });

    return {
        board,
        boardContainer 
    };
}

// Function to assign the value to each cell in the board
function cell() {
    let value = 0;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMarker,
        getValue
    };
}

// Function for the user's features
function displayController(player1 = "Player One", player2 = "Player Two") {
    const board = gameBoard();

    let gameEnded = false;

    const players = [
        {
            name: player1,
            marker: "X"
        },
        {
            name: player2,
            marker: "O",
        }
    ];

    // Switch player's Turn
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    // Start a new Round
    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // Function to handle player clicks
    function handleCellClick(event) {

        if (gameEnded) return;

        const target = event.target;
        if (target.classList.contains("cell")) {
            const row = parseInt(target.dataset.row);
            const column = parseInt(target.dataset.column);

            // Get active player marker
            const marker = getActivePlayer().marker;

            // Check if the cell is empty before assigning the marker
            const cell = board.board[row][column];
            if (cell.getValue() === 0) {
                // Update DOM to display the marker
                const markerElement = document.createElement("p");
                markerElement.classList.add("user_marker");
                markerElement.textContent = marker;
                target.appendChild(markerElement);

                // Add marker value to the cell
                cell.addMarker(marker);

                // Check for a winner
                if (checkWinner(row, column)) {
                    console.log(`${getActivePlayer().name} wins!`);
                    showWinner();
                    stopGame();
                    gameEnded = true;
                } else if (checkTie()) {
                    showTie();
                    gameEnded = true;
                } 
                else {
                    // Switch player turn
                    switchPlayerTurn();
                    printNewRound();
                }
            } else {
                console.log("Invalid move. Try again.");
            }
        }
    }

    // Add event listener for handling player clicks
    board.boardContainer.addEventListener("click", handleCellClick);

    // Check for a winner after each move
    const checkWinner = (row, column) => {
        const playerMarker = getActivePlayer().marker;
        // Check row
        if (board.board[row].every(cell => cell.getValue() === playerMarker)) return true;
        // Check column
        if (board.board.every(row => row[column].getValue() === playerMarker)) return true;
        // Check diagonal
        if (row === column && board.board.every((row, i) => row[i].getValue() === playerMarker)) return true;
        if (row + column === board.board.length - 1 && board.board.every((row, i) => row[board.board.length - 1 - i].getValue() === playerMarker)) return true;
        return false;
    };

    function checkTie() {
        return board.board.every(row => row.every(cell => cell.getValue() !== 0));
        
    }

    function showTie() {

        const tieMessage = document.createElement("h3");
        tieMessage.classList.add("result");
        tieMessage.textContent = "It's a tie!";
    
        const resetButton = document.createElement("button");
        resetButton.classList.add("reset_button");
        resetButton.textContent = "RESET";
    
        const winnerContainer = document.querySelector(".winner_container");
        winnerContainer.appendChild(tieMessage);
        winnerContainer.appendChild(resetButton);
    
        resetButton.addEventListener("click", resetGame);
    }

    function showWinner() {

        const winner = document.createElement("h3");
        winner.classList.add("result");
        winner.textContent = `${getActivePlayer().name} wins!`;

        const resetButton = document.createElement("button");
        resetButton.classList.add("reset_button");
        resetButton.textContent = "RESET";

        const winnerContainer = document.querySelector(".winner_container");
        winnerContainer.appendChild(winner);
        winnerContainer.appendChild(resetButton);

        resetButton.addEventListener("click", resetGame);
    }
    
    function stopGame() {

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.d = "";
        });

    }

    function resetGame() {

        // Clear the board UI
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = "";
        });
    
        // Reset the internal state
        board.board.forEach(row => {
            row.forEach(cell => {
                cell.addMarker(0);
            });
        });

        const winnerContainer = document.querySelector(".winner_container");
        winnerContainer.textContent = "";
    
        // Reset the active player
        activePlayer = players[0];
    
        // Print a message indicating the start of a new game
        console.log("Game reset. Starting a new game.");

        printNewRound();

        gameEnded = false;
    }

    // Initial play game message
    printNewRound();

    return {
        getActivePlayer
    };
}

const game = displayController();
