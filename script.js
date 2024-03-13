function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    return {
        board
    };
}

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

function displayController(player1 = "Player One", player2 = "Player Two") {
    const board = gameBoard();

    const players = [
        {
            name: player1,
            marker: 1
        },
        {
            name: player2,
            marker: 2,
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

    // Display the game board
    const displayBoard = () => {
        for (let row of board.board) {
            console.log(row.map(cell => cell.getValue()).join(' | '));
        }
    };

    const playRound = (row, column) => {
        if (board.board[row][column].getValue() === 0) {
            board.board[row][column].addMarker(getActivePlayer().marker);
            displayBoard();
            if (checkWinner(row, column)) {
                console.log(`${getActivePlayer().name} wins!`);
                return;
            }
            switchPlayerTurn();
            printNewRound();
        } else {
            console.log("Invalid move. Try again.");
        }
    };

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

    // Initial play game message
    printNewRound();
    displayBoard();

    return {
        playRound,
        getActivePlayer
    };
}

const game = displayController();